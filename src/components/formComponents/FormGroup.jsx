import React from "react";
import ChosenSelect from "./ChosenSelect"

const FormGroup = React.memo(function FormGroup({
    handleForm,
    value,
    error,
    field,
    disable
}) {
    const { htmlFor,
        labelId,
        labelTitle,
        inputType,
        textarea,
        select,
        options,
        inputId,
        inputName,
        minLength,
        disableField,
        hideField } = field;
    return (
        <>
            {!hideField &&
                <>
                    {(!inputType || (inputType && inputType !== "checkbox")) &&
                        <label
                            htmlFor={htmlFor}
                            id={labelId}
                            className={error ? "errorLabel" : "" + inputType === "radio" ? "radioLabel" : ""}
                        >
                            {`${labelTitle}:`}
                        </label>
                    }
                    {(inputType && inputType !== "radio") &&
                        <input
                            type={inputType}
                            id={inputId}
                            name={inputName}
                            placeholder={(disable || disableField) ? "" : (minLength ? `Mínimo ${minLength} caracteres` : `Introducir ${labelTitle}`)}
                            onChange={handleForm}
                            value={value}
                            className={error ? "error" : "" + inputType === "checkbox" ? "checkInput" : ""}
                            autoComplete="on"
                            disabled={disable ? disable : disableField}
                        />
                    }
                    {(inputType && inputType === "checkbox") &&
                        <label
                            htmlFor={htmlFor}
                            id={labelId}
                            className={error ? "errorLabel" : "" + inputType === "checkbox" ? "checkLabel" : ""}
                        >
                            {`${labelTitle}`}
                        </label>
                    }
                    {inputType === "radio" &&
                        <input
                            type="radio"
                            id={inputId}
                            name={inputName}
                            onChange={handleForm}
                            value={inputId}
                            autoComplete="on"
                            disabled={disable ? disable : disableField}
                        />
                    }
                    {textarea &&
                        <textarea
                            id={inputId}
                            name={inputName}
                            placeholder={(disable || disableField) ? "" : `Introduzca el contenido de ${labelTitle}`}
                            onChange={handleForm}
                            value={value}
                            className={error ? "error" : ""}
                            disabled={disable}
                        />
                    }
                    {select === "simple" &&
                        <ChosenSelect
                            options={options}
                            name={inputName}
                            onChange={handleForm}
                            value={value}
                            className={error ? "error" : ""}
                            disabled={disable ? disable : disableField}
                        />
                    }
                    {select === "multiple" &&
                        <ChosenSelect
                            options={options}
                            name={inputName}
                            onChange={handleForm}
                            value={value}
                            multiple
                            className={error ? "error" : ""}
                            disabled={disable ? disable : disableField}
                        />
                    }
                </>
            }
        </>
    )
});

export default FormGroup;