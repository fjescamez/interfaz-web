import { caidasFreecutOptions, cajaReferenciaOptions, plantillasDocumentos } from "./constants";

export const traceTextForm = {
    headerIcon: "riText",
    headerTitle: "TRAZAR TEXTO",
    formSections: [
        {
            rows: [
                {
                    groups: ["traceTextFiles"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "traceTextFiles",
            labelId: "traceTextFilesLabel",
            labelTitle: "Seleccione los archivos a trazar",
            select: "multiple",
            options: [],
            inputId: "traceTextFiles",
            inputName: "traceTextFiles",
            required: true
        }
    ]
}

export const calculadoraDistorsionForm = {
    headerIcon: "FaCalculator",
    headerTitle: "Calculadora Distorsion",
    formSections: [
        {
            rows: [
                {
                    groups: ["desarolloReal"]
                },
                {
                    groups: ["desarrolloEsperado",]
                },
                {
                    groups: ["distorsion"]
                },
                {
                    groups: ["resultado"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "desarolloReal",
            labelId: "desarrolloRealLabel",
            labelTitle: "Desarrollo Archivo",
            inputType: "number",
            inputId: "desarolloReal",
            inputName: "desarolloReal"
        },
        {
            htmlFor: "desarrolloEsperado",
            labelId: "desarrolloEsperadoLabel",
            labelTitle: "Desarrollo Forzado",
            inputType: "number",
            inputId: "desarrolloEsperado",
            inputName: "desarrolloEsperado"
        },
        {
            htmlFor: "distorsion",
            labelId: "distorsionLabel",
            labelTitle: "Distorsion",
            inputType: "number",
            inputId: "distorsion",
            inputName: "distorsion"
        },
        {
            htmlFor: "resultado",
            labelId: "resultadoLabel",
            labelTitle: "Resultado",
            inputType: "text",
            inputId: "resultado",
            inputName: "resultado",
            disable: true
        },
    ]
}

export const incidenciaFormData = {
    headerIcon: "note",
    headerTitle: "GENERAR INCIDENCIA",
    formSections: [
        {
            rows: [
                {
                    groups: ["incidencia"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "incidencia",
            labelId: "incidenciaLabel",
            labelTitle: "Incidencia",
            textarea: true,
            inputId: "incidencia",
            inputName: "incidencia"
        }
    ]
}

export const planchasFormData = {
    formSections: [
        {
            title: "Datos Generales",
            rows: [
                {
                    groups: ["nombre_plancha", "ref_plancha", "cdi"]
                },
                {
                    groups: ["nombre_estado", "fecha", "nombre_estado_albaran"]
                }
            ]
        },
        {
            title: "Control",
            rows: [
                {
                    groups: ["usuario_dfs", "usuario_produccion", "usuario_finalizada"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "nombre_plancha",
            labelId: "nombre_planchaLabel",
            labelTitle: "Nombre",
            inputType: "text",
            inputId: "nombre_plancha",
            inputName: "nombre_plancha"
        },
        {
            htmlFor: "ref_plancha",
            labelId: "ref_planchaLabel",
            labelTitle: "Referencia",
            inputType: "text",
            inputId: "ref_plancha",
            inputName: "ref_plancha"
        },
        {
            htmlFor: "cdi",
            labelId: "cdiLabel",
            labelTitle: "CDI",
            inputType: "text",
            inputId: "cdi",
            inputName: "cdi"
        },
        {
            htmlFor: "nombre_estado",
            labelId: "nombre_estadoLabel",
            labelTitle: "Estado",
            inputType: "text",
            inputId: "nombre_estado",
            inputName: "nombre_estado"
        },
        {
            htmlFor: "fecha",
            labelId: "fechaLabel",
            labelTitle: "Fecha",
            inputType: "text",
            inputId: "fecha",
            inputName: "fecha"
        },
        {
            htmlFor: "nombre_estado_albaran",
            labelId: "nombre_estado_albaranLabel",
            labelTitle: "Albarán",
            inputType: "text",
            inputId: "nombre_estado_albaran",
            inputName: "nombre_estado_albaran"
        },
        {
            htmlFor: "usuario_dfs",
            labelId: "usuario_dfsLabel",
            labelTitle: "Preproducción",
            inputType: "text",
            inputId: "usuario_dfs",
            inputName: "usuario_dfs"
        },
        {
            htmlFor: "usuario_produccion",
            labelId: "usuario_produccionLabel",
            labelTitle: "Producción",
            inputType: "text",
            inputId: "usuario_produccion",
            inputName: "usuario_produccion"
        },
        {
            htmlFor: "usuario_finalizada",
            labelId: "usuario_finalizadaLabel",
            labelTitle: "Finalizada",
            inputType: "text",
            inputId: "usuario_finalizada",
            inputName: "usuario_finalizada"
        },
    ]
};

export const xmlFormData = {
    headerIcon: "documentXml",
    headerTitle: "LANZAR XML",
    formSections: [
        {
            rows: [
                {
                    groups: [
                        "entradaUnitario"
                    ]
                },
                {
                    groups: [
                        "hacerTrapping"
                    ]
                },
                {
                    groups: [
                        "distancia_trapping",
                        "intensidad"
                    ]
                },
                {
                    groups: [
                        "remetido",
                        "distancia_remetido"
                    ]
                },
                {
                    groups: [
                        "hacerSeparaciones"
                    ]
                },
                {
                    groups: [
                        "hacerMontaje"
                    ]
                },
                {
                    groups: [
                        "compararVersion"
                    ]
                },
                {
                    groups: [
                        "canalDel"
                    ]
                },
                {
                    groups: [
                        "rasterizar"
                    ]
                },
                {
                    groups: [
                        "paradaFreecut",
                        "test"
                    ]
                },
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "entradaUnitario",
            labelId: "entradaUnitarioLabel",
            labelTitle: "Unitario",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "Illustrator",
                    labelId: "IllustratorLabel",
                    labelTitle: "Illustrator",
                    inputId: "Illustrator",
                    inputName: "entradaUnitario"
                },
                {
                    htmlFor: "ArtPro",
                    labelId: "ArtProLabel",
                    labelTitle: "ArtPro+",
                    inputId: "ArtPro",
                    inputName: "entradaUnitario"
                },
            ],
            inputId: "entradaUnitario",
            inputName: "entradaUnitario"
        },
        {
            htmlFor: "hacerTrapping",
            labelId: "hacerTrappingLabel",
            labelTitle: "Trapping/Preimpresión",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "siAuto",
                    labelId: "siAutoLabel",
                    labelTitle: "Automático",
                    inputId: "siAuto",
                    inputName: "hacerTrapping"
                },
                {
                    htmlFor: "manual",
                    labelId: "manualLabel",
                    labelTitle: "Manual",
                    inputId: "manual",
                    inputName: "hacerTrapping"
                },
                {
                    htmlFor: "noTrapping",
                    labelId: "noTrappingLabel",
                    labelTitle: "No",
                    inputId: "noTrapping",
                    inputName: "hacerTrapping"
                },
            ],
            inputId: "hacerTrapping",
            inputName: "hacerTrapping"
        },
        {
            htmlFor: "hacerSeparaciones",
            labelId: "hacerSeparacionesLabel",
            labelTitle: "Hacer Separaciones",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "siSeparaciones",
                    labelId: "siSeparacionesLabel",
                    labelTitle: "Sí",
                    inputId: "siSeparaciones",
                    inputName: "hacerSeparaciones"
                },
                {
                    htmlFor: "noSeparaciones",
                    labelId: "noSeparacionesLabel",
                    labelTitle: "No",
                    inputId: "noSeparaciones",
                    inputName: "hacerSeparaciones"
                },
            ],
            inputId: "hacerSeparaciones",
            inputName: "hacerSeparaciones"
        },
        {
            htmlFor: "hacerMontaje",
            labelId: "hacerMontajeLabel",
            labelTitle: "Hacer Montaje",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "nuevoMontaje",
                    labelId: "nuevoMontajeLabel",
                    labelTitle: "Nuevo",
                    inputId: "nuevoMontaje",
                    inputName: "hacerMontaje"
                },
                {
                    htmlFor: "especial",
                    labelId: "especialLabel",
                    labelTitle: "Especial",
                    inputId: "especial",
                    inputName: "hacerMontaje"
                },
                {
                    htmlFor: "noMontaje",
                    labelId: "noMontajeLabel",
                    labelTitle: "No",
                    inputId: "noMontaje",
                    inputName: "hacerMontaje"
                },
            ],
            inputId: "hacerMontaje",
            inputName: "hacerMontaje"
        },
        {
            htmlFor: "compararVersion",
            labelId: "compararVersionLabel",
            labelTitle: "Comparar Unitario",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "siComparar",
                    labelId: "siCompararLabel",
                    labelTitle: "Sí",
                    inputId: "siComparar",
                    inputName: "compararVersion"
                },
                {
                    htmlFor: "noComparar",
                    labelId: "noCompararLabel",
                    labelTitle: "No",
                    inputId: "noComparar",
                    inputName: "compararVersion"
                },
            ],
            inputId: "compararVersion",
            inputName: "compararVersion"
        },
        {
            htmlFor: "canalDel",
            labelId: "canalDelLabel",
            labelTitle: "Eliminar tintas sin uso",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "siEliminar",
                    labelId: "siEliminarLabel",
                    labelTitle: "Sí",
                    inputId: "siEliminar",
                    inputName: "canalDel"
                },
                {
                    htmlFor: "noEliminar",
                    labelId: "noEliminarLabel",
                    labelTitle: "No",
                    inputId: "noEliminar",
                    inputName: "canalDel"
                },
            ],
            inputId: "canalDel",
            inputName: "canalDel"
        },
        {
            htmlFor: "rasterizar",
            labelId: "rasterizarLabel",
            labelTitle: "Boceto Rasterizado",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "siBoceto",
                    labelId: "siBocetoLabel",
                    labelTitle: "Sí",
                    inputId: "siBoceto",
                    inputName: "rasterizar"
                },
                {
                    htmlFor: "noBoceto",
                    labelId: "noBocetoLabel",
                    labelTitle: "No",
                    inputId: "noBoceto",
                    inputName: "rasterizar"
                },
            ],
            inputId: "rasterizar",
            inputName: "rasterizar"
        },
        {
            htmlFor: "paradaFreecut",
            labelId: "paradaFreecutLabel",
            labelTitle: "Parada Freecut",
            inputType: "checkbox",
            inputId: "paradaFreecut",
            inputName: "paradaFreecut"
        }
    ]
}

export const emailFormData = {
    headerIcon: "email",
    headerTitle: "EMAIL",
    formSections: [
        {
            rows: [
                {
                    groups: [
                        "contacto"
                    ]
                },
                {
                    groups: [
                        "adjuntos"
                    ]
                },
                {
                    groups: [
                        "asunto"
                    ]
                },
                {
                    groups: [
                        "responder"
                    ]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "contacto",
            labelId: "contactoLabel",
            labelTitle: "Contacto",
            select: "simple",
            options: [],
            inputId: "contacto",
            inputName: "contacto",
            required: true
        },
        {
            htmlFor: "adjuntos",
            labelId: "adjuntosLabel",
            labelTitle: "Adjuntos",
            select: "multiple",
            options: [],
            inputId: "adjuntos",
            inputName: "adjuntos"
        },
        {
            htmlFor: "asunto",
            labelId: "asuntoLabel",
            labelTitle: "Asunto",
            inputType: "text",
            inputId: "asunto",
            inputName: "asunto",
            required: true
        },
        {
            htmlFor: "responder",
            labelId: "responderLabel",
            labelTitle: "Responder",
            textarea: true,
            inputId: "responder",
            inputName: "responder",
            required: true
        }
    ]
}

export const clientConfigFormData = {
    headerIcon: "gear",
    headerTitle: "CONFIGURACIÓN CLIENTE",
    formSections: [
        {
            title: "E-mail",
            rows: [
                {
                    groups: [
                        "contactoDefault"
                    ]
                }
            ]
        },
        {
            title: "Boceto",
            rows: [
                {
                    groups: [
                        "bocetoRasterizado",
                        "plantillaBoceto"
                    ]
                },
                {
                    groups: [
                        "nombrePlantillaBoceto"
                    ]
                },
                {
                    groups: [
                        "anchoPlantillaBoceto",
                        "altoPlantillaBoceto",
                        "cajaReferenciaBoceto"
                    ]
                }
            ]
        },
        {
            title: "Ficha",
            rows: [
                {
                    groups: [
                        "fichaRasterizada",
                        "plantillaFicha"
                    ]
                },
                {
                    groups: [
                        "nombrePlantillaFicha"
                    ]
                },
                {
                    groups: [
                        "anchoPlantillaFicha",
                        "altoPlantillaFicha",
                        "cajaReferenciaFicha"
                    ]
                }
            ]
        },
        {
            title: "Montaje",
            rows: [
                {
                    groups: [
                        "compensacionCorte",
                        "marcaMontaje",
                        "caidasFreecut"
                    ]
                }
            ]
        },
        {
            title: "Documentación",
            rows: [
                {
                    title: "Certificados",
                    groups: [
                        "certificadoControl",
                        "certificadoContinuos",
                        "certificadoCodigos",
                        "unitarioPng"
                    ]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "contactoDefault",
            labelId: "contactoDefaultLabel",
            labelTitle: "Contacto por defecto",
            select: "simple",
            options: [],
            inputId: "contactoDefault",
            inputName: "contactoDefault"
        },
        {
            htmlFor: "bocetoRasterizado",
            labelId: "bocetoRasterizadoLabel",
            labelTitle: "Rasterizar",
            inputType: "checkbox",
            inputId: "bocetoRasterizado",
            inputName: "bocetoRasterizado"
        },
        {
            htmlFor: "plantillaBoceto",
            labelId: "plantillaBocetoLabel",
            labelTitle: "Tipo Plantilla",
            select: "simple",
            options: plantillasDocumentos,
            inputId: "plantillaBoceto",
            inputName: "plantillaBoceto",
            visibleFor: ["Soporte"]
        },
        {
            htmlFor: "anchoPlantillaBoceto",
            labelId: "anchoPlantillaBocetoLabel",
            labelTitle: "Ancho Plantilla Boceto",
            inputType: "number",
            inputId: "anchoPlantillaBoceto",
            inputName: "anchoPlantillaBoceto",
            visibleFor: ["Soporte"],
            showIf: ({ inputData }) => inputData?.plantillaBoceto === "Personalizada"
        },
        {
            htmlFor: "altoPlantillaBoceto",
            labelId: "altoPlantillaBocetoLabel",
            labelTitle: "Alto Plantilla Boceto",
            inputType: "number",
            inputId: "altoPlantillaBoceto",
            inputName: "altoPlantillaBoceto",
            visibleFor: ["Soporte"],
            showIf: ({ inputData }) => inputData?.plantillaBoceto === "Personalizada"
        },
        {
            htmlFor: "nombrePlantillaBoceto",
            labelId: "nombrePlantillaBocetoLabel",
            labelTitle: "Nombre Plantilla Boceto",
            select: "simple",
            options: [],
            inputId: "nombrePlantillaBoceto",
            inputName: "nombrePlantillaBoceto",
            visibleFor: ["Soporte"],
            showIf: ({ inputData }) => inputData?.plantillaBoceto === "Personalizada"
        },
        {
            htmlFor: "cajaReferenciaBoceto",
            labelId: "cajaReferenciaBocetoLabel",
            labelTitle: "Caja Referencia Boceto",
            select: "simple",
            options: cajaReferenciaOptions,
            inputId: "cajaReferenciaBoceto",
            inputName: "cajaReferenciaBoceto",
            visibleFor: ["Soporte"],
            showIf: ({ inputData }) => inputData?.plantillaBoceto === "Personalizada"
        },
        {
            htmlFor: "fichaRasterizada",
            labelId: "fichaRasterizadaLabel",
            labelTitle: "Rasterizar",
            inputType: "checkbox",
            inputId: "fichaRasterizada",
            inputName: "fichaRasterizada"
        },
        {
            htmlFor: "plantillaFicha",
            labelId: "plantillaFichaLabel",
            labelTitle: "Tipo Plantilla",
            select: "simple",
            options: plantillasDocumentos,
            inputId: "plantillaFicha",
            inputName: "plantillaFicha",
            visibleFor: ["Soporte"]
        },
        {
            htmlFor: "anchoPlantillaFicha",
            labelId: "anchoPlantillaFichaLabel",
            labelTitle: "Ancho Plantilla Ficha",
            inputType: "number",
            inputId: "anchoPlantillaFicha",
            inputName: "anchoPlantillaFicha",
            visibleFor: ["Soporte"],
            showIf: ({ inputData }) => inputData?.plantillaFicha === "Personalizada"
        },
        {
            htmlFor: "altoPlantillaFicha",
            labelId: "altoPlantillaFichaLabel",
            labelTitle: "Alto Plantilla Ficha",
            inputType: "number",
            inputId: "altoPlantillaFicha",
            inputName: "altoPlantillaFicha",
            visibleFor: ["Soporte"],
            showIf: ({ inputData }) => inputData?.plantillaFicha === "Personalizada"
        },
        {
            htmlFor: "nombrePlantillaFicha",
            labelId: "nombrePlantillaFichaLabel",
            labelTitle: "Nombre Plantilla Ficha",
            select: "simple",
            options: [],
            inputId: "nombrePlantillaFicha",
            inputName: "nombrePlantillaFicha",
            visibleFor: ["Soporte"],
            showIf: ({ inputData }) => inputData?.plantillaFicha === "Personalizada"
        },
        {
            htmlFor: "cajaReferenciaFicha",
            labelId: "cajaReferenciaFichaLabel",
            labelTitle: "Caja Referencia Ficha",
            select: "simple",
            options: cajaReferenciaOptions,
            inputId: "cajaReferenciaFicha",
            inputName: "cajaReferenciaFicha",
            visibleFor: ["Soporte"],
            showIf: ({ inputData }) => inputData?.plantillaFicha === "Personalizada"
        },
        {
            htmlFor: "compensacionCorte",
            labelId: "compensacionCorteLabel",
            labelTitle: "Compensación de corte",
            inputType: "number",
            inputId: "compensacionCorte",
            inputName: "compensacionCorte"
        },
        {
            htmlFor: "marcaMontaje",
            labelId: "marcaMontajeLabel",
            labelTitle: "Plantilla de montaje",
            select: "simple",
            options: [
                {},
                {
                    _id: "personalizada",
                    textoOpcion: "Personalizada"
                },
                {
                    _id: "centrosConref",
                    textoOpcion: "Centros con referencia"
                },
                {
                    _id: "centrosSinRef",
                    textoOpcion: "Centros sin referencia"
                },
                {
                    _id: "puntosConRef",
                    textoOpcion: "Puntos con referencia"
                },
                {
                    _id: "puntosSinRef",
                    textoOpcion: "Puntos sin referencia"
                }
            ],
            inputId: "marcaMontaje",
            inputName: "marcaMontaje"
        },
        {
            htmlFor: "caidasFreecut",
            labelId: "caidasFreecutLabel",
            labelTitle: "Caídas Freecut",
            select: "simple",
            options: caidasFreecutOptions,
            inputId: "caidasFreecut",
            inputName: "caidasFreecut"
        },
        {
            htmlFor: "certificadoControl",
            labelId: "certificadoControlLabel",
            labelTitle: "Control",
            inputType: "checkbox",
            inputId: "certificadoControl",
            inputName: "certificadoControl"
        },
        {
            htmlFor: "certificadoContinuos",
            labelId: "certificadoContinuosLabel",
            labelTitle: "Continuos",
            inputType: "checkbox",
            inputId: "certificadoContinuos",
            inputName: "certificadoContinuos"
        },
        {
            htmlFor: "certificadoCodigos",
            labelId: "certificadoCodigosLabel",
            labelTitle: "Códigos",
            inputType: "checkbox",
            inputId: "certificadoCodigos",
            inputName: "certificadoCodigos"
        },
        {
            htmlFor: "unitarioPng",
            labelId: "unitarioPngLabel",
            labelTitle: "Unitario PNG",
            inputType: "checkbox",
            inputId: "unitarioPng",
            inputName: "unitarioPng"
        }
    ]
}

