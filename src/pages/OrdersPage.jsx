import { useState } from "react";
import Table from "../components/Table";
import { orderTableInfo } from "../helpers/tablesInfo";
import { useSession } from "../context/SessionContext";
import AsignarPedidoForm from "../components/formComponents/AsignarPedidoForm";
import { postData } from "../helpers/fetchData";
import { notify } from "../helpers/notify";
import { toast } from "react-toastify";

function OrdersPage({ filter }) {
    const [checkedOrders, setCheckedOrders] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [dataSetter, setDataSetter] = useState(null);
    const [asignarPopUp, setAsignarPopUp] = useState(false);
    const { session } = useSession();
    const { role, username } = session;
    const isManager = role === "Manager" || role === "Soporte";
    const isTeletrabajo = username === "n.morante" || username === "a.artacho";

    const orderActions = async (variables) => {
        const { action, data, setTableData } = variables;
        const pedidosSeleccionados = data.filter(pedido => checkedOrders.includes(pedido._id));
        setPedidos(pedidosSeleccionados);

        switch (action) {
            case "asignar":
                setDataSetter(() => setTableData);
                setAsignarPopUp(true);
                setCheckedOrders([]);
                return { status: "success" };
            case "desasignar":
                setCheckedOrders([]);
                const result = await postData("orders/desasignarPedido", { pedidos: pedidosSeleccionados });
                if (result.status === "success") {
                    notify(toast.success, 'success', 'Operación exitosa');
                    setTableData(() => {
                        return data.map(order => {
                            const updatedOrder = result.updatedItems.find(updated => updated._id === order._id);
                            return updatedOrder ? { ...updatedOrder } : order;
                        });
                    });
                }
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
                setCheckedRows={isManager || isTeletrabajo ? setCheckedOrders : null}
                actions={orderActions}
            />
            {asignarPopUp && <AsignarPedidoForm setModal={setAsignarPopUp} orderIds={checkedOrders} pedidos={pedidos} setTableData={dataSetter} />}
        </>
    )
}

export default OrdersPage;