import { useEffect } from 'react';
import { filasCombinadoFormData } from '../../helpers/orderKioskActions'
import FormGroup from '../formComponents/FormGroup'

function FilasAndCombinadoComponent({
    updateState,
    state
}) {

    if (typeof updateState !== "function") return null;

    const handleForm = (e) => {
        const { name, value, type, checked } = e.target

        updateState("filasAndCombinar", prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    useEffect(() => {

        updateState("filasAndCombinar", prevData => ({
            ...prevData,
            filas: prevData?.filas ?? 1,
            archivo_pagina: prevData?.archivo_pagina ?? false,
        }))

    }, [])

    return (
        <div className="actionBody">
            <div className="montaje">
                <div className="kioscoPerso">
                    <div className="kioscoPersoForm">
                        {filasCombinadoFormData.formFields.map((field, index) => (
                            <div
                                className={`formGroup ${field.inputType === "checkbox" ||
                                        field.inputType === "radioGroup"
                                        ? "formGroupRow"
                                        : ""
                                    }`}
                                key={index}
                            >
                                <FormGroup
                                    handleForm={handleForm}
                                    value={state?.filasAndCombinar?.[field.inputName] ?? ""}
                                    field={field}
                                />
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default FilasAndCombinadoComponent