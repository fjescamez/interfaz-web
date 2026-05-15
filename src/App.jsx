import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";

import { useSession } from "./context/SessionContext";

import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./layouts/MainLayout";

import { useScrollTop } from "./hooks/useScrollTop";
import { useInactivity } from "./hooks/useInactivity";


function App() {

    const location = useLocation();
    const navigate = useNavigate();

    const { session } = useSession();

    const {
        mainRef,
        isArrowActive,
        scrollTop
    } = useScrollTop();

    const {
        isOnline,
        setIsOnline
    } = useInactivity();

    const [kioskData, setKioskData] = useState({ endpoint: "", id: "" });

    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [isKioskActive, setIsKioskActive] = useState(false);

    useEffect(() => {
        if (!session) {
            navigate("/login");
        }
    }, [session, navigate]);

    const toggleUserDropdown = () => {
        setIsDropdownActive(prev => !prev);
    };

    const toggleKiosk = (endpoint, id, client) => {
        if (client) {
            setKioskData({ endpoint, id, client });
        } else {
            setKioskData({ endpoint, id });
        }
        setIsKioskActive(prev => !prev);
    };

    return (
        <MainLayout
            location={location}
            mainRef={mainRef}
            isOnline={isOnline}
            setIsOnline={setIsOnline}
            toggleUserDropdown={toggleUserDropdown}
            isDropdownActive={isDropdownActive}
            toggleKiosk={toggleKiosk}
            isKioskActive={isKioskActive}
            kioskData={kioskData}
            setIsKioskActive={setIsKioskActive}
            isArrowActive={isArrowActive}
            scrollTop={scrollTop}
        >
            <AppRoutes toggleKiosk={toggleKiosk} />
        </MainLayout>
    );
}

export default App