import { useParams } from "react-router-dom";
import DetailsHeader from '../components/DetailsHeader'
import { useEffect, useState } from "react";
import { fetchOneItem } from "../helpers/fetchData";
import { planchasFormData } from "../helpers/formsData";
import FormSection from "../components/formComponents/FormSection";
import Table from "../components/Table";
import { planchasTableInfo, trabajosPlanchaTableInfo } from "../helpers/tablesInfo";
import DeleteForm from "../components/formComponents/DeleteForm";

function PlanchasDetails() {
  const urlApi = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [plancha, setPlancha] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [trabajosPlancha, setTrabajosPlancha] = useState([]);
  const location = window.location.pathname;

  const getPlancha = async () => {
    const result = await fetchOneItem("planchas", id);
    setPlancha(result);
  };

  const getTrabajos = async () => {
    const result = await fetchOneItem("planchas/trabajos", id);
    setTrabajosPlancha(result);
  };

  useEffect(() => {
    getPlancha();
    getTrabajos();
  }, [id, location]);

  return (
    <div className="detailsContainer">
      <DetailsHeader
        title={`PLANCHA ${plancha?.nombre_plancha || ''}`}
        setDeletePopup={setDeletePopup}
        hideAvatar={true}
      />
      {deletePopup &&
        <DeleteForm
          setModal={setDeletePopup}
          tableInfo={planchasTableInfo}
          id={[id]}
        />
      }
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
        {plancha?.nombre_plancha &&
          <img
            className="previoPlancha"
            src={`${urlApi}/planchas/images/${plancha?.nombre_plancha}`}
            onClick={() => window.open(`${urlApi}/planchas/images/${plancha?.nombre_plancha}`)}
            alt="Plancha"
          />
        }
        {trabajosPlancha.length > 0 &&
          <Table
            dinamicTableInfo={trabajosPlanchaTableInfo}
            initialData={trabajosPlancha}
            noActionRows={true}
            customTable={true}
          />
        }
      </div>
    </div>
  )
}

export default PlanchasDetails