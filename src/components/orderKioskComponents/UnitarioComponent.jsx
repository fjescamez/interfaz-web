import { useEffect, useState } from "react";
import { unitarioFormData } from "../../helpers/orderKioskActions";
import FormSection from "../formComponents/FormSection";

function UnitarioComponent({ unitarios, unitarioData, setUnitarioData, order }) {
    const [formData, setFormData] = useState(unitarioFormData);

    const handleForm = (e) => {
        const { name, value } = e.target;

        setUnitarioData(prev => ({
            ...prev,
            [name]: value
        }));
    }

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
            <div className="formSections">
                {formData.formSections.map((section, sectionIndex) => (
                    <div className="formSection" key={sectionIndex}>
                        <FormSection
                            sectionData={section}
                            formFields={formData.formFields}
                            inputData={unitarioData}
                            handleForm={handleForm}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UnitarioComponent