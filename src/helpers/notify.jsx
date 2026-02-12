import { toast } from "react-toastify";
import NotifyComponent from "../components/NotifyComponent";

export function notify(type, title, body = "", autoClose = 750) {
    let toastMethod = "";

    if (type === "success") {
        toastMethod = toast.success;
    } else if (type === "warning") {
        toastMethod = toast.warning;
    } else if (type === "error") {
        toastMethod = toast.error;
    } else if (type === "info") {
        toastMethod = toast.info;
    }

    toastMethod(<NotifyComponent type={type} title={title} body={body} />, {
        icon: false,
        className: 'toast',
        closeOnClick: true,
        autoClose: autoClose
    });
}