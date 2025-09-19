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

function GroupDetails({ toggleKiosk }) {
    const [group, setGroup] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const { closeTab } = useTabs();
    const [editPopup, setEditPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const { session } = useSession();
    const [showInfo, setShowInfo] = useState(true);
    //const { grid } = usersDetails;
    const isAdmin = session.role === "Administrador";

    useEffect(() => {
        const getGroupDetails = async () => {
            const groupData = await fetchOneItem("groups", id);

            if (!groupData) {
                closeTab(location.pathname)
                navigate("/groups")
                return
            };
            setGroup(groupData.results);
        }
        getGroupDetails();

    }, [id]);

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
            {/* {(deletePopup && isAdmin) && (
                <DeleteForm
                    setModal={setDeletePopup}
                    tableInfo={groupTableInfo}
                    id={id}
                />
            )} */}
            <div className="detailsScroll">
                <div className="formSections">
                    {groupFormData.formSections.map((section) => (
                        <div key={section.title} className="formSection">
                            <FormSection
                                sectionData={section}
                                formFields={groupFormData.formFields}
                                inputData={group}
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