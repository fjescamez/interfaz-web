import { IoMdCloseCircleOutline } from "react-icons/io"
import { deleteMultipleObjects, updateData } from "../../helpers/fetchData";

import { notify } from "../../helpers/notify";
import { useTabs } from "../../context/TabsContext";
import { useLocation } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import { addKeyListener } from "../../helpers/toggleModal";

function DeleteForm({
    setModal,
    tableInfo,
    id,
    deleteAvatar,
    toggleKiosk,
    totalFilesToDelete,
    filesToDelete,
    data,
    setData,
    setTotal,
    isActive,
    setIsActive,
    setCheckedIndexes,
    setActionEnded,
    extraBodyData
}) {
    const { headerIcon, headerTitle, deleteTitle, endPoint, deleteActions } = tableInfo;

    const { closeTab } = useTabs();
    const location = useLocation();
    const { setSession } = useSession();
    addKeyListener(setModal);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setModal(false);
        if (setActionEnded) setActionEnded(false);

        let result = {};
        const avatarType = endPoint === "users" ? "avatarDefault.jpg" : "logoDefault.png";

        if (deleteAvatar) {
            result = await updateData(endPoint, { avatar: avatarType }, id);
            if (endPoint === "users") {
                setSession(prev => ({
                    ...prev,
                    avatar: "avatarDefault.jpg"
                }));
            }
            toggleKiosk();
        } else if (filesToDelete) {
            const data = {
                ids: filesToDelete,
                id_pedido: id,
                //files: filesUrls ? filesUrls : [],
                deleteActions,
                ...extraBodyData || {}
            };

            result = await deleteMultipleObjects(endPoint, data, setData);
            if (setTotal) setTotal(prev => prev - filesToDelete.length);
            if (setActionEnded) setActionEnded(true);
        } else {
            const data = {
                id,
                ...extraBodyData || {}
            };

            result = await deleteMultipleObjects(endPoint, data, setData);
            closeTab(location.pathname);
        }

        if (result.status === "success") {
            notify(result.status, result.title, result.message);
            if (Array.isArray(isActive)) {
                setIsActive([]);
            } else {
                if (setIsActive) {
                    const resetActive = {};
                    result.updatedData?.forEach(note => {
                        resetActive[note._id] = false;
                    });
                    setIsActive(resetActive);
                }
            }

            if (data && setData) {
                setData(data.filter(obj => !filesToDelete.includes(obj._id || obj.id)));
            }
            if (setCheckedIndexes) {
                setCheckedIndexes([]);
            }
        } else {
            notify(result.status, result.title, result.message);
        }
    }

    return (
        <>
            <div className="overlay deleteForm"></div>
            <div className="formContainer deleteForm">
                <div className="formHeaderBackground">
                    <div className="formHeader">
                        {headerIcon}
                        <h1>ELIMINAR {deleteTitle || headerTitle}</h1>
                        <button onClick={() => {
                            setModal(false);
                        }}>
                            <IoMdCloseCircleOutline className="close" />
                        </button>
                    </div>
                </div>
                <div className="formBody">
                    <form onSubmit={handleSubmit}>
                        <p>¿Estás seguro de que deseas eliminar {(totalFilesToDelete && totalFilesToDelete > 1) ? "estos/as" : "este/a"} {deleteTitle || headerTitle}? Esta acción no se puede deshacer</p>
                        {totalFilesToDelete && <p>Número de elementos que se van a eliminar: {totalFilesToDelete}</p>}
                        <div className="buttons">
                            <button type="submit" className="delete">Eliminar</button>
                            <button type="button" onClick={() => setModal(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="filler"></div>
        </>
    )
}

export default DeleteForm