import { useState } from "react";
import Table from "../../../components/Table.jsx";
import { groupTableInfo } from "../config/contact.config.js";

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
            tabTitleTemplate={"{grupo}"}
            specificPath={`/${groupTableInfo.tableName}`}
        />
    )
}

export default GroupsPage