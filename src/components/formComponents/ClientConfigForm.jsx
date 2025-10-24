import GeneralForm from "./GeneralForm";

function ClientConfigForm({ setModal, itemsData, setItemsData, formData }) {
    return (
        <GeneralForm
            setModal={setModal}
            formData={formData}
            itemsData={itemsData}
            setData={setItemsData}
            endpoint={"clientConfig/update"}
        />
    )
}

export default ClientConfigForm