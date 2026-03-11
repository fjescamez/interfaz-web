import { useTabs } from "../context/TabsContext";
import TabsCrossSvg from "../assets/svg/TabsCrossSvg";
import { useNavigate, useLocation } from "react-router-dom";
import "./HeaderComponent.css";
import { useSession } from "../context/SessionContext";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect, useRef } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useInputPistola } from "../context/InputPistolaContext";
import { MdBarcodeReader } from "react-icons/md";
import { checkRole } from "../helpers/roleChecker";

function HeaderComponent({ toggleUserDropdown, isOnline, setIsOnline }) {
    const { tabs, createTab, closeTab, closeAllTabs } = useTabs();
    const { accionPistola } = useInputPistola();
    const location = useLocation();
    const { avatar } = useSession();
    const navigate = useNavigate();
    const simpleBarRef = useRef();
    const { isAdmin, isProduccion } = checkRole();

    useEffect(() => {
        const el = simpleBarRef.current?.getScrollElement?.() || simpleBarRef.current;
        if (!el) return;
        const onWheel = (e) => {
            if (e.deltaY !== 0) {
                el.scrollLeft += e.deltaY;
                e.preventDefault();
            }
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    /* let draggedTab;

    function dragStart(event) {
        draggedTab = event.target.closest('li');
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();

        const targetTab = event.target.closest('li');
        if (!targetTab || draggedTab === targetTab) return;

        const rect = targetTab.getBoundingClientRect();
        const isAfter = event.clientX > rect.left + rect.width / 2;

        if (isAfter) {
            targetTab.parentNode.insertBefore(draggedTab, targetTab.nextSibling);
        } else {
            targetTab.parentNode.insertBefore(draggedTab, targetTab);
        }
    } */

    return (
        <div className="pageHeader">
            <h1 className="headerTitle" onClick={() => {
                createTab("/home", "INICIO");
            }}>DISENGRAF</h1>
            <div className="tabsContainer">
                <div className="tabs" /* onDragOver={allowDrop} onDrop={drop} */>
                    <SimpleBar
                        direction="horizontal"
                        style={{ maxHeight: '100%' }}
                        autoHide={true}
                        forceVisible="x"
                        ref={simpleBarRef}
                    >
                        <ul>
                            {tabs.map(tab => (
                                <li
                                    key={tab.path}
                                    className={location.pathname === tab.path ? "active" : ""}
                                    onClick={() => navigate(tab.path)}
                                    onAuxClick={e => {
                                        if (e.button === 1 && !(tabs.length === 1 && tab.path === "/home")) {
                                            e.preventDefault();
                                            closeTab(tab.path);
                                        }
                                    }}
                                /* draggable="true"
                                onDragStart={dragStart} */
                                >
                                    {tab.title}
                                    <span>
                                        {(tabs.length === 1 && tab.path === "/home") ? null : (
                                            <div
                                                className="tabsCross"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    closeTab(tab.path);
                                                }}
                                            >
                                                <TabsCrossSvg />
                                            </div>
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </SimpleBar>
                </div>
                {tabs.length > 2 && <div className="closeAll" onClick={closeAllTabs}><IoMdCloseCircleOutline className="close" /></div>}
            </div>
            {(isAdmin || isProduccion) && <h1 className="accionPistola"><span><MdBarcodeReader />:</span> {accionPistola || "Sin definir"}</h1>}
            <div className="userIconSvg">
                <img className="avatar" src={avatar} alt="" onClick={toggleUserDropdown} />
                <div className="onlineContainer" onClick={() => setIsOnline(!isOnline)}>
                    <div className={`${isOnline ? "online" : "away"}`}></div>
                </div>
            </div>
        </div>
    );
}

export default HeaderComponent;