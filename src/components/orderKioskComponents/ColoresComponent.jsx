import React, { useEffect, useState } from 'react'
import FormSection from '../formComponents/FormSection'

function ColoresComponent({ formData, colores, setColoresList, inputData, setInputData }) {    
    const handleForm = (e) => {
        const { name, type, value, checked } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        setInputData(prev => ({
            ...prev,
            [name]: newValue
        }));
    }

    useEffect(() => {
        setColoresList(
            Object.keys(inputData).filter(key => inputData[key])
                .map(key => {
                    const colorName = key.replace("_Digimark", "");
                    return colores.find(color => color === colorName);
                })
        )
    }, [inputData]);

    const selectAll = (e) => {
        const allSelected = formData.formFields.every(field => inputData[field.inputName]);

        const newInputData = {};
        formData.formFields.forEach(field => {
            newInputData[field.inputName] = !allSelected;
        });

        setInputData(prev => ({
            ...prev,
            ...newInputData
        }));
    }

    return (
        <div className="actionBody">
            {formData ? (
                <div className="formSections">
                {formData.formSections.map((section, index) => (
                    <div className="formSection" key={index}>
                        <button className="selectAll" onClick={selectAll}>
                            {formData.formFields.every(field => inputData[field.inputName]) ? "Deseleccionar Todo" : "Seleccionar Todo"}
                        </button>
                        <FormSection
                            sectionData={section}
                            formFields={formData.formFields}
                            inputData={inputData}
                            handleForm={handleForm}
                        />
                    </div>
                ))}
            </div>
            ) : <p className="noColors">Este pedido no tiene colores</p>}
        </div>
    )
}

export default ColoresComponent