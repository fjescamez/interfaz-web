import Switch from '@mui/material/Switch';
import { PiMinusCircle, PiPlusCircle } from "react-icons/pi";
import ChosenSelect from "../formComponents/ChosenSelect";
import "./KioskComponents.css";
import { notify } from "../../helpers/notify";
import { toast } from "react-toastify";

function BocetoComponent({ opciones, setOpciones }) {
    const options1 = [
        "Pdf",
        "Png",
        "Jpg"
    ];

    const options = [
        "Compuesto",
        "CMYK",
        "RGB"
    ];

    const agregarBoceto = () => {
        setOpciones(prev => [...prev, { id: opciones.at(-1).id + 1, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }]);
    }

    const eliminarBoceto = (id) => {
        setOpciones(prev => prev.filter(obj => obj.id !== id));
    }

    const checkActive = (id) => {
        setOpciones(prev => (
            prev.map(obj =>
                obj.id === id
                    ? {
                        ...obj,
                        rasterizado: !obj.rasterizado
                    }
                    :
                    obj
            )
        )
        );
    }

    const handleChange = (id, fieldName, value) => {
        setOpciones(prev => (
            prev.map(obj =>
                obj.id === id ? { ...obj, [fieldName]: value } : obj
            )
        )
        );
    }

    return (
        <div className="actionBody">
            <form>
                {opciones.map((opcion, index) => (
                    <div className="boceto" key={opcion.id}>
                        {index !== 0 && <div className="separator" />}
                        <div className="row">
                            <p><strong>{index + 1}</strong></p>
                            <div className="firstGroup">
                                <p><strong>¿Rasterizar?</strong></p>
                                <Switch className="kioskSwitch" onClick={() => checkActive(opcion.id)} checked={opcion.rasterizado} />
                                {opcion.rasterizado && (
                                    <div className="lpiGroup">
                                        <input
                                            type="text"
                                            value={opcion.lpi}
                                            onChange={e => handleChange(opcion.id, "lpi", e.target.value)}
                                        />
                                        <div className="lpi">
                                            <p>lpi</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <ChosenSelect
                                name={opcion.id}
                                options={options1}
                                value={opcion.formato}
                                onChange={e => handleChange(opcion.id, "formato", e.target.value)}
                            />
                            <ChosenSelect
                                name={opcion.id}
                                options={options}
                                value={opcion.tipo}
                                onChange={e => handleChange(opcion.id, "tipo", e.target.value)}
                            />
                            {opciones.indexOf(opcion) === 0 && <PiPlusCircle onClick={agregarBoceto} />}
                            {opciones.indexOf(opcion) !== 0 && <PiMinusCircle onClick={() => eliminarBoceto(opcion.id)} />}
                        </div>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default BocetoComponent