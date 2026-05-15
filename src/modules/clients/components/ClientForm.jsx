import { useMemo } from "react";
import GeneralForm from "../../../components/formComponents/GeneralForm";
import { clientFormData } from "../config/client.config";

function ClientForm({ setModal, mode, setTableData, setTotal, client }) {

    const clientData = useMemo(() => {
        if (mode === "edit") {
            return {
                name: client?.name || "",
                company: client?.company || "",
                code: client?.code || "",
                communications: {
                    phone: client?.phone || "",
                    email: client?.email || ""
                }
            };
        }

        return {
            name: "",
            company: "",
            code: "",
            communications: {
                phone: "",
                email: ""
            }
        };
    }, [mode, client]);

    return (
        <GeneralForm
            setModal={setModal}
            formData={clientFormData}
            itemsData={clientData}
            endpoint={"clients"}
            setTableData={setTableData}
            setTotal={setTotal}
            mode={mode}
            _id={client?._id}
        />
    );
}

export default ClientForm;