import "./PedidoSideBar.css";
import { orderIcons } from "../../helpers/orderSidebarIcons";
import { useEffect, useState } from "react";
import NoteTable from "../tableComponents/NoteTable";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useTabs } from "../../context/TabsContext";
import VersionTable from "../tableComponents/VersionTable";
import OrderLenTable from "../tableComponents/OrderLenTable";
import { fetchData, postData } from "../../helpers/fetchData";
import ExecutingComponent from "../ExecutingComponent";
import FileTable from "../tableComponents/FileTable";
import PlotterTable from "../tableComponents/PlotterTable";
import MontajeTable from "../tableComponents/MontajeTable";
import { notify } from "../../helpers/notify";
import { toast } from "react-toastify";
import ComparePopUp from "./ComparePopUp";
import EmailPopUp from "./EmailPopUp";

function PedidoSideBar({ fullOrder, setFullOrder, filePath }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [noteModal, setNoteModal] = useState(false);
    const [versionsModal, setVersionsModal] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const [compareModal, setCompareModal] = useState(false);
    const [lenModal, setLenModal] = useState(false);
    const [filesModal, setFilesModal] = useState(false);
    const [montajeModal, setMontajeModal] = useState(false);
    const [plotterModal, setPlotterModal] = useState(false);
    const [executing, setExecuting] = useState(false);
    const [initialNotes, setInitialNotes] = useState([]);
    const { tabs, setTabs } = useTabs();
    const folderUrl = fullOrder.rutaTrabajo?.replace("cloudflow://", "").replace("PEDIDOS_", "Pedidos ");

    const updateOrder = async () => {
        setExecuting(true);
        const data = {
            extraInputs: {
                id_pedido: fullOrder.id_pedido,
                version: fullOrder.xml.numero.version,
                cliente: fullOrder.xml.numero.cliente_codigo,
                rutaTrabajo: fullOrder.rutaTrabajo
            }
        }

        const response = await postData("orders/updateOrder", data);
        
        if (response && response.status === "success") {
            notify(toast.success, response.status, response.title, "")
            setFullOrder(response.response.updatedOrder);
        } else {
            notify(toast.error, response.status, response.title, "");
        }

        setExecuting(false);
    }

    useEffect(() => {
        if (fullOrder.xml?.numero.id) {
            fetchData("notes", "", fullOrder.xml.numero.id, setInitialNotes);
        }
    }, [fullOrder]);

    useEffect(() => {
        if (initialNotes.length > 0) {
            setNoteModal(true);
            setInitialNotes([]);
        }
    }, [initialNotes]);

    const handleClick = (action) => {
        switch (action) {
            case "update":
                updateOrder();
                break;
            case "openNotes":
                setNoteModal(true);
                break;
            case "openFolder":
                const openFolder = () => {
                    window.location.href = `smb://192.4.26.120/Archivo%20Disengraf/TRABAJOS/${folderUrl}`;
                }
                openFolder();
                break;
            case "versions":
                setVersionsModal(true);
                break;
            case "email":
                setEmailModal(true);
                break;
            case "compare":
                setCompareModal(true);
                break;
            case "lenFiles":
                setLenModal(true);
                break;
            case "kiosk":
                const path = `${location.pathname}/kiosk`;
                const tabTitle = `${fullOrder.id_pedido} | KIOSKO`;

                if (!tabs.some(tab => tab.path === path)) {
                    setTabs(prev => {
                        if (prev.some(tab => tab.path === path)) return prev;
                        return [...prev, { path, title: tabTitle }];
                    });
                }
                navigate(path);
                break;
            case "files":
                setFilesModal(true);
                break;
            case "montaje":
                setMontajeModal(true);
                break;
            case "plotter":
                setPlotterModal(true);
                break;
            default:
                break;
        }
    }

    return (
        <>
            {executing && <ExecutingComponent />}
            {noteModal &&
                <NoteTable
                    setNoteModal={setNoteModal}
                    id_pedido={fullOrder.id_pedido}
                    pedido={fullOrder.xml.numero.id}
                />}
            {versionsModal && <VersionTable setVersionsModal={setVersionsModal} fullOrder={fullOrder} />}
            {emailModal && <EmailPopUp setEmailModal={setEmailModal} fullOrder={fullOrder} />}
            {compareModal && <ComparePopUp setCompareModal={setCompareModal} rutaTrabajo={fullOrder.rutaTrabajo} />}
            {lenModal && <OrderLenTable setLenModal={setLenModal} orderId={fullOrder.id_pedido} />}
            {filesModal && <FileTable setFilesModal={setFilesModal} orderId={fullOrder.id_pedido} filePath={filePath} />}
            {montajeModal && <MontajeTable setMontajeModal={setMontajeModal} orderId={fullOrder.id_pedido} filePath={filePath} />}
            {plotterModal && <PlotterTable setPlotterModal={setPlotterModal} orderId={fullOrder.id_pedido} fullOrder={fullOrder} filePath={filePath} />}
            <div className="pedidoSideBar">
                {orderIcons.map((icon) => (
                    <div className="iconContainer" key={icon.id}>
                        <div className="icons" onClick={() => handleClick(icon.action)} data-tooltip-id="my-tooltip" data-tooltip-content={icon.tooltip}>
                            {icon.icon}
                        </div>
                        {(icon.last !== true) && <div className="border"></div>}
                    </div>
                ))}
            </div>
            <ReactTooltip id="my-tooltip" delayShow={500} />
        </>
    )
}

export default PedidoSideBar