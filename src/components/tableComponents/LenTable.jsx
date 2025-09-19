import { useState } from "react"
import Table from "../Table";
import { notify } from "../../helpers/notify";
import { toast } from "react-toastify";
import { IoMdCloseCircleOutline } from "react-icons/io";
import InfoTintasTramas from "../pedidoComponents/InfoTintasTramas";

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
            const url = `http://192.4.26.112:3000/lenFiles/enviarProduccion`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ids: lenIds,
                        action: "enviarProduccion"
                    })
                })
                const data = await response.json();
                if (data.status === "success") {
                    notify(toast.success, data.status, data.title, data.message);
                    setTableData(prevData =>
                        prevData.map(row => {
                            const updated = data.enviado.listLen.find(len => len._id === row._id);
                            return updated ? { ...row, ...updated } : row;
                        })
                    );
                    setLenIds([]);
                    return data;
                } else {
                    notify(toast.error, data.status, data.title, data.message);
                    return data;
                }
            } catch (error) {
                notify(toast.error, 'error', 'Error', error);
            }
        }
    };

    const getInfoCurvas = async () => {
        const url = `http://192.4.26.112:3000/lenFiles/infoCurvas`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "infoCurvas",
                    orderId
                })
            })
            const data = await response.json();
            if (data.status === "success") {
                notify(toast.success, data.status, data.title, data.message);
                setInfoCurvasPopup(true);
                setInfoCurvas(data.info.contents.listRegistroColor);
                return data;
            } else {
                notify(toast.error, data.status, data.title, data.message);
                return data;
            }
        } catch (error) {
            notify(toast.error, 'error', 'Error', error);
        }
    }

    const solicitarVista = async () => {
        const url = `http://192.4.26.112:3000/lenFiles/solicitarVista`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "solicitarVista",
                    orderId
                })
            })
            const data = await response.json();
            if (data.status === "success") {
                notify(toast.success, data.status, data.title, data.message);
                setLenIds([]);
                const updatedActions = tableInfo.actions.map(action => {
                    if (action.action === "solicitarVista" || action.action === "visualizarLen") {
                        return { ...action, hidden: !action.hidden };
                    }
                    return action;
                });
                setTableInfo({ ...tableInfo, actions: updatedActions });
                setLenViewUrl(data.vista.contents?.viewLink);

                return data;
            } else {
                notify(toast.error, data.status, data.title, data.message);
                return data;
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