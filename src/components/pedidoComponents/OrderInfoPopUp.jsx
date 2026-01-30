import Table from '../Table';
import { emailInfoTableInfo } from '../../helpers/tablesInfo';
import { useTabs } from '../../context/TabsContext';
import { normalizeData } from '../../helpers/normalizeData';
import { useEffect, useState } from 'react';
import { fetchOneItem } from '../../helpers/fetchData';
import ExecutingComponent from '../ExecutingComponent';
import { addKeyListener } from '../../helpers/toggleModal';

function OrderInfoPopUp({ setInfoModal, _id }) {
    const [order, setOrder] = useState({});
    const [normalizedData, setNormalizedData] = useState([]);
    const { createTab } = useTabs();
    addKeyListener(setInfoModal);

    const getOrder = async () => {
        const response = await fetchOneItem('orders/getOrder', _id);
        setOrder(response);
    }

    useEffect(() => {
        getOrder();
    }, []);

    useEffect(() => {
        if (order && order._id) {
            const data = normalizeData(order.registroInfo, emailInfoTableInfo.tableColumns);
            setNormalizedData(data);
        }
    }, [order]);

    const infoActions = (variables) => {
        const { action, index } = variables;
        if (action === "openRow") {
            const path = `/infoEmail/${order.id_pedido}/${index + 1}`;
            const tabTitle = `EMAIL ${index + 1} | ${order.id_pedido}`;

            createTab(path, tabTitle);

            return { status: "success" };
        }
    }

    return (
        <>
            {(order && order._id && normalizedData.length > 0) ?
                <>
                    <div className="overlay"></div>
                    <div className="popUpTable">
                        <Table
                            actions={infoActions}
                            setPopUpTable={setInfoModal}
                            dinamicTableInfo={emailInfoTableInfo}
                            orderFilter={order?.id_pedido}
                            initialData={normalizedData}
                            openRows={true}
                            customTable={true}
                        />
                    </div>
                </>
                :
                <ExecutingComponent />
            }
        </>
    )
}

export default OrderInfoPopUp