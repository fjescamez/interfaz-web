import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isValidRoute } from "../routes";

const TabsContext = createContext();

export function TabsProvider(props) {
    const location = useLocation();
    const navigate = useNavigate();

    // Solo inicializa la pestaña actual si es válida
    const [tabs, setTabs] = useState(() => {
        const path = location.pathname;
        let title = path === "/home" ? "INICIO" : path.substring(1).toUpperCase();
        return path !== "/" ? [{ path, title }] : [];
    });

    const closeTab = (path) => {
        if (location.pathname === path) {
            const idx = tabs.findIndex(tab => tab.path === path);
            const nextTab = tabs[idx - 1]?.path || tabs[idx + 1]?.path;
            if (nextTab) {
                navigate(nextTab);
            } else {
                // Si no hay más pestañas, navega a /home y crea la pestaña de inicio
                setTabs([{ path: "/home", title: "INICIO" }]);
                navigate("/home");
                return;
            }
        }
        setTabs(prev => prev.filter(tab => tab.path !== path));
    };

    const closeAllTabs = () => {
        setTabs([]);
        setTabs([{ path: "/home", title: "INICIO" }]);
        navigate("/home");
    };

    const filteredTabs = tabs.filter(tab => !tab.path.startsWith("/login"));

    useEffect(() => {
        const handleKeyUp = (e) => {
            if (e.key === "ArrowLeft") {
                const currentIndex = filteredTabs.findIndex(tab => tab.path === location.pathname);
                if (currentIndex > 0) {
                    navigate(filteredTabs[currentIndex - 1].path);
                }
            }

            if (e.key === "ArrowRight") {
                const currentIndex = filteredTabs.findIndex(tab => tab.path === location.pathname);
                if (currentIndex < filteredTabs.length - 1) {
                    navigate(filteredTabs[currentIndex + 1].path);
                }
            }

            if (e.key === "<") {
                e.preventDefault();
                closeTab(location.pathname);
            }
        };

        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [location.pathname, tabs]);

    return (
        <TabsContext.Provider value={{ tabs: filteredTabs, setTabs, closeTab, closeAllTabs }}>
            {props.children}
        </TabsContext.Provider>
    );
}

export function useTabs() {
    return useContext(TabsContext);
}