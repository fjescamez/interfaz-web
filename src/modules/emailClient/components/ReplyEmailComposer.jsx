import {
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";

import {
    MdClose,
    MdOutlineReply,
    MdSend
} from "react-icons/md";

import "./ReplyEmailComposer.css";

function buildReplySubject(subject) {
    const normalizedSubject =
        String(subject || "").trim();

    if (!normalizedSubject) {
        return "RE:";
    }

    if (/^re\s*:/i.test(normalizedSubject)) {
        return normalizedSubject;
    }

    return `RE: ${normalizedSubject}`;
}

function ReplyEmailComposer({
    email,
    draftId,
    initialMessage = "",
    draftSaveStatus = "saved",
    onMessageChange,
    sending = false,
    onCancel,
    onSend
}) {
    const [message, setMessage] =
        useState(() =>
            String(initialMessage || "")
        );
    const textareaRef = useRef(null);

    const recipient = useMemo(
        () =>
            String(
                email?.from ||
                email?.emisor ||
                ""
            ).trim(),
        [
            email?.from,
            email?.emisor
        ]
    );

    const originalSubject =
        email?.subject ||
        email?.asunto ||
        "";

    const replySubject = useMemo(
        () => buildReplySubject(originalSubject),
        [originalSubject]
    );

    useEffect(() => {
        setMessage(
            String(initialMessage || "")
        );

        const animationFrame =
            window.requestAnimationFrame(() => {
                textareaRef.current?.focus();

                const textarea =
                    textareaRef.current;

                if (textarea) {
                    const messageLength =
                        textarea.value.length;

                    textarea.setSelectionRange(
                        messageLength,
                        messageLength
                    );
                }
            });

        return () => {
            window.cancelAnimationFrame(
                animationFrame
            );
        };
    }, [
        email?._id,
        draftId
    ]);

    const handleMessageChange = event => {
        const nextMessage =
            event.target.value;

        setMessage(nextMessage);

        if (
            typeof onMessageChange ===
            "function"
        ) {
            onMessageChange(nextMessage);
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const normalizedMessage =
            message.trim();

        if (
            !normalizedMessage ||
            !recipient ||
            sending ||
            typeof onSend !== "function"
        ) {
            return;
        }

        await onSend({
            email,
            recipient,
            subject: replySubject,
            message: normalizedMessage
        });
    };

    const handleKeyDown = event => {
        const sendShortcut =
            (event.ctrlKey || event.metaKey) &&
            event.key === "Enter";

        if (!sendShortcut) {
            return;
        }

        event.preventDefault();

        event.currentTarget
            .closest("form")
            ?.requestSubmit();
    };

    const handleCancel = () => {
        if (
            sending ||
            typeof onCancel !== "function"
        ) {
            return;
        }

        onCancel();
    };

    const draftStatusText = {
        pending: "Cambios pendientes",
        saving: "Guardando borrador…",
        saved: "Borrador guardado",
        error: "Error al guardar"
    }[draftSaveStatus] || "Borrador";

    return (
        <form
            className="replyEmailComposer"
            onSubmit={handleSubmit}
            aria-busy={sending}
        >
            <div className="replyComposerHeader">
                <div className="replyComposerIdentity">
                    <span className="replyComposerIcon">
                        <MdOutlineReply />
                    </span>

                    <div className="replyComposerRecipient">
                        <div className="replyComposerTitleRow">
                            <strong>Responder</strong>

                            <span className="replyComposerDraftBadge">
                                Borrador
                            </span>
                        </div>

                        <span title={recipient}>
                            Para: {recipient || "Sin destinatario"}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    className="replyComposerClose"
                    onClick={handleCancel}
                    disabled={sending}
                    title="Cancelar respuesta"
                    aria-label="Cancelar respuesta"
                >
                    <MdClose />
                </button>
            </div>

            <div
                className="replyComposerSubject"
                title={replySubject}
            >
                <span>Asunto</span>
                <strong>{replySubject}</strong>
            </div>

            <textarea
                ref={textareaRef}
                className="replyComposerTextarea"
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
                disabled={sending}
                placeholder="Escribe tu respuesta…"
                aria-label="Mensaje de respuesta"
                rows={5}
            />

            <div className="replyComposerFooter">
                <span className="replyComposerShortcut">
                    {draftStatusText}
                    {" · "}
                    Ctrl + Enter para enviar
                </span>

                <div className="replyComposerActions">
                    <button
                        type="button"
                        className="replyComposerCancel"
                        onClick={handleCancel}
                        disabled={sending}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="replyComposerSend"
                        disabled={
                            sending ||
                            !message.trim() ||
                            !recipient
                        }
                    >
                        <MdSend />

                        <span>
                            {sending
                                ? "Enviando…"
                                : "Enviar"
                            }
                        </span>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ReplyEmailComposer;
