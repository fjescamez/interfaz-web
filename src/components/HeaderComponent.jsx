import { useTabs } from "../context/TabsContext";
import TabsCrossSvg from "../assets/svg/TabsCrossSvg";
import { useNavigate, useLocation } from "react-router-dom";
import "./HeaderComponent.css";
import { useSession } from "../context/SessionContext";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect, useRef } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

function HeaderComponent({ toggleUserDropdown, isOnline, setIsOnline }) {
    const { tabs, setTabs, closeTab, closeAllTabs } = useTabs();
    const location = useLocation();
    const { avatar } = useSession();
    const navigate = useNavigate();
    const simpleBarRef = useRef();

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

    return (
        <div className="pageHeader">
            <h1 onClick={() => {
                navigate("/home");
                setTabs(prev => {
                    if (prev.some(tab => tab.path === "/home")) return prev;
                    return [...prev, { path: "/home", title: "INICIO" }];
                });
            }}>DISENGRAF</h1>
            <div className="tabsContainer">
                <div className="tabs">
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