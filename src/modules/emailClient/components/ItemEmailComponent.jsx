import { memo, useMemo, useState } from "react";
import {
    MdAssignmentInd,
    MdArchive,
    MdDelete
} from "react-icons/md";
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
        keywords: ["presupuesto", "oferta"],
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
        label: "Cliches",
        keywords: ["cliche"],
        color: "#ff9500"
    },
    {
        id: "albaran",
        label: "Albaran",
        keywords: ["albaran"],
        color: "#58b747"
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
    canAssign = true,
    canArchive = true,
    canDelete = true,
    tagRules = DEFAULT_TAG_RULES
}) {
    const [workingAction, setWorkingAction] = useState(null);


    const emailId = email?._id ?? email?.id;

    const {
        contacto,
        cliente,
        asunto,
        fecha,
        hora
    } = email || {};

    const initials = getInitials(contacto || cliente);
    const formattedDate = formatEmailDate(fecha, hora);

    const matchedTags = useMemo(() => {
        const normalizedSubject = String(asunto || "")
            .toLocaleLowerCase("es");

        return tagRules.filter(rule =>
            rule.keywords?.some(keyword =>
                normalizedSubject.includes(
                    String(keyword).toLocaleLowerCase("es")
                )
            )
        );
    }, [asunto, tagRules]);

    const visibleTags = matchedTags.slice(0, 2);
    const hiddenTagCount = matchedTags.length - visibleTags.length;

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

                        {visibleTags.length > 0 && (
                            <div className="emailItemTags">
                                {visibleTags.map(tag => (
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
                                    <span
                                        className="emailItemTag more"
                                        title={matchedTags
                                            .slice(2)
                                            .map(tag => tag.label)
                                            .join(", ")}
                                    >
                                        +{hiddenTagCount}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="right">
                <div className="emailQuickActions">
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