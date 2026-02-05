export const kioskActions = [
    {
        title: "UNITARIO",
        id: "unitario",
        hideWhenConfig: true,
        disableSwitch: true,
        steps: [1, 2, 3]
    },
    {
        title: "REPORTE PREVIO",
        id: "reportePrevio",
        hideWhenConfig: true,
        disableSwitch: true,
        steps: [2, 3]
    },
    {
        title: "TRAPPING",
        id: "trapping",
        steps: [3]
    },
    {
        title: "CAMBIAN COLORES",
        id: "salidaColores",
        openOnActive: true,
        specificClients: ["0159", "0168"],
        hideWhenConfig: true,
        steps: [3]
    },
    {
        title: "DIGIMARK",
        id: "listDigimark",
        openOnActive: true,
        specificClients: ["0159"],
        hideWhenConfig: true,
        steps: [3]
    },
    {
        title: "BOCETO",
        id: "bocetos",
        steps: [3]
    },
    {
        title: "FICHA",
        id: "fichas",
        steps: [3]
    },
    {
        title: "PLOTTER",
        id: "plotter",
        disableOpen: true,
        steps: [3]
    },
    {
        title: "MÁCULAS",
        id: "posMacula",
        disableSwitch: true,
        openOnActive: true,
        onlyShowIfActive: true,
        specificClients: ["0172"],
        steps: [3]
    },
    {
        title: "MONTAJE",
        id: "montaje",
        openOnActive: true,
        hideWhenConfig: true,
        steps: [3]
    },
    {
        title: "FREECUT",
        id: "freecut",
        openOnActive: true,
        steps: [3]
    },
    {
        title: "CONFIG. AVANZADA MONTAJE",
        id: "configAvanzadaMontaje",
        openOnActive: true,
        onlyShowIfActive: true,
        steps: [3]
    },
    {
        title: "OTRA DOCUMENTACIÓN",
        id: "otraDocumentacion",
        openOnActive: true,
        steps: [3]
    }
]

export const avanzadoFormData = {
    formSections: [
        {
            title: "Montaje",
            rows: [
                {
                    groups: ["PageIndex", "OneUp", "StartNewLane"],
                    rowDisplay: "display255025"
                },
                {
                    groups: ["HCount", "HOffset", "HGap", "PageBox"]
                },
                {
                    groups: ["VCount", "VOffset", "VGap", "Orientation"]
                },
            ]
        },
        {
            title: "Escalonado",
            rows: [
                {
                    groups: ["StaggerOffset", "RestartAfter", "HeadTurn"]
                }
            ]
        },
        {
            title: "Sangrados",
            rows: [
                {
                    groups: ["BleedLimitLeft", "BleedLimitRight", "BleedLimitTop", "BleedLimitBottom"]
                }
            ]
        },
    ],
    formFields: [
        {
            htmlFor: "PageIndex",
            labelId: "PageIndexLabel",
            labelTitle: "Número de Página",
            select: "simple",
            options: [""],
            inputId: "PageIndex",
            inputName: "PageIndex",
            noDecimals: true
        },
        {
            htmlFor: "OneUp",
            labelId: "OneUpLabel",
            labelTitle: "Archivo",
            inputType: "text",
            inputId: "OneUp",
            inputName: "OneUp",
            disableField: true
        },
        {
            htmlFor: "StartNewLane",
            labelId: "StartNewLaneLabel",
            labelTitle: "Nuevo carril",
            inputType: "checkbox",
            inputId: "StartNewLane",
            inputName: "StartNewLane"
        },
        {
            htmlFor: "HCount",
            labelId: "HCountLabel",
            labelTitle: "Piezas Horizontal",
            inputType: "number",
            minNumber: 1,
            inputId: "HCount",
            inputName: "HCount",
            noDecimals: true
        },
        {
            htmlFor: "HOffset",
            labelId: "HOffsetLabel",
            labelTitle: "Desplazamiento",
            inputType: "number",
            minNumber: 0,
            inputId: "HOffset",
            inputName: "HOffset"
        },
        {
            htmlFor: "HGap",
            labelId: "HGapLabel",
            labelTitle: "Separación",
            inputType: "number",
            minNumber: 0,
            inputId: "HGap",
            inputName: "HGap"
        },
        {
            htmlFor: "PageBox",
            labelId: "PageBoxLabel",
            labelTitle: "Perfil de Límite",
            select: "simple",
            options: [
                {
                    _id: "MediaBox",
                    textoOpcion: "Material"
                },
                {
                    _id: "CropBox",
                    textoOpcion: "Recorte"
                },
                {
                    _id: "BleedBox",
                    textoOpcion: "Sangrado"
                },
                {
                    _id: "TrimBox",
                    textoOpcion: "Límite"
                },
                {
                    _id: "ArtBox",
                    textoOpcion: "Ilustraciones"
                }
            ],
            inputId: "PageBox",
            inputName: "PageBox"
        },
        {
            htmlFor: "VCount",
            labelId: "VCountLabel",
            labelTitle: "Piezas Vertical",
            inputType: "number",
            minNumber: 1,
            inputId: "VCount",
            inputName: "VCount",
            noDecimals: true
        },
        {
            htmlFor: "VOffset",
            labelId: "VOffsetLabel",
            labelTitle: "Desplazamiento",
            inputType: "number",
            minNumber: 0,
            inputId: "VOffset",
            inputName: "VOffset"
        },
        {
            htmlFor: "VGap",
            labelId: "VGapLabel",
            labelTitle: "Separación",
            inputType: "number",
            minNumber: 0,
            inputId: "VGap",
            inputName: "VGap"
        },
        {
            htmlFor: "Orientation",
            labelId: "OrientationLabel",
            labelTitle: "Orientación",
            select: "simple",
            options: [
                {
                    _id: "up",
                    orientation: "up",
                    textoOpcion: "Original"
                },
                {
                    _id: "down",
                    orientation: "down",
                    textoOpcion: "Rotada 180º"
                },
                {
                    _id: "right",
                    orientation: "right",
                    textoOpcion: "Rotada 90º"
                },
                {
                    _id: "left",
                    orientation: "left",
                    textoOpcion: "Rotada -90º"
                }
            ],
            inputId: "Orientation",
            inputName: "Orientation"
        },
        {
            htmlFor: "StaggerDirection",
            labelId: "StaggerDirectionLabel",
            labelTitle: "Escalonado",
            select: "simple",
            options: [
                {
                    _id: "NoStaggering",
                    textoOpcion: "No"
                },
                {
                    _id: "Vertical",
                    textoOpcion: "Vertical"
                }
            ],
            inputId: "StaggerDirection",
            inputName: "StaggerDirection"
        },
        {
            htmlFor: "StaggerOffset",
            labelId: "StaggerOffsetLabel",
            labelTitle: "Desplazamiento Escalonado",
            inputType: "number",
            minNumber: 0,
            inputId: "StaggerOffset",
            inputName: "StaggerOffset"
        },
        {
            htmlFor: "RestartAfter",
            labelId: "RestartAfterLabel",
            labelTitle: "Reiniciar Después De",
            inputType: "number",
            minNumber: 0,
            inputId: "RestartAfter",
            inputName: "RestartAfter",
            noDecimals: true
        },
        {
            htmlFor: "HeadTurn",
            labelId: "HeadTurnLabel",
            labelTitle: "Invertir Cabeza",
            select: "simple",
            options: [
                {
                    _id: "none",
                    headTurn: "none",
                    textoOpcion: "Ninguno"
                },
                {
                    _id: "column",
                    headTurn: "column",
                    textoOpcion: "Cada columna"
                },
                {
                    _id: "row",
                    headTurn: "row",
                    textoOpcion: "Cada fila"
                },
                {
                    _id: "rowandcolumn",
                    headTurn: "rowandcolumn",
                    textoOpcion: "Cada fila y columna"
                }
            ],
            inputId: "HeadTurn",
            inputName: "HeadTurn"
        },
        {
            htmlFor: "HeadTurnMadera",
            labelId: "HeadTurnLabel",
            labelTitle: "Invertir Cabeza",
            select: "simple",
            options: [
                {
                    _id: "none",
                    headTurn: "none",
                    textoOpcion: "Ninguno"
                },
                {
                    _id: "column",
                    headTurn: "column",
                    textoOpcion: "Cada columna (por los culos)"
                },
                {
                    _id: "row",
                    headTurn: "row",
                    textoOpcion: "Cada fila (por las asas)"
                },
                {
                    _id: "rowandcolumn",
                    headTurn: "rowandcolumn",
                    textoOpcion: "Fila y columna (asas y culos)"
                }
            ],
            inputId: "HeadTurn",
            inputName: "HeadTurn"
        },
        {
            htmlFor: "BleedLimitLeft",
            labelId: "BleedLimitLeftLabel",
            labelTitle: "Izquierdo",
            inputType: "number",
            minNumber: 0,
            inputId: "BleedLimitLeft",
            inputName: "BleedLimitLeft"
        },
        {
            htmlFor: "BleedLimitRight",
            labelId: "BleedLimitRightLabel",
            labelTitle: "Derecho",
            inputType: "number",
            minNumber: 0,
            inputId: "BleedLimitRight",
            inputName: "BleedLimitRight"
        },
        {
            htmlFor: "BleedLimitTop",
            labelId: "BleedLimitTopLabel",
            labelTitle: "Superior",
            inputType: "number",
            minNumber: 0,
            inputId: "BleedLimitTop",
            inputName: "BleedLimitTop"
        },
        {
            htmlFor: "BleedLimitBottom",
            labelId: "BleedLimitBottomLabel",
            labelTitle: "Inferior",
            inputType: "number",
            minNumber: 0,
            inputId: "BleedLimitBottom",
            inputName: "BleedLimitBottom"
        },
    ]
}

export const unitarioFormData = {
    formSections: [
        {
            rows: [
                {
                    groups: [
                        "archivo"
                    ]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "archivo",
            labelId: "archivoLabel",
            labelTitle: "Archivo",
            select: "simple",
            options: [],
            inputId: "archivo",
            inputName: "archivo"
        }
    ]
}

export const trappingFormData = {
    formSections: [
        {
            rows: [
                {
                    groups: [
                        "distancia_trapping",
                        "intensidad",
                        "remetido",
                        "distancia_remetido"
                    ]
                },
                {
                    groups: [
                    ]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "distancia_trapping",
            labelId: "distancia_trappingLabel",
            labelTitle: "Distancia Trapping",
            inputType: "number",
            minNumber: 0,
            inputId: "distancia_trapping",
            inputName: "distancia_trapping"
        },
        {
            htmlFor: "intensidad",
            labelId: "intensidadLabel",
            labelTitle: "Intensidad",
            inputType: "number",
            minNumber: 0,
            maxNumber: 100,
            inputId: "intensidad",
            inputName: "intensidad"
        },
        {
            htmlFor: "remetido",
            labelId: "remetidoLabel",
            labelTitle: "Remetido",
            select: "simple",
            options: [
                "No",
                "Planas",
                "Negro",
                "Todos"
            ],
            inputId: "remetido",
            inputName: "remetido"
        },
        {
            htmlFor: "distancia_remetido",
            labelId: "distancia_remetidoLabel",
            labelTitle: "Distancia Remetido",
            inputType: "number",
            minNumber: 0,
            inputId: "distancia_remetido",
            inputName: "distancia_remetido"
        }
    ]
}