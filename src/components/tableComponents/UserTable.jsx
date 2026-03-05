/* import { useEffect, useState } from "react";
import "../TableComponent.css"
import Table from "../Table.jsx";
import UserForm from "../formComponents/UserForm.jsx";
import { fetchData } from "../../helpers/fetchData.jsx";

// Guardar en usuario su configuracion de columnas activas y al cargar la página mostrar las suyas
import { userTableInfo } from "../../helpers/tablesInfo.jsx";
import { useSession } from "../../context/SessionContext.jsx";
import { getUserPreferences } from "../../helpers/userPreferences.jsx";

function UserTable() {
    const { session, userPreferences } = useSession();
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [tableInfo, setTableInfo] = useState(userTableInfo);

    const getUsers = (page, searchValue) => {
        fetchData("users", searchValue, page, setUsers, setTotal);
    }

    // Fetch de preferencias de usuario al cargar la página
    useEffect(() => {
        if (userPreferences) {
            getUserPreferences(session, tableInfo, setTableInfo, "usuarios");
        }
    }, []);

    // Fetch de usuarios al buscar o mostrar más
    useEffect(() => {
        if (page > 1) {
            getUsers(page, search);
        }
    }, [page]);

    return (
        <Table
            tableData={users}
            setTableData={setUsers}
            formComponent={<UserForm setModal={setModal} setTableData={setUsers} setTotal={setTotal} />}
            modal={modal}
            setModal={setModal}
            total={total}
            page={page}
            setPage={setPage}
            search={search}
            setSearch={setSearch}
            tableInfo={tableInfo}
            getData={getUsers}
            tableName={"usuarios"}
        />
    )
}

export default UserTable */