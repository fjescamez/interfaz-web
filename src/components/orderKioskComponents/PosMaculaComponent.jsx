import { useEffect } from 'react'
import ChosenSelect from '../formComponents/ChosenSelect'

function PosMaculaComponent({ state, updateState }) {
    const options = [
        "",
        "Izquierda",
        "Ambos Lados",
        "Derecha"
    ]

    useEffect(() => {
        if (!state.isActive?.posMacula) return;

        const errorPosMacula = {
            status: "error",
            message: "No hay posición de mácula seleccionada",
            type: ["posMacula"]
        };

        const hasValue = String(state.posMacula ?? "").trim() !== "";

        updateState("orderReport", (prevOrderReport) => {
            let next = prevOrderReport;

            if (!hasValue) {
                const exists = prevOrderReport.some(
                    (item) => item.message === errorPosMacula.message && JSON.stringify(item.type) === JSON.stringify(errorPosMacula.type)
                );
                if (!exists) next = [...next, errorPosMacula];
            } else {
                next = next.filter(
                    (item) => !(item.message === errorPosMacula.message && JSON.stringify(item.type) === JSON.stringify(errorPosMacula.type))
                );
            }

            return next;
        });
    }, [state.posMacula, state.isActive?.posMacula, state.orderXml]);

    return (
        <div className="actionBody">
            <form>
                <div className="formGroup">
                    <label htmlFor="posMacula">Posición de la Mácula</label>
                    <ChosenSelect
                        name="posMacula"
                        options={options}
                        value={state.posMacula}
                        onChange={(e) => updateState("posMacula", e.target.value)}
                    />
                </div>
            </form>
        </div>
    )
}

export default PosMaculaComponent