import { HiOutlineRefresh } from "react-icons/hi"
import { PiNoteLight, PiFoldersLight, PiEnvelopeLight, PiStackLight, PiStorefrontLight, PiImagesLight } from "react-icons/pi"
import { BsFiletypeDoc, BsFiletypeXml, BsFileEarmark } from "react-icons/bs";
import { RiPaintFill } from "react-icons/ri";
import { SlSpeech } from "react-icons/sl";
import { TbSquareLetterKFilled } from "react-icons/tb";
import LenFile from "../assets/svg/LenFile";
import Plotter from "../assets/svg/Plotter";
import MontajeSvg from "../assets/svg/MontajeSvg";
import { GoVersions } from "react-icons/go";

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
                id: 21,
                icon: <BsFiletypeDoc />,
                action: "kioscoDoc",
                tooltip: "Kiosco DOC",
                first: true
            },
            {
                id: 20,
                icon: <BsFiletypeXml />,
                action: "kioscoXml",
                tooltip: "Kiosco XML",
                last: true
            }
        ],
        tooltip: "KIOSCOS"
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
    {
        icon: <RiPaintFill />,
        action: "tintas",
        tooltip: "TINTAS"
    },
    {
        icon: <SlSpeech />,
        action: "opcionales",
        tooltip: "OPCIONALES"
    },
    {
        icon: <PiImagesLight />,
        action: "files",
        tooltip: "FICHAS"
    },
    {
        icon: <MontajeSvg />,
        action: "montaje",
        tooltip: "MONTAJES"
    },
    {
        icon: <Plotter />,
        action: "plotter",
        tooltip: "PLOTTER",
        last: true
    }
];