import { useState, useEffect } from "react";
import {
    MdAttachFile,
    MdEmail,
    MdPerson,
    MdSchedule,
    MdContentCopy,
    MdCheck,
    MdClose,
    MdExpandLess,
    MdExpandMore,
} from "react-icons/md";

import "./DetailEmailComponent.css";

const EMAIL_COLLECTION = "Email";

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

    /*
     * Si contiene dos puntos, empieza después
     * del último. Ejemplo:
     *
     * RV: RE: Pedido cliente
     * Resultado inicial: Pedido cliente
     */
    const lastColonIndex =
        cleanedSubject.lastIndexOf(":");

    if (lastColonIndex !== -1) {
        cleanedSubject = cleanedSubject
            .slice(lastColonIndex + 1);
    }

    /*
     * Quitamos tildes antes de comparar
     * las palabras excluidas.
     */
    cleanedSubject =
        normalizeSubjectText(cleanedSubject);

    /*
     * Elimina las palabras o expresiones
     * configuradas, sin distinguir mayúsculas.
     */
    const removableWords =
        SUBJECT_WORDS_TO_REMOVE
            .map(word =>
                normalizeSubjectText(word).trim()
            )
            .filter(Boolean)
            .map(escapeRegExp);

    if (removableWords.length > 0) {
        const removableWordsRegex =
            new RegExp(
                `\\b(?:${removableWords.join("|")})\\b`,
                "gi"
            );

        cleanedSubject = cleanedSubject.replace(
            removableWordsRegex,
            " "
        );
    }

    return cleanedSubject
        // Sustituye símbolos por espacios
        .replace(/[^a-zA-Z0-9\s]/g, " ")

        // Elimina espacios repetidos
        .replace(/\s+/g, " ")
        .trim()

        // Convierte a mayúsculas
        .toUpperCase()

        // El corte se hace al final
        //.slice(0, 30)
        .trim();
}


async function copyToClipboard(value) {
    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {
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
        throw new Error(
            "El navegador no permitió copiar el texto"
        );
    }
}


function DetailEmailComponent({ email, onReferenceTagsChange }) {
    const [updatingTags, setUpdatingTags] = useState(false);
    const [emailIdCopied, setEmailIdCopied] = useState(false);
    const [collapsedHeader, setCollapsedHeader] = useState(false);
    const referenceTags = Array.isArray(email?.reference_tags)
        ? email.reference_tags
        : [];
    const [subjectCopied, setSubjectCopied] = useState(false);

    if (!email) {
        return (
            <div className="emailDetail">
                <div className="emptyEmailDetail">
                    Selecciona un correo para previsualizarlo
                </div>
            </div>
        );
    }

    const subject = email.subject || email.asunto || "Sin asunto";
    const from = email.from || email.emisor || "";
    const to = email.to || email.destinatario || "";
    const cc = email.cc || "";
    const date = [email.fecha, email.hora].filter(Boolean).join(" ");
    const html = email.bodyHtml || email.cuerpoHtml || "";

    const parseAttachments = () => {
        try {
            if (!email.attachments) return [];

            if (Array.isArray(email.attachments)) {
                return email.attachments;
            }

            return JSON.parse(email.attachments);
        } catch (error) {
            console.warn("No se han podido leer los adjuntos:", error);
            return [];
        }
    };

    const attachments = parseAttachments();

    const visibleAttachments = attachments.filter(att => !att.isInline);

    const fallbackHtml = `
        <html>
            <body style="font-family: Arial, sans-serif; padding: 16px;">
                <p>No hay contenido HTML disponible para este correo.</p>
            </body>
        </html>
    `;

    const parseRecipients = (value) => {
        if (!value) return [];

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

    const handleCopySubject = async () => {
        const cleanedSubject =
            cleanSubjectForOrder(subject);

        if (!cleanedSubject) {
            return;
        }

        try {
            await copyToClipboard(cleanedSubject);

            setSubjectCopied(true);

            window.setTimeout(() => {
                setSubjectCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "No se pudo copiar el asunto:",
                error
            );
        }
    };

    const handleCopyEmailId = async () => {
        const emailId = email?._id;

        if (!emailId) return;

        const textToCopy = `Id email: ${emailId}`;

        try {
            await copyToClipboard(textToCopy);
            await addPendingTag();

            setEmailIdCopied(true);

            window.setTimeout(() => {
                setEmailIdCopied(false);
            }, 2500);
        } catch (error) {
            console.error(
                "No se pudo copiar el identificador:",
                error
            );
        }
    };

    const saveReferenceTags = async nextTags => {
        if (
            !email?._id ||
            updatingTags ||
            !onReferenceTagsChange
        ) {
            return false;
        }

        const previousTags = referenceTags;

        setUpdatingTags(true);

        try {
            await onReferenceTagsChange(
                email._id,
                previousTags,
                nextTags
            );

            return true;
        } catch (error) {
            console.error(
                "No se pudieron actualizar las etiquetas:",
                error
            );

            return false;
        } finally {
            setUpdatingTags(false);
        }
    };

    const addPendingTag = async () => {
        const alreadyReferenced = referenceTags.some(tag =>
            tag.type === "pending" || tag.type === "order"
        );

        if (alreadyReferenced) return true;

        return saveReferenceTags([
            ...referenceTags,
            PENDING_TAG
        ]);
    };

    const removeReferenceTag = async tagId => {
        const nextTags = referenceTags.filter(
            tag => tag.id !== tagId
        );

        await saveReferenceTags(nextTags);
    };



    return (
        <div className="emailDetail">

            <div className="emailDetailHeader">
                <div className="emailSubjectRow">
                    <div className="emailSubjectMain">
                        <button
                            type="button"
                            className={[
                                "emailCopyButton",
                                subjectCopied ? "copied" : ""
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            onClick={handleCopySubject}
                            title={
                                subjectCopied
                                    ? "Asunto copiado"
                                    : "Copiar asunto para pedido"
                            }
                            aria-label={
                                subjectCopied
                                    ? "Asunto copiado"
                                    : "Copiar asunto para pedido"
                            }
                        >
                            {subjectCopied
                                ? <MdCheck />
                                : <MdEmail />
                            }
                        </button>

                        <h2>{subject}</h2>

                        {referenceTags.length > 0 && (
                            <div className="emailReferenceTags">
                                {referenceTags.map(tag => (
                                    <span
                                        key={tag.id}
                                        className={[
                                            "emailReferenceTag",
                                            tag.type === "pending"
                                                ? "emailReferenceTagPending"
                                                : "emailReferenceTagOrder"
                                        ].join(" ")}
                                    >
                                        <span>{tag.label}</span>

                                        <button
                                            type="button"
                                            className="emailReferenceTagRemove"
                                            onClick={() =>
                                                removeReferenceTag(tag.id)
                                            }
                                            disabled={updatingTags}
                                            title={`Eliminar ${tag.label}`}
                                            aria-label={`Eliminar ${tag.label}`}
                                        >
                                            <MdClose />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="emailHeaderActions">
                        {collapsedHeader && (
                            <button
                                type="button"
                                className={[
                                    "emailCopyButton",
                                    "emailCopyButtonCollapsed",
                                    emailIdCopied ? "copied" : ""
                                ].filter(Boolean).join(" ")}
                                onClick={handleCopyEmailId}
                                title={
                                    emailIdCopied
                                        ? "ID copiado"
                                        : "Copiar identificador"
                                }
                                aria-label={
                                    emailIdCopied
                                        ? "ID copiado"
                                        : "Copiar identificador"
                                }
                                disabled={!email?._id}
                            >
                                {emailIdCopied
                                    ? <MdCheck />
                                    : <MdContentCopy />
                                }
                            </button>
                        )}

                        <button
                            type="button"
                            className="emailCollapseButton"
                            onClick={() =>
                                setCollapsedHeader(current => !current)
                            }
                            title={
                                collapsedHeader
                                    ? "Mostrar información del correo"
                                    : "Ocultar información del correo"
                            }
                            aria-label={
                                collapsedHeader
                                    ? "Mostrar información del correo"
                                    : "Ocultar información del correo"
                            }
                            aria-expanded={!collapsedHeader}
                        >
                            {collapsedHeader
                                ? <MdExpandMore />
                                : <MdExpandLess />
                            }
                        </button>
                    </div>
                </div>

                {!collapsedHeader && (
                    <div className="emailMeta">
                        <div className="emailMetaRow emailSenderRow">
                            <div className="emailFromBlock">
                                <MdPerson className="emailMetaIcon" />

                                <div className="emailRecipientsContent">
                                    <strong>De:</strong>

                                    <div className="emailRecipientList">
                                        {fromRecipients.length > 0 ? (
                                            fromRecipients.map(
                                                (recipient, index) => (
                                                    <span
                                                        key={`${recipient}-${index}`}
                                                        className="emailRecipientTag"
                                                        title={recipient}
                                                    >
                                                        {recipient}
                                                    </span>
                                                )
                                            )
                                        ) : (
                                            <span className="emailRecipientEmpty">
                                                Sin remitente
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="emailFromBlock emailIdBlock">
                                <div className="emailRecipientsContent">
                                    <strong>Identificador:</strong>

                                    <div className="emailRecipientList">
                                        <span
                                            className={[
                                                "emailRecipientTag",
                                                "emailIdTag",
                                                emailIdCopied ? "copied" : ""
                                            ].filter(Boolean).join(" ")}
                                            title={email?._id}
                                        >
                                            {email?._id}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className={[
                                        "emailCopyButton",
                                        emailIdCopied ? "copied" : ""
                                    ].filter(Boolean).join(" ")}
                                    onClick={handleCopyEmailId}
                                    title={
                                        emailIdCopied
                                            ? "ID copiado"
                                            : "Copiar ID"
                                    }
                                    aria-label={
                                        emailIdCopied
                                            ? "ID copiado"
                                            : "Copiar ID"
                                    }
                                    disabled={!email?._id}
                                >
                                    {emailIdCopied
                                        ? <MdCheck />
                                        : <MdContentCopy />
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="emailMetaRow emailRecipientsRow">
                            <MdPerson />

                            <div className="emailRecipientsContent">
                                <strong>Para:</strong>

                                <div className="emailRecipientList">
                                    {toRecipients.length > 0 ? (
                                        toRecipients.map(
                                            (recipient, index) => (
                                                <span
                                                    key={`${recipient}-${index}`}
                                                    className="emailRecipientTag"
                                                    title={recipient}
                                                >
                                                    {recipient}
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <span className="emailRecipientEmpty">
                                            Sin destinatario
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {ccRecipients.length > 0 && (
                            <div className="emailMetaRow emailRecipientsRow">
                                <MdPerson />

                                <div className="emailRecipientsContent">
                                    <strong>CC:</strong>

                                    <div className="emailRecipientList">
                                        {ccRecipients.map(
                                            (recipient, index) => (
                                                <span
                                                    key={`${recipient}-${index}`}
                                                    className="emailRecipientTag"
                                                    title={recipient}
                                                >
                                                    {recipient}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {date && (
                            <div className="emailMetaRow emailRecipientsRow">
                                <MdSchedule />

                                <div className="emailRecipientsContent">
                                    <strong>Fecha: {date}</strong>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {visibleAttachments.length > 0 && (
                <div className="emailAttachments">
                    <h3>Adjuntos</h3>

                    <div className="emailAttachmentList">
                        {visibleAttachments.map((att, index) => (
                            <div
                                key={att.id || `${att.name}-${index}`}
                                className="emailAttachmentItem"
                                title={att.name}
                            >
                                <MdAttachFile />

                                <div className="emailAttachmentText">
                                    <p>{att.name}</p>

                                    {att.size && (
                                        <span>
                                            {(att.size / 1024 / 1024).toFixed(2)} MB
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="emailBody">
                <iframe
                    title={`Vista previa - ${subject}`}
                    srcDoc={html || fallbackHtml}
                    sandbox=""
                />
            </div>

        </div>
    );
}

export default DetailEmailComponent;