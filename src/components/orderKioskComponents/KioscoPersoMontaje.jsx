import { useEffect, useState } from 'react'
import { globalKioskForm, globalKioskVariables } from './kioscoPersoConfig'
import FormGroup from '../formComponents/FormGroup';
import Switch from "@mui/material/Switch";

function KioscoPersoMontaje({ orderXml, kioscoPersoData, updateState, colores, configAvanzadaData }) {
    const [clientFormFields, setClientFormFields] = useState(Object.keys(globalKioskVariables).filter(key =>
        globalKioskVariables[key].includes(orderXml.numero.cliente_codigo)
    ));

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
        }
    }, [orderXml]);

    useEffect(() => {
        if (orderXml?.numero?.cliente_codigo) {
            const cliente_codigo = orderXml.numero.cliente_codigo;
            if (cliente_codigo === "0101") {
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

                updateState("kioscoPersoData", prevData => ({
                    ...prevData,
                    alturaMicropuntos,
                    microIzquierda: -1,
                    microDerecha: 0
                }));
            }
        }
    }, [orderXml, configAvanzadaData]);

    const handleForm = (e) => {
        const { name, value } = e.target;

        updateState("kioscoPersoData", prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="kioscoPerso">
            <hr className="separator" />
            <div className="kioscoPersoForm">
                {globalKioskForm.filter(field => clientFormFields.includes(field.inputName)).map((field, index) => (
                    <div className={`formGroup ${(field.inputType === "checkbox" || field.inputType === "radioGroup") ? "formGroupRow" : ""}`} key={index}>
                        <FormGroup
                            handleForm={handleForm}
                            value={kioscoPersoData[field.inputName] || 0}
                            field={field}
                        />
                    </div>
                ))}
            </div>
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