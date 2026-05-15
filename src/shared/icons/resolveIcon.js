import { appIcons } from "./appIcons";

export function resolveIcon(icon) {
    if (!icon) return null;

    if (typeof icon === "string") {
        return appIcons[icon] || null;
    }

    // si ya es componente
    return icon;
}