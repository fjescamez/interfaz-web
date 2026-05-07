import { useEffect, useState } from 'react'
import { globalKioskBocetoForm } from './kioscoPersoConfig'
import FormGroup from '../formComponents/FormGroup'

function KioscoPersoBoceto({
    orderXml,
    kioscoPersoBocData,
    updateState,
    colores,
    state
}) {

    const [renderizar, setRenderizar] = useState(false);

    if (typeof updateState !== "function") return null;

    useEffect(() => {
        updateState("isActive", prev => ({
            ...prev,
            kioscoPersoBoc: true
        }));

        if (orderXml?.numero?.cliente_codigo) {
            const cliente_codigo = orderXml.numero.cliente_codigo;

            if (cliente_codigo === "0101" && state?.unitarioMetadata?.number_of_pages > 1) {
                setRenderizar(true);
                updateState("kioscoPersoBocData", prevData => ({
                    ...prevData,
                    filas: 1,
                }));
            }
        }
    }, [orderXml])

    const handleForm = (e) => {
        const { name, value, type, checked } = e.target

        updateState("kioscoPersoBocData", prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const fieldsToRender = globalKioskBocetoForm.filter(field =>
        !field.showIf || field.showIf({ state })
    )

    if (!renderizar) return;

    return (
        <div className="kioscoPerso">
            {fieldsToRender.length > 0 && (
                <>
                    <hr className="separator" />
                    <div className="kioscoPersoForm">
                        {fieldsToRender.map((field, index) => (
                            <div
                                className={`formGroup ${(field.inputType === "checkbox" || field.inputType === "radioGroup") ? "formGroupRow" : ""}`}
                                key={index}
                            >
                                <FormGroup
                                    handleForm={handleForm}
                                    value={kioscoPersoBocData[field.inputName] ?? ""}
                                    field={field}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default KioscoPersoBoceto