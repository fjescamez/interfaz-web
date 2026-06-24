import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useTabs } from "../../../context/TabsContext";
import PalleteForm from "../components/PalleteForm";
import DeleteForm from "../../../components/formComponents/DeleteForm";
import DetailsHeader from "../../../components/DetailsHeader";
import { palleteFormData, collection } from "../config/pallete.config";
import FormSection from "../../../components/formComponents/FormSection";

import { palleteTableInfo } from "../config/pallete.config";
import { useLocation } from "react-router-dom";
import { checkRole } from "../../../helpers/roleChecker";

import { get } from "../../../helpers/cloudflow/custom_objects";

function PalleteDetails({ toggleKiosk }) {
    const [pallete, setPallete] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const { closeTab } = useTabs();
    const [editPopup, setEditPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [showInfo, setShowInfo] = useState(true);
    const { isAdmin } = checkRole();
    const location = useLocation();
    

    useEffect(() => {
        const getPalleteDetails = async () => {
            const palleteData = await get(collection, id);

            if (!palleteData) {
                closeTab(location.pathname)
                navigate("/pallete")
                return
            };
            setPallete(palleteData);
        }
        getPalleteDetails();

    }, [id]);


    const formFieldsWithOptions = palleteFormData.formFields.map(field => {
        if (field.htmlFor === "cliente_nombre") {
            return { ...field, options: clienteNombreOptions };
        } else if (field.htmlFor === "cliente_codigo") {
            return { ...field, options: clienteCodigoOptions };
        }
        return field;
    });

    return (
        <div className="detailsContainer">
            <DetailsHeader
                title={pallete?.description}
                avatar={pallete?.avatar || "avatarDefault.jpg"}
                endPoint={collection}
                id={id}
                toggleKiosk={toggleKiosk}
                kioskData={pallete}
                departments={"dep"}
                setEditPopup={setEditPopup}
                setDeletePopup={setDeletePopup}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
            />
            {editPopup && (
                <PalleteForm setModal={setEditPopup} mode={"edit"} pallete={pallete} setPallete={setPallete} />
            )}
            {(deletePopup && isAdmin) && (
                <DeleteForm
                    collection={collection}
                    setModal={setDeletePopup}
                    tableInfo={palleteTableInfo}
                    id={id}
                />
            )}
            <div className="detailsScroll">
                <div className="formSections">
                    {palleteFormData.formSections.map((section, index) => (
                        <FormSection
                            formFields={formFieldsWithOptions}
                            key={index}
                            sectionData={section}
                            inputData={pallete}
                            disable={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PalleteDetails