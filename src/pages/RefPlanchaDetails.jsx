import { useEffect, useState } from 'react';
import DetailsHeader from '../components/DetailsHeader'
import { useParams } from 'react-router-dom';
import { fetchOneItem } from '../helpers/fetchData';
import RefPlanchaForm from '../components/formComponents/RefPlanchaForm';
import { refPlanchaFormData } from '../helpers/formsData';
import FormSection from '../components/formComponents/FormSection';

function RefPlanchaDetails() {
  const { id } = useParams();
  const [refPlancha, setRefPlancha] = useState({});
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  const inputData = {
    fabricante: refPlancha.fabricante || "",
    referencia: refPlancha.referencia || "",
    espesor: refPlancha.espesor || "",
    base: refPlancha.fabricante || "",
    relieveMin: refPlancha.espesor || "",
    relieveMax: refPlancha.espesor || "",
    dureza: refPlancha.referencia || "",
    dorsal: refPlancha.fabricante || "",
    principal: refPlancha.espesor || "",
    pixel: refPlancha.referencia || "",
    tamano1: 4835,
    tamano2: 4260,
    tamano3: 5080,
    potencia: refPlancha.fabricante || "",
    exposicion: refPlancha.espesor || "",
    tiempoProcesado: refPlancha.fabricante || "",
    tiempoSecado: refPlancha.fabricante || "",
    tiempoUva: refPlancha.fabricante || "",
    tiempoUvc: refPlancha.espesor || "",
  };

  const getRefPlancha = async () => {
    const response = await fetchOneItem("refProduccion/refPlanchas", id);

    setRefPlancha(response);
  }

  useEffect(() => {
    getRefPlancha();
  }, [id]);

  return (
    <div className="detailsContainer">
      <DetailsHeader
        title={`Ficha Técnica ${refPlancha.fabricante} ${refPlancha.espesor} ${refPlancha.referencia}`}
        hideAvatar={true}
        hideDeleteIcon={true}
        hideEditIcon={true}
      />
      {editPopup && (
        <RefPlanchaForm
          setModal={setEditPopup}
          mode={'edit'}
          refPlancha={refPlancha}
          setData={setRefPlancha}
        />
      )}
      <div className="detailsScroll">
        <div className="formSections">
          {refPlanchaFormData.formSections.map((section) => (
            <div key={section.title} className="formSection">
              <FormSection
                sectionData={section}
                formFields={refPlanchaFormData.formFields}
                inputData={inputData}
                disable={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RefPlanchaDetails