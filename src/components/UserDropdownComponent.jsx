import "./UserDropdownComponent.css";
import { useTabs } from "../context/TabsContext";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
//import avatar from "../assets/img/avatar.jpg";
import EditPencilSvg from "../assets/svg/EditPencilSvg";

function UserDropdownComponent({ toggleUserDropdown, toggleKiosk }) {
    const navigate = useNavigate();
    const { setTabs } = useTabs();
    const { session, setSession, avatar } = useSession();

    const handleClick = () => {
        toggleUserDropdown();
        setTabs([]);
        localStorage.removeItem("session");
        localStorage.removeItem("userPreferences");
        setSession(null);
        navigate("/login");
    };

    return (
        <div className="userDropdown">
            <div className="userInfo">
                <div className="iconContainer" onClick={() => toggleKiosk("users", session._id)}>
                    <img className="avatar" src={avatar} alt="" />
                    <div className="editContainer">
                        <EditPencilSvg className="edit" />
                    </div>
                </div>
                <p>{session.name} {session.lastname}</p>
                <span>{session.departments.join(" - ")}</span>
            </div>
            <div className="border"></div>

            <div className="infoPanel">
                <div className="sectionTitle">
                    <p>Mi bandeja</p>
                    <p className="titleNumber">5</p>
                </div>
                <div className="section">
                    <span>Asignados</span>
                    <span>1</span>
                </div>
                <div className="section">
                    <span>Parados</span>
                    <span>2</span>
                </div>
                <div className="section">
                    <span>En espera</span>
                    <span>2</span>
                </div>
            </div>
            <div className="border"></div>
            <div className="infoPanel">
                <div className="sectionTitle">
                    <p>Partes</p>
                    <p className="titleNumber">9</p>
                </div>
                <div className="section">
                    <span>Reclamaciones</span>
                    <span>6</span>
                </div>
                <div className="section">
                    <span>Incidencias</span>
                    <span>2</span>
                </div>
                <div className="section">
                    <span>Procedimiento</span>
                    <span>1</span>
                </div>
            </div>
            <button className="logout" onClick={handleClick}>Cerrar sesión</button>
        </div>
    )
}

export default UserDropdownComponent