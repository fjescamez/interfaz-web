import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

export function SessionProvider({ children }) {
    const urlApi = import.meta.env.VITE_API_URL;

    const [session, setSession] = useState(() => {
        const storedSession = JSON.parse(localStorage.getItem("session"));
        return storedSession ? storedSession : null;
    });

    useEffect(() => {
        localStorage.setItem("session", JSON.stringify(session));
    }, [session]);

    const getAvatarUrl = (avatar) => {
        if (!avatar) return `${urlApi}/uploads/avatars/avatar.jpg`;
        if (avatar.startsWith("http") || avatar.startsWith("/")) return avatar;
        return `${urlApi}/uploads/avatars/${avatar}`;
    };

    const avatar = session && getAvatarUrl(session.avatar);

    return (
        <SessionContext.Provider value={{ session, setSession, avatar }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    return useContext(SessionContext);
}