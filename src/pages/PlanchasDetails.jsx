import { useParams } from "react-router-dom";
import DetailsHeader from '../components/DetailsHeader'
import { useEffect, useState } from "react";
import { fetchOneItem } from "../helpers/fetchData";
import { planchasFormData } from "../helpers/formsData";
import FormSection from "../components/formComponents/FormSection";
import Table from "../components/Table";
import { trabajosPlanchasTableInfo } from "../helpers/tablesInfo";

function PlanchasDetails() {
  const { id } = useParams();
  const [plancha, setPlancha] = useState(null);
  const [trabajosPlancha, setTrabajosPlancha] = useState([]);
  const [checkTrabajos, setCheckTrabajos] = useState([]);

  const getPlancha = async () => {
    const result = await fetchOneItem("planchas", id);
    setPlancha(result);
  }

  const getTrabajos = async () => {
    const result = await fetchOneItem("planchas/trabajos", id);
    setTrabajosPlancha(result);
  }

  useEffect(() => {
    getPlancha();
    getTrabajos();
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
        {trabajosPlancha.length > 0 &&
          <Table
            dinamicTableInfo={trabajosPlanchasTableInfo}
            initialData={trabajosPlancha}
            checkedRows={checkTrabajos}
            setCheckedRows={setCheckTrabajos}
          />
        }
      </div>
    </div>
  )
}

export default PlanchasDetails