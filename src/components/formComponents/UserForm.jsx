import GeneralForm from "./GeneralForm";
import { userFormData } from "../../helpers/formsData";

function UserForm({ setModal, mode, setTableData, setTotal, user }) {
    let userData = {};
    let { username, name, lastname, role, departments, email, _id } = user || {};

    if (mode && mode === "edit") {
        userData = {
            username,
            name,
            lastname,
            role,
            departments,
            email
        }
    } else {
        userData = {
            username: "",
            name: "",
            lastname: "",
            role: "Operario",
            departments: [],
            email: "",
            password: ""
        }
    }

    return (
        <GeneralForm
            setModal={setModal}
            formData={userFormData}
            itemsData={userData}
            endpoint={"users"}
            setTableData={setTableData}
            setTotal={setTotal}
            mode={mode}
            _id={_id}
        />
    )
}

export default UserForm