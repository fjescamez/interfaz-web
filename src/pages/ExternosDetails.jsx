import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneItem } from "../helpers/fetchData";
import DetailsHeader from "../components/DetailsHeader";
import { externosFormData } from "../helpers/formsData";
import FormSection from "../components/formComponents/FormSection";

function ExternosDetails() {
    const { id } = useParams();
    const [trabajo, setTrabajo] = useState();

    const getTrabajo = async () => {
        const result = await fetchOneItem("externalJobs/getById", id);
        setTrabajo(result);
    }

    useEffect(() => {
        getTrabajo();
    }, [id]);

    return (
        <div className="detailsContainer">
            <DetailsHeader
                title={`EXTERNO ${trabajo?.documentName}`}
                hideEditIcon={true}
                hideAvatar={true}
                hideDeleteIcon={true}
            />
            <div className="detailsScroll">
                <div className="formSections">
                    {externosFormData.formSections.map((section, index) => (
                        <div key={index} className="formSection">
                            <FormSection
                                sectionData={section}
                                formFields={externosFormData.formFields}
                                inputData={trabajo || {}}
                                disable={true}
                            />
                        </div>
                    ))}
                </div>
                {trabajo?.documentName &&
                    <img
                        className="previoPlancha"
                        src={`http://192.4.26.112:3000/externalJobs/image/${trabajo?.documentName}`}
                        onClick={() => window.open(`http://192.4.26.112:3000/externalJobs/image/${trabajo?.documentName}`)}
                        alt="Trabajo Externo"
                    />
                }
            </div>
        </div>
    )
}

export default ExternosDetails
