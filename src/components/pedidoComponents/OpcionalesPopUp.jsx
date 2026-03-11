import { SlSpeech } from "react-icons/sl";
import { IoMdCloseCircleOutline } from 'react-icons/io';
import "./OpcionalesPopUp.css";
import { addKeyListener } from "../../helpers/toggleModal";

function OpcionalesPopUp({ setOpcionalesModal, fullOrder }) {
    addKeyListener(setOpcionalesModal);

    return (
        <>
            <div className="overlay"></div>
            <div className="popUpTable ripPopUp">
                <div className="header">
                    <SlSpeech />
                    <p>OPCIONALES</p>
                    <IoMdCloseCircleOutline className="close" onClick={() => setOpcionalesModal(false)} />
                </div>
                <div className="opcionalesContainer">
                    <table>
                        <tbody>
                            <tr>
                                <td><p className="highlight">DESCRIPCIÓN</p></td>
                                <td><p className="highlight">VALOR</p></td>
                            </tr>
                            {fullOrder?.opcionales.map((opcional, index) => (
                                <tr key={index}>
                                    <td>{opcional.opcional_des}</td>
                                    <td>{opcional.opcional_valor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default OpcionalesPopUp