import { useState } from 'react';
import { toast } from "react-toastify";
import Table from '../Table';
import DescontarProductoForm from '../formComponents/DescontarProductoForm';
import { productosStockTableInfo } from '../../helpers/tablesInfo';
import { notify } from '../../helpers/notify';
import IncidenciaProductoForm from '../formComponents/IncidenciaProductoForm';

function ProductoTable({ userFilter, tableInfo, customTable, specificPath, initialData }) {
    const [checkedRows, setCheckedRows] = useState([]);
    const [descontarPopUp, setDescontarPopUp] = useState(false);
    const [incidenciaPopUp, setIncidenciaPopUp] = useState(false);
    const [producto, setProducto] = useState({});
    const [dataSetter, setDataSetter] = useState(null);

    const productosActions = (variables) => {
        const { action, data, setTableData } = variables;
        const productoSeleccionado = data.find(item => item.id === checkedRows[0]);
        setProducto(productoSeleccionado);
        setDataSetter(() => setTableData);

        if (action === "descontar") {
            if (checkedRows.length > 1) {
                notify(toast.error, 'error', 'Error', 'Solo se puede descontar el stock de un producto a la vez.');
                return { status: "error" };
            }
            setDescontarPopUp(true);
            return { status: "success" };
        } else if (action === "incidencia") {
            if (checkedRows.length > 1) {
                notify(toast.error, 'error', 'Error', 'Solo se puede reportar la incidencia de un producto a la vez.');
                return { status: "error" };
            }
            setIncidenciaPopUp(true);
            return { status: "success" };
        }
    }

    return (
        <>
            <Table
                dinamicTableInfo={tableInfo || productosStockTableInfo}
                tabTitleTemplate={`PRODUCTO {codigo}`}
                userFilter={userFilter || false}
                checkedRows={checkedRows}
                setCheckedRows={setCheckedRows}
                actions={productosActions}
                customTable={customTable || false}
                specificPath={specificPath || false}
                initialData={initialData || false}
            />
            {descontarPopUp && <DescontarProductoForm setModal={setDescontarPopUp} producto={producto} setTableData={dataSetter} />}
            {incidenciaPopUp && <IncidenciaProductoForm setModal={setIncidenciaPopUp} producto={producto} setTableData={dataSetter} />}
        </>
    )
}

export default ProductoTable