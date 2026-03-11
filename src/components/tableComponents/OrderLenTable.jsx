import { orderLenTableInfo } from '../../helpers/tablesInfo';
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