import { HiOutlineRefresh } from "react-icons/hi"
import { PiNoteLight, PiFoldersLight, PiEnvelopeLight, PiStackLight, PiStorefrontLight, PiImagesLight } from "react-icons/pi"
import { BsFiletypeDoc, BsFiletypeXml, BsFileEarmark, BsTrash3Fill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RiPaintFill } from "react-icons/ri";
import { SlSpeech } from "react-icons/sl";
import { TbSquareLetterKFilled } from "react-icons/tb";
import { ImFilesEmpty } from "react-icons/im";
import { BsInfoLg } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { RiText } from "react-icons/ri";
import { AiOutlineSignature } from "react-icons/ai";
import LenFile from "../assets/svg/LenFile";
import Plotter from "../assets/svg/Plotter";
import MontajeSvg from "../assets/svg/MontajeSvg";
import { GoVersions } from "react-icons/go";

export const clientApps = [
    {
        client: "FLEXOGRÁFICA DEL MEDITERRÁNEO, S.L.",
        url: "http://192.4.26.120:9090/portal.cgi/RECURSOS_CLOUDFLOW/espacio_clientes/web_center/index.html?connector=whitepaper&collection=web_center_app&id=%7B%22inputname%22%3A%22actions%22%2C%22variables%22%3A%7B%7D%7D"
    }
];

export const orderSidebarIcons = [
    {
        icon: <HiOutlineRefresh className="refresh" />,
        action: "update",
        tooltip: "ACTUALIZAR"
    },
    {
        icon: <PiNoteLight />,
        action: "openNotes",
        tooltip: "NOTAS"
    },
    {
        icon: <PiFoldersLight />,
        action: "openFolder",
        tooltip: "ABRIR CARPETA"
    },
    {
        icon: <GoVersions />,
        action: "versions",
        tooltip: "VERSIONES"
    },
    {
        icon: <TbSquareLetterKFilled />,
        buttons: [
            {
                icon: <FaExternalLinkAlt />,
                action: "clientApp",
                tooltip: "KIOSCO CLIENTE",
                first: true
            },
            {
                icon: <BsFiletypeDoc />,
                action: "kioscoDoc",
                tooltip: "KIOSCO DOC"
            },
            {
                icon: <BsFiletypeXml />,
                action: "kioscoXml",
                tooltip: "KIOSCO XML"
            },
            {
                icon: <PiStorefrontLight />,
                action: "kiosk",
                tooltip: "KIOSCO AUTO"
            }
        ],
        tooltip: ""
    },
    {
        icon: <ImFilesEmpty />,
        buttons: [
            {
                icon: <LenFile />,
                action: "lenFiles",
                tooltip: "FICHEROS LEN",
                first: true
            },
            {
                icon: <MontajeSvg />,
                action: "montaje",
                tooltip: "MONTAJES"
            },
            {
                icon: <Plotter />,
                action: "plotter",
                tooltip: "PLOTTER"
            },
            {
                icon: <PiImagesLight />,
                action: "files",
                tooltip: "FICHAS"
            },
        ],
        tooltip: ""
    },
    {
        icon: <FaTasks />,
        buttons: [
            {
                icon: <RiText />,
                action: "traceText",
                tooltip: "TRAZAR TEXTO",
                first: true
            },
            {
                icon: <AiOutlineSignature />,
                action: "signJob",
                tooltip: "FIRMAR TRABAJO",
                assigned: true
            },
            {
                icon: <BsTrash3Fill />,
                action: "deleteVersion",
                tooltip: "ELIMINAR VERSIÓN"
            },
        ],
        tooltip: ""
    },
    {
        icon: <PiEnvelopeLight />,
        action: "email",
        tooltip: "EMAIL"
    },
    {
        icon: <PiStackLight />,
        action: "compare",
        tooltip: "COMPARAR"
    },
    {
        icon: <LenFile />,
        action: "lenFiles",
        tooltip: "FICHEROS LEN"
    },
    /* {
        icon: <PiStorefrontLight />,
        action: "kiosk",
        tooltip: "KIOSKO"
    }, */
    {
        icon: <PiImagesLight />,
        action: "files",
        tooltip: "FICHAS"
    },
    /* {
        icon: <RiPaintFill />,
        action: "tintas",
        tooltip: "TINTAS"
    }, */
    {
        icon: <BsInfoLg />,
        action: "info",
        tooltip: "INFO"
    },
    {
        icon: <SlSpeech />,
        action: "opcionales",
        tooltip: "OPCIONALES"
    }
];