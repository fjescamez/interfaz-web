import "./DetailsPage.css";
import "../components/formComponents/FormSection.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useTabs } from "../context/TabsContext";
import ContactForm from "../components/formComponents/ContactForm";
import DeleteForm from "../components/formComponents/DeleteForm";
import DetailsHeader from "../components/DetailsHeader";
import { useSession } from "../context/SessionContext";
import { contactFormData } from "../helpers/formsData";
import FormSection from "../components/formComponents/FormSection";
import { fetchOneItem } from "../helpers/fetchData";
import { contactTableInfo } from "../helpers/tablesInfo";
import { useLocation } from "react-router-dom";

function ContactDetails({ toggleKiosk }) {
    const [contact, setContact] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const { closeTab } = useTabs();
    const [editPopup, setEditPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const { session } = useSession();
    const [showInfo, setShowInfo] = useState(true);
    //const { grid } = usersDetails;
    const isAdmin = session.role === "Administrador";
    const location = useLocation();

    const clienteNombreOptions = contact.cliente_nombre ? [contact.cliente_nombre] : [];
    const clienteCodigoOptions = contact.cliente_codigo ? [contact.cliente_codigo] : [];

    const formFieldsWithOptions = contactFormData.formFields.map(field => {
        if (field.htmlFor === "cliente_nombre") {
            return { ...field, options: clienteNombreOptions };
        } else if (field.htmlFor === "cliente_codigo") {
            return { ...field, options: clienteCodigoOptions };
        }
        return field;
    });

    useEffect(() => {
        const getContactDetails = async () => {
            const contactData = await fetchOneItem("contacts", id);

            if (!contactData) {
                closeTab(location.pathname)
                navigate("/contactos")
                return
            };
            setContact(contactData.results);
        }
        getContactDetails();

    }, [id]);

    return (
        <div className="detailsContainer">
            <DetailsHeader
                title={contact.contacto}
                avatar={contact.avatar || "avatarDefault.jpg"}
                endPoint={"contact"}
                id={id}
                toggleKiosk={toggleKiosk}
                kioskData={contact}
                departments={contact.departments}
                setEditPopup={setEditPopup}
                setDeletePopup={setDeletePopup}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
            />
            {editPopup && (
                <ContactForm setModal={setEditPopup} mode={"edit"} contact={contact} setContact={setContact} />
            )}
            {(deletePopup && isAdmin) && (
                <DeleteForm
                    setModal={setDeletePopup}
                    tableInfo={contactTableInfo}
                    id={id}
                />
            )}
            <div className="detailsScroll">
                <div className="formSections">
                    {contactFormData.formSections.map((section) => (
                        <div key={section.title} className="formSection">
                            <FormSection
                                sectionData={section}
                                formFields={formFieldsWithOptions}
                                inputData={contact}
                                disable={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ContactDetails