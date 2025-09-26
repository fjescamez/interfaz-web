import GeneralForm from '../formComponents/GeneralForm'
import { metodosImpresionFormData } from '../../helpers/formsData'
import { useEffect, useState } from 'react'

function MetodosImpresion({ setPlanchasModal, id_pedido, file }) {
  const [formData, setFormData] = useState(metodosImpresionFormData);
  const [tintasList, setTintasList] = useState([]);
  const [itemsData, setItemsData] = useState({
    id_pedido,
    file
  });

  const createForm = () => {
    setFormData(prev => {
      const newFormFields = [
        ...prev.formFields,
        ...tintasList.flatMap((tinta) => [
          {
            htmlFor: tinta.color,
            labelId: `${tinta.color}Label`,
            labelTitle: tinta.color,
            inputType: "text",
            inputId: tinta.color,
            inputName: tinta.color
          },
        ])
      ]

      // Agrupar tintas de dos en dos en el formulario
      const chunkedGroups = [];
      for (let i = 0; i < tintasList.length; i += 2) {
        chunkedGroups.push({
          groups: [
            tintasList[i]?.color,
            tintasList[i + 1]?.color
          ].filter(Boolean)
        });
      };

      const newRows = [
        ...prev.formSections[0].rows,
        ...chunkedGroups
      ];

      return {
        ...prev,
        formFields: newFormFields,
        formSections: [
          {
            ...prev.formSections[0],
            rows: newRows
          }
        ]
      };
    });

    setItemsData(prev => ({
      ...prev,
      ...tintasList.reduce((acc, tinta) => {
        acc[tinta.color] = tinta.planchaArchivo;
        return acc;
      }, {})
    }));
  }

  useEffect(() => {
    if (tintasList.length > 0) {
      createForm();
    }
  }, [tintasList]);

  useEffect(() => {
    
  }, []);

  return (
    <GeneralForm
      setModal={setPlanchasModal}
      formData={formData}
      itemsData={itemsData}
      endpoint={"montajes/rip/config_plancha"}
      submitText={"Modificar"}
    />
  )
}

export default MetodosImpresion