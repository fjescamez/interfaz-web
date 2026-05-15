export const emailInfoFormData = {
    formSections: [
        {
            title: "Cabecera",
            rows: [
                {
                    groups: ["usuario", "para", "fecha"],
                },
                {
                    groups: ["asunto"]
                }
            ]
        },
        {
            title: "Cuerpo",
            rows: [
                {
                    groups: ["respuesta"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "usuario",
            labelId: "usuarioLabel",
            labelTitle: "De",
            inputType: "text",
            inputId: "usuario",
            inputName: "usuario"
        },
        {
            htmlFor: "para",
            labelId: "paraLabel",
            labelTitle: "Para",
            inputType: "text",
            inputId: "para",
            inputName: "para"
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
            htmlFor: "asunto",
            labelId: "asuntoLabel",
            labelTitle: "Asunto",
            inputType: "text",
            inputId: "asunto",
            inputName: "asunto"
        },
        {
            htmlFor: "respuesta",
            labelId: "respuestaLabel",
            labelTitle: "Respuesta",
            textarea: true,
            inputId: "respuesta",
            inputName: "respuesta"
        },
    ]
}

export const observacionesTecnicasFormData = {
    formSections: [
        {
            title: "Dpto. Dibujo",
            rows: [
                {
                    groups: ["obs_dpto_dibujo"]
                }
            ]
        },
        {
            title: "Dpto. Cliché",
            rows: [
                {
                    groups: ["cliche_nuevo", "cliche_caping", "cliche_mtjcompen"]
                },
                {
                    groups: ["reparacion_cliche", "cliche_compensado", "cliche_descompen"]
                },
                {
                    groups: ["cliche_rotado", "cliche_mixto", "cliche_mtjdirecto"]
                },
                {
                    groups: ["obs_dpto_cliche"]
                }
            ]
        },
        {
            title: "Dpto. Montaje",
            rows: [
                {
                    groups: ["tirada_camisas", "varilla", "poliester"]
                },
                {
                    groups: ["distancia_varilla", "contravarilla", "formato_montaje"]
                },
                {
                    groups: ["obs_dpto_montaje"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "obs_dpto_dibujo",
            labelId: "obs_dpto_dibujoLabel",
            labelTitle: "Observaciones Dibujo",
            textarea: true,
            inputId: "obs_dpto_dibujo",
            inputName: "obs_dpto_dibujo"
        },
        {
            htmlFor: "cliche_nuevo",
            labelId: "cliche_nuevoLabel",
            labelTitle: "Cliché Nuevo",
            inputType: "checkbox",
            inputId: "cliche_nuevo",
            inputName: "cliche_nuevo"
        },
        {
            htmlFor: "reparacion_cliche",
            labelId: "reparacion_clicheLabel",
            labelTitle: "Reparación Cliché",
            inputType: "checkbox",
            inputId: "reparacion_cliche",
            inputName: "reparacion_cliche"
        },
        {
            htmlFor: "cliche_rotado",
            labelId: "cliche_rotadoLabel",
            labelTitle: "Cliché Rotado",
            inputType: "checkbox",
            inputId: "cliche_rotado",
            inputName: "cliche_rotado"
        },
        {
            htmlFor: "cliche_caping",
            labelId: "cliche_capingLabel",
            labelTitle: "Caping",
            inputType: "checkbox",
            inputId: "cliche_caping",
            inputName: "cliche_caping"
        },
        {
            htmlFor: "cliche_compensado",
            labelId: "cliche_compensadoLabel",
            labelTitle: "Compensado",
            inputType: "checkbox",
            inputId: "cliche_compensado",
            inputName: "cliche_compensado"
        },
        {
            htmlFor: "cliche_mixto",
            labelId: "cliche_mixtoLabel",
            labelTitle: "Mixto",
            inputType: "checkbox",
            inputId: "cliche_mixto",
            inputName: "cliche_mixto"
        },
        {
            htmlFor: "cliche_mtjcompen",
            labelId: "cliche_mtjcompenLabel",
            labelTitle: "Montaje Compensado",
            inputType: "checkbox",
            inputId: "cliche_mtjcompen",
            inputName: "cliche_mtjcompen"
        },
        {
            htmlFor: "cliche_descompen",
            labelId: "cliche_descompenLabel",
            labelTitle: "Montaje Descompensado",
            inputType: "checkbox",
            inputId: "cliche_descompen",
            inputName: "cliche_descompen"
        },
        {
            htmlFor: "cliche_mtjdirecto",
            labelId: "cliche_mtjdirectoLabel",
            labelTitle: "Montaje Directo",
            inputType: "checkbox",
            inputId: "cliche_mtjdirecto",
            inputName: "cliche_mtjdirecto"
        },
        {
            htmlFor: "obs_dpto_cliche",
            labelId: "obs_dpto_clicheLabel",
            labelTitle: "Observaciones Cliché",
            textarea: true,
            inputId: "obs_dpto_cliche",
            inputName: "obs_dpto_cliche"
        },
        {
            htmlFor: "tirada_camisas",
            labelId: "tirada_camisasLabel",
            labelTitle: "Tirada Camisas",
            inputType: "text",
            inputId: "tirada_camisas",
            inputName: "tirada_camisas"
        },
        {
            htmlFor: "distancia_varilla",
            labelId: "distancia_varillaLabel",
            labelTitle: "Distancia Varilla",
            inputType: "text",
            inputId: "distancia_varilla",
            inputName: "distancia_varilla"
        },
        {
            htmlFor: "varilla",
            labelId: "varillaLabel",
            labelTitle: "Varilla",
            inputType: "text",
            inputId: "varilla",
            inputName: "varilla"
        },
        {
            htmlFor: "contravarilla",
            labelId: "contravarillaLabel",
            labelTitle: "Contravarilla",
            inputType: "text",
            inputId: "contravarilla",
            inputName: "contravarilla"
        },
        {
            htmlFor: "poliester",
            labelId: "poliesterLabel",
            labelTitle: "Poliéster",
            inputType: "text",
            inputId: "poliester",
            inputName: "poliester"
        },
        {
            htmlFor: "formato_montaje",
            labelId: "formato_montajeLabel",
            labelTitle: "Formato Montaje",
            inputType: "text",
            inputId: "formato_montaje",
            inputName: "formato_montaje"
        },
        {
            htmlFor: "obs_dpto_montaje",
            labelId: "obs_dpto_montajeLabel",
            labelTitle: "Observaciones Montaje",
            textarea: true,
            inputId: "obs_dpto_montaje",
            inputName: "obs_dpto_montaje"
        },
    ]
}

export const orderTableInfo = {
    tableName: "pedidos",
    endPoint: "orders",
    headerIcon: "document",
    deleteTitle: "VERSIÓN",
    headerTitle: "PEDIDOS DE CLIENTES",
    tableColumns: [
        {
            header: "Previo",
            active: true,
            key: "unitario"
        },
        {
            header: "Número",
            active: true,
            key: "id_pedido"
        },
        {
            header: "Marca",
            active: true,
            key: "xml.numero.marca"
        },
        {
            header: "Cliente",
            active: true,
            key: "xml.numero.cliente_nombre"
        },
        {
            header: "F.Creado",
            active: true,
            key: "xml.numero.fecha_solicitud"
        },
        {
            header: "F.Entrega",
            active: true,
            key: "xml.numero.fecha_entrega"
        },
        {
            header: "Boceto",
            active: true,
            key: "xml.numero.boceto",
            check: true,
            checkedConditions: ["-1", "X"]
        },
        {
            header: "Cliché",
            active: true,
            key: "xml.numero.cliche",
            check: true,
            checkedConditions: ["-1", "X"]
        },
        {
            header: "Plotter",
            active: true,
            key: "xml.tecnicos.plotter",
            check: true,
            checkedConditions: ["-1", "X"]
        },
        {
            header: "Prioridad",
            active: true,
            key: "xml.numero.prioridad"
        },
        {
            header: "Ref. Cliente",
            active: true,
            key: "xml.numero.ref_cliente"
        },
        {
            header: "Actividad",
            active: true,
            key: "xml.actividad.id"
        },
        {
            header: "En",
            active: true,
            key: "departamento_asignado"
        },
        {
            header: "Asignado a",
            active: true,
            key: "nombre_usuario_asignado"
        },
        {
            header: "Albarán",
            active: true,
            key: "xml.numero.albaran"
        },
        {
            header: "Estado v.actual",
            active: true,
            key: "xml.numero.state"
        }
    ],
    actions: [
        {
            title: "Asignar",
            action: "asignar"
        },
        {
            title: "Desasignar",
            action: "desasignar"
        }
    ],
    rolesActions: ["Manager", "Soporte"]
};

export const desasignarPedidoFormData = {
    headerIcon: "signature",
    headerTitle: "DESASIGNAR PEDIDO",
    formSections: [],
    formFields: []
}

export const asignarPedidoFormData = {
    headerIcon: "document",
    headerTitle: "ASIGNAR PEDIDO",
    formSections: [
        {
            rows: [
                {
                    groups: ["dibujante"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "dibujante",
            labelId: "dibujanteLabel",
            labelTitle: "Dibujante",
            select: "simple",
            options: [],
            inputId: "dibujante",
            inputName: "dibujante",
            required: true
        },
    ]
}

export const noteTableInfo = {
    endPoint: "notes",
    headerIcon: "note",
    headerTitle: "NOTAS DEL PEDIDO",
    tableColumns: [
        {
            header: "Versión",
            key: "version"
        },
        {
            header: "Fecha",
            key: "fecha"
        },
        {
            header: "Nota",
            key: "nota"
        },
        {
            header: "Usuario",
            key: "username"
        }
    ]
};

export const noteFormData = {
    headerIcon: "note",
    headerTitle: "NUEVA NOTA",
    editTitle: "EDITAR NOTA",
    formSections: [
        {
            rows: [
                {
                    groups: [
                        "nota"
                    ]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "nota",
            labelId: "notaLabel",
            labelTitle: "Nota",
            textarea: true,
            inputId: "nota",
            inputName: "nota",
            required: true
        }
    ]
}

export const orderLenTableInfo = {
    tableName: "archivosLen",
    endPoint: "lenFiles",
    headerIcon: "lenFile",
    headerTitle: "ARCHIVOS LEN",
    tableColumns: [
        {
            header: "Archivo",
            active: true,
            key: "id_archivo"
        },
        {
            header: "Color",
            active: true,
            key: "color"
        },
        {
            header: "Impresión",
            active: true,
            key: "tipoImpresion"
        },
        {
            header: "Ref. Plancha",
            active: true,
            key: "plancha"
        },
        {
            header: "Espesor",
            active: true,
            key: "espesorCliche"
        },
        {
            header: "Usuario Rip",
            active: true,
            key: "username"
        },
        {
            header: "Fecha",
            active: true,
            key: "date"
        },
        {
            header: "Estado",
            active: true,
            key: "state"
        }
    ],
    actions: [
        {
            title: "Enviar a producción",
            action: "enviarProduccion"
        },
        {
            title: "Info curvas",
            action: "infoCurvas",
            noCheck: true
        },
        {
            title: "Solicitar vista",
            action: "solicitarVista",
            hidden: false,
            noCheck: true
        },
        {
            title: "Visualizar LEN",
            action: "visualizarLen",
            hidden: true,
            noCheck: true
        },
        {
            title: "Eliminar",
            action: "eliminar"
        }
    ],
    deleteActions: {
        customObjects: true,
        files: true
    }
};

export const versionTableInfo = {
    tableName: "versiones",
    endPoint: "orders/versions",
    headerIcon: "versions",
    headerTitle: "VERSIONES DEL PEDIDO",
    tableColumns: [
        {
            header: "Número",
            active: true,
            key: "id_pedido"
        },
        {
            header: "F.Creado",
            active: true,
            key: "xml.numero.fecha_solicitud"
        },
        {
            header: "F.Entrega",
            active: true,
            key: "xml.numero.fecha_entrega"
        },
        {
            header: "Boceto",
            active: true,
            key: "xml.numero.boceto",
            check: true
        },
        {
            header: "Cliché",
            active: true,
            key: "xml.numero.cliche",
            check: true
        },
        {
            header: "Prioridad",
            active: true,
            key: "xml.numero.prioridad"
        },
        {
            header: "Estado v.actual",
            active: true,
            key: "xml.numero.state"
        }
    ]
};

export const plotterTableInfo = {
    tableName: "plotter",
    endPoint: "plotter",
    headerIcon: "plotter",
    headerTitle: "PLOTTER",
    tableColumns: [
        {
            header: "Previo",
            active: true,
            key: "archivo"
        },
        {
            header: "Archivo",
            active: true,
            key: "id_archivo"
        }
    ],
    actions: [
        {
            title: "Info GMG",
            action: "infoGmg",
            noCheck: true
        },
        {
            title: "Imprimir Ferro",
            action: "imprimirFerro"
        },
        {
            action: "openRow"
        }
    ],
};

export const gmgFormData = {
    headerTitle: "TAREA GMG",
    headerIcon: "plotter",
    formSections: [
        {
            rows: [
                {
                    groups: [
                        "configuracion",
                        "rotacion"
                    ]
                }
            ]
        },
        {
            rows: [
                {
                    groups: [
                        "tipo"
                    ]
                },
                {
                    groups: [
                        "curva"
                    ]
                },
                {
                    groups: [
                        "perfil"
                    ]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "configuracion",
            labelId: "configuracionLabel",
            labelTitle: "Configuración",
            select: "simple",
            options: [],
            inputId: "configuracion",
            inputName: "configuracion"
        },
        {
            htmlFor: "rotacion",
            labelId: "rotacionLabel",
            labelTitle: "Rotado",
            select: "simple",
            options: [
                "No",
                "Sí"
            ],
            inputId: "rotacion",
            inputName: "rotacion"
        },
        {
            htmlFor: "tipo",
            labelId: "tipoLabel",
            labelTitle: "Tipo",
            inputType: "text",
            inputId: "tipo",
            inputName: "tipo",
            disableField: true
        },
        {
            htmlFor: "curva",
            labelId: "curvaLabel",
            labelTitle: "Curva",
            inputType: "text",
            inputId: "curva",
            inputName: "curva",
            disableField: true
        },
        {
            htmlFor: "perfil",
            labelId: "perfilLabel",
            labelTitle: "Perfil de color",
            inputType: "text",
            inputId: "perfil",
            inputName: "perfil",
            disableField: true
        }
    ]
}

export const metodosImpresionFormData = {
    headerIcon: "montaje",
    headerTitle: "CONFIGURAR PLANCHAS",
    formSections: [
        {
            rows: []
        }
    ],
    formFields: []
}

export const montajeTableInfo = {
    tableName: "montajes",
    endPoint: "montajes",
    headerIcon: "montaje",
    headerTitle: "MONTAJES",
    tableColumns: [
        {
            header: "Previo",
            active: true,
            key: "archivo"
        },
        {
            header: "Archivo",
            active: true,
            key: "id_archivo"
        }
    ],
    actions: [
        {
            title: "Enviar a Corte",
            action: "maquinaCorte"
        },
        {
            title: "Actualizar Estación",
            action: "actualizarEstacion"
        },
        {
            title: "Generar Email y Ferro",
            action: "generarFerro"
        },
        {
            title: "Imprimir Ferro",
            action: "imprimirFerro"
        },
        {
            title: "Comparar",
            action: "comparar"
        },
        {
            title: "Solicitar Vista",
            action: "solicitarVista",
            hidden: false
        },
        {
            title: "Visualizar montaje",
            action: "visualizarMontaje",
            hidden: true,
            noCheck: true
        },
        {
            title: "Menú Rip",
            action: "menuRip",
            noCheck: true
        }
    ],
};

export const docFormData = {
    headerIcon: "doc",
    headerTitle: "CREAR DOCUMENTOS",
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
                        "Ficha Boceto"
                    ]
                },
                {
                    groups: [
                        "Ficha Impresion"
                    ]
                },
                {
                    groups: [
                        "Plotter"
                    ]
                },
                {
                    groups: [
                        "Montaje"
                    ]
                },
                {
                    groups: [
                        "Montaje Especial"
                    ]
                },
                {
                    groups: [
                        "Hacer Separaciones"
                    ]
                },
                {
                    groups: [
                        "Etiquetas de Montaje"
                    ]
                },
                {
                    groups: [
                        "Certificado"
                    ]
                },
                {
                    groups: [
                        "Certificado Continuos"
                    ]
                },
                {
                    groups: [
                        "Etiquetas Plotter"
                    ]
                },
                {
                    groups: [
                        "Certificado Codigos"
                    ]
                },
                {
                    groups: [
                        "unitarioPng"
                    ]
                },
                {
                    groups: [
                        "paradaFreecut"
                    ]
                }
            ]
        },
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
                    labelId: "illustratorLabel",
                    labelTitle: "Illustrator",
                    inputId: "Illustrator",
                    inputName: "entradaUnitario"
                },
                {
                    htmlFor: "ArtPro",
                    labelId: "artProLabel",
                    labelTitle: "ArtPro+",
                    inputId: "ArtPro",
                    inputName: "entradaUnitario"
                },
            ],
            inputId: "entradaUnitario",
            inputName: "entradaUnitario"
        },
        {
            htmlFor: "Ficha Boceto",
            labelId: "fichaBocetoLabel",
            labelTitle: "Ficha Boceto",
            inputType: "checkbox",
            inputId: "Ficha Boceto",
            inputName: "Ficha Boceto"
        },
        {
            htmlFor: "Ficha Impresion",
            labelId: "fichaImpresionLabel",
            labelTitle: "Ficha Impresión",
            inputType: "checkbox",
            inputId: "Ficha Impresion",
            inputName: "Ficha Impresion"
        },
        {
            htmlFor: "Plotter",
            labelId: "plotterLabel",
            labelTitle: "Plotter",
            inputType: "checkbox",
            inputId: "Plotter",
            inputName: "Plotter"
        },
        {
            htmlFor: "Montaje",
            labelId: "montajeLabel",
            labelTitle: "Montaje",
            inputType: "checkbox",
            inputId: "Montaje",
            inputName: "Montaje"
        },
        {
            htmlFor: "Montaje Especial",
            labelId: "montajeEspecialLabel",
            labelTitle: "Montaje Especial",
            inputType: "checkbox",
            inputId: "Montaje Especial",
            inputName: "Montaje Especial"
        },
        {
            htmlFor: "Hacer Separaciones",
            labelId: "separacionesLabel",
            labelTitle: "Hacer Separaciones",
            inputType: "checkbox",
            inputId: "Hacer Separaciones",
            inputName: "Hacer Separaciones"
        },
        {
            htmlFor: "Etiquetas de Montaje",
            labelId: "etiquetasMontajeLabel",
            labelTitle: "Etiquetas de Montaje",
            inputType: "checkbox",
            inputId: "Etiquetas de Montaje",
            inputName: "Etiquetas de Montaje"
        },
        {
            htmlFor: "Certificado",
            labelId: "certificadoLabel",
            labelTitle: "Certificado",
            inputType: "checkbox",
            inputId: "Certificado",
            inputName: "Certificado"
        },
        {
            htmlFor: "Certificado Continuos",
            labelId: "certificadoContinuosLabel",
            labelTitle: "Certificado Continuos",
            inputType: "checkbox",
            inputId: "Certificado Continuos",
            inputName: "Certificado Continuos"
        },
        {
            htmlFor: "Etiquetas Plotter",
            labelId: "etiquetasPlotterLabel",
            labelTitle: "Etiquetas Plotter",
            inputType: "checkbox",
            inputId: "Etiquetas Plotter",
            inputName: "Etiquetas Plotter"
        },
        {
            htmlFor: "Certificado Codigos",
            labelId: "certificadoCodigosLabel",
            labelTitle: "Certificado Códigos",
            inputType: "checkbox",
            inputId: "Certificado Codigos",
            inputName: "Certificado Codigos"
        },
        {
            htmlFor: "unitarioPng",
            labelId: "unitarioPngLabel",
            labelTitle: "Unitario PNG",
            inputType: "checkbox",
            inputId: "unitarioPng",
            inputName: "unitarioPng"
        },
        {
            htmlFor: "paradaFreecut",
            labelId: "paradaFreecutLabel",
            labelTitle: "Parada Freecut",
            inputType: "checkbox",
            inputId: "paradaFreecut",
            inputName: "paradaFreecut"
        },
    ]
}

export const allMontajesTableInfo = {
    tableName: "allMontajes",
    endPoint: "montajes/allMontajes",
    headerIcon: "montaje",
    headerTitle: "MONTAJES",
    tableColumns: [
        {
            header: "Archivo",
            active: true,
            key: "id_archivo"
        }
    ]
};

export const tintasTableInfo = {
    tableName: "tintas",
    endPoint: "colors",
    headerIcon: "paint",
    headerTitle: "TINTAS",
    tableColumns: [
        {
            header: "Color",
            active: true,
            key: "color"
        },
        {
            header: "Lineatura",
            active: true,
            key: "lineatura"
        },
        {
            header: "Ángulo",
            active: true,
            key: "angulo"
        },
        {
            header: "Trama",
            active: true,
            key: "trama"
        },
        {
            header: "Plancha",
            active: true,
            key: "planchaArchivo"
        },
    ],
    actions: [
        {
            title: "Imprimir Separaciones A3",
            action: "imprimirA3"
        },
        {
            title: "Config. Planchas",
            action: "configPlancha",
            noCheck: true
        }
    ]
}

export const emailInfoTableInfo = {
    tableName: "emailInfo",
    endPoint: "",
    headerIcon: "infoEmail",
    headerTitle: "INFO EMAIL",
    tableColumns: [
        {
            header: "Fecha",
            active: true,
            key: "fecha"
        },
        {
            header: "Hora",
            active: true,
            key: "hora"
        },
        {
            header: "Acción",
            active: true,
            key: "accion"
        },
        {
            header: "Para",
            active: true,
            key: "contacto.textoOpcion"
        },
        {
            header: "Usuario",
            active: true,
            key: "usuario"
        },
        {
            header: "Asunto",
            active: true,
            key: "asunto"
        },
    ]
}

export const ripTableInfo = {
    tableName: "rip",
    endPoint: "montajes/rip",
    headerIcon: "montaje",
    headerTitle: "RIP MONTAJE",
    tableColumns: [
        {
            header: "Color",
            active: true,
            key: "color"
        },
        {
            header: "Lineatura",
            active: true,
            key: "lineatura"
        },
        {
            header: "Ángulo",
            active: true,
            key: "angulo"
        },
        {
            header: "Trama",
            active: true,
            key: "trama"
        },
        {
            header: "Plancha",
            active: true,
            key: "planchaArchivo"
        },
    ],
    actions: [
        {
            title: "Rip Auto",
            action: "ripAuto"
        },
        {
            title: "Rip Interior",
            action: "ripInterior"
        },
        {
            title: "Rip Exterior",
            action: "ripExterior"
        },
        {
            title: "Rip Pixel",
            action: "ripPixel"
        },
        {
            title: "Freecut Manual",
            action: "freecutManual",
            noCheck: true
        },
        {
            title: "Config. Planchas",
            action: "configPlancha",
            noCheck: true
        },
        {
            title: "Arrastrador",
            action: "arrastradores",
            hidden: true
        },
        {
            title: "Marcas Corte Desarrollo",
            action: "cortes_desarrollo",
            hidden: true
        }
    ]
}

export const infoGmgTableInfo = {
    tableName: "infoGmg",
    endPoint: "plotter/infoPlotter",
    headerIcon: "plotter",
    headerTitle: "INFORMACIÓN GMG",
    tableColumns: [
        {
            header: "Fecha",
            active: true,
            key: "date"
        },
        {
            header: "Hora",
            active: true,
            key: "hour"
        },
        {
            header: "Operario",
            active: true,
            key: "username"
        },
        {
            header: "Perfil de color",
            active: true,
            key: "perfilColor"
        }
    ]
}
