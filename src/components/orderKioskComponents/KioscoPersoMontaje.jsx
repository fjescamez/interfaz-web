import { useEffect, useState } from 'react'
import { globalKioskForm, globalKioskVariables } from './kioscoPersoConfig'
import FormGroup from '../formComponents/FormGroup';
import Switch from "@mui/material/Switch";

function KioscoPersoMontaje({ orderXml, kioscoPersoData, updateState, colores, configAvanzadaData }) {
    const clientFormFields = Object.keys(globalKioskVariables).filter(key =>
        globalKioskVariables[key].includes(orderXml.numero.cliente_codigo)
    );
    const actividadFormFields = Object.keys(globalKioskVariables).filter(key =>
        globalKioskVariables[key].includes(orderXml?.actividad?.id)
    );

    useEffect(() => {
        updateState("isActive", prev => ({
            ...prev,
            kioscoPerso: true
        }));

        if (orderXml?.numero?.cliente_codigo) {
            const cliente_codigo = orderXml.numero.cliente_codigo;

            if (cliente_codigo === "0159" || cliente_codigo === "0360") {
                updateState("kioscoPersoData", prevData => ({
                    ...prevData,
                    caidas_cortadas: true,
                    alturaMicropuntos: -1,
                    posicionCortesCaida: "Izquierda"
                }));
            } else if (cliente_codigo === "0160" || cliente_codigo === "0156" || cliente_codigo === "0038") {
                updateState("kioscoPersoData", prevData => ({
                    ...prevData,
                    alturaMicropuntos: 0,
                    microIzquierda: 5,
                    microDerecha: -5
                }));

                if (cliente_codigo === "0038") {
                    colores.map(color => {
                        updateState("kioscoPersoData", prev => ({
                            ...prev,
                            microVertical: {
                                ...prev.microVertical,
                                [color]: false
                            }
                        }));
                    });
                }
            }

            if (orderXml.actividad.id === "CARTON" && !kioscoPersoData.poscicionPestana) {
                updateState("kioscoPersoData", prevData => ({
                    ...prevData,
                    pestana: 0,
                    poscicionPestana: "CENTRADO",
                    posVarilla: "ARRIBA"
                }));

                if (cliente_codigo === "0022" && !kioscoPersoData.tomaPinza) {
                    updateState("kioscoPersoData", prevData => ({
                        ...prevData,
                        checkRegistron: false,
                        despRegistron: 0,
                        mastercut: false,
                        tomaPinza: "15"
                    }));
                }

            }
        }
    }, [orderXml]);

    const calculateAlturaMicropuntos = () => {
        let alturaMicropuntos = 0;
        let orientacionMontaje = (configAvanzadaData && configAvanzadaData.length > 0) ? configAvanzadaData[0].stations[0].Orientation?.orientation : "up";
        const { flexible_motivos, flexible_ancho_caida, flexible_desamvto } = orderXml?.actividad?.flexible;

        const motivos = parseInt(flexible_motivos);

        if (motivos != 1 && motivos % 2 !== 0) {
            const numero = parseFloat(flexible_ancho_caida);
            const mitad = Math.floor(numero * 100) / 2 / 100; // Corta a 2 decimales
            alturaMicropuntos = -mitad;

            if (orientacionMontaje === "up") {
                const numero = parseFloat(flexible_desamvto);
                const mitad = Math.floor(numero * 100) / 2 / 100; // Corta a 2 decimales
                alturaMicropuntos = -mitad;
            }
        }

        return alturaMicropuntos;
    };

    useEffect(() => {
        if (orderXml?.numero?.cliente_codigo) {
            const cliente_codigo = orderXml.numero.cliente_codigo;
            if (cliente_codigo === "0101") {
                updateState("kioscoPersoData", prevData => ({
                    ...prevData,
                    alturaMicropuntos: calculateAlturaMicropuntos()
                }));

            }
        }
    }, [configAvanzadaData]);

    useEffect(() => {
        if (orderXml?.numero?.cliente_codigo) {
            const cliente_codigo = orderXml.numero.cliente_codigo;
            if (cliente_codigo === "0101") {
                updateState("kioscoPersoData", prevData => ({
                    ...prevData,
                    alturaMicropuntos: calculateAlturaMicropuntos(),
                    microIzquierda: "-1",
                    microDerecha: "0"
                }));

            }
        }
    }, [orderXml]);

    const handleForm = (e) => {
        const { name, value } = e.target;

        updateState("kioscoPersoData", prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="kioscoPerso">
            {actividadFormFields.length > 0 && (
                <>
                    <hr className="separator" />
                    <div className="kioscoPersoForm">
                        {globalKioskForm.filter(field => actividadFormFields.includes(field.inputName)).map((field, index) => (
                            <div className={`formGroup ${(field.inputType === "checkbox" || field.inputType === "radioGroup") ? "formGroupRow" : ""}`} key={index}>
                                <FormGroup
                                    handleForm={handleForm}
                                    value={kioscoPersoData[field.inputName] || ""}
                                    field={field}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
            {clientFormFields.length > 0 && (
                <>
                    <hr className="separator" />
                    <div className="kioscoPersoForm">
                        {clientFormFields.length > 0 && globalKioskForm.filter(field => clientFormFields.includes(field.inputName)).map((field, index) => (
                            <div className={`formGroup ${(field.inputType === "checkbox" || field.inputType === "radioGroup") ? "formGroupRow" : ""}`} key={index}>
                                <FormGroup
                                    handleForm={handleForm}
                                    value={kioscoPersoData[field.inputName] || ""}
                                    field={field}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
            {orderXml?.numero?.cliente_codigo === "0022" && (
                <p className="kioscoPersoInfo">Para numeros de troquel 20.000, 50.000 y 80.000 usar marcas MASTERCUT</p>
            )}
            {(orderXml?.numero?.cliente_codigo === "0156" || orderXml?.numero?.cliente_codigo === "0038") && (
                <>
                    <p className="microVertical">Micropunto vertical</p>
                    <div className="verticalSwitches">
                        {colores.map(color => (
                            <div className="switchGroup" key={color}>
                                <Switch
                                    className="kioskSwitch"
                                    checked={kioscoPersoData.microVertical?.[color] || false}
                                    onClick={() => updateState("kioscoPersoData", prev => ({
                                        ...prev,
                                        microVertical: {
                                            ...prev.microVertical,
                                            [color]: !(prev.microVertical?.[color] || false)
                                        }
                                    }))}
                                />
                                <p>{color}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default KioscoPersoMontaje