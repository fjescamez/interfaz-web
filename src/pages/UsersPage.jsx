import Table from "../components/Table"
import { userTableInfo } from "../helpers/tablesInfo";

function UsersPage() {
    return (
        <Table
            dinamicTableInfo={userTableInfo}
            tabTitleTemplate={"{username}"}
        />
    )
}

export default UsersPage