import { useEffect, useRef, useState } from "react";

export function useInactivity(timeout = 3 * 60 * 1000) {
    const timerRef = useRef();
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {

        const handleActivity = () => {
            clearTimeout(timerRef.current);
            setIsOnline(true);

            timerRef.current = setTimeout(() => {
                setIsOnline(false);
            }, timeout);
        };

        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);

        handleActivity();

        return () => {
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("keydown", handleActivity);
            clearTimeout(timerRef.current);
        };

    }, [timeout]);

    return { isOnline, setIsOnline };
}