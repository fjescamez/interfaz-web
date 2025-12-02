import { MdOutlineEmail } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { TbColorSwatch } from "react-icons/tb";
import { FaBoxOpen } from "react-icons/fa";
import { PiGear } from "react-icons/pi";
import { TiContacts } from "react-icons/ti";
import { IoDocumentTextOutline } from "react-icons/io5";
import GroupsSvg from "../assets/svg/GroupsSvg";

export const produccionReferenciasDetails = {
    title: "Referencias",
    grid: [
        {
            icon: <IoDocumentTextOutline />,
            title: "Ref. Planchas",
            key: "refPlanchas"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "Ref. Continuos",
            key: "refContinuos"
        }
    ]
}

export const produccionPlanchasDetails = {
    title: "Planchas",
    grid: [
        {
            icon: <IoDocumentTextOutline />,
            title: "Planchas",
            key: "planchas"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "Pre-producción",
            key: "planchasPreproduccion"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "Producción",
            key: "planchasProduccion"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "Finalizadas",
            key: "planchasFinalizadas"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "Trabajos",
            key: "trabajosPlanchas"
        },
    ]
}

export const produccionTrabajosDetails = {
    title: "Trabajos externos",
    grid: [
        {
            icon: <IoDocumentTextOutline />,
            title: "Pendientes",
            key: "externosPendientes"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "Finalizados",
            key: "externosFinalizados"
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "Anulados",
            key: "externosAnulados"
        },
    ]
}

export const usersDetails = {
    grid: [

    ]
}

export const clientsDetails = {
    title: "Clientes",
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
            key: "emails"
        }, */
        /* {
            icon: <CgFileDocument />,
            title: "Fichas técnicas",
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
            key: "maquinas"
        }, */
        {
            icon: <PiGear />,
            title: "Configuración",
            key: "configuracion"
        }
    ]
}

export const stockDetails = {
    title: "Control de Stock",
    grid: [
        {
            icon: <FaBoxOpen />,
            title: "Categorías",
            key: "categorias"
        },
        {
            icon: <FaBoxOpen />,
            title: "Productos",
            key: "productos"
        },
        {
            icon: <FaBoxOpen />,
            title: "Notificaciones",
            key: "notificacionesDepartamento"
        },
        {
            icon: <FaBoxOpen />,
            title: "Órdenes de compra",
            key: "ordenesCompra"
        },
        {
            icon: <FaBoxOpen />,
            title: "Registro",
            key: "registro"
        },
        {
            icon: <FaBoxOpen />,
            title: "Incidencias",
            key: "incidencias"
        },
        {
            icon: <FaBoxOpen />,
            title: "Inventario",
            key: "inventario"
        },
    ]
}