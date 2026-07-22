import "./ItemEmailComponent.css";
import { RiProhibited2Line } from "react-icons/ri";
import { FaPause, FaPlay, FaFlag } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { memo, useRef, useState } from "react";
import { cleanup_jacket } from "../../../helpers/cloudflow/hub";
import { notify } from "../../../helpers/notify";

function ItemEmailComponent({ email, selectedEmailId, setSelectedEmailId, actions, cleanDeleted }) {
    const workables = Array.isArray(email?.log) ? email.log : [];
    const requestRef = useRef(0);
    const [deleting, setDeleting] = useState(false);

    const { contacto, cliente, asunto, cuerpoHtml, aborted, done, hold_in_kiosk, name, birth } = email || {};

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
    const hasError = email.state === "error";
    const canDelete = actions?.some(
        action =>
            action.jacket_id === jacket?.id &&
            action.action === "delete"
    );


    const cleanupJacket = async () => {
        alert("eliminar")
    }


    return (
        <div
            className={`jacketItem ${selectedEmailId === email?._id ? "selected" : ""}`}
            onClick={() => setSelectedEmailId(email._id)}
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

                <div className="bloqueEmail">
                    <p className="title">{contacto} - {cliente}</p>
                    <p className="title">{asunto}</p>
                </div>
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

export default memo(ItemEmailComponent);