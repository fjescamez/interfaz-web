import "./SideBarComponent.css"
import HomeSvg from "../assets/svg/HomeSvg"
import { FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { useTabs } from "../context/TabsContext";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Tooltip as ReactTooltip } from "react-tooltip";
import LenFile from "../assets/svg/LenFile";
import { SlBriefcase } from "react-icons/sl";
import { PiOven } from "react-icons/pi";
import { BsFillInboxFill } from "react-icons/bs";
import { useSession } from "../context/SessionContext";
import { MdBarcodeReader } from "react-icons/md";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { PiStorefrontLight } from "react-icons/pi"

function SideBarComponent({ isActive, setIsActive }) {
    const { createTab } = useTabs();
    const { session } = useSession();
    const isAdmin = session?.role === "Administrador" || session?.role === "Soporte";
    const isProduccion = session?.departments?.includes("Solido") || session?.departments?.includes("Liquido");
    const isOficina = session?.departments?.includes("Oficina");
    const isSoporte = session?.role === "Soporte";
    const isJefeDepartamento = session?.role === "Manager";

    const handleClick = (icon, name) => {
        setIsActive(prev => {
            const allFalse = Object.keys(prev).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {});

            return { ...allFalse, [icon]: true };
        });

        createTab(`/${icon}`, name);
    }

    return (
        <>
            <div className="sideBar">
                <div className={`icons ${isActive.home ? "active" : ""}`} onClick={() => handleClick("home", "INICIO")} data-tooltip-id="my-tooltip" data-tooltip-content={"INICIO"} >
                    <HomeSvg />
                </div>
                <div className="border"></div>
                <div className={`icons ${isActive.pedidos ? "activeStroke" : ""}`} onClick={() => handleClick("pedidos", "PEDIDOS")} data-tooltip-id="my-tooltip" data-tooltip-content={"PEDIDOS"} >
                    <IoDocumentTextOutline style={{ color: "var(--pantone431c" }} />
                </div>
                <div className="border"></div>
                <div className={`icons ${isActive.kiosco ? "active" : ""}`} onClick={() => handleClick("kiosco", "KIOSCO GENERAL")} data-tooltip-id="my-tooltip" data-tooltip-content={"KIOSCO GENERAL"} >
                    <PiStorefrontLight />
                </div>
                {(isAdmin || session?.teleWork) && (
                    <>
                        <div className="border"></div>
                        <div className={`icons ${isActive.bandeja ? "active" : ""}`} onClick={() => handleClick("bandeja", "BANDEJA")} data-tooltip-id="my-tooltip" data-tooltip-content={"BANDEJA"} >
                            <BsFillInboxFill />
                        </div>
                    </>
                )}
                <div className="border"></div>
                <div className={`icons ${isActive.len ? "active" : ""}`} onClick={() => handleClick("len", "LEN")} data-tooltip-id="my-tooltip" data-tooltip-content={"FICHEROS LEN"} >
                    <LenFile />
                </div>
                <div className="border"></div>
                <div className={`icons ${isActive.clientes ? "active" : ""}`} onClick={() => handleClick("clientes", "CLIENTES")} data-tooltip-id="my-tooltip" data-tooltip-content={"CLIENTES"} >
                    <SlBriefcase />
                </div>
                {(isAdmin || isProduccion || isOficina || isJefeDepartamento) && (
                    <>
                        <div className="border"></div>
                        <div className={`icons ${isActive.produccion ? "active" : ""}`} onClick={() => handleClick("produccion", "PRODUCCIÓN")} data-tooltip-id="my-tooltip" data-tooltip-content={"PRODUCCIÓN"} >
                            <PiOven />
                        </div>

                    </>
                )}
                {(isAdmin || isProduccion) && (
                    <>
                        <div className="border"></div>
                        <div className={`icons ${isActive.pistola ? "active" : ""}`} onClick={() => handleClick("pistola", "PISTOLA")} data-tooltip-id="my-tooltip" data-tooltip-content={"PISTOLA"} >
                            <MdBarcodeReader />
                        </div>
                    </>
                )}
                {isAdmin && (
                    <>
                        <div className="border"></div>
                        <div className={`icons ${isActive.stock ? "active" : ""}`} onClick={() => handleClick("stock", "STOCK")} data-tooltip-id="my-tooltip" data-tooltip-content={"STOCK"} >
                            <FaBoxOpen />
                        </div>
                        <div className="border"></div>
                        <div className={`icons ${isActive.usuarios ? "active" : ""}`} onClick={() => handleClick("usuarios", "USUARIOS")} data-tooltip-id="my-tooltip" data-tooltip-content={"USUARIOS"} >
                            <FaUserCircle />
                        </div>
                    </>
                )}
                {isSoporte && (
                    <>
                        <div className="border"></div>
                        <div className={`icons ${isActive.soporte ? "active" : ""}`} onClick={() => handleClick("soporte", "SOPORTE")} data-tooltip-id="my-tooltip" data-tooltip-content={"SOPORTE"} >
                            <FaScrewdriverWrench />
                        </div>
                    </>
                )}
            </div>
            <ReactTooltip id="my-tooltip" delayShow={500} />
        </>
    )
}

export default SideBarComponent