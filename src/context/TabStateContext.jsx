import { createContext, useContext, useEffect, useRef, useState } from "react";
import { postData } from "../helpers/fetchData";
import useSocket from "../helpers/useSocket";
import { notify } from "../helpers/notify";
import { useSession } from "./SessionContext";

const TabStateContext = createContext();

export function TabStateProvider({ children }) {
    const [tabStates, setTabStates] = useState({});
    const closedTabKeysRef = useRef(new Set());
    const socket = useSocket();
    const { session } = useSession();

    // Guardar el estado
    const saveTabState = (key, state) => {
        setTabStates((prev) => {
            if (JSON.stringify(prev[key]) === JSON.stringify(state)) {
                return prev; // No actualices si el estado no ha cambiado
            }
            closedTabKeysRef.current.delete(key);
            return { ...prev, [key]: state };
        });
    };

    // Obtener el estado
    const getTabState = (key) => tabStates[key] || null;

    // Eliminar el estado
    const removeTabState = (key) => {
        setTabStates((prev) => {
            const newState = { ...prev };
            delete newState[key];
            return newState;
        });
        closedTabKeysRef.current.add(key);
    };

    const updateTabState = (key, updater) => {
        setTabStates((prev) => {
            if (closedTabKeysRef.current.has(key)) {
                return prev;
            }
            const currentState = prev[key] || {};
            const nextPartial = typeof updater === "function" ? updater(currentState) : updater;
            return { ...prev, [key]: { ...currentState, ...nextPartial } };
        });
    };

    const postDataContext = async (url, data, afterCall, catchCallBack) => {
        await postData(url, data).then(response => {
            if (afterCall && response.status === "success") {
                afterCall(response);
            }

            if (catchCallBack && response.status === "error") {
                catchCallBack(response);
            }
        });
    };

    return (
        <TabStateContext.Provider value={{ tabStates, saveTabState, getTabState, removeTabState, updateTabState, postDataContext }}>
            {children}
        </TabStateContext.Provider>
    );
}

export function useTabState() {
    return useContext(TabStateContext);
}