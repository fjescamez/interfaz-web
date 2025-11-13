import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "../components/Table";
import { orderTableInfo } from "../helpers/tablesInfo";
import { useSession } from "../context/SessionContext";
import AsignarPedidoForm from "../components/formComponents/AsignarPedidoForm";
import { postData } from "../helpers/fetchData";
import { notify } from "../helpers/notify";
import { toast } from "react-toastify";
import { BsFillInboxFill } from "react-icons/bs";

function OrdersPage({ filter, filterBandeja }) {
    const [tableInfo, setTableInfo] = useState(orderTableInfo);
    const location = useLocation();
    const [checkedOrders, setCheckedOrders] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [dataSetter, setDataSetter] = useState(null);
    const [asignarPopUp, setAsignarPopUp] = useState(false);
    const { session } = useSession();
    let isManager = false;
    let isTeletrabajo = false;
    if (session) {
        const { role, username } = session;
        isManager = role === "Manager" || role === "Soporte";
        isTeletrabajo = username === "n.morante" || username === "a.artacho";
    }
    const userFilter = filterBandeja ? username : "";

    useEffect(() => {
        if (location.pathname === "/bandeja") {
            setTableInfo(prev => ({
                ...prev,
                headerIcon: <BsFillInboxFill />,
                headerTitle: "BANDEJA PERSONAL"
            }));
        } else {
            setTableInfo(orderTableInfo);
        }
    }, [location.pathname]);

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
                userFilter={userFilter}
                dinamicTableInfo={tableInfo}
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