import "./DetailsPage.css";
import "../components/formComponents/FormSection.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useTabs } from "../context/TabsContext";
import GroupForm from "../components/formComponents/GroupForm";
import DetailsHeader from "../components/DetailsHeader";
import { useSession } from "../context/SessionContext";
import { groupFormData } from "../helpers/formsData";
import FormSection from "../components/formComponents/FormSection";
import { fetchOneItem } from "../helpers/fetchData";
import DeleteForm from "../components/formComponents/DeleteForm";
import { groupTableInfo } from "../helpers/tablesInfo";
import { ThreeDot } from 'react-loading-indicators';
import { useLocation } from "react-router-dom";

function GroupDetails({ toggleKiosk }) {
    const [group, setGroup] = useState({});
    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState(groupFormData);
    const { id } = useParams();
    const navigate = useNavigate();
    const { closeTab } = useTabs();
    const [editPopup, setEditPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const { session } = useSession();
    const [showInfo, setShowInfo] = useState(true);
    //const { grid } = usersDetails;
    const isAdmin = session?.role === "Administrador" || session?.role === "Soporte";
    const location = useLocation();

    useEffect(() => {
        const getGroupDetails = async () => {
            const groupData = await fetchOneItem("groups", id);

            if (!groupData) {
                closeTab(location.pathname)
                navigate("/grupos")
                return
            };
            setGroup(groupData.results);
        }
        getGroupDetails();
    }, [id]);

    useEffect(() => {
        const getContactos = async () => {
            let options = [];
            for (const id of group.ids) {
                const contacto = await fetchOneItem("contacts", id);
                const contactoData = {
                    _id: contacto.results._id,
                    textoOpcion: contacto.results.contacto
                }
                options.push(contactoData);
                setContacts(prev => ([...prev, contacto.results]));
            }
            setFormData(prev => ({
                ...prev,
                formFields: prev.formFields.map(field => {
                    if (field.htmlFor === "ids") {
                        return {
                            ...field,
                            options: options
                        }
                    }
                    return field;
                }),
            }));
        }

        if (group.cliente_nombre && group.cliente_codigo) {
            getContactos();
            setFormData(prev => ({
                ...prev,
                formFields: prev.formFields.map(field => {
                    if (field.htmlFor === "cliente_nombre") {
                        return {
                            ...field,
                            options: [group?.cliente_nombre]
                        }
                    }
                    if (field.htmlFor === "cliente_codigo") {
                        return {
                            ...field,
                            options: [group?.cliente_codigo]
                        }
                    }
                    return field;
                }),
            }));
        }
    }, [group]);

    return (
        <div className="detailsContainer">
            <DetailsHeader
                title={group.grupo}
                avatar={group.avatar || "avatarDefault.jpg"}
                endPoint={"groups"}
                id={id}
                toggleKiosk={toggleKiosk}
                kioskData={group}
                setEditPopup={setEditPopup}
                setDeletePopup={setDeletePopup}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
            />
            {editPopup && (
                <GroupForm setModal={setEditPopup} mode={"edit"} group={group} setGroup={setGroup} />
            )}
            {(deletePopup && isAdmin) && (
                <DeleteForm
                    setModal={setDeletePopup}
                    tableInfo={groupTableInfo}
                    id={id}
                />
            )}
            <div className="detailsScroll">
                <div className="formSections">
                    {formData.formSections.map((section) => (
                        <div key={section.title} className="formSection">
                            <FormSection
                                sectionData={section}
                                formFields={formData.formFields}
                                inputData={group || {}}
                                disable={true}
                            />
                        </div>
                    ))}
                    {contacts.length < 1
                        ?
                        <p className='loading'>Cargando <ThreeDot color="black" size="small" speedPlus={2} /></p>
                        : contacts.map((contact, index) => (
                            <div key={index} className="formSection">
                                <FormSection
                                    sectionData={{
                                        title: `Contacto ${index + 1}`,
                                        rows: [
                                            {
                                                groups: ["contacto", "telefono", "email"]
                                            }
                                        ]
                                    }}
                                    formFields={[
                                        {
                                            htmlFor: "contacto",
                                            labelId: "contacto",
                                            labelTitle: "Nombre del contacto",
                                            inputType: "text",
                                            inputId: "contacto",
                                            inputName: "contacto"
                                        },
                                        {
                                            htmlFor: "telefono",
                                            labelId: "telefono",
                                            labelTitle: "Teléfono",
                                            inputType: "text",
                                            inputId: "telefono",
                                            inputName: "telefono"
                                        },
                                        {
                                            htmlFor: "email",
                                            labelId: "email",
                                            labelTitle: "Email",
                                            inputType: "email",
                                            inputId: "email",
                                            inputName: "email"
                                        }
                                    ]}
                                    inputData={contact || {}}
                                    disable={true}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>

    )
}

export default GroupDetails