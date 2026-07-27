import { memo, useMemo, useState } from "react";
import {
    MdAssignmentInd,
    MdArchive,
    MdDelete
} from "react-icons/md";
import { IoMdFolderOpen } from "react-icons/io";
import { MdTurnLeft } from "react-icons/md";
import "./ItemEmailComponent.css";

const DEFAULT_TAG_RULES = [
    {
        id: "urgente",
        label: "Urgente",
        keywords: ["urgente", "urgencia"],
        color: "#b42318"
    },
    {
        id: "presupuesto",
        label: "Presupuesto",
        keywords: ["presupuesto"],
        color: "#175cd3"
    },
    {
        id: "boceto",
        label: "Boceto",
        keywords: ["boceto", "diseño"],
        color: "#6941c6"
    },
    {
        id: "cliches",
        label: "Clichés",
        keywords: ["cliche"],
        color: "#ff9500"
    },
    {
        id: "albaran",
        label: "Albarán",
        keywords: ["albaran"],
        color: "#58b747"
    },
    {
        id: "cambios",
        label: "Cambios",
        keywords: [
            "cambio",
            "cambios",
            "modificacion",
            "modificaciones",
            "modificar"
        ],
        color: "#0e9384"
    }
];

function getInitials(value = "") {
    const words = String(value)
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 0) return "?";

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[words.length - 1][0]}`
        .toUpperCase();
}

function getRelativeDate(value) {
    if (!value) {
        return {
            label: "",
            full: ""
        };
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return {
            label: "",
            full: ""
        };
    }

    const today = new Date();

    const dateDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    const todayDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const differenceDays = Math.round(
        (todayDay - dateDay) / 86400000
    );

    const time = date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit"
    });

    let label;

    if (differenceDays === 0) {
        label = `Hoy · ${time}`;
    } else if (differenceDays === 1) {
        label = `Ayer · ${time}`;
    } else {
        label = date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit"
        });
    }

    return {
        label,
        full: date.toLocaleString("es-ES")
    };
}

function ItemEmailComponent({
    email,
    index,
    isSelected,
    isSingleSelected,
    onSelect,
    onQuickAction,
    canAssign = false,
    canArchive = false,
    canDelete = false,
    canEntrada = false,
    tagRules = DEFAULT_TAG_RULES,
    openEmailFolder,
    pulsedAction = false,
}) {
    const [workingAction, setWorkingAction] = useState(null);
    const [showAllTags, setShowAllTags] = useState(false);

    const emailId = email?._id ?? email?.id;

    const {
        contacto,
        cliente,
        asunto,
        fecha,
        hora,
        reference_tags,
        cuerpoHtml
    } = email || {};

    const isPending = Array.isArray(reference_tags) &&
        reference_tags.some(tag =>
            tag?.type === "pending" ||
            String(tag?.label || "").toLowerCase() === "pendiente"
        );

    const initials = getInitials(contacto || cliente);
    const formattedDate = formatEmailDate(fecha, hora);

    const normalizeText = value =>
        String(value || "")
            .toLocaleLowerCase("es")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    const htmlToText = html => {
        if (!html) return "";

        const documentHtml = new DOMParser().parseFromString(
            String(html),
            "text/html"
        );

        return documentHtml.body?.textContent || "";
    };

    const matchedTags = useMemo(() => {
        const bodyText = htmlToText(cuerpoHtml);

        const searchableText = normalizeText(
            `${asunto || ""} ${bodyText}`
        );

        return tagRules.filter(rule =>
            rule.keywords?.some(keyword =>
                searchableText.includes(normalizeText(keyword))
            )
        );
    }, [asunto, cuerpoHtml, tagRules]);

        const tagsToRender = showAllTags
        ? matchedTags
        : matchedTags.slice(0, 2);

    const visibleTags = matchedTags.slice(0, 2);
    const hiddenTagCount = Math.max(
        matchedTags.length - 2,
        0
    );

    const runQuickAction = async actionName => {
        if (workingAction || !onQuickAction) return;

        setWorkingAction(actionName);

        try {
            await onQuickAction(actionName, emailId);
        } finally {
            setWorkingAction(null);
        }
    };

    const handleKeyDown = event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(emailId, index, event);
        }
    };

    function formatEmailDate(fecha, hora) {
        if (!fecha) return "";

        const [day, month, year] = String(fecha)
            .split("-")
            .map(Number);

        if (!day || !month || !year) {
            return fecha;
        }

        const emailDate = new Date(year, month - 1, day);
        const today = new Date();

        const emailDay = new Date(
            emailDate.getFullYear(),
            emailDate.getMonth(),
            emailDate.getDate()
        );

        const currentDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        const differenceDays = Math.round(
            (currentDay - emailDay) / 86400000
        );

        const timeText = hora ? ` · ${hora}` : "";

        if (differenceDays === 0) {
            return `Hoy${timeText}`;
        }

        if (differenceDays === 1) {
            return `Ayer${timeText}`;
        }

        return `${fecha}${timeText}`;
    }

    return (
        <div
            className={[
                "emailItem",
                isPending ? "pending" : "",
                isSelected ? "selected" : "",
                isSingleSelected ? "singleSelected" : ""
            ].filter(Boolean).join(" ")}
            role="option"
            tabIndex={0}
            aria-selected={isSelected}
            onClick={event =>
                onSelect(emailId, index, event)
            }
            onKeyDown={handleKeyDown}
        >
            <div className="left">
                <div
                    className="contactInitials"
                    title={contacto || cliente || "Sin contacto"}
                >
                    {initials}
                </div>

                <div className="bloqueEmail">
                    <p
                        className="title"
                        title={[
                            contacto,
                            cliente
                        ].filter(Boolean).join(" - ")}
                    >
                        {contacto || "Sin contacto"}

                        {cliente && (
                            <>
                                {" - "}
                                <span>{cliente}</span>
                            </>
                        )}
                    </p>

                    <div className="emailItemBottomRow">
                        <p
                            className="subtitle"
                            title={asunto || "Sin asunto"}
                        >
                            {asunto || "Sin asunto"}
                        </p>

                        {matchedTags.length > 0 && (
                            <div className="emailItemTags">
                                {tagsToRender.map(tag => (
                                    <span
                                        key={tag.id}
                                        className="emailItemTag"
                                        title={tag.label}
                                        style={{
                                            "--email-tag-color": tag.color
                                        }}
                                    >
                                        {tag.label}
                                    </span>
                                ))}

                                {hiddenTagCount > 0 && (
                                    <button
                                        type="button"
                                        className="emailItemTag more"
                                        title={
                                            showAllTags
                                                ? "Ocultar etiquetas"
                                                : matchedTags
                                                    .slice(2)
                                                    .map(tag => tag.label)
                                                    .join(", ")
                                        }
                                        aria-expanded={showAllTags}
                                        onClick={event => {
                                            event.stopPropagation();
                                            setShowAllTags(current => !current);
                                        }}
                                    >
                                        {showAllTags
                                            ? "−"
                                            : `+${hiddenTagCount}`}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="right">




                <div
                    className={`emailQuickActions ${pulsedAction ? "actionsBlocked" : ""
                        }`}
                >

                    {canEntrada && (
                        <button
                            type="button"
                            title="A entrada"
                            aria-label="mover a entrada"
                            disabled={Boolean(workingAction)}
                            onClick={event => {
                                event.stopPropagation();
                                runQuickAction("entrada");
                            }}
                        >
                            <MdTurnLeft />
                        </button>
                    )}

                    <button
                        type="button"
                        title="Carpeta"
                        aria-label="Abrir carpeta"
                        onClick={event => {
                            event.stopPropagation();
                            openEmailFolder(email.file_email);
                        }}
                    >
                        <IoMdFolderOpen />
                    </button>

                    {canAssign && (
                        <button
                            type="button"
                            title="Asignar"
                            aria-label="Asignar correo"
                            disabled={Boolean(workingAction)}
                            onClick={event => {
                                event.stopPropagation();
                                runQuickAction("asignar");
                            }}
                        >
                            <MdAssignmentInd />
                        </button>
                    )}

                    {canArchive && (
                        <button
                            type="button"
                            title="Archivar"
                            aria-label="Archivar correo"
                            disabled={Boolean(workingAction)}
                            onClick={event => {
                                event.stopPropagation();
                                runQuickAction("archivar");
                            }}
                        >
                            <MdArchive />
                        </button>
                    )}

                    {canDelete && (
                        <button
                            type="button"
                            className="danger"
                            title="Mover a papelera"
                            aria-label="Mover correo a papelera"
                            disabled={Boolean(workingAction)}
                            onClick={event => {
                                event.stopPropagation();
                                runQuickAction("eliminar");
                            }}
                        >
                            <MdDelete />
                        </button>
                    )}
                </div>

                {formattedDate && (
                    <time
                        className="date"
                        title={[fecha, hora].filter(Boolean).join(" ")}
                    >
                        {formattedDate}
                    </time>
                )}
            </div>
        </div>
    );
}

export default memo(ItemEmailComponent);