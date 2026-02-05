import { notify } from '../../helpers/notify';
import { handleExceptions } from './configBehavior';
import { OrbitProgress } from "react-loading-indicators";
import { IoWarningOutline } from "react-icons/io5";
import { HiOutlineRefresh } from "react-icons/hi";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { FaPause } from "react-icons/fa";
import CheckSvg from '../../assets/svg/CheckSvg';
import ErrorSvg from '../../assets/svg/ErrorSvg';
import Switch from "@mui/material/Switch";
import WarningSvg from '../../assets/svg/WarningSvg';

function CabeceraModulos({ state, openKey, originalState, updateState, option, components, configMode, handleReport }) {
    return (
        <div className={`actionHeader ${(openKey && state.isOpen[openKey]) || state.isOpen[option.id] ? "open" : ""}`}>
            <Switch
                className="kioskSwitch"
                checked={openKey ? true : state.isActive[option.id] || false}
                disabled={option.disableSwitch || false}
                onClick={() => {
                    if ((option.id === "salidaColores" || option.id === "listDigimark") && state.orderColors.length === 0) {
                        notify("warning", "Sin colores", "Este pedido no tiene colores");
                    } else {
                        if (state.isActive[option.id] && ((openKey && state.isOpen[openKey]) || state.isOpen[option.id])) {
                            if (openKey) {
                                return;
                            } else {
                                updateState("isOpen", (prevIsOpen) => ({
                                    ...prevIsOpen,
                                    [option.id]: false
                                }));
                            }
                        }

                        if ((!state.isActive[option.id] || !state.isActive[openKey]) && option.openOnActive) {
                            if (openKey) {
                                return;
                            } else {
                                updateState("isOpen", (prevIsOpen) => ({
                                    ...prevIsOpen,
                                    [option.id]: true
                                }));
                            }
                        }

                        if (openKey) {
                            return;
                        } else {
                            updateState("isActive", (prevIsActive) => ({
                                ...prevIsActive,
                                [option.id]: !prevIsActive[option.id]
                            }));

                            handleExceptions({
                                module: option.id,
                                state,
                                updateState
                            });
                        }
                    }
                }}
            />
            <p onClick={() => {
                if (!(option.id === "unitario" && state.step > 1) && !option.disableOpen) {
                    if (openKey) {
                        updateState("isOpen", (prevIsOpen) => ({
                            ...prevIsOpen,
                            [openKey]: !prevIsOpen[openKey]
                        }))
                    } else {
                        updateState("isOpen", (prevIsOpen) => ({
                            ...prevIsOpen,
                            [option.id]: !prevIsOpen[option.id]
                        }))
                    }
                }
            }} className="kioskModuleTitle">{option.title || option.elementId} <span>{state.isActive[option.id] && components[option.id]?.title || ""}</span></p>
            {!configMode && (state.orderReport.some(item => item.type && item.type.includes(option.id)) || state.fileReport.some(item => item.type && item.type.includes(option.id))) ? (
                <div
                    className="warning"
                    onClick={() => {
                        updateState("infoContent", state.orderReport.concat(state.fileReport)
                            .filter(item => item.type && item.type.includes(option.id))
                            .map(item => {
                                const icon = item.status === "success" || item.status === "info" ? <CheckSvg /> :
                                    item.status === "warning" ? <WarningSvg /> :
                                        <ErrorSvg />;
                                return (<p>{icon} {item.message}</p>)
                            }));
                        updateState("infoPopUp", true);
                    }}
                >
                    <div className="warningContent">
                        <p>{state.orderReport.concat(state.fileReport)
                            .filter(item => item.type && item.type.includes(option.id))
                            .length}</p>
                        {state.orderReport.concat(state.fileReport)
                            .filter(item => item.type && item.type.includes(option.id))
                            .some(item => item.status === "error") ? (
                            <IoWarningOutline className="errorIcon" />
                        ) : (
                            <IoWarningOutline className="warningIcon" />
                        )}
                    </div>
                </div>
            ) : (
                option.id === "unitario" || option.id === "reportePrevio" ? (
                    <div
                        className="warning"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={
                            option.id === "unitario" ?
                                (!state.loadingFileReport && !state.loadingOrderReport ? "Reiniciar unitario" : "Generando reporte previo, espere...") :
                                (!state.loadingFileReport && !state.loadingOrderReport ? "Reenviar reporte previo" : "Generando reporte previo, espere...")
                        }
                        onClick={() => {
                            if (!state.loadingFileReport && !state.loadingOrderReport) {
                                if (option.id === "unitario") {
                                    updateState((prev) => ({
                                        ...originalState,
                                        unitarioMetadata: prev.unitarioMetadata,
                                        unitarios: prev.unitarios,
                                        unitarioData: prev.unitarioData,
                                        order: prev.order,
                                        orderXml: prev.orderXml,
                                        client: prev.client
                                    }));
                                } else if (option.id === "reportePrevio" && !state.hideSubmitButton) {
                                    updateState("isOpen", (prevIsOpen) => ({
                                        ...prevIsOpen,
                                        "reportePrevio": true
                                    }));
                                    handleReport("forceReport");
                                }
                            } else {
                                notify("warning", "Reporte en curso", "Espere a que termine el reporte en curso");
                            }
                        }}
                    >
                        {((state.loadingOrderReport || state.loadingFileReport) && option.id === "reportePrevio") ? (
                            <OrbitProgress variant="dotted" color={"var(--highlight)"} size="small" />
                        ) : (
                            (option.id === "reportePrevio" && state.hideSubmitButton) ? null : <HiOutlineRefresh className="refreshIcon" />
                        )}
                    </div>
                ) : (
                    <div>
                        {state.loadingTrapping && option.id === "trapping" && <OrbitProgress variant="dotted" color={"var(--highlight)"} size="small" />}
                        {state.isTrappingWaiting && !state.loadingTrapping && option.id === "trapping" && <FaPause color={"var(--highlight)"} />}
                        {state.isTrappingDone && !state.loadingTrapping && option.id === "trapping" && <CheckSvg />}
                        {state.isTrappingCanceled && !state.loadingTrapping && option.id === "trapping" && <ErrorSvg />}
                    </div>
                )
            )
            }
            <div className="openArrow">
                {(openKey && state.isOpen[openKey]) || state.isOpen[option.id] ?
                    <MdKeyboardArrowDown
                        className="openArrowIcon"
                        onClick={() => {
                            if (openKey) {
                                updateState("isOpen", (prevIsOpen) => ({
                                    ...prevIsOpen,
                                    [openKey]: !prevIsOpen[openKey]
                                }))
                            } else {
                                updateState("isOpen", (prevIsOpen) => ({
                                    ...prevIsOpen,
                                    [option.id]: !prevIsOpen[option.id]
                                }))
                            }
                        }} />
                    :
                    <MdKeyboardArrowRight
                        className="openArrowIcon"
                        onClick={() => {
                            if (!(option.id === "unitario" && state.step > 1) && !option.disableOpen) {
                                if (openKey) {
                                    updateState("isOpen", (prevIsOpen) => ({
                                        ...prevIsOpen,
                                        [openKey]: !prevIsOpen[openKey]
                                    }))
                                } else {
                                    updateState("isOpen", (prevIsOpen) => ({
                                        ...prevIsOpen,
                                        [option.id]: !prevIsOpen[option.id]
                                    }))
                                }
                            }
                        }} />}
            </div>
        </div>
    )
}

export default CabeceraModulos