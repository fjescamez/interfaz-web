import { HiOutlineRefresh } from "react-icons/hi"
import { PiNoteLight, PiFoldersLight, PiEnvelopeLight, PiStackLight, PiStorefrontLight, PiImagesLight } from "react-icons/pi"
import LenFile from "../assets/svg/LenFile"
import Plotter from "../assets/svg/Plotter"
import MontajeSvg from "../assets/svg/MontajeSvg"
import { GoVersions } from "react-icons/go"

export const orderIcons = [
    {
        id: 1,
        icon: <HiOutlineRefresh className="refresh" />,
        action: "update",
        tooltip: "ACTUALIZAR"
    },
    {
        id: 2,
        icon: <PiNoteLight />,
        action: "openNotes",
        tooltip: "NOTAS"
    },
    {
        id: 3,
        icon: <PiFoldersLight />,
        action: "openFolder",
        tooltip: "ABRIR CARPETA"
    },
    {
        id: 4,
        icon: <GoVersions />,
        action: "versions",
        tooltip: "VERSIONES"
    },
    {
        id: 5,
        icon: <p style={{ fontSize: "2rem" }}>DOC</p>,
        action: "kioscoDoc",
        tooltip: "Kiosco DOC"
    },
    {
        id: 6,
        icon: <p style={{ fontSize: "2rem" }}>XML</p>,
        action: "kioskoXml",
        tooltip: "Kiosco XML"
    },
    {
        id: 7,
        icon: <PiEnvelopeLight />,
        action: "email",
        tooltip: "EMAIL"
    },
    {
        id: 8,
        icon: <PiStackLight />,
        action: "compare",
        tooltip: "COMPARAR"
    },
    {
        id: 9,
        icon: <LenFile />,
        action: "lenFiles",
        tooltip: "FICHEROS LEN"
    },
    {
        id: 10,
        icon: <PiStorefrontLight />,
        action: "kiosk",
        tooltip: "KIOSKO"
    },
    {
        id: 11,
        icon: <PiImagesLight />,
        action: "files",
        tooltip: "FICHAS"
    },
    {
        id: 12,
        icon: "",
        action: "",
        tooltip: ""
    },
    {
        id: 13,
        icon: <MontajeSvg />,
        action: "montaje",
        tooltip: "MONTAJE"
    },
    {
        id: 14,
        icon: <Plotter />,
        action: "plotter",
        tooltip: "PLOTTER",
        last: true
    }
];