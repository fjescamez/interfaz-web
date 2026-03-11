import Table from "../components/Table.jsx";
import { clientTableInfo } from "../helpers/tablesInfo.jsx";

function ClientsPage() {
    return (

        <Table
            dinamicTableInfo={clientTableInfo}
            tabTitleTemplate={"{name}"}
        />

    )
}

export default ClientsPage