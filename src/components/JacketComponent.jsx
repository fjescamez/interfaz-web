import "./JacketComponent.css";
import { RiProhibited2Line } from "react-icons/ri";
import { FaPause, FaPlay, FaFlag } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { memo, useRef, useState } from "react";
import { cleanup_jacket } from "../helpers/cloudflow/hub";
import { notify } from "../helpers/notify";

function JacketComponent({ jacket, selectedJacketId, setSelectedJacketId, actions, cleanDeleted }) {
    const workables = Array.isArray(jacket?.log) ? jacket.log : [];
    const requestRef = useRef(0);
    const [deleting, setDeleting] = useState(false);

    const { birth, aborted, done, hold_in_kiosk, name } = jacket || {};

    const formattedDate = birth
        ? new Date(birth).toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })
        : "";

    //const hasError = workables.some(w => w?.workable_state === "error");
    const hasError = jacket.state === "error";
    const canDelete = actions?.some(
        action =>
            action.jacket_id === jacket?.id &&
            action.action === "delete"
    );


    const cleanupJacket = async () => {
        if (deleting) return;

        setDeleting(true);

        try {
            const res = await cleanup_jacket(jacket.id);
            console.log("res", res)

            if (res.error) {
                notify("error", "Error al Eliminar la Tarea")
                setDeleting(false);
                return
            }

            cleanDeleted(jacket.id);

        } catch (error) {
            console.error("fetch error:", error);
            setDeleting(false);
        }
    }


    return (
        <div
            className={`jacketItem ${selectedJacketId === jacket?.id ? "selected" : ""}`}
            onClick={() => setSelectedJacketId(jacket.id)}
        >
            <div className="left">
                <div className="icon">
                    {hasError
                        ? <RxCross2 color="red" />
                        : aborted
                            ? <RiProhibited2Line color="red" />
                            : done
                                ? <FaFlag color="green" />
                                : hold_in_kiosk
                                    ? <FaPause />
                                    : <FaPlay color="green" />
                    }
                </div>

                <p className="title">{name}</p>
            </div>

            <div className="right">
                <p className="date">{formattedDate}</p>

                <div
                    className={`icon deleteIcon ${canDelete && !deleting ? "enabled" : ""} ${deleting ? "deleting" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (!canDelete || deleting) return;

                        cleanupJacket();
                    }}
                >
                    {canDelete && (
                        <RiDeleteBin6Line />
                    )}
                </div>
            </div>

        </div>
    );
}

export default memo(JacketComponent);