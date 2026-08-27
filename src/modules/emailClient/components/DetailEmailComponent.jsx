import { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdEmail, MdPerson, MdSchedule, MdContentCopy, MdCheck, MdClose, MdExpandLess, MdExpandMore, MdOutlineReply, } from "react-icons/md";
import { RiInboxArchiveFill } from "react-icons/ri";
import ReplyEmailComposer from "./ReplyEmailComposer";
import { list_with_options } from "../../../helpers/cloudflow/custom_objects";
import { start_from_whitepaper_with_options } from "../../../helpers/cloudflow/hub";
import "./DetailEmailComponent.css";
import "./DetailEmailComponent-reply-status.css";
const ORDER_COLLECTION = "listXml";
const PENDING_TAG = {
    id: "pending",
    type: "pending",
    label: "Pendiente"
};
const SUBJECT_WORDS_TO_REMOVE = [
    "Flexomed",
    "URGENTE",
];
function escapeRegExp(value) {
    return String(value)
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function normalizeSubjectText(value) {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
function cleanSubjectForOrder(value) {
    let cleanedSubject = String(value || "").trim();
    const lastColonIndex = cleanedSubject.lastIndexOf(":");
    if (lastColonIndex !== -1) {
        cleanedSubject =
            cleanedSubject.slice(lastColonIndex + 1);
    }
    cleanedSubject =
        normalizeSubjectText(cleanedSubject);
    const removableWords = SUBJECT_WORDS_TO_REMOVE
        .map(word => normalizeSubjectText(word).trim())
        .filter(Boolean)
        .map(escapeRegExp);
    if (removableWords.length > 0) {
        const removableWordsRegex = new RegExp(`\\b(?:${removableWords.join("|")})\\b`, "gi");
        cleanedSubject =
            cleanedSubject.replace(removableWordsRegex, " ");
    }
    return cleanedSubject
        .replace(/[^a-zA-Z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toUpperCase()
        .trim();
}
async function copyToClipboard(value) {
    if (navigator.clipboard &&
        window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        return;
    }
    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    textArea.style.pointerEvents = "none";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const copied = document.execCommand("copy");
    textArea.remove();
    if (!copied) {
        throw new Error("El navegador no permitió copiar el texto");
    }
}
const REPLY_STATUS_CONFIG = {
    draft: {
        label: "Borrador"
    },
    pending: {
        label: "Pendiente"
    },
    queued: {
        label: "Pendiente"
    },
    processing: {
        label: "Enviando"
    },
    sent: {
        label: "Enviado"
    },
    failed: {
        label: "Error de envío"
    }
};
function normalizeReplyStatus(value) {
    return String(value || "draft")
        .trim()
        .toLowerCase();
}
function getReplyStatusLabel(status) {
    return REPLY_STATUS_CONFIG[status]?.label || status;
}
function formatReplyDate(value) {
    if (!value)
        return "";
    const parsedDate = new Date(value);
    if (Number.isNaN(parsedDate.getTime())) {
        return String(value);
    }
    return parsedDate.toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}
async function searchOrders(searchValue) {
    const response = await list_with_options(ORDER_COLLECTION, [
        "id_pedido",
        "contains text like",
        searchValue
    ], [], [
        "id_pedido",
        "xml.numero.marca",
        "xml.numero.cliente_nombre",
        "xml.numero.version",
        "rutaTrabajo"
    ]);
    return Array.isArray(response?.results)
        ? response.results
        : [];
}
function DetailEmailComponent({ email, emailReplies = [], onReferenceTagsChange, onReply, onArchive, replyingEmail, replyDraftId, replyDraftMessage = "", replyDraftSaveStatus = "saved", onReplyDraftMessageChange, sendingReply = false, loadingReplyDraft = false, onCancelReply, onSendReply }) {
    /* ESTADOS GENERALES */
    const [updatingTags, setUpdatingTags] = useState(false);
    const [emailIdCopied, setEmailIdCopied] = useState(false);
    const [collapsedHeader, setCollapsedHeader] = useState(false);
    const [subjectCopied, setSubjectCopied] = useState(false);
    /* ARCHIVAR */
    const [archiveOpen, setArchiveOpen] = useState(false);
    const [archiveOrderNumber, setArchiveOrderNumber] = useState("");
    const [archivingEmail, setArchivingEmail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [availableOrders, setAvailableOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [highlightedOrderIndex, setHighlightedOrderIndex] = useState(-1);
    const orderResultRefs = useRef([]);
    const archiveInputRef = useRef(null);
    /* BUSCADOR DE PEDIDOS */
    useEffect(() => {
        const searchValue = archiveOrderNumber.trim();
        if (!archiveOpen) {
            return;
        }
        if (selectedOrder &&
            String(selectedOrder.id_pedido) === searchValue) {
            setAvailableOrders([]);
            setLoadingOrders(false);
            return;
        }
        if (selectedOrder) {
            setSelectedOrder(null);
        }
        if (searchValue.length < 4) {
            setAvailableOrders([]);
            setLoadingOrders(false);
            return;
        }
        setLoadingOrders(true);
        let ignoreResult = false;
        const timeout = window.setTimeout(async () => {
            try {
                const orders = await searchOrders(searchValue);
                if (ignoreResult) {
                    return;
                }
                setAvailableOrders(orders);
            }
            catch (error) {
                if (ignoreResult) {
                    return;
                }
                console.error("Error buscando pedidos:", error);
                setAvailableOrders([]);
            }
            finally {
                if (!ignoreResult) {
                    setLoadingOrders(false);
                }
            }
        }, 300);
        return () => {
            ignoreResult = true;
            window.clearTimeout(timeout);
        };
    }, [
        archiveOrderNumber,
        archiveOpen,
        selectedOrder
    ]);
    useEffect(() => {
        setArchiveOpen(false);
        setArchiveOrderNumber("");
        setSelectedOrder(null);
        setAvailableOrders([]);
        setLoadingOrders(false);
        setHighlightedOrderIndex(-1);
    }, [email?._id]);
    useEffect(() => {
        if (availableOrders.length > 0 &&
            !selectedOrder) {
            setHighlightedOrderIndex(0);
        }
        else {
            setHighlightedOrderIndex(-1);
        }
    }, [
        availableOrders,
        selectedOrder
    ]);
    useEffect(() => {
        if (highlightedOrderIndex < 0) {
            return;
        }
        const element = orderResultRefs.current[highlightedOrderIndex];
        element?.scrollIntoView({
            block: "nearest"
        });
    }, [highlightedOrderIndex]);
    /* TAGS */
    const referenceTags = Array.isArray(email?.reference_tags)
        ? email.reference_tags
        : [];
    /* RESPUESTAS */
    const replies = Array.isArray(emailReplies)
        ? [...emailReplies].sort((firstReply, secondReply) => {
            const firstDate = firstReply.created_at ||
                firstReply.updated_at ||
                "";
            const secondDate = secondReply.created_at ||
                secondReply.updated_at ||
                "";
            return String(firstDate).localeCompare(String(secondDate));
        })
        : [];
    const hasActiveReply = replies.some(reply => [
        "draft",
        "pending",
        "queued",
        "processing"
    ].includes(normalizeReplyStatus(reply.status)));
    /* SIN EMAIL */
    if (!email) {
        return (<div className="emailDetail">
            <div className="emptyEmailDetail">
                Selecciona un correo para previsualizarlo
            </div>
        </div>);
    }
    /* DATOS EMAIL */
    const subject = email.subject ||
        email.asunto ||
        "Sin asunto";
    const from = email.from ||
        email.emisor ||
        "";
    const to = email.to ||
        email.destinatario ||
        "";
    const cc = email.cc ||
        "";
    const date = [
        email.fecha,
        email.hora
    ]
        .filter(Boolean)
        .join(" ");
    const html = email.bodyHtml ||
        email.cuerpoHtml ||
        "";
    /* ADJUNTOS */
    const parseAttachments = () => {
        try {
            if (!email.attachments) {
                return [];
            }
            if (Array.isArray(email.attachments)) {
                return email.attachments;
            }
            return JSON.parse(email.attachments);
        }
        catch (error) {
            console.warn("No se han podido leer los adjuntos:", error);
            return [];
        }
    };
    const attachments = parseAttachments();
    const visibleAttachments = attachments.filter(attachment => !attachment.isInline);
    /* HTML FALLBACK */
    const fallbackHtml = `
        <html>
            <body style="font-family: Arial, sans-serif; padding: 16px;">
                <p>No hay contenido HTML disponible para este correo.</p>
            </body>
        </html>
    `;
    /* DESTINATARIOS */
    const parseRecipients = value => {
        if (!value) {
            return [];
        }
        if (Array.isArray(value)) {
            return value
                .map(recipient => String(recipient).trim())
                .filter(Boolean);
        }
        return String(value)
            .split(";")
            .map(recipient => recipient.trim())
            .filter(Boolean);
    };
    const fromRecipients = parseRecipients(from);
    const toRecipients = parseRecipients(to);
    const ccRecipients = parseRecipients(cc);
    /* COPIAR ASUNTO */
    const handleCopySubject = async () => {
        const cleanedSubject = cleanSubjectForOrder(subject);
        if (!cleanedSubject) {
            return;
        }
        try {
            await copyToClipboard(cleanedSubject);
            setSubjectCopied(true);
            window.setTimeout(() => {
                setSubjectCopied(false);
            }, 2000);
        }
        catch (error) {
            console.error("No se pudo copiar el asunto:", error);
        }
    };
    /* COPIAR ID */
    const handleCopyEmailId = async () => {
        const emailId = email?._id;
        if (!emailId) {
            return;
        }
        const textToCopy = `Id email: ${emailId}`;
        try {
            await copyToClipboard(textToCopy);
            await addPendingTag();
            setEmailIdCopied(true);
            window.setTimeout(() => {
                setEmailIdCopied(false);
            }, 2500);
        }
        catch (error) {
            console.error("No se pudo copiar el identificador:", error);
        }
    };
    /* GUARDAR TAGS */
    const saveReferenceTags = async (nextTags) => {
        if (!email?._id ||
            updatingTags ||
            !onReferenceTagsChange) {
            return false;
        }
        const previousTags = referenceTags;
        setUpdatingTags(true);
        try {
            await onReferenceTagsChange(email._id, previousTags, nextTags);
            return true;
        }
        catch (error) {
            console.error("No se pudieron actualizar las etiquetas:", error);
            return false;
        }
        finally {
            setUpdatingTags(false);
        }
    };
    /* AÑADIR PENDIENTE */
    const addPendingTag = async () => {
        const alreadyReferenced = referenceTags.some(tag => tag.type === "pending" ||
            tag.type === "order");
        if (alreadyReferenced) {
            return true;
        }
        return saveReferenceTags([
            ...referenceTags,
            PENDING_TAG
        ]);
    };
    /* ELIMINAR TAG */
    const removeReferenceTag = async (tagId) => {
        const nextTags = referenceTags.filter(tag => tag.id !== tagId);
        await saveReferenceTags(nextTags);
    };
    /* RESPONDER */
    const handleReply = () => {
        if (!email ||
            !onReply ||
            hasActiveReply ||
            loadingReplyDraft ||
            archiveOpen) {
            return;
        }
        onReply(email);
    };
    /* ABRIR ARCHIVAR */
    const handleArchive = () => {
        if (!email ||
            hasActiveReply ||
            loadingReplyDraft ||
            archiveOpen) {
            return;
        }
        setArchiveOrderNumber("");
        setSelectedOrder(null);
        setAvailableOrders([]);
        setLoadingOrders(false);
        setHighlightedOrderIndex(-1);
        setArchiveOpen(true);
    };
    /* CANCELAR ARCHIVAR */
    const handleCancelArchive = () => {
        if (archivingEmail) {
            return;
        }
        setArchiveOpen(false);
        setArchiveOrderNumber("");
        setSelectedOrder(null);
        setAvailableOrders([]);
        setLoadingOrders(false);
        setHighlightedOrderIndex(-1);
    };
    /* SELECCIONAR PEDIDO */
    const handleSelectOrder = order => {
        if (!order?.id_pedido)
            return;
        setSelectedOrder(order);
        setArchiveOrderNumber(String(order.id_pedido));
        setAvailableOrders([]);
        setLoadingOrders(false);
        setHighlightedOrderIndex(-1);
    };
    const handleClearOrderSearch = () => {
        setArchiveOrderNumber("");
        setSelectedOrder(null);
        setAvailableOrders([]);
        setLoadingOrders(false);
        setHighlightedOrderIndex(-1);
        window.requestAnimationFrame(() => archiveInputRef.current?.focus());
    };
    const handleOrderInputChange = event => {
        const value = event.target.value;
        setArchiveOrderNumber(value);
        if (selectedOrder && value.trim() !== String(selectedOrder.id_pedido)) {
            setSelectedOrder(null);
        }
    };
    const handleOrderInputKeyDown = event => {
        if (event.key === "ArrowDown" && availableOrders.length > 0) {
            event.preventDefault();
            setHighlightedOrderIndex(current => Math.min(current < 0 ? 0 : current + 1, availableOrders.length - 1));
            return;
        }
        if (event.key === "ArrowUp" && availableOrders.length > 0) {
            event.preventDefault();
            setHighlightedOrderIndex(current => Math.max(current <= 0 ? 0 : current - 1, 0));
            return;
        }
        if (event.key === "Enter" &&
            availableOrders.length > 0 &&
            highlightedOrderIndex >= 0) {
            event.preventDefault();
            const order = availableOrders[highlightedOrderIndex];
            if (order)
                handleSelectOrder(order);
            return;
        }
        if (event.key === "Escape" && archiveOrderNumber) {
            event.preventDefault();
            handleClearOrderSearch();
        }
    };
    /* CONFIRMAR ARCHIVAR */
    const handleConfirmArchive = async (event) => {
        event.preventDefault();
        if (!email ||
            !selectedOrder ||
            !selectedOrder.id_pedido ||
            archivingEmail) {
            return;
        }

        setArchivingEmail(true);

        try {
            await start_from_whitepaper_with_options(
                "Funciones_Genericas",
                "start_gestor",
                {
                    variables:{
                        email,
                        selectedOrder,
                        action: "FileDocForTheOrder",
                        pedido: selectedOrder?.id_pedido
                    }
                }
            )

            await addPendingTag();

            setArchiveOpen(false);
            setArchiveOrderNumber("");
            setSelectedOrder(null);
            setAvailableOrders([]);
            setLoadingOrders(false);
            setHighlightedOrderIndex(-1);
        }
        catch (error) {
            console.error("No se pudo archivar el correo:", error);
        }
        finally {
            setArchivingEmail(false);
        }
    };
    /* RETURN */
    return (<div className="emailDetail">
        {/* CABECERA */}
        <div className="emailDetailHeader">
            <div className="emailSubjectRow">
                <div className="emailSubjectMain">
                    <button type="button" className={[
                        "emailCopyButton",
                        subjectCopied
                            ? "copied"
                            : ""
                    ]
                        .filter(Boolean)
                        .join(" ")} onClick={handleCopySubject} title={subjectCopied
                            ? "Asunto copiado"
                            : "Copiar asunto para pedido"} aria-label={subjectCopied
                                ? "Asunto copiado"
                                : "Copiar asunto para pedido"}>
                        {subjectCopied
                            ? <MdCheck />
                            : <MdEmail />}
                    </button>
                    <h2>
                        {subject}
                    </h2>
                    {/* TAGS */}
                    {referenceTags.length > 0 && (<div className="emailReferenceTags">
                        {referenceTags.map(tag => (<span key={tag.id} className={[
                            "emailReferenceTag",
                            tag.type === "pending"
                                ? "emailReferenceTagPending"
                                : "emailReferenceTagOrder"
                        ].join(" ")}>
                            <span>
                                {tag.label}
                            </span>
                            <button type="button" className="emailReferenceTagRemove" onClick={() => removeReferenceTag(tag.id)} disabled={updatingTags} title={`Eliminar ${tag.label}`} aria-label={`Eliminar ${tag.label}`}>
                                <MdClose />
                            </button>
                        </span>))}
                    </div>)}
                </div>
                {/* ACCIONES */}
                <div className="emailHeaderActions">
                    {/* RESPONDER */}
                    <button type="button" className="emailHeaderActionButton emailReplyAction" onClick={handleReply} title={loadingReplyDraft
                        ? "Cargando respuestas"
                        : hasActiveReply
                            ? "Hay una respuesta en curso"
                            : archiveOpen
                                ? "Hay un archivado en curso"
                                : "Responder correo"} aria-label={loadingReplyDraft
                                    ? "Cargando respuestas"
                                    : hasActiveReply
                                        ? "Hay una respuesta en curso"
                                        : archiveOpen
                                            ? "Hay un archivado en curso"
                                            : "Responder correo"} disabled={loadingReplyDraft ||
                                                hasActiveReply ||
                                                archiveOpen}>
                        <MdOutlineReply />
                    </button>
                    {/* ARCHIVAR */}
                    <button type="button" className="emailHeaderActionButton emailArchiveAction" onClick={handleArchive} title={loadingReplyDraft
                        ? "Cargando respuestas"
                        : hasActiveReply
                            ? "Hay una respuesta en curso"
                            : archiveOpen
                                ? "Archivado en curso"
                                : "Archivar correo"} aria-label="Archivar correo" disabled={loadingReplyDraft ||
                                    hasActiveReply ||
                                    archiveOpen}>
                        <RiInboxArchiveFill />
                    </button>
                    {/* ID COLAPSADO */}
                    {collapsedHeader && (<button type="button" className={[
                        "emailCopyButton",
                        "emailCopyButtonCollapsed",
                        emailIdCopied
                            ? "copied"
                            : ""
                    ]
                        .filter(Boolean)
                        .join(" ")} onClick={handleCopyEmailId} title={emailIdCopied
                            ? "ID copiado"
                            : "Copiar identificador"} aria-label={emailIdCopied
                                ? "ID copiado"
                                : "Copiar identificador"} disabled={!email?._id}>
                        {emailIdCopied
                            ? <MdCheck />
                            : <MdContentCopy />}
                    </button>)}
                    {/* COLAPSAR */}
                    <button type="button" className="emailCollapseButton" onClick={() => setCollapsedHeader(current => !current)} title={collapsedHeader
                        ? "Mostrar información del correo"
                        : "Ocultar información del correo"} aria-label={collapsedHeader
                            ? "Mostrar información del correo"
                            : "Ocultar información del correo"} aria-expanded={!collapsedHeader}>
                        {collapsedHeader
                            ? <MdExpandMore />
                            : <MdExpandLess />}
                    </button>
                </div>
            </div>
            {/* METADATOS */}
            {!collapsedHeader && (<div className="emailMeta">
                {/* DE */}
                <div className="emailMetaRow emailSenderRow">
                    <div className="emailFromBlock">
                        <MdPerson className="emailMetaIcon" />
                        <div className="emailRecipientsContent">
                            <strong>
                                De:
                            </strong>
                            <div className="emailRecipientList">
                                {fromRecipients.length > 0
                                    ? (fromRecipients.map((recipient, index) => (<span key={`${recipient}-${index}`} className="emailRecipientTag" title={recipient}>
                                        {recipient}
                                    </span>)))
                                    : (<span className="emailRecipientEmpty">
                                        Sin remitente
                                    </span>)}
                            </div>
                        </div>
                    </div>
                    {/* IDENTIFICADOR */}
                    <div className="emailFromBlock emailIdBlock">
                        <div className="emailRecipientsContent">
                            <strong>
                                Identificador:
                            </strong>
                            <div className="emailRecipientList">
                                <span className={[
                                    "emailRecipientTag",
                                    "emailIdTag",
                                    emailIdCopied
                                        ? "copied"
                                        : ""
                                ]
                                    .filter(Boolean)
                                    .join(" ")} title={email?._id}>
                                    {email?._id}
                                </span>
                            </div>
                        </div>
                        <button type="button" className={[
                            "emailCopyButton",
                            emailIdCopied
                                ? "copied"
                                : ""
                        ]
                            .filter(Boolean)
                            .join(" ")} onClick={handleCopyEmailId} title={emailIdCopied
                                ? "ID copiado"
                                : "Copiar ID"} aria-label={emailIdCopied
                                    ? "ID copiado"
                                    : "Copiar ID"} disabled={!email?._id}>
                            {emailIdCopied
                                ? <MdCheck />
                                : <MdContentCopy />}
                        </button>
                    </div>
                </div>
                {/* PARA */}
                <div className="emailMetaRow emailRecipientsRow">
                    <MdPerson />
                    <div className="emailRecipientsContent">
                        <strong>
                            Para:
                        </strong>
                        <div className="emailRecipientList">
                            {toRecipients.length > 0
                                ? (toRecipients.map((recipient, index) => (<span key={`${recipient}-${index}`} className="emailRecipientTag" title={recipient}>
                                    {recipient}
                                </span>)))
                                : (<span className="emailRecipientEmpty">
                                    Sin destinatario
                                </span>)}
                        </div>
                    </div>
                </div>
                {/* CC */}
                {ccRecipients.length > 0 && (<div className="emailMetaRow emailRecipientsRow">
                    <MdPerson />
                    <div className="emailRecipientsContent">
                        <strong>
                            CC:
                        </strong>
                        <div className="emailRecipientList">
                            {ccRecipients.map((recipient, index) => (<span key={`${recipient}-${index}`} className="emailRecipientTag" title={recipient}>
                                {recipient}
                            </span>))}
                        </div>
                    </div>
                </div>)}
                {/* FECHA */}
                {date && (<div className="emailMetaRow emailRecipientsRow">
                    <MdSchedule />
                    <div className="emailRecipientsContent">
                        <strong>
                            Fecha: {date}
                        </strong>
                    </div>
                </div>)}
            </div>)}
        </div>
        {/* ADJUNTOS */}
        {visibleAttachments.length > 0 && (<div className="emailAttachments">
            <h3>
                Adjuntos
            </h3>
            <div className="emailAttachmentList">
                {visibleAttachments.map((attachment, index) => (<div key={attachment.id ||
                    `${attachment.name}-${index}`} className="emailAttachmentItem" title={attachment.name}>
                    <MdAttachFile />
                    <div className="emailAttachmentText">
                        <p>
                            {attachment.name}
                        </p>
                        {attachment.size && (<span>
                            {(attachment.size /
                                1024 /
                                1024).toFixed(2)} MB
                        </span>)}
                    </div>
                </div>))}
            </div>
        </div>)}
        {/* CUERPO */}
        <div className={[
            "emailBody",
            (replies.length > 0 ||
                archiveOpen)
                ? "emailBodyReplying"
                : ""
        ]
            .filter(Boolean)
            .join(" ")}>
            {/* ARCHIVAR */}
            {archiveOpen && (<form className="emailReplyEntry emailArchiveComposer" onSubmit={handleConfirmArchive}>
                {/* CABECERA ARCHIVAR */}
                <div className="emailReplyEntryHeader">
                    <div className="emailReplyEntryIdentity">
                        <RiInboxArchiveFill />
                        <div>
                            <strong>
                                Archivar correo
                            </strong>
                            <span>
                                Asocia el correo a un número de pedido
                            </span>
                        </div>
                    </div>
                    <button type="button" className="emailArchiveCloseButton" onClick={handleCancelArchive} disabled={archivingEmail} title="Cancelar" aria-label="Cancelar">
                        <MdClose />
                    </button>
                </div>
                {/* BUSCADOR PEDIDO */}
                <div className="emailArchiveField">
                    <span className="emailArchiveFieldLabel">
                        Número de pedido
                    </span>
                    <div className="emailArchiveInputWrapper">
                        <input ref={archiveInputRef} id="archiveOrderNumber" name="archiveOrderNumber" type="text" autoComplete="off" autoFocus value={archiveOrderNumber} className={selectedOrder
                            ? "emailArchiveInputSelected"
                            : ""} onChange={handleOrderInputChange} onKeyDown={handleOrderInputKeyDown} placeholder="Introduce al menos 4 caracteres" disabled={archivingEmail} role="combobox" aria-autocomplete="list" aria-controls="archiveOrderResults" aria-expanded={availableOrders.length > 0} aria-activedescendant={highlightedOrderIndex >= 0
                                ? `archiveOrderOption-${highlightedOrderIndex}`
                                : undefined} />
                        {/* LIMPIAR */}
                        {archiveOrderNumber && (<button type="button" className={[
                            "emailArchiveInputClear",
                            selectedOrder ? "selected" : ""
                        ].filter(Boolean).join(" ")} onClick={handleClearOrderSearch} disabled={archivingEmail} title="Limpiar pedido" aria-label="Limpiar pedido">
                            <MdClose />
                        </button>)}
                    </div>
                    {/* BUSCANDO */}
                    {loadingOrders && (<div className="emailArchiveOrderMessage">
                        Buscando pedidos...
                    </div>)}
                    {/* RESULTADOS */}
                    {!loadingOrders &&
                        !selectedOrder &&
                        availableOrders.length > 0 && (<div id="archiveOrderResults" className="emailArchiveOrderResults" role="listbox">
                            {availableOrders.map((order, index) => (<button ref={element => {
                                orderResultRefs.current[index] = element;
                            }} key={order._id ||
                                order.id_pedido} id={`archiveOrderOption-${index}`} type="button" role="option" aria-selected={index ===
                                    highlightedOrderIndex} className={[
                                        "emailArchiveOrderResult",
                                        index ===
                                            highlightedOrderIndex
                                            ? "emailArchiveOrderResultActive"
                                            : ""
                                    ]
                                        .filter(Boolean)
                                        .join(" ")} onMouseEnter={() => setHighlightedOrderIndex(index)} onClick={() => handleSelectOrder(order)}>
                                <div className="emailArchiveOrderResultMain">
                                    <strong>
                                        {`${order.id_pedido} ${order.xml.numero.marca}`}
                                    </strong>
                                    {order.xml.numero.cliente_nombre && (<span title={order.xml.numero.cliente_nombre}>
                                        {order.xml.numero.cliente_nombre}
                                    </span>)}
                                </div>
                                <span className="emailArchiveOrderSelectText">
                                    Seleccionar
                                </span>
                            </button>))}
                        </div>)}
                    {/* SIN RESULTADOS */}
                    {!loadingOrders &&
                        !selectedOrder &&
                        archiveOrderNumber.trim().length >= 4 &&
                        availableOrders.length === 0 && (<div className="emailArchiveOrderMessage emailArchiveOrderEmpty">
                            No se han encontrado pedidos
                        </div>)}
                </div>
                {/* ACCIONES ARCHIVAR */}
                <div className="emailArchiveActions">
                    <button type="button" className="emailArchiveCancelButton" onClick={handleCancelArchive} disabled={archivingEmail}>
                        Cancelar
                    </button>
                    <button type="submit" className="emailArchiveSubmitButton" disabled={!selectedOrder ||
                        archivingEmail}>
                        <RiInboxArchiveFill />
                        {archivingEmail
                            ? "Archivando..."
                            : "Archivar"}
                    </button>
                </div>
            </form>)}
            {/* RESPUESTAS */}
            {replies.length > 0 && (<div className="emailReplyThread">
                {replies.map(reply => {
                    const status = normalizeReplyStatus(reply.status);
                    const isEditableDraft = status === "draft" &&
                        reply._id === replyDraftId &&
                        Boolean(replyingEmail);
                    if (isEditableDraft) {
                        return (<ReplyEmailComposer key={reply._id} email={replyingEmail} draftId={reply._id} initialMessage={replyDraftMessage} draftSaveStatus={replyDraftSaveStatus} onMessageChange={onReplyDraftMessageChange} sending={sendingReply} onCancel={onCancelReply} onSend={onSendReply} />);
                    }
                    const replyDate = reply.sent_at ||
                        reply.processing_at ||
                        reply.queued_at ||
                        reply.updated_at ||
                        reply.created_at;
                    return (<article key={reply._id} className={[
                        "emailReplyEntry",
                        `emailReplyEntry--${status}`
                    ].join(" ")}>
                        <div className="emailReplyEntryHeader">
                            <div className="emailReplyEntryIdentity">
                                <MdOutlineReply />
                                <div>
                                    <strong>
                                        Respuesta
                                    </strong>
                                    <span title={reply.recipient}>
                                        Para: {reply.recipient ||
                                            "Sin destinatario"}
                                    </span>
                                </div>
                            </div>
                            <div className="emailReplyEntryStatusBlock">
                                <span className={[
                                    "emailReplyStatusBadge",
                                    `emailReplyStatusBadge--${status}`
                                ].join(" ")}>
                                    {getReplyStatusLabel(status)}
                                </span>
                                {replyDate && (<time dateTime={String(replyDate)} title={String(replyDate)}>
                                    {formatReplyDate(replyDate)}
                                </time>)}
                            </div>
                        </div>
                        <div className="emailReplyEntrySubject">
                            <span>
                                Asunto
                            </span>
                            <strong>
                                {reply.subject ||
                                    "Sin asunto"}
                            </strong>
                        </div>
                        <div className="emailReplyEntryMessage">
                            {reply.message ||
                                "Sin contenido"}
                        </div>
                        {status === "failed" &&
                            reply.error_message && (<div className="emailReplyEntryError">
                                {reply.error_message}
                            </div>)}
                    </article>);
                })}
            </div>)}
            {/* MENSAJE ORIGINAL */}
            {(replies.length > 0 ||
                archiveOpen) && (<div className="emailOriginalDivider">
                    <div className="emailOriginalDividerInfo">
                        <strong>
                            Mensaje original
                        </strong>
                        {from && (<span title={from}>
                            {from}
                        </span>)}
                    </div>
                    {date && (<span className="emailOriginalDividerDate">
                        {date}
                    </span>)}
                </div>)}
            {/* EMAIL ORIGINAL */}
            <iframe title={`Vista previa - ${subject}`} srcDoc={html ||
                fallbackHtml} sandbox="" />
        </div>
    </div>);
}
export default DetailEmailComponent;
