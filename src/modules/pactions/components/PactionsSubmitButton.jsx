import { notify } from '../../../helpers/notify';
import { postData } from '../../../helpers/fetchData';
import SubmitButton from '../../../components/buttons/SubmitButton';
import PlayButton from '../../../components/buttons/PlayButton';
import { useTabState } from '../../../context/TabStateContext';
import { useLocation } from "react-router-dom";
import { useSession } from '../../../context/SessionContext';
import { useTabs } from '../../../context/TabsContext';

function PactionsSubmitButton({ state, updateState, buttonAction, buttonText, configExportPdf }) {
    const { postDataContext, updateTabState, removeTabState } = useTabState();
    const { createTab } = useTabs();
    const location = useLocation();
    const tabKey = location.pathname;
    const { session } = useSession();

    const handleSubmit = async (action) => {

        updateState(prev => ({
            ...prev,
            runningExport: true,
            isOpen: {
                ...prev.isOpen,
                exportPdf: false
            },
            step: 3
        }));

        let dataToSend = {
            configExportPdf,
            id_pedido: state.order?.id_pedido || "",
            file: state.unitarioData.archivo.url
        };

        if (action === "submit") {
            dataToSend.tabKey = tabKey;
            dataToSend.username = session?.username;

            const res = await postData("orderKiosks/kioscoPaction", dataToSend);

            if (res) {

                updateState(prev => ({
                    ...prev,
                    runningExport: false,
                    step: 4
                }));
            }

            //createTab("/Paction", "KIOSCO GENERAL");
            //removeTabState(tabKey);
        }
    };

    return (
        <>
            {buttonAction === "submit" && <PlayButton onClick={() => handleSubmit(buttonAction)} text={buttonText} />}
            {buttonAction === "saveConfig" && <SubmitButton onClick={() => handleSubmit(buttonAction)} text={buttonText} />}
        </>
    )
}

export default PactionsSubmitButton