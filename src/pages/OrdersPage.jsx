import { useState } from "react";
import Table from "../components/Table";
import { orderTableInfo } from "../helpers/tablesInfo";
import { useSession } from "../context/SessionContext";
import AsignarPedidoForm from "../components/formComponents/AsignarPedidoForm";
import { postData } from "../helpers/fetchData";

function OrdersPage({ filter }) {
    const [checkedOrders, setCheckedOrders] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [asignarPopUp, setAsignarPopUp] = useState(false);
    const { session } = useSession();
    const { role } = session;

    const orderActions = async (variables) => {
        const { action, data, setTableData } = variables;
        const pedidosSeleccionados = data.filter(pedido => checkedOrders.includes(pedido._id));
        setPedidos(pedidosSeleccionados);

        switch (action) {
            case "asignar":
                setAsignarPopUp(true);
                return { status: "success" };
            case "desasignar":
                const result = await postData("orders/desasignarPedido", { pedidos: pedidosSeleccionados });
                return { status: "success" };
        }
    }

    return (
        <>
            <Table
                clientFilter={filter}
                dinamicTableInfo={orderTableInfo}
                normalizedData={true}
                checkedRows={checkedOrders}
                setCheckedRows={role === "Manager" ? setCheckedOrders : null}
                actions={orderActions}
            />
            {asignarPopUp && <AsignarPedidoForm setModal={setAsignarPopUp} orderIds={checkedOrders} pedidos={pedidos} />}
        </>
    )
}

export default OrdersPage;