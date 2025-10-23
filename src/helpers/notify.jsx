import NotifyComponent from "../components/NotifyComponent";

export function notify(toastMethod, type, title, body) {
    toastMethod(<NotifyComponent type={type} title={title} body={body} />, {
        icon: false,
        className: 'toast',
        closeOnClick: true,
        autoClose: 750
    });
}