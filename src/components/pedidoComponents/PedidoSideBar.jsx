import "./PedidoSideBar.css";
import { orderSidebarIcons } from "../../helpers/orderSidebarIcons";
import { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useTabs } from "../../context/TabsContext";
import { fetchData, postData } from "../../helpers/fetchData";
import { notify } from "../../helpers/notify";
import { toast } from "react-toastify";
import NoteTable from "../tableComponents/NoteTable";
import VersionTable from "../tableComponents/VersionTable";
import OrderLenTable from "../tableComponents/OrderLenTable";
import ExecutingComponent from "../ExecutingComponent";
import FileTable from "../tableComponents/FileTable";
import PlotterTable from "../tableComponents/PlotterTable";
import MontajeTable from "../tableComponents/MontajeTable";
import ComparePopUp from "./ComparePopUp";
import EmailPopUp from "./EmailPopUp";
import DocKiosk from "./DocKiosk";
import XmlKiosk from "./XmlKiosk";
import TintasPopUp from "./TintasPopUp";
import OpcionalesPopUp from "./OpcionalesPopUp";

function PedidoSideBar({ fullOrder, setFullOrder, filePath }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [noteModal, setNoteModal] = useState(false);
    const [versionsModal, setVersionsModal] = useState(false);
    const [docModal, setDocModal] = useState(false);
    const [xmlModal, setXmlModal] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const [compareModal, setCompareModal] = useState(false);
    const [lenModal, setLenModal] = useState(false);
    const [filesModal, setFilesModal] = useState(false);
    const [tintasModal, setTintasModal] = useState(false);
    const [opcionalesModal, setOpcionalesModal] = useState(false);
    const [montajeModal, setMontajeModal] = useState(false);
    const [plotterModal, setPlotterModal] = useState(false);
    const [executing, setExecuting] = useState(false);
    const [initialNotes, setInitialNotes] = useState([]);
    const [buttonBar, setButtonBar] = useState({ visible: false, buttons: [], position: { top: 0, left: 0 } });
    const buttonBarRef = useRef(null);
    const sideBarRef = useRef(null);
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

    useEffect(() => {
        if (!buttonBar.visible) return;

        const handleClickOutside = (event) => {
            if (buttonBarRef.current && !buttonBarRef.current.contains(event.target)) {
                setButtonBar((prev) => ({ ...prev, visible: false }));
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [buttonBar.visible]);

    const handleClick = (action, buttons, event) => {
        if (buttons) {
            const rect = event.currentTarget.getBoundingClientRect();
            const sideBarRect = sideBarRef.current.getBoundingClientRect();
            setButtonBar({
                visible: true,
                buttons,
                position: {
                    top: rect.top,
                    left: sideBarRect.left // Justo pegado a la barra lateral
                }
            });
            return;
        }

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
            case "kioscoDoc":
                setDocModal(true);
                break;
            case "kioscoXml":
                setXmlModal(true);
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
            case "tintas":
                setTintasModal(true);
                break;
            case "opcionales":
                if (fullOrder.opcionales && fullOrder.opcionales.length > 0) {
                    setOpcionalesModal(true);
                }
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
            {docModal && <DocKiosk setDocModal={setDocModal} fullOrder={fullOrder} />}
            {xmlModal && <XmlKiosk setXmlModal={setXmlModal} fullOrder={fullOrder} />}
            {emailModal && <EmailPopUp setEmailModal={setEmailModal} fullOrder={fullOrder} />}
            {compareModal && <ComparePopUp setCompareModal={setCompareModal} rutaTrabajo={fullOrder.rutaTrabajo} />}
            {lenModal && <OrderLenTable setLenModal={setLenModal} orderId={fullOrder.id_pedido} />}
            {tintasModal && <TintasPopUp setTintasModal={setTintasModal} fullOrder={fullOrder} />}
            {opcionalesModal && <OpcionalesPopUp setOpcionalesModal={setOpcionalesModal} fullOrder={fullOrder} />}
            {filesModal && <FileTable setFilesModal={setFilesModal} orderId={fullOrder.id_pedido} filePath={filePath} />}
            {montajeModal && <MontajeTable setMontajeModal={setMontajeModal} fullOrder={fullOrder} filePath={filePath} />}
            {plotterModal && <PlotterTable setPlotterModal={setPlotterModal} orderId={fullOrder.id_pedido} fullOrder={fullOrder} filePath={filePath} />}
            <div className="pedidoSideBar" ref={sideBarRef}>
                {orderSidebarIcons.map((icon, index) => (
                    <div className="iconContainer" key={index}>
                        <div className="icons" onClick={(e) => handleClick(icon.action, icon.buttons, e)} data-tooltip-id="my-tooltip" data-tooltip-content={icon.tooltip}>
                            {icon.icon}
                        </div>
                        {(!icon.last) && <div className="border"></div>}
                    </div>
                ))}
            </div>
            {buttonBar.visible && (
                <div
                    ref={buttonBarRef}
                    className="buttonBar"
                    style={{
                        top: buttonBar.position.top,
                        left: buttonBar.position.left,
                        transform: "translateX(-98.5%) translateY(-4%)", // se extiende hacia la izquierda
                        zIndex: 2
                    }}
                >
                    {buttonBar.buttons.map((icon, index) => (
                        <div className="iconContainer" key={index}>
                            <div
                                className={"icons" + (icon.first ? " first" : "")}
                                onClick={(e) => handleClick(icon.action, icon.buttons, e)}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={icon.tooltip}
                            >
                                {icon.icon}
                            </div>
                            {/* {(!icon.last) && <div className="border"></div>} */}
                        </div>
                    ))}
                </div>
            )}
            <ReactTooltip id="my-tooltip" delayShow={750} />
        </>
    )
}

export default PedidoSideBar