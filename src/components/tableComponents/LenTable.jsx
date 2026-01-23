import { useState } from "react"
import Table from "../Table";
import { notify } from "../../helpers/notify";
import { IoMdCloseCircleOutline } from "react-icons/io";
import InfoTintasTramas from "../pedidoComponents/InfoTintasTramas";
import { postData } from "../../helpers/fetchData";
import BarnizPopUp from "../pedidoComponents/BarnizPopUp";

function LenTable({
    setLenModal,
    orderId,
    lenTableInfo,
    popup,
    customTable
}) {
    const [lenIds, setLenIds] = useState([]);
    const [tableInfo, setTableInfo] = useState(lenTableInfo);
    const [lenViewUrl, setLenViewUrl] = useState("");
    const [infoCurvasPopup, setInfoCurvasPopup] = useState(false);
    const [infoCurvas, setInfoCurvas] = useState(false);
    const [barnizPopUp, setBarnizPopUp] = useState(false);
    const [tableSetter, setTableSetter] = useState(undefined);
    const [actionEnder, setActionEnder] = useState(undefined);
    const [indexSetter, setIndexSetter] = useState(undefined);

    const enviarProduccion = async (setTableData, finishAction) => {
        if (lenIds.length > 0) {
            const data = {
                action: "enviarProduccion",
                ids: lenIds
            }

            try {
                const response = await postData("lenFiles/enviarProduccion", data);

                if (response.status === "success") {
                    notify(response.status, response.title, response.message);
                    setTableData(prevData =>
                        prevData.map(row => {
                            const updated = response.enviado.listLen.find(len => len._id === row._id);
                            return updated ? { ...row, ...updated } : row;
                        })
                    );
                    setLenIds([]);

                    if (finishAction) {
                        lenActions({ action: "finishProduccion" });
                        return;
                    }

                    return { status: "success", response };
                } else {
                    notify(data.status, data.title, data.message);
                    return { status: "error", response };
                }
            } catch (error) {
                notify('error', 'Error', error);
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
                notify(response.status, response.title, response.message);
                setInfoCurvasPopup(true);
                setInfoCurvas(response.info.contents.listRegistroColor);
                return response;
            } else {
                notify(response.status, response.title, response.message);
                return response;
            }
        } catch (error) {
            notify('error', 'Error', error);
        }
    }

    const solicitarVista = async (tableData) => {
        let id_pedido = orderId || "";

        if (!orderId) {
            id_pedido = tableData.find(len => len._id === lenIds[0])?.id_pedido;
        }

        const data = {
            action: "solicitarVista",
            orderId: id_pedido
        }

        if (lenIds.length === 1) {
            data._id = lenIds[0];
        } else if (lenIds.length > 1) {
            notify('error', 'Error', 'Solo se puede seleccionar un LEN para solicitar vista');
            return { status: "error" };
        }

        try {
            const response = await postData("lenFiles/solicitarVista", data);

            if (response.status === "success") {
                notify(response.status, response.title, response.message);
                let updatedActions = tableInfo.actions.map(action => {
                    if (action.action === "visualizarLen") {
                        return { ...action, hidden: false };
                    }
                    return action;
                });

                setTableInfo({ ...tableInfo, actions: updatedActions });
                setLenViewUrl(response.vista.contents?.viewLink);
                setLenIds([]);

                return response;
            } else {
                notify(response.status, response.title, response.message);
                return response;
            }
        } catch (error) {
            notify('error', 'Error', error);
        }
    }

    const lenActions = (variables) => {
        const { action, data, setTableData, setActionEnded, setCheckedIndexes } = variables;

        switch (action) {
            case "enviarProduccion":
                const lenCompletos = data.filter(len => lenIds.includes(len._id));

                if (lenCompletos.some(len => len.color.toLowerCase().includes("barniz"))) {
                    setBarnizPopUp(true);
                    setTableSetter(() => setTableData);
                    setActionEnder(() => setActionEnded);
                    setIndexSetter(() => setCheckedIndexes);
                    return { status: "waiting" };
                } else {
                    return enviarProduccion(setTableData);
                }
            case "finishProduccion":
                console.log("Producción finalizada");

                actionEnder(true);
                setLenIds([]);
                indexSetter([]);
                return;
            case "infoCurvas":
                return getInfoCurvas();
            case "solicitarVista":
                return solicitarVista(data);
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
                            customTable={customTable}
                        />
                    </div>
                    {barnizPopUp && <BarnizPopUp setBarnizPopUp={setBarnizPopUp} tableSetter={tableSetter} enviarProduccion={enviarProduccion} />}
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