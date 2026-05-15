import { useMemo } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import HeaderComponent from "../components/HeaderComponent";
import UserDropdownComponent from "../components/UserDropdownComponent";
import ImageKioskComponent from "../components/ImageKioskComponent";
import SideBarComponent from "../components/SideBarComponent";
import InputPistola from "../components/InputPistola";

import { ToastContainer } from "react-toastify";

function MainLayout({
    children,

    location,
    mainRef,

    isOnline,
    setIsOnline,

    toggleUserDropdown,
    isDropdownActive,

    toggleKiosk,
    isKioskActive,
    kioskData,
    setIsKioskActive,

    isArrowActive,
    scrollTop
}) {

    const icons = [
        "home",
        "pedidos",
        "kiosco",
        "bandeja",
        "len",
        "clientes",
        "produccion",
        "pistola",
        "stock",
        "usuarios",
        "soporte"
    ];

    const activeFromPath = (pathname) => pathname.replace("/", "");

    const isActive = useMemo(() => {
        const current = activeFromPath(location.pathname);

        return icons.reduce((acc, key) => {
            acc[key] = key === current;
            return acc;
        }, {});
    }, [location.pathname]);

    return (
        <>
            {location.pathname !== "/login" && (
                <HeaderComponent
                    toggleUserDropdown={toggleUserDropdown}
                    isOnline={isOnline}
                    setIsOnline={setIsOnline}
                />
            )}

            <div className="main" ref={mainRef}>

                <ToastContainer
                    newestOnTop
                    autoClose={3000}
                />

                {location.pathname !== "/login" && (
                    <InputPistola />
                )}

                {isDropdownActive && (
                    <UserDropdownComponent
                        toggleUserDropdown={toggleUserDropdown}
                        toggleKiosk={toggleKiosk}
                    />
                )}

                {isKioskActive && (
                    <ImageKioskComponent
                        toggleKiosk={toggleKiosk}
                        endpoint={kioskData.endpoint}
                        id={kioskData.id}
                        client={kioskData.client}
                        setIsKioskActive={setIsKioskActive}
                    />
                )}

                {location.pathname !== "/login" && (
                    <SideBarComponent
                        isActive={isActive}
                        setIsActive={() => {}}
                    />
                )}

                <div
                    className={`scrollTopArrow ${isArrowActive ? "arrowVisible" : ""}`}
                    onClick={scrollTop}
                >
                    <FaArrowCircleUp />
                </div>

                {children}

            </div>
        </>
    );
}

export default MainLayout;