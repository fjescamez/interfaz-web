import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataNoLimits, fetchOneItem } from "../helpers/fetchData";
import DetailsHeader from "../components/DetailsHeader";
import ProductoStockForm from "../components/formComponents/ProductoStockForm";
import DeleteForm from "../components/formComponents/DeleteForm";
import { productosStockTableInfo } from "../helpers/tablesInfo";
import { productosStockFormData } from "../helpers/formsData";
import FormSection from "../components/formComponents/FormSection";
import { ThreeDot } from 'react-loading-indicators';
import { useSession } from "../context/SessionContext";

function ProductoDetails() {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [editPopUp, setEditPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [formData, setFormData] = useState(productosStockFormData);
  const [loading, setLoading] = useState(true);
  const [itemsData, setItemsData] = useState({});
  const { session } = useSession();
  const username = session?.username || "unknown_user";

  useEffect(() => {
    const getProducto = async () => {
      const result = await fetchOneItem("stockProducts/getById", id);
      setProducto(result);

      setItemsData({
        nombre: result?.nombre,
        categoria: result?.id_categoria,
        departamento: result?.id_departamento,
        stock_min: result?.stock_min,
        cantidad: result?.cantidad
      });

      const categorias = await fetchDataNoLimits("stockCategories");
      const departamentos = await fetchDataNoLimits("departments");

      let optionsCategorias = [""];
      let optionsDepartamentos = [""];

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

    getProducto().finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="detailsContainer">
      <DetailsHeader
        title={producto?.nombre}
        hideAvatar={true}
        setEditPopup={setEditPopUp}
        setDeletePopup={setDeletePopUp}
      />
      {loading ? <p className="loading">Cargando <ThreeDot color="black" size="small" speedPlus={2} /></p> : (
        <div className="detailsScroll">
          <div className="formSections">
            {formData.formSections.map((section, index) => (
              <div key={index} className="formSection">
                <FormSection
                  sectionData={section}
                  formFields={formData.formFields}
                  inputData={itemsData}
                  disable={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {editPopUp && <ProductoStockForm setModal={setEditPopUp} setData={setItemsData} producto={producto} mode="edit" id={id} />}
      {deletePopUp && <DeleteForm id={id} extraBodyData={{ username }} setModal={setDeletePopUp} tableInfo={{ ...productosStockTableInfo, headerTitle: "PRODUCTO" }} />}
    </div>
  )
}

export default ProductoDetails