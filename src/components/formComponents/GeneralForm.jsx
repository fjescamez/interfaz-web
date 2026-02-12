import { useCallback, useEffect, useState } from "react";
import { notify } from "../../helpers/notify";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { postData, updateData } from "../../helpers/fetchData";
import FormSection from "./FormSection";
import ExecutingComponent from "../ExecutingComponent";
import { addKeyListener } from "../../helpers/toggleModal";

function GeneralForm({
    setModal,
    formData,
    itemsData,
    endpoint,
    setTableData,
    setTotal,
    mode,
    setMode,
    _id,
    setData,
    tableSelection,
    clienteDato,
    onInputChange,
    submitText,
    extras,
    noSubmit,
    afterSubmit,
    clickableSections,
    onClickSection
}) {
    const { headerIcon, headerTitle, editTitle, formFields, clientsMap, codesMap } = formData;
    const [errorMessage, setErrorMessage] = useState(false);
    const [executing, setExecuting] = useState(false);
    const [error, setError] = useState("");
    const [inputData, setInputData] = useState(itemsData || {});

    useEffect(() => {
        const cleanup = addKeyListener(setModal);
        return cleanup;
    }, []);

    const requiredFields = formFields.reduce((acc, field) => {
        if (field.required) acc[field.inputName] = !field.required;
        return acc;
    }, {});

    const [fieldErrors, setFieldErrors] = useState(requiredFields);

    const minLengths = formFields.reduce((acc, field) => {
        if (field.minLength) acc[field.inputName] = field.minLength;
        return acc;
    }, {});

    useEffect(() => {
        setInputData(itemsData || {});
    }, [itemsData]);

    const handleForm = useCallback((e) => {
        const { name, type, value, checked } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        if (name === "departments" && !value) {
            newValue = [];
        }

        if (name === "cliente_nombre" && clientsMap) {
            const codigo = clientsMap[value] || "";
            setInputData(prev => ({
                ...prev,
                cliente_nombre: newValue,
                cliente_codigo: codigo
            }))
        } else if (name === "cliente_codigo" && codesMap) {
            const clienteNombre = codesMap[value] || "";
            setInputData(prev => ({
                ...prev,
                cliente_nombre: clienteNombre,
                cliente_codigo: value
            }));
        } else {
            setInputData(prev => {
                const updated = { ...prev, [name]: newValue };

                if (onInputChange) {
                    onInputChange(updated);
                }
                return updated;
            });
        }

        if (mode === "edit" && name === "password" && !value) {
            setFieldErrors(prev => ({
                ...prev,
                [name]: false
            }));
            return;
        }
    }, [clientsMap, codesMap, mode, onInputChange]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        { afterSubmit && afterSubmit() }

        if (tableSelection && tableSelection.length < 1) {
            notify('error', 'Error', 'Debe seleccionar algún elemento de la tabla.');
            return;
        }

        const newFieldErrors = Object.keys(requiredFields).reduce((acc, fieldName) => {
            const value = inputData[fieldName] || "";
            let error = false;

            if (!(mode === "edit" && fieldName === "password" && !value)) {
                if (formFields.find(f => f.inputName === fieldName)?.required && !value) {
                    error = true;
                }
                if (minLengths[fieldName] && value.length < minLengths[fieldName]) {
                    error = true;
                }
            }

            acc[fieldName] = error;
            return acc;
        }, {});

        setFieldErrors(newFieldErrors);

        if (Object.values(newFieldErrors).some(error => error)) {
            setError("LOS CAMPOS MARCADOS SON OBLIGATORIOS O NO CUMPLEN LA LONGITUD MÍNIMA");
            setErrorMessage(true);
            return;
        }

        setExecuting(true);

        // Usar directamente el estado inputData para enviar los datos
        let dataToSend = { ...inputData };

        if (tableSelection) {
            dataToSend = {
                ...dataToSend,
                ids: tableSelection || []
            }
        }

        if (mode === "edit" && dataToSend.password === "") {
            delete dataToSend.password; // No enviar la contraseña si es edición y el campo está vacío
        }

        let result = {};

        if (mode === "edit") {
            result = await updateData(endpoint, dataToSend, _id);
        } else {
            result = await postData(endpoint, dataToSend);
        }

        if (result && result.status === "success") {
            setExecuting(false);
            notify(result.status, result.title, result.message);
            setModal(false);
            setError("");
            if (setMode) setMode("");
        } else {
            setExecuting(false);
            notify(result.status, result.title, result.message);
        }

        if (result.allItems) {
            setTableData(result.allItems);
        } else if (result.newItem) {
            setTableData(prev => [result.newItem, ...prev]);
            if (setTotal) {
                setTotal(prev => prev + 1);
            }
        } else if (result.updatedItem) {
            if (setTableData) {
                setTableData(prev =>
                    prev.map(obj =>
                        (obj._id === result.updatedItem._id || obj.id === result.updatedItem.id)
                            ? { ...obj, ...inputData, _id: result.updatedItem._id }
                            : obj
                    )
                );
            }
            if (setData) {
                setData(prev => (
                    { ...prev, ...inputData, _id: result.updatedItem._id }
                ))
            }
        } else if (result.updatedItems) {
            setTableData(prev => {
                return prev.map(item => {
                    const updatedItem = result.updatedItems.find(updated => updated._id === item._id);
                    return updatedItem ? { ...updatedItem } : item;
                });
            });
        }

        if (result.total) {
            setTotal(result.total);
        }
    };

    return (
        <>
            {executing && <ExecutingComponent />}
            <>
                <div className="overlay"></div>
                <div className="formContainer">
                    <div className="formHeaderBackground">
                        <div className="formHeader">
                            {headerIcon}
                            <h1>{mode === "edit" ? editTitle : headerTitle}</h1>
                            <button onClick={() => {
                                setModal(false);
                                if (setMode) setMode("");
                            }}>
                                <IoMdCloseCircleOutline className="close" />
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        <form onSubmit={handleSubmit}>
                            <div className="formSections">
                                {extras && extras}
                                {formData.formSections.map((section, index) => (
                                    <div key={index} className={`formSection ${clickableSections && clickableSections.includes(section) ? "clickable" : ""}`} onClick={() => onClickSection && clickableSections.includes(section) ? onClickSection(section) : null}>
                                        <FormSection
                                            fieldErrors={fieldErrors}
                                            sectionData={section}
                                            formFields={formData.formFields}
                                            fieldsData={itemsData}
                                            handleForm={handleForm}
                                            inputData={inputData}
                                            disable={!!clienteDato && !!section.disableIfFilter}
                                        />
                                    </div>
                                ))}
                            </div>
                            {errorMessage && (
                                <div className="errorMessage">{error}</div>
                            )}
                            {!noSubmit && <button type="submit">{submitText || "Guardar"}</button>}
                        </form>
                        <div className="filler"></div>
                    </div>
                </div>
            </>
        </>
    );
}

export default GeneralForm