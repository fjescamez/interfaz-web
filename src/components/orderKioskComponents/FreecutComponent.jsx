import { useEffect } from "react";
import FormGroup from "../formComponents/FormGroup";
import Switch from '@mui/material/Switch';
import ChosenSelect from "../formComponents/ChosenSelect";

function FreecutComponent({ freecutData, setFreecutData, colores, freeCutColors, setFreeCutColors }) {
    const handleChange = (fieldName, value) => {
        setFreecutData((prev) => ({
            ...prev,
            [fieldName]: value
        }));
    }

    const handleColors = (index, field, value) => {        
        if (!index && index !== 0) {            
            if (field === "caidas") {
                setFreeCutColors((prevColors) => {
                    return [...prevColors, { name: "ALL", [field]: value }];
                });
            }

            setFreeCutColors((prevColors) => {
                return prevColors.map((color) => ({
                    ...color,
                    [field]: value
                }));
            });
        } else {
            setFreeCutColors((prevColors) => {
                const updatedColors = [...prevColors];
                updatedColors[index] = {
                    ...updatedColors[index],
                    [field]: value
                };
                return updatedColors;
            });
        }
    };

    useEffect(() => {
        setFreecutData((prev) => ({
            ...prev,
            colores: freeCutColors.filter(color => color.checked)
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
                        <Switch className="kioskSwitch" checked={freeCutColors.every(color => color.checked)} onChange={e => handleColors(null, "checked", e.target.checked)} />
                        <input type="text" value="CAMBIAR A TODOS" disabled />
                        <input type="text" onChange={(e) => handleColors(null, "des_vert", e.target.value)} />
                        <ChosenSelect
                            name={""}
                            value={freeCutColors.find(color => color.name === "ALL")?.caidas || ""}
                            options={["Cortadas", "Completo", "Izquierda", "Derecha"]}
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
                        {colores.map((color, index) => (
                            <div className="colorFreecut" key={index}>
                                <Switch className="kioskSwitch" checked={freeCutColors[index]?.checked || false} onChange={e => handleColors(index, "checked", e.target.checked)} />
                                <input type="text" name={`colorFreecut-${index}`} id={`colorFreecut-${index}`} value={color} disabled />
                                <input type="text" name={`colorFreecut-${index}`} id={`colorFreecut-${index}`} value={freeCutColors[index]?.des_vert || ""} onChange={e => handleColors(index, "des_vert", e.target.value)} />
                                <ChosenSelect
                                    name={index}
                                    options={["Cortadas", "Completo", "Izquierda", "Derecha"]}
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