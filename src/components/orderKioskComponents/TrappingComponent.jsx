import Switch from '@mui/material/Switch';
import { trappingFormData } from '../../helpers/orderKioskActions'
import { useTabState } from '../../context/TabStateContext';
import { notify } from '../../helpers/notify';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import SubmitButton from '../buttons/SubmitButton';
import FormGroup from '../formComponents/FormGroup';

function TrappingComponent({ state, id_pedido, trappingData, updateState, workableId, nodeId, loadingTrapping, isTrappingDone, isTrappingWaiting, isTrappingCanceled }) {
    const { postDataContext, updateTabState } = useTabState();
    const location = useLocation();
    const key = location.pathname;

    useEffect(() => {
        // Mensajes de error
        if (state.trappingData.manual) {
            updateState("orderReport", (prevOrderReport) => prevOrderReport.filter(item => !item?.type?.includes("trapping") && item?.status !== "warning"));
        } else {
            const error1 = {
                status: "warning",
                message: "No hay distancia de trapping ni remetido",
                type: ["trapping"]
            };
            const error2 = {
                status: "warning",
                message: "Se ha indicado remetido pero no se ha indicado distancia de remetido",
                type: ["trapping"]
            };

            updateState("orderReport", (prevOrderReport) => {
                let next = prevOrderReport;
                // Añadir error1 si corresponde
                if ((state.trappingData.distancia_trapping === "0" || state.trappingData.distancia_trapping === "") && state.trappingData.remetido === "No") {
                    const exists = prevOrderReport.some(item => item.message === error1.message && JSON.stringify(item.type) === JSON.stringify(error1.type));
                    if (!exists) next = [...next, error1];
                } else {
                    // Eliminar error1 si ya no corresponde
                    next = next.filter(item => !(item.message === error1.message && JSON.stringify(item.type) === JSON.stringify(error1.type)));
                }
                // Añadir error2 si corresponde
                if (state.trappingData.remetido !== "No" && (state.trappingData.distancia_remetido === "0" || state.trappingData.distancia_remetido === "")) {
                    const exists = next.some(item => item.message === error2.message && JSON.stringify(item.type) === JSON.stringify(error2.type));
                    if (!exists) next = [...next, error2];
                } else {
                    // Eliminar error2 si ya no corresponde
                    next = next.filter(item => !(item.message === error2.message && JSON.stringify(item.type) === JSON.stringify(error2.type)));
                }
                return next;
            });
        }
    }, [state.trappingData]);

    const handleForm = (e) => {
        const { name, type, value, checked } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        updateState("trappingData", (prev) => ({
            ...prev,
            [name]: newValue
        }));
    }

    const applyTrappingConfirmation = (prev) => ({
        ...prev,
        loadingTrapping: false
    });

    const setLoadingTrappingTabState = (value) => {
        updateTabState(key, (prev) => ({
            ...prev,
            loadingTrapping: value
        }));
    };

    const handleTrappingConfirmation = async (action) => {
        updateState("loadingTrapping", true);
        setLoadingTrappingTabState(true);
        let to_connector = "";

        if (action === "aceptar") {
            to_connector = "decision.0";
        } else if (action === "modificar") {
            to_connector = "decision.72";
        } else if (action === "cancelar") {
            to_connector = "decision.74";
        }

        await postDataContext("orderKiosks/confirmTrapping", {
            trappingData,
            workable_id: workableId,
            node_id: nodeId,
            to_connector,
            id_pedido
        }, (res) => {
            if (action !== "modificar") {
                updateState("loadingTrapping", false);
                updateTabState(key, applyTrappingConfirmation);
            }

            if (res.isTrappingCanceled) {
                updateState("isTrappingCanceled", true);
                updateState("isTrappingWaiting", false);
                updateTabState(key, (prevState) => ({
                    ...prevState,
                    isTrappingCanceled: true,
                    isTrappingWaiting: false
                }));
            }

            if (action === "aceptar") {
                updateState("isTrappingDone", true);
                updateState("isTrappingWaiting", false);
                updateTabState(key, (prevState) => ({
                    ...prevState,
                    isTrappingDone: true,
                    isTrappingWaiting: false
                }));
            }
        }, (err) => {
            notify("error", err.title);
            updateState("loadingTrapping", false);
            updateTabState(key, applyTrappingConfirmation);
        });

        // setLoadingTrappingTabState(false);
    }

    return (
        <div className="actionBody">
            <div className="trappingKiosk">
                {(!isTrappingDone && !isTrappingWaiting && !isTrappingCanceled) && (
                    <div className="switches">
                        <div className="switchGroup">
                            <Switch
                                className="kioskSwitch"
                                checked={trappingData.manual || false}
                                onChange={e => {
                                    updateState("trappingData", (prev) => ({
                                        ...prev,
                                        manual: e.target.checked
                                    }));
                                }}
                            />
                            <p>Manual</p>
                        </div>
                    </div>
                )}
                {!trappingData.manual && (
                    <div className="kioskFormRow">
                        {trappingFormData.formFields.map((field) => (
                            <div className="formGroup">
                                <FormGroup
                                    value={trappingData ? trappingData[field.htmlFor] ?? "" : ""}
                                    handleForm={handleForm}
                                    field={field}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {isTrappingWaiting && !loadingTrapping && (
                    <div className="buttons">
                        <SubmitButton onClick={() => handleTrappingConfirmation("aceptar")} text="Aceptar" />
                        <SubmitButton onClick={() => handleTrappingConfirmation("modificar")} text="Modificar valor" />
                        <SubmitButton onClick={() => handleTrappingConfirmation("cancelar")} text="Cancelar y eliminar trapping" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default TrappingComponent