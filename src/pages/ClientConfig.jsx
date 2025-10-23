import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { fetchOneItem } from '../helpers/fetchData';
import { useTabs } from '../context/TabsContext';
import DetailsHeader from '../components/DetailsHeader';
import { clientConfigFormData } from '../helpers/formsData';
import FormSection from '../components/formComponents/FormSection';
import ClientConfigForm from '../components/formComponents/ClientConfigForm';

function ClientConfig({ toggleKiosk }) {
    const [client, setClient] = useState({});
    const [clientConfig, setClientConfig] = useState({});
    const [editPopup, setEditPopup] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { closeTab } = useTabs();

    useEffect(() => {
        const getClientDetails = async () => {
            const clientData = await fetchOneItem("clients", id);

            if (!clientData) {
                closeTab(location.pathname);
                navigate("/clientes");
                return;
            };
            setClient(clientData.results);
        }
        getClientDetails();
    }, [id]);

    return (
        <>
            <div className="detailsContainer">
                <DetailsHeader
                    title={client.name}
                    subtitle={"Configuración"}
                    avatar={client.avatar}
                    endPoint={"clients"}
                    id={id}
                    toggleKiosk={toggleKiosk}
                    kioskData={client}
                    hideDeleteIcon={true}
                    setEditPopup={setEditPopup}
                />
                {editPopup && <ClientConfigForm setModal={setEditPopup} client={client} clientConfig={clientConfig} />}
                <div className="detailsScroll">
                    <div className="formSections">
                        {clientConfigFormData.formSections.map((section) => (
                            <div key={section.title} className="formSection">
                                <FormSection
                                    sectionData={section}
                                    formFields={clientConfigFormData.formFields}
                                    inputData={clientConfig}
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
