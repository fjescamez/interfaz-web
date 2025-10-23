import { useEffect, useState } from "react";
import { clientConfigFormData } from "../../helpers/formsData"
import GeneralForm from "./GeneralForm"
import { fetchData } from "../../helpers/fetchData";
import { notify } from "../../helpers/notify";
import { toast } from "../../../node_modules/react-toastify/dist/index";

function ClientConfigForm({ setModal, client, clientConfig }) {
    const [formData, setFormData] = useState(clientConfigFormData)
    const { code } = client;
    const { _id, email } = clientConfig || {};
    const { contactoDefault } = email || {};
    const [itemsData, setItemsData] = useState({
        ...clientConfig,
        contactoDefault: contactoDefault
    });

    useEffect(() => {
        const getContacts = async () => {            
            const contacts = await fetchData("contacts", "", 1, null, null, code);
            const groups = await fetchData("groups", "", 1, null, null, code);

            if ((contacts.length + groups.length) < 1) {
                return notify(toast.error, 'error', 'Error', 'Este cliente no tiene contactos');
            }

            const options = [];

            contacts.map(contact => {
                const nuevoContacto = { ...contact, textoOpcion: `${contact.contacto} (${contact.email})` };
                options.push(nuevoContacto);
            })

            groups.map(group => {
                const nuevoGrupo = { ...group, textoOpcion: group.grupo };
                options.push(nuevoGrupo);
            })

            setItemsData(prev => ({
                ...prev,
                contactoDefault: contactoDefault || options[0]
            }))

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
        }

        getContacts();
    }, []);

    return (
        <GeneralForm
            setModal={setModal}
            formData={formData}
            itemsData={itemsData}
            endpoint={"clientsConfig"}
            _id={_id}
        />
    )
}

export default ClientConfigForm