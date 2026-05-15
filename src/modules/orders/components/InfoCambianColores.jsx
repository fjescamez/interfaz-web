import React from 'react'
import './InfoCambianColores.css';

export const InfoCambianColores = ({ fullOrder }) => {

    const { infoSalidaColores } = fullOrder;
    if (!infoSalidaColores) return
    const { salidaColores: cambiarColores, username, fechaHora } = infoSalidaColores;
    const cambianColoresString = cambiarColores && cambiarColores.length > 0 ? cambiarColores.join(", ") : null;


    return (
        <div className="cambianColores">

            <h3>Colores que cambian: <span>Actualizado en {fechaHora} por {username}</span></h3>

            <p>{cambianColoresString}</p>
        </div>
    )
}
