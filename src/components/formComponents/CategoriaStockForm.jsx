import { useSession } from "../../context/SessionContext";
import { categoriasStockFormData } from "../../helpers/formsData"
import GeneralForm from "./GeneralForm"

function CategoriaStockForm({ setModal, setTableData, setData, setTotal, categoria, mode, id }) {
  const { session } = useSession();
  const username = session?.username || "unknown_user";

  let itemsData = {
    username
  };

  if (mode === "edit" && id) {
    itemsData = {
      nombre: categoria?.nombre,
      descripcion: categoria?.descripcion,
      username
    }
  }

  return (
    <GeneralForm
      setModal={setModal}
      formData={categoriasStockFormData}
      itemsData={itemsData}
      endpoint={"stockCategories"}
      setTableData={setTableData}
      setData={setData}
      setTotal={setTotal}
      mode={mode}
      _id={id}
    />
  )
}

export default CategoriaStockForm