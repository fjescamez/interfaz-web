import React, { useEffect, useState } from 'react'
import GeneralForm from './GeneralForm';
import { productosStockFormData } from '../../helpers/formsData';
import { fetchDataNoLimits } from '../../helpers/fetchData';
import { useSession } from '../../context/SessionContext';

function ProductoStockForm({ setModal, setTableData, setData, setTotal, producto, mode, id }) {
  const { session } = useSession();
  const username = session?.username || "unknown_user";
  const [formData, setFormData] = useState(productosStockFormData);

  let itemsData = {
    username
  };

  if (mode === "edit" && id) {
    itemsData = {
      nombre: producto?.nombre,
      categoria: producto?.id_categoria,
      departamento: producto?.id_departamento,
      stock_min: producto?.stock_min,
      cantidad: producto?.cantidad,
      username
    }
  }

  useEffect(() => {
    const getOptions = async () => {
      const categorias = await fetchDataNoLimits("stockCategories");
      const departamentos = await fetchDataNoLimits("departments");

      let optionsCategorias = [{ nombre: "" }];
      let optionsDepartamentos = [{ nombre: "" }];

      categorias.map(categoria => {
        optionsCategorias.push({
          ...categoria,
          textoOpcion: categoria.nombre
        });
      });

      departamentos.map(departamento => {
        optionsDepartamentos.push({
          ...departamento,
          textoOpcion: departamento.departamento
        });
      });

      setFormData(prev => ({
        ...prev,
        formFields: prev.formFields.map(field => {
          if (field.htmlFor === "categoria") {
            return {
              ...field,
              options: optionsCategorias
            }
          }
          if (field.htmlFor === "departamento") {
            return {
              ...field,
              options: optionsDepartamentos
            }
          }
          return field
        })
      }));

    }

    getOptions();
  }, []);

  return (
    (formData.formFields[1].options.length > 1 && formData.formFields[2].options.length > 1) &&
    <GeneralForm
      setModal={setModal}
      formData={formData}
      itemsData={itemsData}
      endpoint={"stockProducts"}
      setTableData={setTableData}
      setData={setData}
      setTotal={setTotal}
      mode={mode}
      _id={id}
    />
  )
}

export default ProductoStockForm