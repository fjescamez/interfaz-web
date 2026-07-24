import { useState } from "react";
import { MdAttachFile, MdEmail, MdPerson, MdSchedule, MdContentCopy, MdCheck } from "react-icons/md";
import "./DetailEmailComponent.css";

function DetailEmailComponent({ email }) {
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

    const [emailIdCopied, setEmailIdCopied] = useState(false);

    const handleCopyEmailId = async () => {
        const emailId = email?._id;

        if (!emailId) return;

        const textToCopy = `Id email: ${emailId}`;

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                const textArea = document.createElement("textarea");

                textArea.value = textToCopy;
                textArea.style.position = "fixed";
                textArea.style.opacity = "0";

                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                document.execCommand("copy");
                textArea.remove();
            }

            setEmailIdCopied(true);

            window.setTimeout(() => {
                setEmailIdCopied(false);
            }, 1500);
        } catch (error) {
            console.error("No se pudo copiar el identificador:", error);
        }
    };

    return (
        <div className="emailDetail">

            <div className="emailDetailHeader">
                <div className="emailSubjectRow">
                    <MdEmail />
                    <h2>{subject}</h2>
                </div>

                <div className="emailMeta">

                    <div className="emailMetaRow emailSenderRow">
                        <div className="emailFromBlock">
                            <MdPerson className="emailMetaIcon" />

                            <div className="emailRecipientsContent">
                                <strong>De:</strong>

                                <div className="emailRecipientList">
                                    {fromRecipients.length > 0 ? (
                                        fromRecipients.map((recipient, index) => (
                                            <span
                                                key={`${recipient}-${index}`}
                                                className="emailRecipientTag"
                                                title={recipient}
                                            >
                                                {recipient}
                                            </span>
                                        ))
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
                                        className="emailRecipientTag emailIdTag"
                                        title={email?._id}
                                    >
                                        {email?._id}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                className={`emailCopyButton ${emailIdCopied ? "copied" : ""
                                    }`}
                                onClick={handleCopyEmailId}
                                title={emailIdCopied ? "ID copiado" : "Copiar ID"}
                                aria-label={emailIdCopied ? "ID copiado" : "Copiar ID"}
                                disabled={!email?._id}
                            >
                                {emailIdCopied ? (
                                    <MdCheck />
                                ) : (
                                    <MdContentCopy />
                                )}
                            </button>
                        </div>
                    </div>



                    <div className="emailMetaRow emailRecipientsRow">
                        <MdPerson />

                        <div className="emailRecipientsContent">
                            <strong>Para:</strong>

                            <div className="emailRecipientList">
                                {toRecipients.length > 0 ? (
                                    toRecipients.map((recipient, index) => (
                                        <span
                                            key={`${recipient}-${index}`}
                                            className="emailRecipientTag"
                                            title={recipient}
                                        >
                                            {recipient}
                                        </span>
                                    ))
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
                                    {ccRecipients.map((recipient, index) => (
                                        <span
                                            key={`${recipient}-${index}`}
                                            className="emailRecipientTag"
                                            title={recipient}
                                        >
                                            {recipient}
                                        </span>
                                    ))}
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