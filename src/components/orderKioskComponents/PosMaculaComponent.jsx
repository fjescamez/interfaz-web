import React from 'react'
import ChosenSelect from '../formComponents/ChosenSelect'

function PosMaculaComponent({ posMacula, setPosMacula }) {
    const options = [
        "",
        "Izquierda",
        "Ambos Lados",
        "Derecha"
    ]

    return (
        <div className="actionBody">
            <form>
                <div className="formGroup">
                    <label htmlFor="posMacula">Posición de la Mácula</label>
                    <ChosenSelect
                        name="posMacula"
                        options={options}
                        value={posMacula}
                        onChange={(e) => setPosMacula(e.target.value)}
                    />
                </div>
            </form>
        </div>
    )
}

export default PosMaculaComponent