import { useEffect, useState } from "react";
import { refPlanchaFormData } from "../../helpers/formsData";
import GeneralForm from "./GeneralForm";

function RefPlanchaForm({ setModal, mode, setTableData, setTotal, setData, refPlancha }) {
  const [formData, setFormData] = useState(null);
  let refPlanchaData = {};
  let { fabricante, espesor, referencia } = refPlancha || {};

  if (mode && mode === 'edit') {
    refPlanchaData = {
      fabricante: fabricante || '',
      espesor: espesor || '',
      referencia: referencia || ''
    }
  } else {
    refPlanchaData = {
      fabricante: '',
      espesor: '',
      referencia: ''
    }
  }

  useEffect(() => {
    setFormData(
      {
        ...refPlanchaFormData,
        formFields: refPlanchaFormData.formFields.filter(field =>
          field.htmlFor === 'fabricante' ||
          field.htmlFor === 'espesor' ||
          field.htmlFor === 'referencia'
        ),
        formSections: [
          {
            ...refPlanchaFormData.formSections[0],
            rows: [refPlanchaFormData.formSections[0].rows[0]]
          }
        ]
      }
    );
  }, []);

  return (
    formData && (
      <GeneralForm
        setModal={setModal}
        formData={formData}
        itemsData={refPlanchaData}
        endpoint={'refProduccion/refPlanchas'}
        setTableData={setTableData}
        setTotal={setTotal}
        setData={setData}
        mode={mode}
        _id={refPlancha?.id}
      />
    )
  )
}

export default RefPlanchaForm