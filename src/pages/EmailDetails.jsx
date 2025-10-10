import { useLocation, useParams } from "react-router-dom";
import { emailInfoFormData } from '../helpers/formsData';
import FormSection from '../components/formComponents/FormSection';
import { fetchData } from "../helpers/fetchData";
import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import DetailsHeader from "../components/DetailsHeader";

function EmailDetails() {
    const [emailInfo, setEmailInfo] = useState(undefined);
    const [inputData, setInputData] = useState({});
    const { id_pedido, id } = useParams();

    const getEmailInfo = async () => {
        const results = await fetchData("orders", id_pedido);
        setEmailInfo(results[0].registroInfo[id - 1] || {});
    }

    useEffect(() => {
        setEmailInfo(undefined);
        getEmailInfo();
    }, [id])

    useEffect(() => {
        setInputData({
            ...emailInfo,
            para: emailInfo?.contacto?.contacto || "",
        });
    }, [emailInfo]);

    return (
        <div className="detailsContainer">
            <DetailsHeader
                title={`Email ${id} | ${id_pedido}`}
                hideEditIcon={true}
                hideDeleteIcon={true}
                hideAvatar={true}
            />
            <div className="detailsScroll">
                {emailInfo ?
                    <div className="formSections">
                        {emailInfoFormData.formSections.map((section) => (
                            <div key={section.title} className="formSection">
                                <FormSection
                                    sectionData={section}
                                    formFields={emailInfoFormData.formFields}
                                    inputData={inputData}
                                    disable={true}
                                />
                            </div>
                        ))}
                    </div>
                    :
                    <div className="loading"><OrbitProgress variant="dotted" color="var(--highlight)" size="large" /></div>
                }
            </div>
        </div>
    )
}

export default EmailDetails