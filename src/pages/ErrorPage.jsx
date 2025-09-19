import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ErrorPage.css";
import { useEffect } from "react";
import { useTabs } from "../context/TabsContext";

function ErrorPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { closeTab } = useTabs();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/home", { replace: true });
        }
    }, [location.pathname, navigate]);

    const index = location.pathname.lastIndexOf("/");

    const goBack = () => {
        closeTab(location.pathname);
        navigate(location.pathname.substring(0, index));
    }

    if (location.pathname === "/") {
        return null;
    }

    return (
        <div className="errorPage">
            <div className="errorContainer">
                <h1>Página no encontrada</h1>
                <p>La página a la que estás intentando acceder no existe, o está actualmente en construcción.</p>
                <p className="goBack" onClick={goBack}>Volver</p>
            </div>
        </div>
    );
}

export default ErrorPage