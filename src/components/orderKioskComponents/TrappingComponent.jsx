import Switch from '@mui/material/Switch';
import { trappingFormData } from '../../helpers/orderKioskActions'
import FormSection from '../formComponents/FormSection'
import { useTabState } from '../../context/TabStateContext';
import { notify } from '../../helpers/notify';

import { useLocation } from "react-router-dom";

function TrappingComponent({ id_pedido, trappingData, updateState, workableId, nodeId, loadingTrapping, isTrappingDone, isTrappingWaiting, isTrappingCanceled }) {
    const { postDataContext, updateTabState } = useTabState();
    const location = useLocation();
    const key = location.pathname;

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
            notify("success", res.title);
            updateState("loadingTrapping", false);
            updateTabState(key, applyTrappingConfirmation);
            console.log(res);
            
            if (res.isTrappingCanceled) {
                updateState("isTrappingCanceled", true);
                updateState("isTrappingWaiting", false);
            }

            if (action === "aceptar") {
                updateState("isTrappingDone", true);
                updateState("isTrappingWaiting", false);
            }
        }, (err) => {
            notify("error", err.title);
            updateState("loadingTrapping", false);
            updateTabState(key, applyTrappingConfirmation);
        });

        setLoadingTrappingTabState(false);
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
                    <div className="formSections">
                        {trappingFormData.formSections.map((section, index) => (
                            <div className="formSection" key={index}>
                                <FormSection
                                    sectionData={section}
                                    formFields={trappingFormData.formFields}
                                    inputData={trappingData}
                                    handleForm={handleForm}
                                    disable={loadingTrapping}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {isTrappingWaiting && !loadingTrapping && (
                    <div className="buttons">
                        <button className="submitButton" onClick={() => handleTrappingConfirmation("aceptar")}>Aceptar</button>
                        <button className="submitButton" onClick={() => handleTrappingConfirmation("modificar")}>Modificar valor</button>
                        <button className="submitButton" onClick={() => handleTrappingConfirmation("cancelar")}>Cancelar y eliminar trapping</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TrappingComponent