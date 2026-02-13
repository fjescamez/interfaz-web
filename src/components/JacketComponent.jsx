import "./JacketComponent.css";
import { RiProhibited2Line } from "react-icons/ri";
import { FaPause, FaPlay, FaFlag } from "react-icons/fa";

function JacketComponent({ jacket, selectedJacket, setSelectedJacket }) {
    const { birth, aborted, done, hold_in_kiosk, name } = jacket;

    const formattedDate = new Date(birth).toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    return (
        <div className={`jacketItem ${selectedJacket?._id === jacket._id ? "selected" : ""}`} onClick={() => setSelectedJacket(jacket)}>
            <div className="left">
                <div className="icon">{
                    aborted ? <RiProhibited2Line color="red" /> : done ? <FaFlag color="green" /> : hold_in_kiosk ? <FaPause /> : <FaPlay color="green" />
                }</div>
                <p className="title">{name}</p>
            </div>
            <div className="right">
                <p className="date">{formattedDate}</p>
            </div>
        </div>
    )
}

export default JacketComponent