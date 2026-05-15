import Table from "../../../components/Table";
import { clientTableInfo } from "../config/client.config";

function ClientsPage() {

    return (
        <Table
            dinamicTableInfo={clientTableInfo}
            tabTitleTemplate="{name}"
        />
    );
}

export default ClientsPage;