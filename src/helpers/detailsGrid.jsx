import { MdOutlineEmail } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { TbColorSwatch } from "react-icons/tb";
import { FiPrinter } from "react-icons/fi";
import { PiGear } from "react-icons/pi";
import { TiContacts } from "react-icons/ti";
import { IoDocumentTextOutline } from "react-icons/io5";
import GroupsSvg from "../assets/svg/GroupsSvg";

export const usersDetails = {
    grid: [

    ]
}

export const clientsDetails = {
    title: "Cliente",
    grid: [
        {
            icon: <IoDocumentTextOutline />,
            title: "Pedidos",
            body: "Listado de pedidos realizados por este cliente.",
            key: "pedidos"
        },
        {
            icon: <TiContacts />,
            title: "Contactos",
            body: "Lista de contactos pertenecientes a este cliente.",
            key: "contactos"
        },
        {
            icon: <GroupsSvg />,
            title: "Grupos",
            body: "Lista de grupos de contactos pertenecientes a este cliente.",
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
            body: "Estrategias de color pertenecientes a este cliente",
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