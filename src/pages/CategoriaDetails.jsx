import { useEffect, useState } from 'react'
import DetailsHeader from '../components/DetailsHeader'
import { categoriasStockTableInfo, productosStockTableInfo } from '../helpers/tablesInfo'
import { useParams } from "react-router-dom";
import { fetchData, fetchOneItem } from '../helpers/fetchData';
import CategoriaStockForm from '../components/formComponents/CategoriaStockForm';
import DeleteForm from '../components/formComponents/DeleteForm';
import { notify } from '../helpers/notify';
import { useSession } from '../context/SessionContext';
import ProductoTable from '../components/tableComponents/ProductoTable';

function CategoriaDetails() {
  const { id } = useParams();
  const [categoria, setCategoria] = useState({});
  const [tableInfo, setTableInfo] = useState(productosStockTableInfo);
  const [editPopUp, setEditPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { session } = useSession();
  const username = session?.username || "unknown_user";

  useEffect(() => {
    const getCategoria = async () => {
      const result = await fetchOneItem("stockCategories/getById", id);
      setCategoria(result);
    };

    const getTableData = async () => {
      const result = await fetchData(`stockProducts/getByCategory/${id}`);
      setTableData(result || []);
    };

    getTableData();
    getCategoria();
  }, [id]);

  useEffect(() => {
    setTableInfo({
      ...productosStockTableInfo,
      endPoint: `stockProducts/getByCategory/${id}`,
      tableColumns: productosStockTableInfo.tableColumns.filter(
        column => column.key !== 'categoria_nombre' && column.key !== 'departamento_nombre'
      )
    });
  }, [categoria]);

  const handleDelete = () => {
    if (tableData.length > 0) {
      notify('error', 'Error', 'No se puede eliminar la categoría porque tiene productos asociados');
    } else {
      setDeletePopUp(true);
    }
  };

  return (
    <div className="detailsContainer">
      <DetailsHeader
        title={categoria?.nombre}
        underTitle={`Descripción: ${categoria?.descripcion || 'Sin descripción'}`}
        hideAvatar={true}
        setEditPopup={setEditPopUp}
        setDeletePopup={handleDelete}
      />
      <div className="detailsScroll">
        {tableInfo.endPoint.includes(`stockProducts/getByCategory/${id}`) && (
          <>
            <ProductoTable
              tableInfo={tableInfo}
              customTable={true}
              specificPath={`/stock/productos`}
              initialData={tableData}
            />
          </>
        )}
      </div>
      {editPopUp && <CategoriaStockForm setModal={setEditPopUp} setData={setCategoria} categoria={categoria} mode="edit" id={id} />}
      {deletePopUp && <DeleteForm id={id} extraBodyData={{ username }} setModal={setDeletePopUp} tableInfo={{ ...categoriasStockTableInfo, headerTitle: "CATEGORÍA DE PRODUCTO" }} />}
    </div>
  )
}

export default CategoriaDetails