import GeneralForm from "./GeneralForm"
import { clientFormData } from "../../helpers/formsData";

function ClientForm({ setModal, mode, setTableData, setTotal, client }) {
    let clientData = {};
    let { name, code, company, phone, email, _id } = client || {};

    if (mode && mode === "edit") {
        clientData = {
            name,
            company,
            code,
            communications: {
                phone,
                email
            }
        }
    } else {
        clientData = {
            name: "",
            company: "",
            code: "",
            communications: {
                phone: "",
                email: ""
            }
        }
    }

    return (
        <GeneralForm
            setModal={setModal}
            formData={clientFormData}
            itemsData={clientData}
            endpoint={"clients"}
            setTableData={setTableData}
            setTotal={setTotal}
            mode={mode}
            _id={_id}
        />
    )
}

export default ClientForm