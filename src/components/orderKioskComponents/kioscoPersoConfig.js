export const globalKioskVariables = {
    microCalle: ["0101"],
    demasia: ["0101"],
    alturaMicropuntos: ["0101", "0159", "0360", "0160", "0156", "0038"],
    microIzquierda: ["0101", "0160", "0156", "0038"],
    microDerecha: ["0101", "0160", "0156", "0038"],
    caidas_cortadas: ["0159", "0360"],
    posicionCortesCaidas: ["0159", "0360"],
    microVertical: ["0156", "0038"],
    pestana: ["CARTON"],
    poscicionPestana: ["CARTON"],
    posVarilla: ["CARTON"],
    checkRegistron: ["0022"],
    despRegistron: ["0022"],
    mastercut: ["0022"],
    tomaPinza: ["0022"],
    reservaCaidas: ["0160"],
    archivo_pagina: ["0101"],
    filas: ["0101"],
    anchoRound: ["CARTON", "MADERA", "FLEXIBLE", "ETIQUETAS"]
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
    {
        htmlFor: "pestana",
        labelId: "pestanaLabel",
        labelTitle: "Pestaña",
        inputType: "number",
        minNumber: 0,
        inputId: "pestana",
        inputName: "pestana"
    },
    {
        htmlFor: "poscicionPestana",
        labelId: "poscicionPestanaLabel",
        labelTitle: "Posición Pestaña",
        select: "simple",
        options: [
            "CENTRADO",
            "IZQUIERDA",
            "DERECHA"
        ],
        inputId: "poscicionPestana",
        inputName: "poscicionPestana"
    },
    {
        htmlFor: "posVarilla",
        labelId: "posVarillaLabel",
        labelTitle: "Posición Varilla",
        select: "simple",
        options: [
            "ARRIBA",
            "ABAJO"
        ],
        inputId: "posVarilla",
        inputName: "posVarilla"
    },
    {
        htmlFor: "checkRegistron",
        labelId: "checkRegistronLabel",
        labelTitle: "Check Registron",
        inputType: "checkbox",
        inputId: "checkRegistron",
        inputName: "checkRegistron"
    },
    {
        htmlFor: "despRegistron",
        labelId: "despRegistronLabel",
        labelTitle: "Desplazamiento Registron",
        inputType: "number",
        inputId: "despRegistron",
        inputName: "despRegistron"
    },
    {
        htmlFor: "mastercut",
        labelId: "mastercutLabel",
        labelTitle: "Mastercut",
        inputType: "checkbox",
        inputId: "mastercut",
        inputName: "mastercut"
    },
    {
        htmlFor: "tomaPinza",
        labelId: "tomaPinzaLabel",
        labelTitle: "Toma Pinza",
        select: "simple",
        options: [
            "15",
            "25",
            "-1"
        ],
        inputId: "tomaPinza",
        inputName: "tomaPinza"
    },
    {
        htmlFor: "reservaCaidas",
        labelId: "reservaCaidasLabel",
        labelTitle: "Reserva caídas",
        inputType: "checkbox",
        inputId: "reservaCaidas",
        inputName: "reservaCaidas"
    },
    {
        htmlFor: "archivo_pagina",
        labelId: "archivo_paginaLabel",
        labelTitle: "Archivo por página",
        inputType: "checkbox",
        inputId: "archivo_pagina",
        inputName: "archivo_pagina",
        showIf: ({state}) => state?.unitarioMetadata?.number_of_pages > 1
    },
    {
        htmlFor: "filas",
        labelId: "filasLabel",
        labelTitle: "Motivos en VERTICAL",
        inputType: "number",
        inputId: "filas",
        inputName: "filas",
        showIf: ({state}) => state?.unitarioMetadata?.number_of_pages > 1
    },
    {
        htmlFor: "anchoRound",
        labelId: "anchoRoundLabel",
        labelTitle: "Ancho de Camisa",
        inputType: "number",
        inputId: "anchoRound",
        inputName: "anchoRound",
        showIf: ({state}) => state?.orderColorsObjects?.some(colorObj => typeof colorObj.process === 'string' && colorObj.process.toUpperCase().includes('FAST'))
    }
]