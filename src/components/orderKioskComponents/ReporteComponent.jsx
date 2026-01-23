import { OrbitProgress } from "react-loading-indicators";
import CheckSvg from "../../assets/svg/CheckSvg";
import WarningSvg from "../../assets/svg/WarningSvg";
import ErrorSvg from "../../assets/svg/ErrorSvg";
import { TiInfoLarge } from 'react-icons/ti';
import "./KioskComponents.css";

function ReporteComponent({ loadingOrderReport, loadingFileReport, orderReport, fileReport, reportModification, setInfoPopUp, setInfoContent }) {
    return (
        <div className="actionBody">
            <div className="reportePrevio">
                <div className="orderReport">
                    <div className="title">
                        <h2>Reporte de pedido</h2>
                        {loadingOrderReport && <OrbitProgress variant="dotted" color={"var(--highlight)"} size="medium" />}
                    </div>
                    {!loadingOrderReport && <ul className="reportePrevioList">
                        {orderReport && orderReport.filter(item => !item.type).map((item, index) => (
                            <li key={index}>
                                {(item.status === "success" || item.status === "info") && <CheckSvg />}
                                {item.status === "warning" && <WarningSvg />}
                                {item.status === "error" && <ErrorSvg />}
                                <p>{item.message}</p>
                                {item.info && (
                                    <div
                                        onClick={() => {
                                            setInfoContent(item.info);
                                            setInfoPopUp(true);
                                        }}
                                    >
                                        <TiInfoLarge />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>}
                </div>
                <div className="fileReport">
                    <div className="title">
                        <h2>Reporte de archivo</h2>
                        {loadingFileReport && <OrbitProgress variant="dotted" color={"var(--highlight)"} size="medium" />}
                    </div>
                    {!loadingFileReport && <ul className="reportePrevioList">
                        {fileReport && fileReport.map((item, index) => (
                            <li key={index}>
                                {(item.status === "success" || item.status === "info") && <CheckSvg />}
                                {item.status === "warning" && <WarningSvg />}
                                {item.status === "error" && <ErrorSvg />}
                                <p>{item.message}</p>
                                {item.info && (
                                    <div
                                        onClick={() => {
                                            setInfoContent(item.info);
                                            setInfoPopUp(true);
                                        }}
                                    >
                                        <TiInfoLarge />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>}
                </div>
            </div>
        </div>
    )
}

export default ReporteComponent