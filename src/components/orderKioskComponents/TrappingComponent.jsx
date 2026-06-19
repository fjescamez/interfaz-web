import Switch from '@mui/material/Switch';
import { trappingFormData } from '../../helpers/orderKioskActions'
import { useTabState } from '../../context/TabStateContext';
import { notify } from '../../helpers/notify';
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import SubmitButton from '../buttons/SubmitButton';
import FormGroup from '../formComponents/FormGroup';
import { useSession } from '../../context/SessionContext';
import { postData } from '../../helpers/fetchData';
import { continue_workable_from_kiosk } from '../../helpers/cloudflow/hub';


function TrappingComponent({ state, updateState, workablesId, node_id, fromWorkable, setHoldInKiosk }) {

    const { postDataContext, updateTabState } = useTabState();
    const location = useLocation();
    const key = location.pathname;
    const { session } = useSession();
    const [mostrarParametros, setMostrarParametros] = useState(!node_id);
    const [mostrarAcciones, setMostrarAcciones] = useState(!!node_id);

    useEffect(() => {
        if (node_id) {
            setMostrarParametros(false);
            setMostrarAcciones(true);
        } else {
            setMostrarParametros(true);
            setMostrarAcciones(false);
        }
    }, [node_id]);

    useEffect(() => {
        // Mensajes de error
        if (state?.trappingData?.manual) {
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

            if (state?.orderReport) {
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
                    if (state?.trappingData.remetido !== "No" && (state.trappingData.distancia_remetido === "0" || state.trappingData.distancia_remetido === "")) {
                        const exists = next.some(item => item.message === error2.message && JSON.stringify(item.type) === JSON.stringify(error2.type));
                        if (!exists) next = [...next, error2];
                    } else {
                        // Eliminar error2 si ya no corresponde
                        next = next.filter(item => !(item.message === error2.message && JSON.stringify(item.type) === JSON.stringify(error2.type)));
                    }
                    return next;
                });
            }
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

    const setLoadingTrappingTabState = (value) => {
        updateTabState(key, (prev) => ({
            ...prev,
            loadingTrapping: value
        }));
    };


    const handleTrappingConfirmation = async (action) => {
        updateState("loadingTrapping", true);
        setMostrarAcciones(false);

        setMostrarParametros(false);
        setLoadingTrappingTabState(true);

        let to_connector = "";

        if (action === "aceptar") {
            to_connector = "decision.0";
        } else if (action === "modificar") {
            to_connector = "decision.72";
        } else if (action === "cancelar") {
            to_connector = "decision.74";
        }

        const variables = {
            trapping: state.trappingData || null
        };
        const workable_id = workablesId;

        if (!workable_id) {
            console.log("workable_id", workable_id)
            notify("error", "Selecciona una tarea antes de realizar alguna accion");
            return
        }

        try {
            console.log("antes del post")
            const res = await continue_workable_from_kiosk(
                workable_id,
                node_id,
                to_connector,
                variables
            );

            if (res.error) {
                notify("error", "Selecciona una tarea antes de realizar alguna accion");
                setMostrarAcciones(true);
                return
            }

            setHoldInKiosk(false);
            

        } catch (err) {
            console.error("fetch error:", err);
        }
    }

    return (
        <div className={`actionBody`}>
            <div className="trappingKiosk">
                {(!state?.isTrappingDone && !state?.isTrappingWaiting && !state?.isTrappingCanceled && !fromWorkable) && (
                    <div className="switches">
                        <div className="switchGroup">
                            <Switch
                                className="kioskSwitch"
                                checked={state?.trappingData?.manual || false}
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
                {mostrarParametros && (
                    <div className="kioskFormRow">
                        {trappingFormData.formFields.map((field, index) => (

                            <div key={index} className="formGroup">
                                <FormGroup
                                    value={state?.trappingData ? state.trappingData[field.htmlFor] ?? "" : ""}
                                    handleForm={handleForm}
                                    field={field}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div className="buttons">
                    {mostrarAcciones && !mostrarParametros && (
                        <>
                            <SubmitButton onClick={() => handleTrappingConfirmation("aceptar")} text="Aceptar" />
                            <SubmitButton onClick={() => setMostrarParametros(true)} text="Modificar" />
                            <SubmitButton onClick={() => handleTrappingConfirmation("cancelar")} text="Cancelar y Eliminar" />
                        </>
                    )}

                    {mostrarAcciones && mostrarParametros && (
                        <>
                            <SubmitButton onClick={() => handleTrappingConfirmation("modificar")} text="Aplicar nuevos valores" />
                            <SubmitButton onClick={() => setMostrarParametros(false)} text="volver" />
                        </>
                    )}


                </div>

            </div>
        </div>
    )
}

export default TrappingComponent