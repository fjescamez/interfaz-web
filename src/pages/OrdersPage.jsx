import Table from "../components/Table";
import { orderTableInfo } from "../helpers/tablesInfo";

function OrdersPage({ filter }) {
    return (
        <Table
            clientFilter={filter}
            dinamicTableInfo={orderTableInfo}
            normalizedData={true}
        />
    )
}

export default OrdersPage