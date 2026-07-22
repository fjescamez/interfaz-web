import { MdAttachFile, MdEmail, MdPerson, MdSchedule } from "react-icons/md";
import "./DetailEmailComponent.css";

function DetailEmailComponent({ email }) {
    if (!email) {
        return (
            <div className="emptyEmailDetail">
                Selecciona un correo para previsualizarlo
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

    return (
        <div className="emailDetail">

            <div className="emailDetailHeader">
                <div className="emailSubjectRow">
                    <MdEmail />
                    <h2>{subject}</h2>
                </div>

                <div className="emailMeta">
                    <div className="emailMetaRow">
                        <MdPerson />
                        <p>
                            <strong>De:</strong> {from || "Sin remitente"}
                        </p>
                    </div>

                    <div className="emailMetaRow">
                        <MdPerson />
                        <p>
                            <strong>Para:</strong> {to || "Sin destinatario"}
                        </p>
                    </div>

                    {cc && (
                        <div className="emailMetaRow">
                            <MdPerson />
                            <p>
                                <strong>CC:</strong> {cc}
                            </p>
                        </div>
                    )}

                    {date && (
                        <div className="emailMetaRow">
                            <MdSchedule />
                            <p>
                                <strong>Fecha:</strong> {date}
                            </p>
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