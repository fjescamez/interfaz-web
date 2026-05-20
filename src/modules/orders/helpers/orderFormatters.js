export const safeValue = (value) => {
    if (
        value === null ||
        value === undefined ||
        typeof value === "object"
    ) {
        return "";
    }

    return String(value).trim();
};

export const yesNo = (
    value,
    positive = "X"
) => {
    return value === positive
        ? "SÍ"
        : "NO";
};

export const normalizeArray = (value) => {
    if (!value) return [];

    return Array.isArray(value)
        ? value
        : [value];
};