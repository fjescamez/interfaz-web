import Switch from '@mui/material/Switch';
import { PiMinusCircle, PiPlusCircle } from "react-icons/pi";
import ChosenSelect from "../formComponents/ChosenSelect";
import "./KioskComponents.css";
import { notify } from "../../helpers/notify";
import { formatosBoceto, tiposBoceto, clientesBocetosEspeciales } from '../../helpers/constants';
import FormGroup from '../formComponents/FormGroup';
import { globalKioskBocetoForm } from './kioscoPersoConfig';
import KioscoPersoBoceto from './KioscoPersoBoceto';
import { useEffect } from 'react';

function BocetoComponent({ opciones, setOpciones, orderXml, kioscoPersoBocData, updateState, colores, state }) {
    const { cliente_codigo, marca } = orderXml?.numero;

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

    useEffect(() => {
        if (marca?.toLowerCase().includes("hacendado") || marca?.toLowerCase().includes("mercadona")) {
            setOpciones(prev =>
                prev.map(opcion => ({
                    ...opcion,
                    tipo: "Sep+Compuesto"
                }))
            );
        }
    }, []);

    return (
        <div className="actionBody">
            <form>
                {opciones.map((opcion, index) => (
                    <div className="boceto" key={opcion.id}>
                        {index !== 0 && <div className="separator" />}
                        <div className="row">
                            {/* <p><strong>{index + 1}</strong></p> */}
                            <div className="firstGroup">
                                <p><strong>¿Rasterizar?</strong></p>
                                <Switch className="kioskSwitch" onClick={() => checkActive(opcion.id)} checked={opcion.rasterizado} />
                                {/* {opcion.rasterizado && (
                                    <div className="lpiGroup">
                                        <input
                                            type="text"
                                            value={opcion.lpi}
                                            onChange={e => handleChange(opcion.id, "lpi", e.target.value)}
                                            id="lpiInput"
                                        />
                                        <div className="lpi">
                                            <p>lpi</p>
                                        </div>
                                    </div>
                                )} */}
                            </div>
                            {/* <ChosenSelect
                                name={`formato-${index}`}
                                options={formatosBoceto}
                                value={opcion.formato}
                                onChange={e => handleChange(opcion.id, "formato", e.target.value)}
                            />
                            */}


                            {clientesBocetosEspeciales.includes(cliente_codigo) &&
                                <div className="formGroup">
                                    <label>Salida</label>
                                    <ChosenSelect
                                        options={tiposBoceto}
                                        name={`tipo-${index}`}
                                        onChange={e => handleChange(opcion.id, "tipo", e.target.value)}
                                        value={opcion.tipo}
                                    />

                                </div>
                            }
                            {/*
                            {opciones.indexOf(opcion) === 0 && <PiPlusCircle onClick={agregarBoceto} />}
                            {opciones.indexOf(opcion) !== 0 && <PiMinusCircle onClick={() => eliminarBoceto(opcion.id)} />} 
                            */}

                        </div>
                    </div>

                ))}

            </form>
            <div className="montaje">
                <br></br>
                <KioscoPersoBoceto orderXml={orderXml} kioscoPersoBocData={kioscoPersoBocData} updateState={updateState} colores={colores} state={state} />
            </div>
        </div>
    )
}

export default BocetoComponent