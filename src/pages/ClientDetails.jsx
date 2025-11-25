import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTabs } from "../context/TabsContext";
import { clientsDetails } from "../helpers/detailsGrid";
import ClientForm from "../components/formComponents/ClientForm";
import DetailsHeader from "../components/DetailsHeader";
import { fetchOneItem } from "../helpers/fetchData";
import GridComponent from "../components/GridComponent";
import { clientFormData } from "../helpers/formsData";
import FormSection from "../components/formComponents/FormSection";
import { useClienteFilter } from "../context/ClientFilterContext";

function ClientDetails({ toggleKiosk }) {
    const [client, setClient] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { closeTab, tabs, setTabs } = useTabs();
    const { grid } = clientsDetails;
    const [editPopup, setEditPopup] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const { setClienteCodigos, setClienteDatos } = useClienteFilter();

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

    const clientClick = (key) => {
        const pathname = location.pathname === '/home' ? '' : location.pathname;
        const path = `${pathname}/${key}`;
        //const path = `${location.pathname}/${key}`;

        const tabTitle = `${client?.name} | ${key.toUpperCase()}`;

        if (!tabs.some(tab => tab.path === path)) {
            if (client.company) {
                setClienteCodigos(prev => ({ ...prev, [path]: client.code }));
                setClienteDatos(prev => ({ ...prev, [path]: client }));
            }

            setTabs(prev => {
                if (prev.some(tab => tab.path === path)) return prev;
                return [...prev, { path, title: tabTitle }];
            });
        }
        navigate(path);
    };

    return (
        <>
            <div className="detailsContainer">
                <DetailsHeader
                    title={client.name}
                    subtitle={client.code}
                    avatar={client.avatar}
                    endPoint={"clients"}
                    id={id}
                    toggleKiosk={toggleKiosk}
                    kioskData={client}
                    setEditPopup={setEditPopup}
                    showInfo={showInfo}
                    setShowInfo={setShowInfo}
                    hideDeleteIcon={true}
                    grid={true}
                />
                {editPopup && (
                    <ClientForm setModal={setEditPopup} mode={"edit"} client={client} />
                )}
                <div className="detailsScroll">
                    {showInfo
                        ? <div className="formSections">
                            {clientFormData.formSections.map((section) => (
                                <div key={section.title} className="formSection">
                                    <FormSection
                                        sectionData={section}
                                        formFields={clientFormData.formFields}
                                        inputData={client}
                                        disable={true}
                                    />
                                </div>
                            ))}
                        </div>
                        :
                        <GridComponent
                            grid={grid}
                            gridClick={clientClick}
                        />
                    }
                </div>
            </div>
        </>
    )
}

export default ClientDetails