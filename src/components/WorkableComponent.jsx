import "./WorkableComponent.css";
import { RiProhibited2Line } from "react-icons/ri";
import { FaPause, FaPlay, FaFlag } from "react-icons/fa";
import TrappingComponent from "./orderKioskComponents/TrappingComponent";
import { RxCross2 } from "react-icons/rx";
import { checkRole } from "../helpers/roleChecker";
import { get_variables_from_workable } from "../helpers/cloudflow/hub";
import { useEffect, useState, useRef } from "react";


function WorkableComponent({ jacketId, workable, id_pedido, listProgress, setUserJackets }) {

    const [progress, setProgress] = useState({});
    const requestRef = useRef(0);
    const workablesId = workable?.id;
    const [holdInKiosk, setHoldInKiosk] = useState(
        workable?.hold_in_kiosk ?? false
    );

    const [variablesWorkable, setVariablesWorkable] = useState({});
    const whitepaperUrl = `http://192.4.26.120:9090/portal.cgi?quantum&jacketId=${jacketId}&workableId=${workablesId}`;

    const {
        id: workable_id,
        node_id,
        name: workable_name,
        start_whitepaper,
        start_node,
        node,
        whitepaper,
        log: nodeHistory = [],
        state: workable_state,
        aborted: workable_aborted,
        done: workable_done,
        hold_in_kiosk: workable_hold_in_kiosk
    } = workable || {};

    const { isTecnico } = checkRole();

    const [state, setState] = useState({
        id_pedido,
        loadingTrapping: false,
        isTrappingCanceled: false,
        isTrappingDone: false,
        isTrappingWaiting: true,
        trappingData: variablesWorkable?.trapping
    });

    const updateHoldInKiosk = (value) => {

        setHoldInKiosk(value);

        setUserJackets(prev =>
            prev.map(jacket => {

                if (jacket.id !== jacketId) return jacket;

                return {
                    ...jacket,
                    hold_in_kiosk: value,
                    log: jacket.log?.map(w =>
                        w.id === workable.id
                            ? {
                                ...w,
                                hold_in_kiosk: value
                            }
                            : w
                    )
                };
            })
        );
    };

    const updateState = (key, value) => {
        setState(prev => ({
            ...prev,
            [key]: typeof value === "function" ? value(prev[key]) : value
        }));
    };

    const getVariablesWorkable = async () => {
        const requestId = ++requestRef.current;
        const variables = ["trapping"];

        try {
            const res = await get_variables_from_workable(
                workable_id, variables
            );

            if (requestId !== requestRef.current) return;
            setVariablesWorkable(res.variables);

        } catch (err) {
            console.error("fetch error:", err);
        }
    }

    useEffect(() => {
        setHoldInKiosk(workable_hold_in_kiosk ?? false);
    }, [workable_hold_in_kiosk]);

    useEffect(() => {
        if (!workable_id || !workable_hold_in_kiosk) return;
        getVariablesWorkable();
    }, [workable_id])

    useEffect(() => {
        if (!variablesWorkable?.trapping) return;

        setState(prev => ({
            ...prev,
            trappingData: variablesWorkable.trapping
        }));
    }, [variablesWorkable]);

    useEffect(() => {
        setProgress(listProgress.filter(progress => progress.id === workable.id))
    }, [listProgress]);

    return (
        <div className="workableItem">
            <div className="workableHeader">

                <div className="icon">
                    {workable_state === "error"
                        ? <RxCross2 color="red" />
                        : workable_aborted
                            ? <RiProhibited2Line color="red" />
                            : holdInKiosk
                                ? <FaPause />
                                : workable_done
                                    ? <FaFlag color="yellowgreen" />
                                    : <FaPlay color="green" />
                    }
                </div>

                <p>{workable_name}</p>
            </div>

            <div className="workableBody">

                <div className="workableInfo">
                    <p>
                        <span className="bold">Inicio</span>
                        <span>{start_whitepaper} - {start_node}</span>
                    </p>

                    <p>
                        <span className="bold">Actual</span>
                        <span>
                            <span
                                className={isTecnico ? "hover" : ""}
                                onClick={() => window.open(whitepaperUrl, "_blank")}
                            >
                                {whitepaper}
                            </span>
                            <span> - {node}</span>
                        </span>

                    </p>

                    <p>
                        <span className="bold">Estado</span>
                        <span>{workable_state} {workable_aborted && "(cancelado)"}</span>
                    </p>

                    <p>
                        <span className="bold">Finalizado</span>
                        <span>{workable_done ? "Sí" : "No"}</span>
                    </p>
                </div>

                {(whitepaper === "Iniciar Tarea_2020"
                    && holdInKiosk
                    && node === "Aprobación"
                    && !workable_aborted) && (

                        <div className="trappingComponent">
                            <TrappingComponent
                                state={state}
                                updateState={updateState}
                                id_pedido={state.id_pedido}
                                workablesId={workablesId}
                                node_id={node_id}
                                fromWorkable={true}
                                setHoldInKiosk={updateHoldInKiosk}
                            />
                        </div>
                    )}

            </div>
        </div>
    );
}

export default WorkableComponent;