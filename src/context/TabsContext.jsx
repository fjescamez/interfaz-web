import { createContext, useContext, useState } from "react";
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
        return (path !== "/" && isValidRoute(path)) ? [{ path, title }] : [];
    });

    // Ya no se añade automáticamente la pestaña en useEffect.
    // Ahora hay que añadir la pestaña manualmente desde el componente que navega,
    // pasando el título (por ejemplo, el nombre del cliente)

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

    return (
        <TabsContext.Provider value={{ tabs: filteredTabs, setTabs, closeTab, closeAllTabs }}>
            {props.children}
        </TabsContext.Provider>
    );
}

export function useTabs() {
    return useContext(TabsContext);
}