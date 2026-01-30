import React from "react";
import ChosenSelect from "./ChosenSelect"
import Switch from "@mui/material/Switch";

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
        radioButtons,
        textarea,
        select,
        options,
        inputId,
        inputName,
        minLength,
        disableField,
        hideField,
        minNumber,
        maxNumber,
        noDecimals
    } = field;

    return (
        <>
            {!hideField &&
                <>
                    {(labelId && (!inputType || (inputType && inputType !== "checkbox"))) &&
                        <label
                            htmlFor={htmlFor}
                            id={labelId}
                            className={error ? "errorLabel" : "" + inputType === "radioGroup" ? "fullLabel" : ""}
                        >
                            {`${labelTitle}:`}
                        </label>
                    }
                    {(inputType && (inputType !== "radioGroup" && inputType !== "checkbox")) &&
                        <input
                            type={inputType}
                            id={inputId}
                            name={inputName}
                            placeholder={(disable || disableField) ? "" : (minLength ? `Mínimo ${minLength} caracteres` : `Introducir ${labelTitle}`)}
                            onChange={handleForm}
                            value={value}
                            className={error ? "error" : "" + inputType === "checkbox" ? "checkInput" : ""}
                            autoComplete="on"
                            min={minNumber}
                            max={maxNumber}
                            step={(inputType === "number" && !noDecimals) ? "0.01" : undefined}
                            disabled={disable || disableField}
                        />
                    }
                    {(inputType && inputType === "radioGroup") &&
                        <div className="radioGroup">
                            {radioButtons.map((radioButton) => (
                                <div key={radioButton.inputId}>
                                    <input
                                        type="radio"
                                        id={radioButton.inputId}
                                        name={radioButton.inputName}
                                        value={radioButton.inputId}
                                        checked={value === radioButton.inputId}
                                        onChange={handleForm}
                                        disabled={disable || disableField}
                                    />
                                    <label
                                        htmlFor={radioButton.inputId}
                                        className="noStyleLabel"
                                    >
                                        {radioButton.labelTitle}
                                    </label>
                                </div>
                            ))}
                        </div>
                    }
                    {(inputType && inputType === "checkbox") &&
                        <>
                            {/* <input
                                type="checkbox"
                                id={inputId}
                                name={inputName}
                                checked={!!value}
                                onChange={(e) =>
                                    handleForm({ target: { name: inputName, value: e.target.checked } })
                                }
                                readOnly={disable || disableField}
                            /> */}
                            <Switch className="formSwitch"
                                checked={value}
                                onClick={handleForm ? () =>
                                    handleForm({ target: { name: inputName, value: !value } })
                                    : undefined
                                }
                                readOnly={disable || disableField}
                            />
                        </>
                    }
                    {(labelId && inputType && inputType === "checkbox") &&
                        <label
                            htmlFor={htmlFor}
                            id={labelId}
                            className={error ? "errorLabel" : "" + inputType === "checkbox" ? "fullLabel" : ""}
                            onClick={() =>
                                handleForm({ target: { name: inputName, value: !value } })
                            }
                        >
                            {labelTitle}
                        </label>
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
                            disabled={disable || disableField}
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
                            disabled={disable || disableField}
                        />
                    }
                </>
            }
        </>
    )
});

export default FormGroup;