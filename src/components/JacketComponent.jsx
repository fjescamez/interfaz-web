import "./JacketComponent.css";
import { RiProhibited2Line } from "react-icons/ri";
import { FaPause, FaPlay, FaFlag } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function JacketComponent({ jacket, selectedJacketId, setSelectedJacketId }) {

    const workables = Array.isArray(jacket?.log) ? jacket.log : [];

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
            </div>
        </div>
    );
}

export default JacketComponent