import { memo, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./ItemEmailComponent.css";

function getInitials(value = "") {
    const words = String(value)
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 0) {
        return "?";
    }

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

function ItemEmailComponent({
    email,
    index,
    isSelected,
    onSelect,
    cleanDeleted
}) {
    const [deleting, setDeleting] = useState(false);
    const emailId = email?._id ?? email?.id;

    const {
        contacto,
        cliente,
        asunto,
        birth
    } = email || {};

    const initials = getInitials(contacto || cliente);

    const formattedDate = birth
        ? new Date(birth).toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        })
        : "";

    const cleanupJacket = async () => {
        if (deleting) return;

        setDeleting(true);

        try {
            await cleanDeleted(emailId);
        } finally {
            setDeleting(false);
        }
    };

    const handleKeyDown = event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(email._id, index, event);
        }
    };

    return (
        <div
            className={`emailItem ${isSelected ? "selected" : ""}`}
            onClick={event =>
                onSelect(emailId, index, event)
            }
        >
            <div className="left">
                <div
                    className="contactInitials"
                    title={contacto || cliente || "Sin contacto"}
                >
                    {initials}
                </div>

                <div className="bloqueEmail">
                    <p className="title">
                        {contacto || "Sin contacto"}

                        {cliente && (
                            <>
                                {" - "}
                                <span>{cliente}</span>
                            </>
                        )}
                    </p>

                    <p className="subtitle">
                        {asunto || "Sin asunto"}
                    </p>
                </div>
            </div>


        </div>
    );
}

export default memo(ItemEmailComponent);