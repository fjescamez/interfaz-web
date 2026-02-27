import { useEffect, useState } from 'react'
import GeneralForm from './GeneralForm'
import { traceTextForm } from '../../helpers/formsData';
import { postData } from '../../helpers/fetchData';

function TraceTextForm({ setModal, rutaInfo }) {
    const [formData, setFormData] = useState(traceTextForm);
    const [itemsData, setItemsData] = useState({});
    const [files, setFiles] = useState([]);

    const getFiles = async () => {
        const files = await postData("tasks/getTraceTextFiles", { rutaInfo });
        setFiles(files.map(file => ({ id: file.url, textoOpcion: file.file })));

        if (files && files.length > 0) {
            setFormData(prev => {
                return {
                    ...prev,
                    formFields: prev.formFields.map(field => {
                        if (field.htmlFor === "traceTextFiles") {
                            return {
                                ...field,
                                options: files.map(file => ({ id: file.url, textoOpcion: file.file }))
                            }
                        }
                        return field;
                    })
                }
            });
        }
    }

    useEffect(() => {
        getFiles();
    }, []);

    const adjuntarTodo = () => {
        setItemsData(prev => ({
            ...prev,
            traceTextFiles: files
        }))
    }

    const desadjuntarTodo = () => {
        setItemsData(prev => ({
            ...prev,
            traceTextFiles: []
        }))
    }

    return (
        <GeneralForm
            formData={formData}
            setModal={setModal}
            itemsData={itemsData}
            endpoint={"tasks/traceText"}
            submitText={"Lanzar tarea"}
            bigForm={true}
            extras={
                itemsData.traceTextFiles && itemsData.traceTextFiles.length === files.length ? (
                    <button type="button" onClick={desadjuntarTodo}>Quitar todo</button>
                ) : (
                    <button type="button" onClick={adjuntarTodo}>Añadir todo</button>
                )
            }
        />
    )
}

export default TraceTextForm