import FormGroup from "./FormGroup";

function FormSection({
    sectionData,
    formFields,
    disable,
    handleForm,
    inputData,
    fieldsData,
    fieldErrors
}) {

    return (
        <>
            <h2>{sectionData.title}</h2>
            {sectionData.rows.map((row) => (
                <div key={row.groups[0]} className={row.rowDisplay || "displayAuto"}>
                    {formFields.filter(field => row.groups.includes(field.htmlFor)).map((field, i) => (
                        <div key={field.htmlFor} className="formGroup">
                            <FormGroup
                                error={fieldErrors ? fieldErrors[field.inputName] : ""}
                                value={inputData ? inputData[field.inputName] ?? "" : fieldsData}
                                handleForm={handleForm}
                                field={field}
                                disable={disable}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}

export default FormSection