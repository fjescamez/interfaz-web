import React, { useEffect, useState } from 'react'
import SubmitButton from '../buttons/SubmitButton'
import FormGroup from '../formComponents/FormGroup';

function AjustarTintas({ state, updateState }) {
    const moveLeft = () => {
        if (state.indexTintasAjustar > 0) {
            updateState("indexTintasAjustar", state.indexTintasAjustar - 1);
        }
    };

    const moveRight = () => {
        if (state.indexTintasAjustar < state.listTintasAjustar.length - 1) {
            updateState("indexTintasAjustar", state.indexTintasAjustar + 1);
        }
    };

    const handleForm = (tintaAjustar, color) => {
        const tintaIndex = state.tintasAjuste.findIndex(tinta => tinta.name === tintaAjustar);
        const colorIndex = state.tintasAjuste[tintaIndex].colors.indexOf(color);
        if (colorIndex !== -1) {
            // Si el color ya está en la lista, lo eliminamos
            const updatedColors = [...state.tintasAjuste[tintaIndex].colors];
            updatedColors.splice(colorIndex, 1);
            const updatedTintasAjuste = [...state.tintasAjuste];
            updatedTintasAjuste[tintaIndex] = {
                ...updatedTintasAjuste[tintaIndex],
                colors: updatedColors,
                allColorsSelected: false
            };
            updateState("tintasAjuste", updatedTintasAjuste);
        } else {
            // Si el color no está en la lista, lo agregamos
            const updatedTintasAjuste = [...state.tintasAjuste];
            updatedTintasAjuste[tintaIndex] = {
                ...updatedTintasAjuste[tintaIndex],
                colors: [...updatedTintasAjuste[tintaIndex].colors, color],
                allColorsSelected: [...updatedTintasAjuste[tintaIndex].colors, color].length === state.orderColors.length
            };
            updateState("tintasAjuste", updatedTintasAjuste);
        }
    }

    useEffect(() => {
        const tintasAjusteData = state.listTintasAjustar.map(tinta => {
            return {
                name: tinta,
                colors: state.orderColors,
                allColorsSelected: true
            }
        });
        updateState("tintasAjuste", tintasAjusteData);
    }, [state.listTintasAjustar, state.orderColors]);

    return (
        <div className="actionBody">
            <div className="carruselTintas">
                <div className="ajustarTintas">
                    {state.listTintasAjustar.length > 1 && <SubmitButton text="&#9664;" onClick={moveLeft} />}
                    <div className="ajustarTinta">
                        <p className="tintaTitle">{state.listTintasAjustar[state.indexTintasAjustar]}</p>
                        <SubmitButton
                            text={state.tintasAjuste.find(tinta => tinta.name === state.listTintasAjustar[state.indexTintasAjustar])?.colors.length === state.orderColors.length ? "Desmarcar todos" : "Marcar todos"}
                            onClick={() => {
                                const allColorsSelected = state.tintasAjuste.find(tinta => tinta.name === state.listTintasAjustar[state.indexTintasAjustar])?.colors.length === state.orderColors.length;
                                if (allColorsSelected) {
                                    // Si todos los colores están seleccionados, los desmarcamos
                                    const updatedTintasAjuste = [...state.tintasAjuste];
                                    updatedTintasAjuste[state.indexTintasAjustar] = {
                                        ...updatedTintasAjuste[state.indexTintasAjustar],
                                        colors: [],
                                        allColorsSelected: false
                                    };
                                    updateState("tintasAjuste", updatedTintasAjuste);
                                } else {
                                    // Si no todos los colores están seleccionados, los marcamos todos
                                    const updatedTintasAjuste = [...state.tintasAjuste];
                                    updatedTintasAjuste[state.indexTintasAjustar] = {
                                        ...updatedTintasAjuste[state.indexTintasAjustar],
                                        colors: state.orderColors,
                                        allColorsSelected: true
                                    };
                                    updateState("tintasAjuste", updatedTintasAjuste);
                                }
                            }}
                        />
                        <div className="listadoColores">
                            {state.orderColors.map((color, index) => (
                                <div className="formGroup formGroupRow" key={index}>
                                    <FormGroup
                                        handleForm={() => handleForm(state.listTintasAjustar[state.indexTintasAjustar], color)}
                                        value={state.tintasAjuste.find(tinta => tinta.name === state.listTintasAjustar[state.indexTintasAjustar])?.colors.includes(color) || false}
                                        field={{
                                            htmlFor: `ajustarTinta${color}`,
                                            labelId: `ajustarTintaLabel${color}`,
                                            labelTitle: color,
                                            inputType: "checkbox",
                                            inputId: `ajustarTinta${color}`,
                                            inputName: `ajustarTinta${color}`
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {state.listTintasAjustar.length > 1 && <SubmitButton text="&#9658;" onClick={moveRight} />}
                </div>
                <div className="indexes">
                    {state.listTintasAjustar.map((_, index) => (
                        <div
                            key={index}
                            className={`index ${index === state.indexTintasAjustar ? 'active' : ''}`}
                            onClick={() => updateState("indexTintasAjustar", index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AjustarTintas