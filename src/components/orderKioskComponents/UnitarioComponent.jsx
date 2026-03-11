import { useEffect, useState } from "react";
import { unitarioFormData } from "../../helpers/orderKioskActions";
import FormSection from "../formComponents/FormSection";
import FormGroup from "../formComponents/FormGroup";

function UnitarioComponent({ unitarios, unitarioData, setUnitarioData, order }) {
    const [formData, setFormData] = useState(unitarioFormData);

    const handleForm = (e) => {
        const { name, value } = e.target;

        const updatedData = { ...unitarioData, [name]: value };

        setUnitarioData(updatedData);
    };

    const opciones = unitarios.map(unitario => ({
        ...unitario,
        textoOpcion: `${unitario.name} - ${unitario.type}`
    }));

    useEffect(() => {
        if (unitarios.length > 0) {
            setFormData(prev => ({
                ...prev,
                formFields: prev.formFields.map(field => {
                    if (field.inputName === "archivo") {
                        return {
                            ...field,
                            options: [{}, ...opciones]
                        }
                    }
                    return field;
                })
            }));
        }
    }, [unitarios]);

    return (
        <div className="actionBody">
            {formData.formFields.map((field, index) => (
                <div className="formGroup" key={index}>
                    <FormGroup
                        value={unitarioData ? unitarioData[field.inputName] ?? "" : ""}
                        handleForm={handleForm}
                        field={field}
                    />
                </div>
            ))}
        </div>
    )
}

export default UnitarioComponent