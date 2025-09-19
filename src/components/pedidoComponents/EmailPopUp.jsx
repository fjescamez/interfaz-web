import { useEffect, useState } from 'react'
import { fetchData, postData } from '../../helpers/fetchData'
import GeneralForm from '../formComponents/GeneralForm';
import { emailFormData } from '../../helpers/formsData';
import ExecutingComponent from '../ExecutingComponent';
import { notify } from '../../helpers/notify';
import { toast } from 'react-toastify';

function EmailPopUp({ setEmailModal, fullOrder }) {
    const { id_pedido, xml } = fullOrder;
    const { cliente_codigo } = xml.numero;
    const [formData, setFormData] = useState(emailFormData);
    const [para, setPara] = useState(false);
    const [adjuntos, setAdjuntos] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [itemsData, setItemsData] = useState({
        id_pedido
    });

    const getTemplate = async () => {
        const data = {
            extraInputs: {
                id_pedido,
                xml
            }
        }
        const response = await postData("email/getTemplate", data);
        setItemsData(prev => ({
            ...prev,
            asunto: response.asunto,
            responder: response.responder
        }))
    };

    const getPara = async () => {
        if ((contacts.length + groups.length) < 1) {
            setIsExecuting(false);
            setEmailModal(false);
            return notify(toast.error, 'error', 'Error', 'Este cliente no tiene contactos');
        }
        
        const contacts = await fetchData("contacts", "", 1, null, null, cliente_codigo);
        const groups = await fetchData("groups", "", 1, null, null, cliente_codigo);

        const options = [];

        contacts.map(contact => {
            const nuevoContacto = { ...contact, textoOpcion: contact.contacto };
            options.push(nuevoContacto);
        })

        groups.map(group => {
            const nuevoGrupo = { ...group, textoOpcion: group.grupo };
            options.push(nuevoGrupo);
        })

        setFormData(prev => ({
            ...prev,
            formFields: prev.formFields.map(field => {
                if (field.htmlFor === "contacto") {
                    return {
                        ...field,
                        options
                    }
                }
                return field
            })
        }));
        setPara(true);
    }

    const getAdjuntos = async () => {
        const adjuntos = await fetchData("files", id_pedido, 1);

        const options = [];
        if (adjuntos.length > 0) {
            adjuntos.map(adjunto => {
                const nuevoAdjunto = { ...adjunto, textoOpcion: adjunto.id_archivo };
                options.push(nuevoAdjunto);
            })
        }

        setFormData(prev => ({
            ...prev,
            formFields: prev.formFields.map(field => {
                if (field.htmlFor === "adjuntos") {
                    return {
                        ...field,
                        options
                    }
                }
                return field
            })
        }));
        setAdjuntos(true);
    }

    /* DATOS EN EMAIL TAREA_PLATAFORMA_2022

        asunto: "99972-4 PASION FATAL"
        responder: "Adjuntamos documentación solicitada referente a nuestro pedido 99972-4 PASION FATAL."
        configEmail: {
        id_pedido: "99972-4",
        asunto: "99972-4 PASION FATAL",
        adjuntos: [
            {
                id_archivo: "",
                archivo: ""
            }
        ],
        responder: "Adjuntamos documentación solicitada referente a nuestro pedido 99972-4 PASION FATAL.",
        contacto: {
                _id: 642cc82db1670000900272cd,
                contacto: "Antonio Costa S.L.",
                cliente_codigo: "0009",
                departamento: "",
                email: "costaehijossl@hotmail.com",
                telefono: "966743342"
            }
        }
    */

    useEffect(() => {
        setIsExecuting(true);
        getTemplate();
        getPara();
        getAdjuntos();
    }, [])

    return (
        <>
            {(itemsData.asunto && itemsData.responder && para && adjuntos) ?
                <GeneralForm
                    setModal={setEmailModal}
                    formData={formData}
                    itemsData={itemsData}
                    endpoint={"email/sendEmail"}
                />
                :
                isExecuting && <ExecutingComponent message={"Cargando plantilla"} />
            }
        </>
    )
}

export default EmailPopUp