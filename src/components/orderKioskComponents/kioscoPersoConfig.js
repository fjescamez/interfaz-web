export const globalKioskVariables = {
    microCalle: ["0101"],
    demasia: ["0101"],
    alturaMicropuntos: ["0101", "0159", "0360", "0160", "0156", "0038"],
    microIzquierda: ["0101", "0160", "0156", "0038"],
    microDerecha: ["0101", "0160", "0156", "0038"],
    caidas_cortadas: ["0159", "0360"],
    posicionCortesCaidas: ["0159", "0360"],
    microVertical: ["0156", "0038"]
};

export const globalKioskForm = [
    {
        htmlFor: "microCalle",
        labelId: "microCalleLabel",
        labelTitle: "Micropuntos por calle",
        inputType: "checkbox",
        inputId: "microCalle",
        inputName: "microCalle"
    },
    {
        htmlFor: "demasia",
        labelId: "demasiaLabel",
        labelTitle: "Demasia lateral",
        inputType: "checkbox",
        inputId: "demasia",
        inputName: "demasia"
    },
    {
        htmlFor: "alturaMicropuntos",
        labelId: "alturaMicropuntosLabel",
        labelTitle: "Altura Micropuntos",
        inputType: "number",
        inputId: "alturaMicropuntos",
        inputName: "alturaMicropuntos"
    },
    {
        htmlFor: "microIzquierda",
        labelId: "microIzquierdaLabel",
        labelTitle: "Micro IZQUIERDA",
        inputType: "number",
        inputId: "microIzquierda",
        inputName: "microIzquierda"
    },
    {
        htmlFor: "microDerecha",
        labelId: "microDerechaLabel",
        labelTitle: "Micro DERECHA",
        inputType: "number",
        inputId: "microDerecha",
        inputName: "microDerecha"
    },
    {
        htmlFor: "caidas_cortadas",
        labelId: "caidas_cortadasLabel",
        labelTitle: "Caídas cortadas",
        inputType: "checkbox",
        inputId: "caidas_cortadas",
        inputName: "caidas_cortadas"
    },
    {
        htmlFor: "posicionCortesCaidas",
        labelId: "posicionCortesCaidasLabel",
        labelTitle: "Posición cortes caídas",
        select: "simple",
        options: [
            "Izquierda",
            "Derecha",
            "Centro"
        ],
        inputId: "posicionCortesCaidas",
        inputName: "posicionCortesCaidas"
    },
]