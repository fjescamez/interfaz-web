import { orderLenTableInfo } from '../config/order.config';
import LenTable from "./LenTable";

function OrderLenTable({ setLenModal, orderId }) {
    return (
        <>
            <LenTable
                setLenModal={setLenModal}
                orderId={orderId}
                lenTableInfo={orderLenTableInfo}
                popup={true}
                customTable={true}
            />
        </>
    )
}

export default OrderLenTable