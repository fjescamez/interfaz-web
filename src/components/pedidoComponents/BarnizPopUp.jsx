import "./BarnizPopUp.css";
import { RiPaintFill } from "react-icons/ri";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useEffect } from "react";

function BarnizPopUp({ setBarnizPopUp, tableSetter, enviarProduccion }) {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setBarnizPopUp(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <div className="overlay2"></div>
            <div className="popUpTable ripPopUp">
                <div className="header">
                    <RiPaintFill />
                    <p>TINTA BARNIZ</p>
                    <IoMdCloseCircleOutline className="close" onClick={() => setBarnizPopUp(false)} />
                </div>
                <div className="barnizContainer">
                    <div className="barnizText">
                        <p>Ha seleccionado para enviar a producción una o más tintas Barniz.</p>
                        <p>Por favor, asegúrese de que el tipo de impresión es el correcto.</p>
                    </div>
                    <button className="submitButton" onClick={() => {enviarProduccion(tableSetter, true); setBarnizPopUp(false);}}>Confirmar</button>
                </div>
            </div>
        </>
    )
}

export default BarnizPopUp