import { MdOutlineEmail } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { TbColorSwatch } from "react-icons/tb";
import { FiPrinter } from "react-icons/fi";
import { PiGear } from "react-icons/pi";
import { TiContacts } from "react-icons/ti";
import { IoDocumentTextOutline } from "react-icons/io5";
import GroupsSvg from "../assets/svg/GroupsSvg";

export const produccionPlanchasDetails = {
    title: "Planchas",
    click: "planchas",
    grid: [
        {
            icon: <IoDocumentTextOutline />,
            title: "Planchas",
            key: "planchas"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "Pre-producción",
            key: "preproduccion"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "Producción",
            key: "produccion"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "Finalizadas",
            key: "finalizadas"
        },
    ]
}

export const produccionTrabajosDetails = {
    title: "Trabajos externos",
    click: "planchas",
    grid: [
        {
            icon: <IoDocumentTextOutline />,
            title: "Pendientes",
            key: "pendientes"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "DIGRA",
            key: "digra"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "GspApp",
            key: "gspapp"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "TORTOSA",
            key: "tortosa"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "Adhay",
            key: "adhay"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "GSP",
            key: "gsp"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "ETIPON",
            key: "etipon"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "Finalizados",
            key: "finalizados"
        },
    ]
}

export const usersDetails = {
    grid: [

    ]
}

export const clientsDetails = {
    title: "Cliente",
    click: "clients",
    grid: [
        {
            icon: <IoDocumentTextOutline />,
            title: "Pedidos",
            key: "pedidos"
        },
        {
            icon: <TiContacts />,
            title: "Contactos",
            key: "contactos"
        },
        {
            icon: <GroupsSvg />,
            title: "Grupos",
            key: "grupos"
        },
        /* {
            icon: <MdOutlineEmail />,
            title: "Plantillas E-mail",
            body: "Información técnica y relevante de las diferentes máquinas, del cliente, proveedores y protocolos internos de cada uno.",
            key: "emails"
        }, */
        /* {
            icon: <CgFileDocument />,
            title: "Fichas técnicas",
            body: "Información técnica y relevante de las diferentes máquinas, del cliente, proveedores y protocolos internos de cada uno.",
            key: "fichasTecnicas"
        }, */
        {
            icon: <TbColorSwatch />,
            title: "Estrategias Color",
            key: "estrategias"
        },
        /* {
            icon: <FiPrinter />,
            title: "Máquinas",
            body: "Información técnica y relevante de las diferentes máquinas, del cliente, proveedores y protocolos internos de cada uno.",
            key: "maquinas"
        }, */
        /* {
            icon: <PiGear />,
            title: "Configuración",
            body: "Información técnica y relevante de las diferentes máquinas, del cliente, proveedores y protocolos internos de cada uno.",
            key: "configuracion"
        } */
    ]
};

export const stockDetails = {
    title: "Control de Stock",
    click: "stock",
    grid: [
        {
            icon: <FiPrinter />,
            title: "Categorías",
            key: "categorias"
        },
        {
            icon: <FiPrinter />,
            title: "Productos",
            key: "productos"
        },
        {
            icon: <FiPrinter />,
            title: "Notificaciones",
            key: "notifiaciones"
        },
        {
            icon: <FiPrinter />,
            title: "Órdenes de compra",
            key: "ordenesCompra"
        },
        {
            icon: <FiPrinter />,
            title: "Registro",
            key: "registro"
        },
        {
            icon: <FiPrinter />,
            title: "Incidencias",
            key: "incidencias"
        },
        {
            icon: <FiPrinter />,
            title: "Inventario",
            key: "inventario"
        },
    ]
}