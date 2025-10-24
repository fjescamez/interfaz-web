import "./NotifyComponent.css";
import CheckSvg from "../assets/svg/CheckSvg";
import ErrorSvg from "../assets/svg/ErrorSvg";
import WarningSvg from "../assets/svg/WarningSvg";

function NotifyComponent({ type, title, body }) {
    return (
        <div className="notiContainer">
            <div className="title">
                {type == "success" && <CheckSvg />}
                {type == "error" && <ErrorSvg />}
                {type == "warning" && <WarningSvg />}
                <p>{title}</p>
            </div>
            <div className="body">
                <p dangerouslySetInnerHTML={{ __html: body }} />
            </div>
        </div>
    )
}

export default NotifyComponent