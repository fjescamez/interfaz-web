import Test from '../assets/svg/Test'
import { GrEdit } from 'react-icons/gr'
import { BsTrash3Fill } from 'react-icons/bs'
import { useSession } from '../context/SessionContext';
import { TiInfoLarge } from 'react-icons/ti';

function DetailsHeader({
    title,
    subtitle,
    avatar,
    endPoint,
    id,
    toggleKiosk,
    kioskData,
    departments,
    setEditPopup,
    setDeletePopup,
    showInfo,
    setShowInfo,
    hideInfoIcon,
    hideEditIcon,
    hideAvatar,
    hideDeleteIcon,
    grid
}) {
    const { session } = useSession();
    const isAdmin = session.role === "Administrador" || session.role === "Soporte";

    const toggleInfo = () => {
        setShowInfo(prev => !prev);
    }

    return (
        <>
            <Test />
            <div className="header">
                <div className="title">
                    <img src="/src/assets/img/LOGO-SOLO.png" alt="logo disengraf" />
                    <div className="details">
                        <h1>{title} {subtitle && <span>({subtitle})</span>}</h1>
                        {endPoint === "users" && <p><span>Departamento/s:</span> {(departments && departments[0]) ? departments.join(" - ") : "No asignado"}</p>}
                    </div>
                    {(!hideInfoIcon && grid) && <TiInfoLarge style={showInfo ? { backgroundColor: "var(--highlight)" } : {}} onClick={toggleInfo} />}
                </div>
                <div className="actions">
                    {!hideEditIcon && <GrEdit className="edit" onClick={isAdmin ? (() => setEditPopup(true)) : undefined} />}
                    {!hideAvatar &&
                        <div className="avatarImage clientAvatar">
                            <img src={`http://192.4.26.112:3000/uploads/avatars/${avatar}`} alt="" onClick={isAdmin ? (() => { if (toggleKiosk) toggleKiosk(endPoint, id, kioskData) }) : undefined} />
                        </div>
                    }
                    {!hideDeleteIcon && <BsTrash3Fill className="delete" onClick={isAdmin ? (() => setDeletePopup(true)) : undefined} />}
                </div>
            </div>
            <div className="decoration"></div>
        </>
    )
}

export default DetailsHeader