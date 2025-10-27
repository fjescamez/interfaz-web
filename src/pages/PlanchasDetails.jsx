import { useParams } from "react-router-dom";
import DetailsHeader from '../components/DetailsHeader'
import { useEffect, useState } from "react";
import { fetchOneItem } from "../helpers/fetchData";
import { planchasFormData } from "../helpers/formsData";
import FormSection from "../components/formComponents/FormSection";

function PlanchasDetails() {
  const { id } = useParams();
  const [plancha, setPlancha] = useState(null);

  const getPlancha = async () => {
    const result = await fetchOneItem("planchas", id);
    setPlancha(result);
  }

  useEffect(() => {
    getPlancha();
  }, [id]);

  return (
    <div className="detailsContainer">
      <DetailsHeader
        title={`PLANCHA ${plancha?.nombre_plancha || ''}`}
        hideAvatar={true}
      />
      <div className="detailsScroll">
        <div className="formSections">
          {planchasFormData.formSections.map((section, index) => (
            <div key={index} className="formSection">
              <FormSection
                sectionData={section}
                formFields={planchasFormData.formFields}
                inputData={plancha || {}}
                disable={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlanchasDetails