import { SlBriefcase } from "react-icons/sl";

import {
    FaBoxOpen,
    FaUserCircle,
    FaUsers,
    FaStamp
} from "react-icons/fa";

import { IoDocumentTextOutline } from "react-icons/io5";

import { TiContacts } from "react-icons/ti";

import { TbColorSwatch } from "react-icons/tb";

import { HiOutlineRefresh } from "react-icons/hi";

import {
    PiOven,
    PiEnvelopeLight,
    PiNoteLight,
    PiGear,
    PiImagesLight
} from "react-icons/pi";

import { RiText, RiPaintFill } from "react-icons/ri";

import {
    BsFiletypeDoc,
    BsFiletypeXml,
    BsInfoLg
} from "react-icons/bs";

import { AiOutlineSignature } from "react-icons/ai";

import { MdBarcodeReader } from "react-icons/md";

import { GoVersions } from "react-icons/go";

// SVG CUSTOM
import GroupsSvg from "../../assets/svg/GroupsSvg";
import Plotter from "../../assets/svg/Plotter";
import MontajeSvg from "../../assets/svg/MontajeSvg";
import LenFile from "../../assets/svg/LenFile";

export const appIcons = {
    // GENERALES
    briefcase: SlBriefcase,
    users: FaUsers,
    usersCircle: FaUserCircle,

    document: IoDocumentTextOutline,
    contacts: TiContacts,

    groups: GroupsSvg,

    palette: TbColorSwatch,
    paint: RiPaintFill,

    gear: PiGear,
    refresh: HiOutlineRefresh,
    oven: PiOven,

    box: FaBoxOpen,
    barcode: MdBarcodeReader,

    jobExt: FaStamp,
    stamp: FaStamp,

    versions: GoVersions,

    // TEXTO / EMAIL
    text: RiText,
    riText: RiText,

    email: PiEnvelopeLight,
    envelope: PiEnvelopeLight,

    info: BsInfoLg,
    infoEmail: BsInfoLg,

    // NOTAS
    note: PiNoteLight,
    notes: PiNoteLight,

    // IMÁGENES
    image: PiImagesLight,
    images: PiImagesLight,

    // ARCHIVOS
    doc: BsFiletypeDoc,
    documentDoc: BsFiletypeDoc,

    xml: BsFiletypeXml,
    documentXml: BsFiletypeXml,

    // FIRMA
    signature: AiOutlineSignature,

    // SVG PERSONALIZADOS
    plotter: Plotter,
    montaje: MontajeSvg,
    lenFile: LenFile
};