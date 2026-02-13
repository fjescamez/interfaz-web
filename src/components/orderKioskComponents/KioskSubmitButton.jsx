import { notify } from '../../helpers/notify';
import { postData } from '../../helpers/fetchData';
import SubmitButton from '../buttons/SubmitButton';
import PlayButton from '../buttons/PlayButton';
import { useTabState } from '../../context/TabStateContext';
import { useLocation } from "react-router-dom";
import { useSession } from '../../context/SessionContext';
import { useTabs } from '../../context/TabsContext';

function KioskSubmitButton({ state, updateState, buttonAction, buttonText, components }) {
    const { postDataContext, updateTabState, removeTabState } = useTabState();
    const { createTab } = useTabs();
    const location = useLocation();
    const tabKey = location.pathname;
    const { session } = useSession();

    const handleSubmit = async (action) => {
        if (
            state.orderReport.some(item =>
                item.type &&
                Object.keys(state.isActive).some(key => state.isActive[key] && item.type.includes(key))
            )
        ) return notify("warning", "Error de kiosco", "Alguno de los módulos a ejecutar tiene errores.", 1500);

        updateState("hideSubmitButton", true);
        let dataToSend = {
            _id: state.order?._id || "",
            id_pedido: state.order?.id_pedido || ""
        };

        if (action === "submit") {
            dataToSend.salidaColores = state.salidaColores || [];
            dataToSend.listDigimark = state.listDigimark || [];
            dataToSend.listMontajes = Object.keys(state.montajeData || {}).filter((key) => state.montajeData[key]?.isActive) || [];

            Object.keys(state.isActive).forEach(key => {
                if (state.isActive[key]) {
                    dataToSend[key] = components[key].data;
                }
            });
        } else if (action === "saveConfig") {
            Object.keys(components).forEach(key => {
                if (!components[key].noSave) {
                    dataToSend[key] = components[key].data;
                }
            });
        }

        // En MADERA la config avanzada se activa por elemento desde "Montaje",
        // no desde el switch general de kioskActions.
        if (state.actividad === "MADERA") {
            const activeConfigKeys = Object.keys(state.montajeData || {}).filter((key) => {
                const item = state.montajeData?.[key];
                return item?.isActive && item?.isConfigAvanzadaActive;
            });

            if (activeConfigKeys.length > 0) {
                dataToSend.configAvanzadaMontaje = (state.configAvanzadaData || []).filter((el) =>
                    activeConfigKeys.includes(el?.elementId)
                );
            }
        }

        if (action === "submit") {
            dataToSend.tabKey = tabKey;
            dataToSend.username = session?.username;
            if (state.isActive.trapping && !state.isTrappingDone) {
                updateState("loadingTrapping", true);
                updateTabState(tabKey, (prevState) => ({
                    ...prevState,
                    loadingTrapping: true
                }));
                dataToSend.holdInKiosk = true;
            } else {
                /* updateState("loading", true);
                updateTabState(tabKey, (prevState) => ({
                    ...prevState,
                    loading: true
                })); */
            }

            /* postDataContext(
                "orderKiosks/kioscoPedidoAuto",
                dataToSend,
                (result) => {
                    if (result.status === "success") {
                        if (result.workable_id && result.node_id) {
                            updateState("workableId", result.workable_id);
                            updateState("nodeId", result.node_id);
                            updateState("isTrappingWaiting", true);
                            updateState("isOpen", (prevIsOpen) => ({
                                ...prevIsOpen,
                                trapping: true
                            }));
                            updateTabState(tabKey, (prevState) => ({
                                ...prevState,
                                isOpen: {
                                    ...prevState.isOpen,
                                    trapping: true
                                },
                                isTrappingWaiting: true,
                                workableId: result.workable_id,
                                nodeId: result.node_id,
                                loadingTrapping: false
                            }));
                        }
                        notify("success", result.title, result.message);
                    } else {
                        notify("error", result.title, result.message);
                    }
                },
                (error) => {
                    notify("error", "Error", "Ha ocurrido un error en el envío.");
                }
            ); */
            postData("orderKiosks/kioscoPedidoAuto", dataToSend);
            createTab("/kiosco", "KIOSCO GENERAL");
            removeTabState(tabKey);
        } else if (action === "saveConfig") {
            const activosDefault = Object.keys(state.isActive).filter(key => state.isActive[key]);
            const abiertosDefault = Object.keys(state.isOpen).filter(key => state.isOpen[key]);
            const datosDefault = dataToSend;

            const data = {
                cliente_id: state.cliente._id || "",
                nombre: state.kioskName || "",
                activosDefault,
                abiertosDefault,
                datosDefault
            }

            const result = await postData("clientConfig/update", data);
            if (result.status === "success") {
                notify("success", "Configuración guardada", "La configuración del kiosco se ha guardado correctamente para este cliente.");
            } else {
                notify("error", "Error al guardar", "Ha ocurrido un error al guardar la configuración del kiosco para este cliente.");
            }
        } else if (action === "deleteConfig") {
            const result = await postData("clientConfig/delete", { cliente_id: state.cliente._id, key: "kioscos", nombre: state.chosenKiosk.nombre || null });

            if (result.status === "success") {
                notify(result.status, result.title, result.message);
            } else if (result.status === "warning") {
                notify(result.status, result.title, result.message);
            }
        }

        updateState("loadingTrapping", false);
        updateState("loading", false);
    };

    return (
        <>
            {buttonAction === "submit" && <PlayButton onClick={() => handleSubmit(buttonAction)} text={buttonText} />}
            {buttonAction === "saveConfig" && <SubmitButton onClick={() => handleSubmit(buttonAction)} text={buttonText} />}
        </>
    )
}

export default KioskSubmitButton