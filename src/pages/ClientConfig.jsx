import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { fetchData, fetchOneItem } from '../helpers/fetchData';
import { useTabs } from '../context/TabsContext';
import DetailsHeader from '../components/DetailsHeader';
import { clientConfigFormData } from '../helpers/formsData';
import FormSection from '../components/formComponents/FormSection';
import ClientConfigForm from '../components/formComponents/ClientConfigForm';
import { notify } from '../helpers/notify';
import { useLocation } from "react-router-dom";

function ClientConfig({ toggleKiosk }) {
    const [client, setClient] = useState({});
    const [formData, setFormData] = useState(clientConfigFormData);
    const [clientConfig, setClientConfig] = useState({});
    const [contactos, setContactos] = useState([]);
    const [itemsData, setItemsData] = useState({});
    const [editPopup, setEditPopup] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { closeTab } = useTabs();
    const location = useLocation();

    const getClientDetails = async () => {
        const clientData = await fetchOneItem("clients", id);

        if (!clientData) {
            closeTab(location.pathname);
            navigate("/clientes");
            return;
        };
        setClient(clientData.results);
    };

    const getClientConfig = async () => {
        const configData = await fetchData("clientConfig", client._id);
        if (configData) {
            setClientConfig(configData);
        }
    }

    const getContacts = async () => {
        const contacts = await fetchData("contacts", "", 1, null, null, client.code);
        const groups = await fetchData("groups", "", 1, null, null, client.code);

        if ((contacts.length + groups.length) < 1) {
            notify('warning', 'Aviso', 'Este cliente no tiene contactos');
            return;
        }

        const options = [{ _id: "1", textoOpcion: "Por defecto" }];

        contacts.map(contact => {
            const nuevoContacto = { ...contact, textoOpcion: `${contact.contacto} (${contact.email})` };
            options.push(nuevoContacto);
        })

        groups.map(group => {
            const nuevoGrupo = { ...group, textoOpcion: group.grupo };
            options.push(nuevoGrupo);
        })

        setContactos(options);

        setItemsData(prev => ({
            ...prev,
            contactoDefault: clientConfig.configuraciones?.email?.contactoDefault || options[0]._id
        }))

        setFormData(prev => ({
            ...prev,
            formFields: prev.formFields.map(field => {
                if (field.htmlFor === "contactoDefault") {
                    return {
                        ...field,
                        options
                    }
                }
                return field
            })
        }));
    }

    useEffect(() => {
        getClientDetails();
    }, [id]);

    useEffect(() => {
        if (client._id) {
            getClientConfig();
            getContacts();
            setItemsData(prev => ({
                ...prev,
                cliente_id: client._id || ""
            }));
        }
    }, [client]);

    useEffect(() => {
        if (clientConfig.cliente_id && contactos.length > 0) {
            setItemsData(prev => ({
                ...prev,
                cliente_id: clientConfig.cliente_id || "",
                contactoDefault: clientConfig.configuraciones?.email?.contactoDefault || {}
            }));
        }
    }, [clientConfig, contactos]);

    useEffect(() => {
        if (clientConfig.configuraciones?.email?.contactoDefault) {
            setItemsData(prev => ({
                ...prev,
                contactoDefault: clientConfig.configuraciones.email.contactoDefault
            }));
        }
    }, [clientConfig]);

    return (
        <>
            <div className="detailsContainer">
                <DetailsHeader
                    title={client.name}
                    subtitle={"(Configuración)"}
                    avatar={client.avatar}
                    endPoint={"clients"}
                    id={id}
                    toggleKiosk={toggleKiosk}
                    kioskData={client}
                    hideDeleteIcon={true}
                    setEditPopup={setEditPopup}
                />
                {editPopup && <ClientConfigForm setModal={setEditPopup} client={client} itemsData={itemsData} setItemsData={setItemsData} formData={formData} />}
                <div className="detailsScroll">
                    <div className="formSections">
                        {formData.formSections.map((section) => (
                            <div key={section.title} className="formSection">
                                <FormSection
                                    sectionData={section}
                                    formFields={formData.formFields}
                                    inputData={itemsData}
                                    disable={true}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientConfig
