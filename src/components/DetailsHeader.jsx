import Test from '../assets/svg/Test'
import { GrEdit } from 'react-icons/gr'
import { BsTrash3Fill } from 'react-icons/bs'
import { TiInfoLarge } from 'react-icons/ti';
import { checkRole } from '../helpers/roleChecker';

function DetailsHeader({
    title,
    subtitle,
    underTitle,
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
    grid,
    insteadOfActions
}) {
    const urlApi = import.meta.env.VITE_API_URL;
    const { isAdmin } = checkRole();

    const toggleInfo = () => {
        setShowInfo(prev => !prev);
    }

    return (
        <>
            <Test />
            <div className="header">
                <div className="title">
                    <img src="/assets/LOGO-SOLO.png" alt="logo disengraf" />
                    <div className="details">
                        <h1>{title} {subtitle && <span> {subtitle}</span>}</h1>
                        {endPoint === "users" && <p><span>Departamento/s:</span> {(departments && departments[0]) ? departments.join(" - ") : "No asignado"}</p>}
                        {underTitle && <p>{underTitle}</p>}
                    </div>
                    {(!hideInfoIcon && grid) && <TiInfoLarge style={showInfo ? { backgroundColor: "var(--highlight)" } : {}} onClick={toggleInfo} />}
                </div>
                {!insteadOfActions ? (
                    <div className="actions">
                        {!hideEditIcon && <GrEdit className="edit" onClick={() => setEditPopup(prev => !prev)} />}
                        {!hideAvatar &&
                            <div className="avatarImage clientAvatar">
                                <img src={`${urlApi}/uploads/avatars/${avatar}`} alt="" onClick={isAdmin ? (() => { if (toggleKiosk) toggleKiosk(endPoint, id, kioskData) }) : undefined} />
                            </div>
                        }
                        {(!hideDeleteIcon && isAdmin) && <BsTrash3Fill className="delete" onClick={isAdmin ? (() => setDeletePopup(true)) : undefined} />}
                    </div>
                ) : (
                    <div className="insteadOfActions">
                        {insteadOfActions}
                    </div>
                )}
            </div>
            <div className="decoration"></div>
        </>
    )
}

export default DetailsHeader