import "./WorkableComponent.css";
import { RiProhibited2Line } from "react-icons/ri";
import { FaPause, FaPlay, FaFlag } from "react-icons/fa";
import TrappingComponent from "./orderKioskComponents/TrappingComponent";
import { useEffect, useState } from "react";
import useSocket from "../helpers/useSocket";
import { useSession } from "../context/SessionContext";
import { RxCross2 } from "react-icons/rx";

function WorkableComponent({ jacketId, workable, id_pedido, trappingData }) {
    const whitepaperUrl = `http://192.4.26.120:9090/portal.cgi?quantum&jacketId=${jacketId}&workableId=${workable.workable}`;    
    const { workable_name, start_whitepaper_name, start_node_name, whitepaper_name, log: nodeHistory, workable_state, workable_aborted, workable_done, workable_hold_in_kiosk } = workable;
    const socket = useSocket();
    const { session } = useSession();
    const isTecnico = session?.departments?.includes("Tecnico");

    const [state, setState] = useState({
        id_pedido,
        trappingData: trappingData,
        loadingTrapping: false,
        isTrappingCanceled: false,
        isTrappingDone: false,
        isTrappingWaiting: true
    });

    const updateState = (key, value) => {
        setState(prev => ({
            ...prev,
            [key]: typeof value === "function" ? value(prev[key]) : value
        }));
    };

    return (
        <>
            <div className="workableItem">
                <div className="workableHeader">
                    <div className="icon">{
                        workable_state === "error" ? <RxCross2 color="red" /> : workable_aborted ? <RiProhibited2Line color="red" /> : workable_done ? <FaFlag color="yellowgreen" /> : workable_hold_in_kiosk ? <FaPause /> : <FaPlay color="green" />
                    }</div>
                    <p>{workable_name}</p>
                </div>
                <div className="workableBody">
                    <div className="workableInfo">
                        <p><span className="bold">Inicio</span> <span>{start_whitepaper_name} - {start_node_name}</span></p>
                        <p><span className="bold">Actual</span> <span className={isTecnico ? "hover" : ""} onClick={() => isTecnico && window.open(whitepaperUrl, "_blank")}>{whitepaper_name} - {nodeHistory[nodeHistory.length - 1]?.node_name}</span></p>
                        <p><span className="bold">Estado</span> <span>{workable_state} {workable_aborted && "(cancelado)"}</span></p>
                        <p><span className="bold">Finalizado</span> <span>{workable_done ? "Sí" : "No"}</span></p>
                    </div>
                    {(whitepaper_name === "Iniciar Tarea_2020" && workable_hold_in_kiosk && nodeHistory[nodeHistory.length - 1]?.node_name === "Aprobación" && !workable_aborted) && (
                        <div className="trappingComponent">
                            <TrappingComponent
                                state={state}
                                updateState={updateState}
                                id_pedido={state.id_pedido}
                                workableId={workable.workable}
                                nodeId={nodeHistory[nodeHistory.length - 1]?.waiting_room?.node}
                                fromWorkable={true}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default WorkableComponent