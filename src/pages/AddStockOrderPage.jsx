import { useState } from 'react'
import Table from '../components/Table'
import { addOrderTableInfo } from '../helpers/tablesInfo'
import OrdenCompraForm from '../components/formComponents/OrdenCompraForm';

function AddStockOrderPage() {
    const [ordenForm, setOrdenForm] = useState(false);
    const [producto, setProducto] = useState({});

    const addOrderActions = async (variables) => {
        const { action, data } = variables;

        if (action === "openRow") {
            setProducto(data);
            setOrdenForm(true);
        }

        return { status: "success" };
    }

    return (
        <>
            <Table
                dinamicTableInfo={addOrderTableInfo}
                openRows={true}
                actions={addOrderActions}
            />
            {(ordenForm && producto) && <OrdenCompraForm setModal={setOrdenForm} producto={producto} />}
        </>
    )
}

export default AddStockOrderPage