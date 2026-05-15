import Table from "../../../components/Table";
import { userTableInfo } from "../config/user.config";

function UsersPage() {
    return (
        <Table
            dinamicTableInfo={userTableInfo}
            tabTitleTemplate={"{username}"}
        />
    )
}

export default UsersPage