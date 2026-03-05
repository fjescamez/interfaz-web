import { useEffect } from "react";
import FormGroup from "../formComponents/FormGroup";
import Switch from '@mui/material/Switch';
import ChosenSelect from "../formComponents/ChosenSelect";
import { caidasFreecutOptions } from "../../helpers/constants";

function FreecutComponent({ state, updateState, freecutData, setFreecutData, colores, freeCutColors, setFreeCutColors }) {
    const colorsWithFreecut = ["FREECUT", ...(colores || [])];

    useEffect(() => {
        if (state && state.orderColorsObjects.length > 0) {            
            updateState("freeCutColors", [
                {
                    check: false,
                    color: "FREECUT",
                    distancia: "0",
                    caidas: state.clientConfig?.configuraciones?.montaje?.caidasFreecut || "COMPLETO",
                    plancha: "MIXTO"
                },
                ...state.orderColorsObjects.map(color => ({
                    check: false,
                    color: color.name,
                    distancia: "0",
                    caidas: state.clientConfig?.configuraciones?.montaje?.caidasFreecut || "COMPLETO",
                    plancha: color.process?.replace("custom_", "") || ""
                }))
            ]);
        }
    }, [state?.orderColorsObjects]);

    const handleChange = (fieldName, value) => {
        setFreecutData((prev) => ({
            ...prev,
            [fieldName]: value
        }));
    }

    const handleColors = (index, field, value) => {
        if (!index && index !== 0) {
            if (field === "caidas") {
                setFreecutData((prev) => ({
                    ...prev,
                    caidasAll: value
                }));
            }

            setFreeCutColors((prevColors) => {
                const safeColors = Array.isArray(prevColors) ? prevColors : [];
                return safeColors.map((color) => ({
                    ...color,
                    [field]: value
                }));
            });
        } else {
            setFreeCutColors((prevColors) => {
                const safeColors = Array.isArray(prevColors) ? prevColors : [];
                const updatedColors = [...safeColors];
                updatedColors[index] = {
                    ...updatedColors[index],
                    [field]: value
                };
                return updatedColors;
            });
        }
    };

    useEffect(() => {
        const safeColors = Array.isArray(freeCutColors) ? freeCutColors : [];
        setFreecutData((prev) => ({
            ...prev,
            colores: safeColors
        }));
    }, [freeCutColors]);

    return (
        <div className="actionBody">
            {colores.length > 0 ? (
                <div className="freecut">
                    <div className="formGroup">
                        <FormGroup
                            handleForm={(e) => handleChange("posiCortes", e.target.value)}
                            value={freecutData.posiCortes || ""}
                            field={{
                                htmlFor: "posiCortes",
                                labelId: "posiCortesLabel",
                                labelTitle: "Posición de cortes",
                                select: "simple",
                                options: [
                                    "Izquierda",
                                    "Derecha",
                                    "Centro"
                                ],
                                inputId: "posiCortes",
                                inputName: "posiCortes"
                            }}
                        />
                    </div>
                    <div className="colorFreecut">
                        <Switch className="kioskSwitch" checked={freeCutColors.every(color => color.check)} onChange={e => handleColors(null, "check", e.target.checked)} />
                        <input type="text" value="CAMBIAR A TODOS" disabled />
                        <input type="text" onChange={(e) => handleColors(null, "distancia", e.target.value)} />
                        <ChosenSelect
                            name={""}
                            value={freecutData.caidasAll || state.clientConfig?.configuraciones?.montaje?.caidasFreecut || ""}
                            options={caidasFreecutOptions}
                            onChange={e => handleColors(null, "caidas", e.target.value)}
                        />
                    </div>
                    <div className="titleRow">
                        <p>CREAR</p>
                        <p>MUESTRAS</p>
                        <p>DES. VERT.</p>
                        <p>CAÍDAS</p>
                    </div>
                    <div className="coloresFreecut">
                        {colorsWithFreecut.map((color, index) => (
                            <div className="colorFreecut" key={index}>
                                <Switch className="kioskSwitch" checked={freeCutColors[index]?.check || false} onChange={e => handleColors(index, "check", e.target.checked)} />
                                <input type="text" name={`colorFreecut-${index}`} id={`colorFreecut-${index}`} value={color} disabled />
                                <input type="text" name={`colorFreecut-${index}`} id={`colorFreecut-${index}`} value={freeCutColors[index]?.distancia || ""} onChange={e => handleColors(index, "distancia", e.target.value)} />
                                <ChosenSelect
                                    name={index}
                                    options={caidasFreecutOptions}
                                    value={freeCutColors[index]?.caidas || ""}
                                    onChange={e => handleColors(index, "caidas", e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : <p className="noColors">Este pedido no tiene colores</p>}
        </div>
    )
}

export default FreecutComponent