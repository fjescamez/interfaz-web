import { sessionInfo } from "../../helpers/roleChecker";
import FormGroup from "./FormGroup";
import React from "react";

function FormSection({
    sectionData,
    formFields,
    disable,
    handleForm,
    inputData,
    fieldsData,
    fieldErrors,
    showIfCondition
}) {
    const sectionFields = formFields.filter(field =>
        sectionData.rows.some(row => row.groups.includes(field.htmlFor))
    );

    const roleDptUser = sessionInfo();

    const filterFields = (fields) =>
        fields.filter(field =>
            (!field.showIf || field.showIf({ showIfCondition, inputData })) &&
            (!field.visibleFor || field.visibleFor.some(item => roleDptUser.includes(item)))
        );

    const visibleSectionFields = filterFields(sectionFields);

    if (visibleSectionFields.length === 0) return null;

    return (
        <div className="formSection">
            {sectionData.title && <h2>{sectionData.title}</h2>}

            {sectionData.rows
                .filter(row =>
                    row.groups.some(group =>
                        formFields.some(field => field.htmlFor === group)
                    )
                )
                .map((row) => {
                    const rowFields = formFields.filter(field =>
                        row.groups.includes(field.htmlFor)
                    );

                    const visibleRowFields = filterFields(rowFields);

                    if (visibleRowFields.length === 0) return null;





                    return (
                        <React.Fragment key={row.title || row.groups?.join("-")}>
                            {row.title && (
                                <div className="rowTitle">
                                    <p>{row.title}</p>
                                </div>
                            )}

                            <div className={row.rowDisplay || "displayAuto"}>
                                {visibleRowFields.map((field, index) => (
                                    <div
                                        key={`${field.htmlFor}-${index}`}
                                        className={`formGroup ${(field.inputType === "checkbox" ||
                                            field.inputType === "radioGroup")
                                            ? "formGroupRow"
                                            : ""
                                            }`}
                                    >
                                        <FormGroup
                                            error={fieldErrors ? fieldErrors[field.inputName] : ""}
                                            value={
                                                inputData
                                                    ? inputData[field.inputName] ?? ""
                                                    : fieldsData
                                            }
                                            handleForm={handleForm}
                                            field={field}
                                            disable={disable}
                                            showIfCondition={showIfCondition}
                                            inputData={inputData}
                                        />
                                    </div>
                                ))}
                            </div>
                        </React.Fragment>
                    );
                })}
        </div>
    );
}

export default FormSection;