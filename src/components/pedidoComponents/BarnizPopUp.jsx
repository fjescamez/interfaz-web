import "./BarnizPopUp.css";
import { RiPaintFill } from "react-icons/ri";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { addKeyListener } from "../../helpers/toggleModal";
import SubmitButton from "../buttons/SubmitButton";

function BarnizPopUp({ setBarnizPopUp, tableSetter, enviarProduccion }) {
    addKeyListener(setBarnizPopUp);

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
                    <SubmitButton onClick={() => {enviarProduccion(tableSetter, true); setBarnizPopUp(false);}} text="Confirmar" />
                </div>
            </div>
        </>
    )
}

export default BarnizPopUp