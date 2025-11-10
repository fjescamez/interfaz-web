import { useState } from "react";
import Table from "../components/Table.jsx";
import { groupTableInfo } from "../helpers/tablesInfo.jsx";

function GroupsPage({ filter }) {
    const [groupIds, setGroupIds] = useState([]);

    const groupsActions = (variables) => {
        const { action } = variables;
        if (action === "eliminar") {

        }
    }

    return (
        <Table
            actions={groupsActions}
            clientFilter={filter}
            dinamicTableInfo={groupTableInfo}
            checkedRows={groupIds}
            setCheckedRows={setGroupIds}
            publicForm={true}
        />
    )
}

export default GroupsPage