import "./SideBarComponent.css"
import HomeSvg from "../assets/svg/HomeSvg"
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { useTabs } from "../context/TabsContext";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Tooltip as ReactTooltip } from "react-tooltip";
import LenFile from "../assets/svg/LenFile";
import { SlBriefcase } from "react-icons/sl";
import { PiOven } from "react-icons/pi";
import { BsFillInboxFill } from "react-icons/bs";
import { useSession } from "../context/SessionContext";

function SideBarComponent({ isActive, setIsActive }) {
    const navigate = useNavigate();
    const { setTabs } = useTabs();
    const { session } = useSession();
    const teletabajo = ["n.morante", "a.artacho"];
    const isTeletrabajo = teletabajo.includes(session?.username);
    const isAdmin = session?.role === "Administrador" || session?.role === "Soporte";
    const isProduccion = session?.departments?.includes("Sólido") || session?.departments?.includes("Líquido");

    const handleClick = (icon, name) => {
        setIsActive(prev => {
            const allFalse = Object.keys(prev).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {});

            return { ...allFalse, [icon]: true };
        });

        setTabs(prev => {
            if (prev.some(tab => tab.path === `/${icon}`)) return prev;
            return [...prev, { path: `/${icon}`, title: name }];
        });

        // Navega según el icono
        navigate(`/${icon}`);
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
                {(isAdmin || isTeletrabajo) && (
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
                {(isAdmin || isProduccion) && (
                    <>
                        <div className="border"></div>
                        <div className={`icons ${isActive.produccion ? "active" : ""}`} onClick={() => handleClick("produccion", "PRODUCCION")} data-tooltip-id="my-tooltip" data-tooltip-content={"PRODUCCION"} >
                            <PiOven />
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
            </div>
            <ReactTooltip id="my-tooltip" delayShow={500} />
        </>
    )
}

export default SideBarComponent