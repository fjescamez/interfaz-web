export const trabajosExternosTableInfo = {
    tableName: "trabajosExternos",
    endPoint: "externalJobs",
    headerIcon: "jobExt",
    headerTitle: "TRABAJOS EXTERNOS",
    tableColumns: [
        {
            header: "Nombre",
            active: true,
            key: "documentName"
        },
        {
            header: "Cliente",
            active: true,
            key: "username"
        },
        {
            header: "Plancha",
            active: true,
            key: "refPlancha"
        },
        {
            header: "Colores",
            active: true,
            key: "numero_colores"
        },
        {
            header: "Fecha",
            active: true,
            key: "fecha"
        },
        {
            header: "Estado",
            active: true,
            key: "state"
        }
    ],
    actions: [
        {
            title: "Firmar",
            action: "Firmar"
        },
        {
            title: "Anular",
            action: "Anular"
        },
        {
            title: "Restaurar",
            action: "restaurar"
        }
    ],
    defaultChecks: true
}

export const externosFormData = {
    formSections: [
        {
            rows: [
                {
                    groups: ["username", "documentName"]
                },
                {
                    groups: ["refPlancha", "insoladora", "resolucion", "clichesColor", "numero_colores"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "username",
            labelId: "usernameLabel",
            labelTitle: "Cliente",
            inputType: "text",
            inputId: "username",
            inputName: "username"
        },
        {
            htmlFor: "documentName",
            labelId: "documentNameLabel",
            labelTitle: "Nombre",
            inputType: "text",
            inputId: "documentName",
            inputName: "documentName"
        },
        {
            htmlFor: "refPlancha",
            labelId: "refPlanchaLabel",
            labelTitle: "Plancha",
            inputType: "text",
            inputId: "refPlancha",
            inputName: "refPlancha"
        },
        {
            htmlFor: "insoladora",
            labelId: "insoladoraLabel",
            labelTitle: "Insoladora",
            inputType: "text",
            inputId: "insoladora",
            inputName: "insoladora"
        },
        {
            htmlFor: "resolucion",
            labelId: "resolucionLabel",
            labelTitle: "Resolución",
            inputType: "text",
            inputId: "resolucion",
            inputName: "resolucion"
        },
        {
            htmlFor: "clichesColor",
            labelId: "clichesColorLabel",
            labelTitle: "Clichés",
            inputType: "text",
            inputId: "clichesColor",
            inputName: "clichesColor"
        },
        {
            htmlFor: "numero_colores",
            labelId: "numero_coloresLabel",
            labelTitle: "Colores",
            inputType: "text",
            inputId: "numero_colores",
            inputName: "numero_colores"
        },
    ]
}

export const externosFinalizadosTableInfo = {
    tableName: "externosFinalizados",
    endPoint: "externalJobs",
    headerIcon: "jobExt",
    headerTitle: "EXTERNOS FINALIZADOS",
    tableColumns: [
        {
            header: "Nombre",
            active: true,
            key: "documentName"
        },
        {
            header: "Cliente",
            active: true,
            key: "username"
        },
        {
            header: "Plancha",
            active: true,
            key: "refPlancha"
        },
        {
            header: "Colores",
            active: true,
            key: "numero_colores"
        },
        {
            header: "Fecha",
            active: true,
            key: "fecha"
        },
        {
            header: "Usuario",
            active: true,
            key: "usuario_firma.name"
        },
        {
            header: "Estado",
            active: true,
            key: "state"
        },
    ],
    actions: [
        {
            title: "Restaurar",
            action: "restaurar"
        }
    ]
}

export const refPlanchasTableInfo = {
    tableName: "refPlanchas",
    endPoint: "refProduccion/refPlanchas",
    headerIcon: "document",
    headerTitle: "REFERENCIAS DE PLANCHAS",
    tableForm: "RefPlanchaForm",
    tableColumns: [
        {
            header: "Fabricante",
            active: true,
            key: "fabricante"
        },
        {
            header: "Espesor",
            active: true,
            key: "espesor"
        },
        {
            header: "Referencia",
            active: true,
            key: "referencia"
        }
    ]
};

export const trabajosPlanchaTableInfo = {
    tableName: "trabajosPlancha",
    endPoint: "planchas/trabajos",
    headerIcon: "jobExt",
    headerTitle: "TRABAJOS",
    tableColumns: [
        {
            header: "Nombre trabajo",
            active: true,
            key: "name"
        },
        {
            header: "Resolución",
            active: true,
            key: "resolution"
        },
        {
            header: "Ancho",
            active: true,
            key: "usedWidth"
        },
        {
            header: "Alto",
            active: true,
            key: "usedHeight"
        },
        {
            header: "Area",
            active: true,
            key: "usedArea"
        }
    ],
}

export const trabajosPlanchasTableInfo = {
    tableName: "trabajosPlanchas",
    endPoint: "planchas/trabajos",
    headerIcon: "jobExt",
    headerTitle: "TRABAJOS PLANCHAS",
    tableColumns: [
        {
            header: "Nombre plancha",
            active: true,
            key: "nombre_plancha"
        },
        {
            header: "Estado plancha",
            active: true,
            key: "nombre_estado_plancha"
        },
        {
            header: "Fecha",
            active: true,
            key: "fecha_plancha"
        },
        {
            header: "Nombre trabajo",
            active: true,
            key: "name"
        },
        {
            header: "Resolución",
            active: true,
            key: "resolution"
        },
        {
            header: "Ancho",
            active: true,
            key: "usedWidth"
        },
        {
            header: "Alto",
            active: true,
            key: "usedHeight"
        },
        {
            header: "Area",
            active: true,
            key: "usedArea"
        }
    ],
}

export const refContinuosFormData = {
    headerIcon: "document",
    headerTitle: "AÑADIR REF. CONTINUO",
    editTitle: "EDITAR REF. CONTINUO",
    formSections: [
        {
            rows: [
                {
                    groups: ["propietario", "tipo"]
                },
                {
                    groups: ["desarrollo", "ancho", "nucleo"]
                },
                {
                    groups: ["stock", "adaptador"]
                },
                {
                    groups: ["observaciones"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "propietario",
            labelId: "propietarioLabel",
            labelTitle: "Propietario",
            select: "simple",
            options: [
                "",
                "0000 - Disengraf",
                "0019 - Bottaro",
                "0191 - Troflex"
            ],
            inputId: "propietario",
            inputName: "propietario",
            required: true
        },
        {
            htmlFor: "tipo",
            labelId: "tipoLabel",
            labelTitle: "Tipo",
            select: "simple",
            options: [
                "",
                "Classic",
                "Thin",
                "Classic Variable",
                "Thin Variable"
            ],
            inputId: "tipo",
            inputName: "tipo",
            required: true
        },
        {
            htmlFor: "desarrollo",
            labelId: "desarrolloLabel",
            labelTitle: "Desarrollo",
            inputType: "number",
            inputId: "desarrollo",
            inputName: "desarrollo"
        },
        {
            htmlFor: "ancho",
            labelId: "anchoLabel",
            labelTitle: "Ancho",
            inputType: "number",
            inputId: "ancho",
            inputName: "ancho"
        },
        {
            htmlFor: "nucleo",
            labelId: "nucleoLabel",
            labelTitle: "Núcleo",
            inputType: "number",
            inputId: "nucleo",
            inputName: "nucleo"
        },
        {
            htmlFor: "stock",
            labelId: "stockLabel",
            labelTitle: "Stock",
            inputType: "number",
            inputId: "stock",
            inputName: "stock"
        },
        {
            htmlFor: "adaptador",
            labelId: "adaptadorLabel",
            labelTitle: "Adaptador",
            inputType: "checkbox",
            inputId: "adaptador",
            inputName: "adaptador"
        },
        {
            htmlFor: "observaciones",
            labelId: "observacionesLabel",
            labelTitle: "Observaciones",
            textarea: true,
            inputId: "observaciones",
            inputName: "observaciones"
        },
    ]
}

export const refContinuosTableInfo = {
    tableName: "refContinuos",
    endPoint: "refProduccion/refContinuos",
    headerIcon: "document",
    headerTitle: "REFERENCIAS DE CONTINUOS",
    tableForm: "RefContinuoForm",
    tableColumns: [
        {
            header: "Propietario",
            active: true,
            key: "propietario"
        },
        {
            header: "Tipo",
            active: true,
            key: "tipo"
        },
        {
            header: "Desarrollo",
            active: true,
            key: "desarrollo"
        },
        {
            header: "Ancho",
            active: true,
            key: "ancho"
        },
        {
            header: "Núcleo",
            active: true,
            key: "nucleo"
        },
        {
            header: "Stock",
            active: true,
            key: "stock"
        },
        {
            header: "Adaptador",
            active: true,
            key: "adaptador",
            check: true,
            checkedConditions: [1]
        }
    ],
    actions: [
        {
            title: "Eliminar",
            action: "eliminar"
        }
    ]
};

export const refPlanchaFormData = {
    headerIcon: "document",
    headerTitle: "AÑADIR REF. PLANCHA",
    formSections: [
        {
            title: "Plancha",
            rows: [
                {
                    groups: ["fabricante", "espesor", "referencia"]
                },
                {
                    groups: ["base", "relieveMin", "relieveMax", "dureza"]
                }
            ]
        },
        {
            title: "Exposición C-3000",
            rows: [
                {
                    groups: ["dorsal", "principal", "pixel"]
                }
            ]
        },
        {
            title: "Exposición XPS",
            rows: [
                {
                    groups: ["tamano1", "potencia", "exposicion"]
                },
                {
                    groups: ["tamano2", "potencia", "exposicion"]
                },
                {
                    groups: ["tamano3", "potencia", "exposicion"]
                }
            ]
        },
        {
            title: "Procesado",
            rows: [
                {
                    groups: ["tiempoProcesado", "tiempoSecado"]
                }
            ]
        },
        {
            title: "Post Procesado",
            rows: [
                {
                    groups: ["tiempoUva", "tiempoUvc"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "fabricante",
            labelId: "fabricanteLabel",
            labelTitle: "Fabricante",
            select: "simple",
            options: [
                "",
                "DUPONT",
                "KODAK",
                "XSYS",
                "LIQUIDO"
            ],
            inputId: "fabricante",
            inputName: "fabricante"
        },
        {
            htmlFor: "espesor",
            labelId: "espesorLabel",
            labelTitle: "Espesor",
            select: "simple",
            options: [
                "",
                "1,14",
                "1,70",
                "2,54",
                "2,84",
                "3,18",
                "3,94",
                "4,32",
                "6,00"
            ],
            inputId: "espesor",
            inputName: "espesor"
        },
        {
            htmlFor: "referencia",
            labelId: "referenciaLabel",
            labelTitle: "Referencia",
            inputType: "text",
            inputId: "referencia",
            inputName: "referencia"
        },
        {
            htmlFor: "base",
            labelId: "baseLabel",
            labelTitle: "Base",
            inputType: "text",
            inputId: "base",
            inputName: "base"
        },
        {
            htmlFor: "relieveMin",
            labelId: "relieveMinLabel",
            labelTitle: "Relieve min",
            inputType: "text",
            inputId: "relieveMin",
            inputName: "relieveMin"
        },
        {
            htmlFor: "relieveMax",
            labelId: "relieveMaxLabel",
            labelTitle: "Relieve max",
            inputType: "text",
            inputId: "relieveMax",
            inputName: "relieveMax"
        },
        {
            htmlFor: "dureza",
            labelId: "durezaLabel",
            labelTitle: "Dureza",
            inputType: "text",
            inputId: "dureza",
            inputName: "dureza"
        },
        {
            htmlFor: "dorsal",
            labelId: "dorsalLabel",
            labelTitle: "Dorsal",
            inputType: "text",
            inputId: "dorsal",
            inputName: "dorsal"
        },
        {
            htmlFor: "principal",
            labelId: "principalLabel",
            labelTitle: "Principal",
            inputType: "text",
            inputId: "principal",
            inputName: "principal"
        },
        {
            htmlFor: "pixel",
            labelId: "pixelLabel",
            labelTitle: "Pixel",
            inputType: "text",
            inputId: "pixel",
            inputName: "pixel"
        },
        {
            htmlFor: "tamano1",
            labelId: "tamano1Label",
            labelTitle: "Tamaño",
            inputType: "text",
            inputId: "tamano1",
            inputName: "tamano1"
        },
        {
            htmlFor: "tamano2",
            labelId: "tamano2Label",
            labelTitle: "Tamaño",
            inputType: "text",
            inputId: "tamano2",
            inputName: "tamano2"
        },
        {
            htmlFor: "tamano3",
            labelId: "tamano3Label",
            labelTitle: "Tamaño",
            inputType: "text",
            inputId: "tamano3",
            inputName: "tamano3"
        },
        {
            htmlFor: "potencia",
            labelId: "potenciaLabel",
            labelTitle: "Potencia",
            inputType: "text",
            inputId: "potencia",
            inputName: "potencia"
        },
        {
            htmlFor: "exposicion",
            labelId: "exposicionLabel",
            labelTitle: "Exposición",
            inputType: "text",
            inputId: "exposicion",
            inputName: "exposicion"
        },
        {
            htmlFor: "tiempoProcesado",
            labelId: "tiempoProcesadoLabel",
            labelTitle: "Tiempo de Procesado",
            inputType: "text",
            inputId: "tiempoProcesado",
            inputName: "tiempoProcesado"
        },
        {
            htmlFor: "tiempoSecado",
            labelId: "tiempoSecadoLabel",
            labelTitle: "Tiempo de Secado",
            inputType: "text",
            inputId: "tiempoSecado",
            inputName: "tiempoSecado"
        },
        {
            htmlFor: "tiempoUva",
            labelId: "tiempoUvaLabel",
            labelTitle: "Tiempo UVA",
            inputType: "text",
            inputId: "tiempoUva",
            inputName: "tiempoUva"
        },
        {
            htmlFor: "tiempoUvc",
            labelId: "tiempoUvcLabel",
            labelTitle: "Tiempo UVC",
            inputType: "text",
            inputId: "tiempoUvc",
            inputName: "tiempoUvc"
        },
    ]
}

export const planchasTableInfo = {
    tableName: "planchas",
    endPoint: "planchas",
    headerIcon: "jobExt",
    headerTitle: "PLANCHAS",
    tableColumns: [
        {
            header: "Nombre",
            active: true,
            key: "nombre_plancha"
        },
        {
            header: "Referencia",
            active: true,
            key: "ref_plancha"
        },
        {
            header: "CDI",
            active: true,
            key: "cdi"
        },
        {
            header: "Estado",
            active: true,
            key: "nombre_estado"
        },
        {
            header: "Fecha",
            active: true,
            key: "fecha"
        },
        {
            header: "Albarán",
            active: true,
            key: "nombre_estado_albaran"
        },
        {
            header: "Preproducción",
            active: true,
            key: "usuario_dfs"
        },
        {
            header: "Producción",
            active: true,
            key: "usuario_produccion"
        },
        {
            header: "Finalizada",
            active: true,
            key: "usuario_finalizada"
        },
        {
            header: "Incidencia",
            active: true,
            key: "usuario_incidencia"
        }
    ],
    actions: [
        {
            title: "Eliminar",
            action: "eliminar"
        },
        {
            title: "Sincronizar",
            action: "sincronizar",
            noCheck: true
        },
        {
            title: "Firmar",
            action: "firmar"
        },
        /* {
            title: "Imprimir",
            action: "imprimir"
        }, */
        {
            title: "Solicitar Albarán",
            action: "solicitarAlbaran"
        },
        {
            title: "Albarán Parcial",
            action: "albaranParcial"
        },
        {
            title: "Resetear Albarán",
            action: "resetearAlbaran"
        },
        {
            title: "Incidencia",
            action: "incidencia"
        },
        {
            title: "Ver Trabajos",
            action: "verTrabajos"
        },
        {
            title: "Abrir Imagen",
            action: "abrirImagen"
        },
    ]
};

export const produccionReferenciasDetails = {
    title: "Referencias",
    grid: [
        {
            icon: "oven",
            title: "Ref. Planchas",
            key: "refPlanchas"
        },
        {
            icon: "oven",
            title: "Ref. Continuos",
            key: "refContinuos"
        }
    ]
};

export const produccionPlanchasDetails = {
    title: "Planchas",
    grid: [
        {
            icon: "oven",
            title: "Planchas",
            key: "planchas"
        },
        {
            icon: "oven",
            title: "Pre-producción",
            key: "planchasPreproduccion"
        },
        {
            icon: "oven",
            title: "Producción",
            key: "planchasProduccion"
        },
        {
            icon: "oven",
            title: "Finalizadas",
            key: "planchasFinalizadas"
        },
        {
            icon: "oven",
            title: "Trabajos",
            key: "trabajosPlanchas"
        }
    ]
};

export const produccionTrabajosDetails = {
    title: "Trabajos externos",
    grid: [
        {
            icon: "oven",
            title: "Pendientes",
            key: "externosPendientes"
        },
        {
            icon: "oven",
            title: "Finalizados",
            key: "externosFinalizados"
        },
        {
            icon: "oven",
            title: "Anulados",
            key: "externosAnulados"
        }
    ]
};

export const produccionOficinaDetails = {
    title: "",
    grid: [
        {
            icon: "document",
            title: "Ref. Continuos",
            key: "refContinuos"
        },
        {
            icon: "document",
            title: "Pendientes",
            key: "externosPendientes"
        }
    ]
};