import { useState } from "react"
import Table from "../Table";
import { notify } from "../../helpers/notify";
import { toast } from "react-toastify";
import { IoMdCloseCircleOutline } from "react-icons/io";
import InfoTintasTramas from "../pedidoComponents/InfoTintasTramas";
import { postData } from "../../helpers/fetchData";

function LenTable({
    setLenModal,
    orderId,
    lenTableInfo,
    popup
}) {
    const [lenIds, setLenIds] = useState([]);
    const [tableInfo, setTableInfo] = useState(lenTableInfo);
    const [lenViewUrl, setLenViewUrl] = useState("");
    const [infoCurvasPopup, setInfoCurvasPopup] = useState(false);
    const [infoCurvas, setInfoCurvas] = useState(false);

    const enviarProduccion = async (setTableData) => {
        if (lenIds.length > 0) {
            const data = {
                action: "enviarProduccion",
                ids: lenIds
            }

            try {
                const response = await postData("lenFiles/enviarProduccion", data);

                if (response.status === "success") {
                    notify(toast.success, response.status, response.title, response.message);
                    setTableData(prevData =>
                        prevData.map(row => {
                            const updated = response.enviado.listLen.find(len => len._id === row._id);
                            return updated ? { ...row, ...updated } : row;
                        })
                    );
                    setLenIds([]);
                    return { status: "success", response };
                } else {
                    notify(toast.error, data.status, data.title, data.message);
                    return { status: "error", response };
                }
            } catch (error) {
                notify(toast.error, 'error', 'Error', error);
            }
        }
    };

    const getInfoCurvas = async () => {
        const data = {
            action: "infoCurvas",
            orderId
        };

        try {
            const response = await postData("lenFiles/infoCurvas", data);

            if (response.status === "success") {
                notify(toast.success, response.status, response.title, response.message);
                setInfoCurvasPopup(true);
                setInfoCurvas(response.info.contents.listRegistroColor);
                return response;
            } else {
                notify(toast.error, response.status, response.title, response.message);
                return response;
            }
        } catch (error) {
            notify(toast.error, 'error', 'Error', error);
        }
    }

    const solicitarVista = async () => {
        const data = {
            action: "solicitarVista",
            orderId
        }

        if (lenIds.length === 1) {
            data._id = lenIds[0];
        } else if (lenIds.length > 1) {
            notify(toast.error, 'error', 'Error', 'Solo se puede seleccionar un LEN para solicitar vista');
            return { status: "error" };
        }

        try {
            const response = await postData("lenFiles/solicitarVista", data);
            console.log(response);

            if (response.status === "success") {
                notify(toast.success, response.status, response.title, response.message);
                let updatedActions;

                if (lenIds.length === 0) {
                    updatedActions = tableInfo.actions.map(action => {
                        if (action.action === "solicitarVista") {
                            return { ...action, hidden: true };
                        } else if (action.action === "visualizarLen") {
                            return { ...action, hidden: false };
                        }
                        return action;
                    });
                } else {
                    updatedActions = tableInfo.actions.map(action => {
                        if (action.action === "visualizarLen") {
                            return { ...action, hidden: false };
                        }
                        return action;
                    });
                }

                setTableInfo({ ...tableInfo, actions: updatedActions });
                setLenViewUrl(response.vista.contents?.viewLink);
                setLenIds([]);

                return response;
            } else {
                notify(toast.error, response.status, response.title, response.message);
                return response;
            }
        } catch (error) {
            notify(toast.error, 'error', 'Error', error);
        }
    }

    const lenActions = (variables) => {
        const { action, setTableData } = variables;
        switch (action) {
            case "enviarProduccion":
                return enviarProduccion(setTableData);
            case "infoCurvas":
                return getInfoCurvas();
            case "solicitarVista":
                return solicitarVista();
            case "visualizarLen":
                window.open(lenViewUrl, "_blank");
                return { status: "success" };
            default:
                break;
        }
    };

    return (
        <>
            {!infoCurvasPopup ? (
                <>
                    {popup && <div className="overlay"></div>}
                    <div className={popup ? "popUpTable" : ""}>
                        <Table
                            actions={lenActions}
                            checkedRows={lenIds}
                            setCheckedRows={setLenIds}
                            setPopUpTable={setLenModal}
                            dinamicTableInfo={tableInfo}
                            orderFilter={orderId}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="overlay deleteForm"></div>
                    <div className="formContainer deleteForm">
                        <div className="formHeaderBackground">
                            <div className="formHeader">
                                {tableInfo.headerIcon}
                                <h1>INFO CURVAS</h1>
                                <button onClick={() => setInfoCurvasPopup(false)}>
                                    <IoMdCloseCircleOutline className="close" />
                                </button>
                            </div>
                        </div>
                        <div className="formBody">
                            <form>
                                <div className="formSections">
                                    <InfoTintasTramas info={infoCurvas} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="filler"></div>
                </>
            )}
        </>
    )
}

export default LenTable