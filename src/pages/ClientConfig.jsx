import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { fetchData, fetchDataNoLimits, fetchOneItem } from '../helpers/fetchData';
import { useTabs } from '../context/TabsContext';
import DetailsHeader from '../components/DetailsHeader';
import { clientConfigFormData } from '../helpers/formsData';
import FormSection from '../components/formComponents/FormSection';
import ClientConfigForm from '../components/formComponents/ClientConfigForm';
import { notify } from '../helpers/notify';
import { useLocation } from "react-router-dom";
import { BlinkBlur } from "react-loading-indicators";

function ClientConfig({ toggleKiosk }) {
    const [client, setClient] = useState({});
    const [formData, setFormData] = useState(clientConfigFormData);
    const [clientConfig, setClientConfig] = useState({});
    const [contactos, setContactos] = useState([]);
    const [itemsData, setItemsData] = useState({});
    const [editPopup, setEditPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [contactsLoaded, setContactsLoaded] = useState(false);
    const [configLoaded, setConfigLoaded] = useState(false);
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
        } else {
            setClientConfig({});
        }
        setConfigLoaded(true);
    }

    const getContacts = async () => {
        const contacts = await fetchData("contacts", "", 1, null, null, client.code);
        const groups = await fetchData("groups", "", 1, null, null, client.code);

        if ((contacts.length + groups.length) < 1) {
            notify('warning', 'Aviso', 'Este cliente no tiene contactos');
            setContactsLoaded(true);
            return;
        }

        const options = [{ _id: "Por defecto", textoOpcion: "Por defecto" }];

        contacts.map(contact => {
            const nuevoContacto = { ...contact, textoOpcion: `${contact.contacto} (${contact.email})` };
            options.push(nuevoContacto);
        })

        groups.map(group => {
            const nuevoGrupo = { ...group, textoOpcion: group.grupo };
            options.push(nuevoGrupo);
        })

        setContactos(options);
        setContactsLoaded(true);

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

    const getPlantillas = async () => {
        const plantillas = await fetchDataNoLimits("clientConfig/plantillas");

        setFormData(prev => ({
            ...prev,
            formFields: prev.formFields.map(field => {
                if (field.htmlFor === "nombrePlantillaBoceto" || field.htmlFor === "nombrePlantillaFicha") {
                    return {
                        ...field,
                        options: [
                            "",
                            ...plantillas.results
                        ]
                    }
                }
                return field
            })
        }));
    }

    useEffect(() => {
        setLoading(true);
        setContactsLoaded(false);
        setConfigLoaded(false);
        getClientDetails();
        getPlantillas();
    }, [id]);

    useEffect(() => {
        if (client._id) {
            setConfigLoaded(false);
            setContactsLoaded(false);
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
        setItemsData(prev => ({
            ...prev,
            contactoDefault: clientConfig.configuraciones?.email?.contactoDefault || contactos[0],
            bocetoRasterizado: clientConfig.configuraciones?.boceto?.bocetoRasterizado || true,
            plantillaBoceto: clientConfig.configuraciones?.boceto?.plantillaBoceto || "",
            anchoPlantillaBoceto: clientConfig.configuraciones?.boceto?.anchoPlantillaBoceto || "",
            altoPlantillaBoceto: clientConfig.configuraciones?.boceto?.altoPlantillaBoceto || "",
            nombrePlantillaBoceto: clientConfig.configuraciones?.boceto?.nombrePlantillaBoceto || "",
            cajaReferenciaBoceto: clientConfig.configuraciones?.boceto?.cajaReferenciaBoceto || "",
            fichaRasterizada: clientConfig.configuraciones?.ficha?.fichaRasterizada || true,
            plantillaFicha: clientConfig.configuraciones?.ficha?.plantillaFicha || "",
            anchoPlantillaFicha: clientConfig.configuraciones?.ficha?.anchoPlantillaFicha || "",
            altoPlantillaFicha: clientConfig.configuraciones?.ficha?.altoPlantillaFicha || "",
            nombrePlantillaFicha: clientConfig.configuraciones?.ficha?.nombrePlantillaFicha || "",
            cajaReferenciaFicha: clientConfig.configuraciones?.ficha?.cajaReferenciaFicha || "",
            compensacionCorte: clientConfig.configuraciones?.montaje?.compensacionCorte || 0,
            marcaMontaje: clientConfig.configuraciones?.montaje?.marcaMontaje || "",
            caidasFreecut: clientConfig.configuraciones?.montaje?.caidasFreecut || "COMPLETO",
            certificadoControl: clientConfig.configuraciones?.documentacion?.certificadoControl || false,
            certificadoContinuos: clientConfig.configuraciones?.documentacion?.certificadoContinuos || false,
            certificadoCodigos: clientConfig.configuraciones?.documentacion?.certificadoCodigos || false,
            unitarioPng: clientConfig.configuraciones?.documentacion?.unitarioPng || false,
        }));
    }, [clientConfig]);

    useEffect(() => {
        if (configLoaded && contactsLoaded) {
            setLoading(false);
        }
    }, [configLoaded, contactsLoaded]);

    return (
        <>
            <div className="detailsContainer">
                {loading ? (
                    <div className="executingContainer">
                        <BlinkBlur variant="dotted" color="var(--highlight)" size="large" speedPlus="0" />
                        <h1>Cargando</h1>
                    </div>
                ) : (
                    <>
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
                        <div className="detailsScroll">
                            <div className="formSections">
                                {formData.formSections.map((section) => (
                                    <FormSection
                                        sectionData={section}
                                        formFields={formData.formFields}
                                        inputData={itemsData}
                                        disable={true}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {editPopup && <ClientConfigForm setModal={setEditPopup} client={client} itemsData={itemsData} setItemsData={setItemsData} formData={formData} />}
            </div>
        </>
    )
}

export default ClientConfig
