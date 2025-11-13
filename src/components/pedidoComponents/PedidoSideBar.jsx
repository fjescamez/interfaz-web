import "./PedidoSideBar.css";
import { orderSidebarIcons, clientApps } from "../../helpers/orderSidebarIcons";
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
import OrderInfoPopUp from "./OrderInfoPopUp";
import TraceTextPopUp from "./TraceTextPopUp";
import DeleteForm from "../formComponents/DeleteForm";
import { orderTableInfo } from "../../helpers/tablesInfo";
import { useSession } from "../../context/SessionContext";
import SignJobForm from "../formComponents/SignJobForm";

function PedidoSideBar({ fullOrder, setFullOrder, filePath }) {
    const { session } = useSession();
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
    const [traceModal, setTraceModal] = useState(false);
    const [signJobModal, setSignJobModal] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [montajeModal, setMontajeModal] = useState(false);
    const [plotterModal, setPlotterModal] = useState(false);
    const [tintasModal, setTintasModal] = useState(false);
    const [infoModal, setInfoModal] = useState(false);
    const [opcionalesModal, setOpcionalesModal] = useState(false);
    const [executing, setExecuting] = useState(false);
    const [initialNotes, setInitialNotes] = useState([]);
    const [areNotes, setAreNotes] = useState(false);
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
        setAreNotes(false);
    }, [fullOrder]);

    useEffect(() => {
        if (initialNotes.length > 0) {
            setNoteModal(true);
            setInitialNotes([]);
            setAreNotes(true);
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

    const handleClick = async (action, buttons, event) => {
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
            case "clientApp":
                const appUrl = clientApps.find(app => app.client === fullOrder.xml.numero.cliente_nombre)?.url;

                if (appUrl !== undefined) {
                    window.open(appUrl, "_blank");
                }
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
            case "montaje":
                setMontajeModal(true);
                break;
            case "plotter":
                setPlotterModal(true);
                break;
            case "files":
                setFilesModal(true);
                break;
            case "eliminar":
                setDeletePopup(true);
                break;
            case "traceText":
                setTraceModal(true);
                break;
            case "signJob":
                setSignJobModal(true);
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
            case "tintas":
                setTintasModal(true);
                break;
            case "info":
                if (fullOrder.registroInfo && fullOrder.registroInfo.length > 0) {
                    setInfoModal(true);
                }
                break;
            case "opcionales":
                if (fullOrder.opcionales && fullOrder.opcionales.length > 0) {
                    setOpcionalesModal(true);
                }
                break;
            default:
                break;
        }
    }

    // Desplegar el menú al hacer hover, en vez de tener que clicar
    const handleMouseEnter = (buttons, event) => {
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
        }
    };

    const handleMouseLeave = (event) => {
        if (buttonBarRef.current && buttonBarRef.current.contains(event.relatedTarget)) {
            return; // Evitar cerrar el menú si el ratón está sobre los elementos internos
        }
        setButtonBar((prev) => ({ ...prev, visible: false }));
    };

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
            {filesModal && <FileTable setFilesModal={setFilesModal} orderId={fullOrder.id_pedido} filePath={filePath} />}
            {deletePopup && <DeleteForm setModal={setDeletePopup} id={fullOrder._id} tableInfo={orderTableInfo} />}
            {traceModal && <TraceTextPopUp setTraceModal={setTraceModal} rutaTrabajo={fullOrder.rutaTrabajo} unitario={fullOrder.unitario} />}
            {signJobModal && <SignJobForm setSignJobModal={setSignJobModal} fullOrder={fullOrder} />}
            {montajeModal && <MontajeTable setMontajeModal={setMontajeModal} fullOrder={fullOrder} filePath={filePath} />}
            {plotterModal && <PlotterTable setPlotterModal={setPlotterModal} orderId={fullOrder.id_pedido} fullOrder={fullOrder} filePath={filePath} />}
            {tintasModal && <TintasPopUp setTintasModal={setTintasModal} fullOrder={fullOrder} />}
            {infoModal && <OrderInfoPopUp setInfoModal={setInfoModal} _id={fullOrder._id} />}
            {opcionalesModal && <OpcionalesPopUp setOpcionalesModal={setOpcionalesModal} fullOrder={fullOrder} />}
            <div className="pedidoSideBar" ref={sideBarRef}>
                {orderSidebarIcons.map((icon, index) => (
                    <div className="iconContainer" key={index}>
                        <div
                            className={"icons" + ((areNotes && icon.tooltip === "NOTAS") ? " active" : "")}
                            onMouseEnter={(e) => handleMouseEnter(icon.buttons, e)}
                            onMouseLeave={handleMouseLeave}
                            onClick={(e) => handleClick(icon.action, icon.buttons, e)}
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={icon.tooltip}
                        >
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
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() => setButtonBar((prev) => ({ ...prev, visible: true }))} // Mantener abierto al pasar el ratón
                >
                    {buttonBar.buttons.map((icon, index) => {
                        if (icon.assigned && fullOrder.usuario_asignado !== session.username) {
                            return null; // No renderizar el botón si no cumple la condición
                        }

                        return (
                            <div className="iconContainer" key={index}>
                                <div
                                    className={"icons" + (icon.first ? " first" : "")}
                                    onClick={(e) => handleClick(icon.action, icon.buttons, e)}
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={icon.tooltip}
                                >
                                    {icon.icon}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <ReactTooltip id="my-tooltip" delayShow={750} />
        </>
    )
}

export default PedidoSideBar