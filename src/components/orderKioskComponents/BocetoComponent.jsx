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

    const agregarRasterizado = () => {
        setOpciones(prev => [...prev, { id: opciones.at(-1).id + 1, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }]);
    }

    const eliminarRasterizado = (id) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(opciones));
        /* Si algún rasterizado marcado como activo no tiene LPI */
        if (opciones.some(obj => obj.rasterizado === true && obj.lpi === "")) {
            return notify(toast.error, "error", "Error en el boceto", "Uno de los rasterizados no tiene lpi");
        }
    }

    return (
        <div className="actionBody">
            <form onSubmit={handleSubmit}>
                {opciones.map((opcion) => (
                    <div className="boceto" key={opcion.id}>
                        {opciones.indexOf(opcion) !== 0 && <div className="separator" />}
                        <div className="row">
                            <div className="firstGroup">
                                <Switch className="kioskSwitch" onClick={() => checkActive(opcion.id)} checked={opcion.rasterizado} />
                                <p><strong>Rasterizado</strong></p>
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
                            {opciones.indexOf(opcion) === 0 && <PiPlusCircle onClick={agregarRasterizado} />}
                            {opciones.indexOf(opcion) !== 0 && <PiMinusCircle onClick={() => eliminarRasterizado(opcion.id)} />}
                        </div>
                    </div>
                ))}
                <button type="submit"><h1>Hola</h1></button>
            </form>
        </div>
    )
}

export default BocetoComponent