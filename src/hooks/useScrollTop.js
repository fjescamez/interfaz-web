import { useEffect, useRef, useState } from "react";

export function useScrollTop() {
    const mainRef = useRef();
    const [isArrowActive, setIsArrowActive] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            if (mainRef.current) {
                const scrollTop = mainRef.current.scrollTop;
                setIsArrowActive(scrollTop > 200);
            }
        };

        if (mainRef.current) {
            mainRef.current.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (mainRef.current) {
                mainRef.current.removeEventListener("scroll", handleScroll);
            }
        };

    }, []);

    const scrollTop = () => {
        if (mainRef.current && isArrowActive) {
            mainRef.current.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    return {
        mainRef,
        isArrowActive,
        scrollTop
    };
}