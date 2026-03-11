import { useState } from 'react'
import FreecutComponent from '../orderKioskComponents/FreecutComponent'
import { IoMdCloseCircleOutline } from 'react-icons/io';
import "./FreecutPopUp.css"
import { postData } from '../../helpers/fetchData';
import { notify } from '../../helpers/notify';
import MontajeSvg from '../../assets/svg/MontajeSvg';
import ExecutingComponent from '../ExecutingComponent';
import SubmitButton from '../buttons/SubmitButton';

function FreecutPopUp({ setFreecutModal, colores, id_pedido, montaje }) {
    const [loading, setLoading] = useState(false);

    const colorNames = colores.map(color => {
        return color.color;
    });

    const [freecutData, setFreecutData] = useState({
        posiCortes: "Izquierda"
    });
    const [freeCutColors, setFreeCutColors] = useState(colores.map(color => ({
        check: false,
        color: color.color,
        distancia: "0",
        caidas: "COMPLETO",
        plancha: color.planchaArchivo || ""
    })));

    const handleSubmit = async () => {
        setLoading(true);
        const data = {
            extraInputs: {
                file: montaje,
                id_pedido
            },
            freecut: freecutData
        }

        const response = await postData("montajes/rip/freecutManual", data);

        if (response.status === "success") {
            notify(response.status, response.title, response.message);
            setLoading(false);
            setFreecutModal(false);
        } else {
            notify(response.status, response.title, response.message);
        }
    }

    return (
        <>
            <div className="overlay"></div>
            <div className="popUpTable ripPopUp">
                <div className="header">
                    <MontajeSvg />
                    <p>FREECUT MANUAL</p>
                    <IoMdCloseCircleOutline className="close" onClick={() => setFreecutModal(false)} />
                </div>
                <div className="kioskAction">
                    <div className="freecutContainer">
                        <FreecutComponent freecutData={freecutData} setFreecutData={setFreecutData} colores={colorNames} freeCutColors={freeCutColors} setFreeCutColors={setFreeCutColors} />
                        <SubmitButton onClick={handleSubmit} text="Lanzar" />
                    </div>
                </div>
            </div>
            {loading && <ExecutingComponent />}
        </>
    )
}

export default FreecutPopUp