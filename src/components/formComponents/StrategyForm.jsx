import GeneralForm from "./GeneralForm"
import { strategyFormData } from "../../helpers/formsData";

function StrategyForm({ setModal, mode, itemsData }) {
    return (
        <GeneralForm
            setModal={setModal}
            formData={strategyFormData}
            itemsData={itemsData}
            endpoint={"strategies"}
            mode={mode}
        />
    )
}

export default StrategyForm
