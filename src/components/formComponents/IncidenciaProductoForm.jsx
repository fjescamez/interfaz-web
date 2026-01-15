import React, { useEffect, useState } from 'react'
import GeneralForm from './GeneralForm'
import { incidenciaProductoFormData } from '../../helpers/formsData'
import { useSession } from '../../context/SessionContext';
import { fetchDataNoLimits } from '../../helpers/fetchData';
import ExecutingComponent from '../ExecutingComponent';

function IncidenciaProductoForm({ setModal, setTableData, producto }) {
  const { session } = useSession();
  const username = session?.username || "unknown_user";
  const [formData, setFormData] = useState(incidenciaProductoFormData);
  const [options, setOptions] = useState([]);

  const itemsData = {
    solicitante: `${session?.name} ${session?.lastname}`,
    username,
    id_producto: producto?.id,
    departamento_usuario: session?.departments?.[0],
    producto: producto?.nombre,
    estado: {
      id: producto?.id_estado,
      nombre_estado: producto?.estado_nombre,
      textoOpcion: producto?.estado_nombre
    }
  }

  useEffect(() => {
    const getOptions = async () => {
      const { results } = await fetchDataNoLimits('stockProducts/states');
      const opciones = results.map(estado => ({
        ...estado,
        textoOpcion: estado.nombre_estado
      }))

      setOptions(opciones);

      setFormData(prev => ({
        ...prev,
        formFields: prev.formFields.map(field => {
          if (field.htmlFor === "estado") {
            return {
              ...field,
              options: opciones
            }
          }
          return field;
        })
      }))
    }

    getOptions();
  }, []);

  return (
    options.length > 0 ? (
      <GeneralForm
        setModal={setModal}
        formData={formData}
        itemsData={itemsData}
        endpoint={"stockProducts/incidencia"}
        submitText={"Confirmar"}
        setTableData={setTableData}
      />
    ) : <ExecutingComponent message={"Cargando"} />
  )
}

export default IncidenciaProductoForm