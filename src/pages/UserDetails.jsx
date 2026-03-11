import "./DetailsPage.css";
import "../components/formComponents/FormSection.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useTabs } from "../context/TabsContext";
import UserForm from "../components/formComponents/UserForm";
import DeleteForm from "../components/formComponents/DeleteForm";
import DetailsHeader from "../components/DetailsHeader";
import { userFormData } from "../helpers/formsData";
import FormSection from "../components/formComponents/FormSection";
import GridComponent from "../components/GridComponent";
import { usersDetails } from "../helpers/detailsGrid";
import { userTableInfo } from "../helpers/tablesInfo";
import { fetchOneItem } from "../helpers/fetchData";
import { useLocation } from "react-router-dom";
import { checkRole } from "../helpers/roleChecker";

function UserDetails({ toggleKiosk }) {
    const [user, setUser] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const { closeTab } = useTabs();
    const [editPopup, setEditPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [showInfo, setShowInfo] = useState(true);
    const { grid } = usersDetails;
    const { isAdmin } = checkRole();
    const location = useLocation();

    useEffect(() => {
        const getUserDetails = async () => {
            const userData = await fetchOneItem("users", id);

            if (!userData) {
                closeTab(location.pathname)
                navigate("/usuarios")
                return
            };
            setUser(userData.user);
        }
        getUserDetails();
    }, [id]);

    return (
        <div className="detailsContainer">
            <DetailsHeader
                title={[user.name, " ", user.lastname]}
                avatar={user.avatar}
                endPoint={"users"}
                id={id}
                toggleKiosk={toggleKiosk}
                kioskData={user}
                departments={user.departments}
                setEditPopup={setEditPopup}
                setDeletePopup={setDeletePopup}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
            />
            {editPopup && (
                <UserForm
                    setModal={setEditPopup}
                    mode={"edit"}
                    user={user}
                    setUser={setUser}
                />
            )}
            {(deletePopup && isAdmin) && (
                <DeleteForm
                    setModal={setDeletePopup}
                    tableInfo={userTableInfo}
                    id={id}
                />
            )}
            <div className="detailsScroll">
                {showInfo
                    ? <div className="formSections">
                        {userFormData.formSections.map((section, index) => (
                            <FormSection
                                sectionData={section}
                                formFields={userFormData.formFields}
                                inputData={user}
                                disable={true}
                            />
                        ))}
                    </div>
                    :
                    <GridComponent
                        grid={grid}
                        object={user}
                    />
                }
            </div>
        </div>
    )
}

export default UserDetails