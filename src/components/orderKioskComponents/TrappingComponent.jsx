import Switch from '@mui/material/Switch';
import { trappingFormData } from '../../helpers/orderKioskActions';
import { useTabState } from '../../context/TabStateContext';
import { notify } from '../../helpers/notify';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import SubmitButton from '../buttons/SubmitButton';
import FormGroup from '../formComponents/FormGroup';
import { useSession } from '../../context/SessionContext';
import { continue_workable_from_kiosk } from '../../helpers/cloudflow/hub';

function TrappingComponent({
    state,
    updateState,
    workablesId,
    node_id,
    fromWorkable,
    setHoldInKiosk
}) {
    const { updateTabState } = useTabState();
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
        const trappingData = state?.trappingData || {};

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

        const sameError = (item, error) =>
            item?.message === error.message &&
            JSON.stringify(item?.type) === JSON.stringify(error.type);

        updateState("orderReport", (prevOrderReport) => {
            const reportSeguro = Array.isArray(prevOrderReport)
                ? prevOrderReport
                : [];

            // Si está en manual, quitamos solo los warnings de trapping
            if (trappingData.manual) {
                return reportSeguro.filter(item =>
                    !(item?.type?.includes("trapping") && item?.status === "warning")
                );
            }

            let next = [...reportSeguro];

            const sinDistanciaTrapping =
                trappingData.distancia_trapping === "0" ||
                trappingData.distancia_trapping === "" ||
                trappingData.distancia_trapping === undefined ||
                trappingData.distancia_trapping === null;

            const sinDistanciaRemetido =
                trappingData.distancia_remetido === "0" ||
                trappingData.distancia_remetido === "" ||
                trappingData.distancia_remetido === undefined ||
                trappingData.distancia_remetido === null;

            // Error 1:
            // No hay distancia de trapping ni remetido
            if (sinDistanciaTrapping && trappingData.remetido === "No") {
                const exists = next.some(item => sameError(item, error1));

                if (!exists) {
                    next = [...next, error1];
                }
            } else {
                next = next.filter(item => !sameError(item, error1));
            }

            // Error 2:
            // Hay remetido, pero no hay distancia de remetido
            if (trappingData.remetido !== "No" && sinDistanciaRemetido) {
                const exists = next.some(item => sameError(item, error2));

                if (!exists) {
                    next = [...next, error2];
                }
            } else {
                next = next.filter(item => !sameError(item, error2));
            }

            return next;
        });
    }, [state?.trappingData]);

    const handleForm = (e) => {
        const { name, type, value, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        updateState("trappingData", (prev) => ({
            ...(prev || {}),
            [name]: newValue
        }));
    };

    const setLoadingTrappingTabState = (value) => {
        updateTabState(key, (prev) => ({
            ...(prev || {}),
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
            trapping: state?.trappingData || null
        };

        const workable_id = workablesId;

        if (!workable_id) {
            notify("error", "Selecciona una tarea antes de realizar alguna accion");
            setMostrarAcciones(true);
            setLoadingTrappingTabState(false);
            return;
        }

        try {
            const res = await continue_workable_from_kiosk(
                workable_id,
                node_id,
                to_connector,
                variables
            );

            if (res?.error) {
                notify("error", "Selecciona una tarea antes de realizar alguna accion");
                setMostrarAcciones(true);
                setLoadingTrappingTabState(false);
                return;
            }

            setHoldInKiosk(false);
        } catch (err) {
            console.error("fetch error:", err);
            notify("error", "Error al continuar la tarea");
            setMostrarAcciones(true);
            setLoadingTrappingTabState(false);
        }
    };

    return (
        <div className="actionBody">
            <div className="trappingKiosk">
                {(
                    !state?.isTrappingDone &&
                    !state?.isTrappingWaiting &&
                    !state?.isTrappingCanceled &&
                    !fromWorkable
                ) && (
                    <div className="switches">
                        <div className="switchGroup">
                            <Switch
                                className="kioskSwitch"
                                checked={state?.trappingData?.manual || false}
                                onChange={e => {
                                    updateState("trappingData", (prev) => ({
                                        ...(prev || {}),
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
                                    value={state?.trappingData?.[field.htmlFor] ?? ""}
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
                            <SubmitButton
                                onClick={() => handleTrappingConfirmation("aceptar")}
                                text="Aceptar"
                            />
                            <SubmitButton
                                onClick={() => setMostrarParametros(true)}
                                text="Modificar"
                            />
                            <SubmitButton
                                onClick={() => handleTrappingConfirmation("cancelar")}
                                text="Cancelar y Eliminar"
                            />
                        </>
                    )}

                    {mostrarAcciones && mostrarParametros && (
                        <>
                            <SubmitButton
                                onClick={() => handleTrappingConfirmation("modificar")}
                                text="Aplicar nuevos valores"
                            />
                            <SubmitButton
                                onClick={() => setMostrarParametros(false)}
                                text="volver"
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrappingComponent;