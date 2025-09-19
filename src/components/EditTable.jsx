import "./EditTable.css";
import { updateData } from "../helpers/fetchData";
import { useSession } from "../context/SessionContext";
import { notify } from "../helpers/notify";
import { toast } from "react-toastify";

function EditTable({ checked, checkColumn, tableInfo, setEditTable }) {
    const { session, setSession } = useSession();
    const { tableColumns, endPoint } = tableInfo;

    const savePreferences = async (data) => {
        const result = await updateData("userPreferences", data, session.username);

        if (result.status === "success") {
            const updatedSession = { ...session, preferences: result.preferences };
            localStorage.setItem("session", JSON.stringify(updatedSession));
            setSession(updatedSession);
            notify(toast.success, 'success', result.title, result.message)
            setEditTable(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const columns = Object.keys(checked).filter(key => checked[key]);

        const data = {
            tableName: endPoint,
            columns
        };

        savePreferences(data);
    }

    return (
        <div className="editTable">
            <form onSubmit={handleSubmit}>
                <ul>
                    {tableColumns.map((column) => (
                        <li key={column.key}>
                            <div key={column.key} className="checkColumns">
                                <input
                                    type="checkbox"
                                    id={column.key}
                                    checked={checked[column.key]}
                                    onChange={() => checkColumn(column.key)} />
                                <label htmlFor={column.key}>{column.header}</label>
                            </div>
                        </li>
                    ))}
                </ul>
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}

export default EditTable