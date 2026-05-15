import GeneralForm from "../../../components/formComponents/GeneralForm";
import { userFormData } from "../config/user.config";

function UserForm({ setModal, mode, setTableData, setTotal, user, setUser }) {
    let userData = {};
    let { username, name, lastname, role, departments, responsibleDepartments, email, teleWork, _id } = user || {};

    if (mode && mode === "edit") {
        userData = {
            username,
            name,
            lastname,
            role,
            departments,
            responsibleDepartments,
            email,
            teleWork
        }
    }

    return (
        <GeneralForm
            setModal={setModal}
            formData={userFormData}
            itemsData={userData}
            endpoint={"users"}
            setTableData={setTableData}
            setData={setUser}
            setTotal={setTotal}
            mode={mode}
            _id={_id}
        />
    )
}

export default UserForm