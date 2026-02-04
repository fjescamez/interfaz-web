import { FaUserCircle, FaBoxOpen } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import { PiEnvelopeLight, PiNoteLight } from "react-icons/pi";
import { BsFiletypeDoc, BsFiletypeXml } from "react-icons/bs";
import { SlBriefcase } from "react-icons/sl";
import { PiGear } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbColorSwatch } from "react-icons/tb";
import { AiOutlineSignature } from "react-icons/ai";
import GroupsSvg from "../assets/svg/GroupsSvg";
import Plotter from "../assets/svg/Plotter";
import MontajeSvg from "../assets/svg/MontajeSvg";

export const incidenciaProductoFormData = {
    headerIcon: <FaBoxOpen />,
    headerTitle: "NUEVA INCIDENCIA DE PRODUCTO",
    formSections: [
        {
            rows: [
                {
                    groups: ["solicitante"]
                },
                {
                    groups: ["producto", "estado"]
                },
                {
                    groups: ["descripcion"]
                },
                {
                    groups: ["observaciones"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "solicitante",
            labelId: "solicitanteLabel",
            labelTitle: "Solicitante",
            inputType: "text",
            inputId: "solicitante",
            inputName: "solicitante",
            disableField: true
        },
        {
            htmlFor: "producto",
            labelId: "productoLabel",
            labelTitle: "Producto",
            inputType: "text",
            inputId: "producto",
            inputName: "producto",
            disableField: true
        },
        {
            htmlFor: "estado",
            labelId: "estadoLabel",
            labelTitle: "Estado",
            select: "simple",
            options: [],
            inputId: "estado",
            inputName: "estado",
            required: true
        },
        {
            htmlFor: "descripcion",
            labelId: "descripcionLabel",
            labelTitle: "Descripción",
            inputType: "text",
            inputId: "descripcion",
            inputName: "descripcion",
            required: true
        },
        {
            htmlFor: "observaciones",
            labelId: "observacionesLabel",
            labelTitle: "Observaciones",
            textarea: true,
            inputId: "observaciones",
            inputName: "observaciones",
            required: true
        }
    ]
}

export const descontarProductoFormData = {
    headerIcon: <FaBoxOpen />,
    headerTitle: "DESCONTAR STOCK",
    formSections: [
        {
            rows: [
                {
                    groups: ["producto"]
                },
                {
                    groups: ["estado_nombre", "departamento_nombre"]
                },
                {
                    groups: ["stock_min", "cantidad"]
                },
                {
                    groups: ["descontar"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "producto",
            labelId: "productoLabel",
            labelTitle: "Producto",
            inputType: "text",
            inputId: "producto",
            inputName: "producto",
            required: true,
            disableField: true
        },
        {
            htmlFor: "estado_nombre",
            labelId: "estado_nombreLabel",
            labelTitle: "Estado",
            inputType: "text",
            inputId: "estado_nombre",
            inputName: "estado_nombre",
            required: true,
            disableField: true
        },
        {
            htmlFor: "departamento_nombre",
            labelId: "departamento_nombreLabel",
            labelTitle: "Departamento",
            select: "simple",
            options: [],
            inputId: "departamento_nombre",
            inputName: "departamento_nombre",
            required: true,
            disableField: true
        },
        {
            htmlFor: "stock_min",
            labelId: "stock_minLabel",
            labelTitle: "Stock Mínimo",
            inputType: "number",
            inputId: "stock_min",
            inputName: "stock_min",
            disableField: true
        },
        {
            htmlFor: "cantidad",
            labelId: "cantidadLabel",
            labelTitle: "Stock Actual",
            inputType: "number",
            inputId: "cantidad",
            inputName: "cantidad",
            required: true,
            disableField: true
        },
        {
            htmlFor: "descontar",
            labelId: "descontarLabel",
            labelTitle: "Descontar",
            inputType: "number",
            minNumber: 0,
            inputId: "descontar",
            inputName: "descontar",
            required: true
        },
    ]
};

export const ordenesFormData = {
    headerIcon: <FaBoxOpen />,
    headerTitle: "NUEVA ORDEN DE COMPRA",
    formSections: [
        {
            rows: [
                {
                    groups: ["solicitante", "departamento"]
                },
                {
                    groups: ["producto"]
                },
                {
                    groups: ["cantidad_solicitada"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "solicitante",
            labelId: "solicitanteLabel",
            labelTitle: "Solicitante",
            inputType: "text",
            inputId: "solicitante",
            inputName: "solicitante",
            required: true,
            disableField: true
        },
        {
            htmlFor: "departamento",
            labelId: "departamentoLabel",
            labelTitle: "Departamento",
            inputType: "text",
            inputId: "departamento",
            inputName: "departamento",
            required: true,
            disableField: true
        },
        {
            htmlFor: "producto",
            labelId: "productoLabel",
            labelTitle: "Producto",
            inputType: "text",
            inputId: "producto",
            inputName: "producto",
            required: true,
            disableField: true
        },
        {
            htmlFor: "cantidad_solicitada",
            labelId: "cantidad_solicitadaLabel",
            labelTitle: "Cantidad",
            inputType: "number",
            minNumber: 0,
            noDecimals: true,
            inputId: "cantidad_solicitada",
            inputName: "cantidad_solicitada",
            required: true
        },
    ]
}

export const productosStockFormData = {
    headerIcon: <FaBoxOpen />,
    headerTitle: "AÑADIR PRODUCTO DE STOCK",
    editTitle: "EDITAR PRODUCTO DE STOCK",
    formSections: [
        {
            rows: [
                {
                    groups: ["nombre"]
                },
                {
                    groups: ["categoria"]
                },
                {
                    groups: ["departamento"]
                },
                {
                    groups: ["stock_min", "cantidad"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "nombre",
            labelId: "nombreLabel",
            labelTitle: "Nombre",
            inputType: "text",
            inputId: "nombre",
            inputName: "nombre",
            required: true
        },
        {
            htmlFor: "categoria",
            labelId: "categoriaLabel",
            labelTitle: "Categoría",
            select: "simple",
            options: [],
            inputId: "categoria",
            inputName: "categoria",
            required: true
        },
        {
            htmlFor: "departamento",
            labelId: "departamentoLabel",
            labelTitle: "Departamento",
            select: "simple",
            options: [],
            inputId: "departamento",
            inputName: "departamento",
            required: true
        },
        {
            htmlFor: "stock_min",
            labelId: "stock_minLabel",
            labelTitle: "Stock Min",
            inputType: "number",
            minNumber: 0,
            inputId: "stock_min",
            inputName: "stock_min",
            required: true
        },
        {
            htmlFor: "cantidad",
            labelId: "cantidadLabel",
            labelTitle: "Cantidad",
            inputType: "number",
            minNumber: 0,
            inputId: "cantidad",
            inputName: "cantidad",
            required: true
        },
    ]
}

export const categoriasStockFormData = {
    headerIcon: <FaBoxOpen />,
    headerTitle: "AÑADIR CATEGORÍA DE PRODUCTO",
    editTitle: "EDITAR CATEGORÍA DE PRODUCTO",
    formSections: [
        {
            rows: [
                {
                    groups: ["nombre"]
                },
                {
                    groups: ["descripcion"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "nombre",
            labelId: "nombreLabel",
            labelTitle: "Nombre",
            inputType: "text",
            inputId: "nombre",
            inputName: "nombre",
            required: true
        },
        {
            htmlFor: "descripcion",
            labelId: "descripcionLabel",
            labelTitle: "Descripción",
            textarea: true,
            inputId: "descripcion",
            inputName: "descripcion",
            required: true
        }
    ]
}

export const refContinuosFormData = {
    headerIcon: <IoDocumentTextOutline />,
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

export const refPlanchaFormData = {
    headerIcon: <IoDocumentTextOutline />,
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

export const incidenciaFormData = {
    headerIcon: <PiNoteLight />,
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

export const desasignarPedidoFormData = {
    headerIcon: <AiOutlineSignature />,
    headerTitle: "DESASIGNAR PEDIDO",
    formSections: [],
    formFields: []
}

export const asignarPedidoFormData = {
    headerIcon: <IoDocumentTextOutline />,
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

export const strategyFormData = {
    headerIcon: <TbColorSwatch className="stroke" />,
    headerTitle: "NUEVA ESTRATEGIA",
    formSections: [
        {
            title: "Cliente",
            key: "cliente",
            disableIfFilter: true,
            rows: [
                {
                    groups: ["cliente_nombre", "cliente_codigo"],
                    rowDisplay: "display8020"
                }
            ]
        },
        {
            title: "Material",
            key: "material",
            disableIfFilter: true,
            rows: [
                {
                    groups: ["material_nombre", "material_codigo"],
                    rowDisplay: "display8020"
                }
            ]
        },
        {
            title: "Plancha",
            key: "plancha",
            disableIfFilter: true,
            rows: [
                {
                    groups: ["plancha_fabricante", "plancha_espesor", "plancha_referencia"]
                }
            ]
        },
        {
            title: "Perfil de Color",
            key: "perfilColor",
            disableIfFilter: true,
            rows: [
                {
                    groups: ["perfil_nombre", "perfil_formato"],
                    rowDisplay: "display8020"
                },
                {
                    groups: ["perfil_carpeta", "perfil_tipo"]
                }
            ]
        },
        {
            title: "Curva de Plotter",
            key: "curvaPlotter",
            disableIfFilter: true,
            rows: [
                {
                    groups: ["curva_plotter_nombre", "curva_plotter_formato"],
                    rowDisplay: "display8020"
                }
            ]
        },
        {
            title: "Curva de Clichés",
            key: "curvaCliches",
            disableIfFilter: true,
            rows: [
                {
                    groups: ["estrategia_nombre", "tramado"],
                    rowDisplay: "display8020"
                },
                {
                    groups: ["curva_cliches_nombre", "curva_cliches_formato"],
                    rowDisplay: "display8020"
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "cliente_nombre",
            labelId: "cliente_nombreLabel",
            labelTitle: "Nombre",
            inputType: "text",
            inputId: "cliente_nombre",
            inputName: "cliente_nombre"
        },
        {
            htmlFor: "cliente_codigo",
            labelId: "cliente_codigoLabel",
            labelTitle: "Código",
            inputType: "text",
            inputId: "cliente_codigo",
            inputName: "cliente_codigo"
        },
        {
            htmlFor: "material_nombre",
            labelId: "material_nombreLabel",
            labelTitle: "Nombre",
            inputType: "text",
            inputId: "material_nombre",
            inputName: "material_nombre"
        },
        {
            htmlFor: "material_codigo",
            labelId: "material_codigoLabel",
            labelTitle: "Código",
            inputType: "text",
            inputId: "material_codigo",
            inputName: "material_codigo"
        },
        {
            htmlFor: "plancha_fabricante",
            labelId: "plancha_fabricanteLabel",
            labelTitle: "Fabricante Plancha",
            inputType: "text",
            inputId: "plancha_fabricante",
            inputName: "plancha_fabricante"
        },
        {
            htmlFor: "plancha_espesor",
            labelId: "plancha_espesorLabel",
            labelTitle: "Espesor Plancha",
            inputType: "text",
            inputId: "plancha_espesor",
            inputName: "plancha_espesor"
        },
        {
            htmlFor: "plancha_referencia",
            labelId: "plancha_referenciaLabel",
            labelTitle: "Referencia Plancha",
            inputType: "text",
            inputId: "plancha_referencia",
            inputName: "plancha_referencia"
        },
        {
            htmlFor: "perfil_nombre",
            labelId: "perfil_nombreLabel",
            labelTitle: "Nombre Perfil",
            inputType: "text",
            inputId: "perfil_nombre",
            inputName: "perfil_nombre"
        },
        {
            htmlFor: "perfil_formato",
            labelId: "perfil_formatoLabel",
            labelTitle: "Formato Perfil",
            inputType: "text",
            inputId: "perfil_formato",
            inputName: "perfil_formato"
        },
        {
            htmlFor: "perfil_carpeta",
            labelId: "perfil_carpetaLabel",
            labelTitle: "Carpeta",
            inputType: "text",
            inputId: "perfil_carpeta",
            inputName: "perfil_carpeta"
        },
        {
            htmlFor: "perfil_tipo",
            labelId: "perfil_tipoLabel",
            labelTitle: "Tipo Perfil",
            inputType: "text",
            inputId: "perfil_tipo",
            inputName: "perfil_tipo"
        },
        {
            htmlFor: "curva_plotter_nombre",
            labelId: "curva_plotter_nombreLabel",
            labelTitle: "Nombre Curva",
            inputType: "text",
            inputId: "curva_plotter_nombre",
            inputName: "curva_plotter_nombre"
        },
        {
            htmlFor: "curva_plotter_formato",
            labelId: "curva_plotter_formatoLabel",
            labelTitle: "Formato Curva",
            inputType: "text",
            inputId: "curva_plotter_formato",
            inputName: "curva_plotter_formato"
        },
        {
            htmlFor: "estrategia_nombre",
            labelId: "estrategia_nombreLabel",
            labelTitle: "Nombre Estrategia PWC",
            inputType: "text",
            inputId: "estrategia_nombre",
            inputName: "estrategia_nombre"
        },
        {
            htmlFor: "tramado",
            labelId: "tramadoLabel",
            labelTitle: "Tramado",
            inputType: "text",
            inputId: "tramado",
            inputName: "tramado"
        },
        {
            htmlFor: "curva_cliches_nombre",
            labelId: "curva_cliches_nombreLabel",
            labelTitle: "Nombre Curva",
            inputType: "text",
            inputId: "curva_cliches_nombre",
            inputName: "curva_cliches_nombre"
        },
        {
            htmlFor: "curva_cliches_formato",
            labelId: "curva_cliches_formatoLabel",
            labelTitle: "Formato Curva",
            inputType: "text",
            inputId: "curva_cliches_formato",
            inputName: "curva_cliches_formato"
        }
    ]
}

export const metodosImpresionFormData = {
    headerIcon: <MontajeSvg />,
    headerTitle: "CONFIGURAR PLANCHAS",
    formSections: [
        {
            rows: []
        }
    ],
    formFields: []
}

export const xmlFormData = {
    headerIcon: <BsFiletypeXml />,
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

export const docFormData = {
    headerIcon: <BsFiletypeDoc />,
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

export const emailFormData = {
    headerIcon: <PiEnvelopeLight />,
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

export const gmgFormData = {
    headerTitle: "TAREA GMG",
    headerIcon: <Plotter />,
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

export const noteFormData = {
    headerIcon: <PiNoteLight />,
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

export const clientConfigFormData = {
    headerIcon: <PiGear />,
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
        }
    ]
}

export const clientFormData = {
    headerIcon: <SlBriefcase />,
    headerTitle: "NUEVO CLIENTE",
    editTitle: "EDITAR CLIENTE",
    formSections: [
        {
            title: "Datos cliente",
            rows: [
                {
                    groups: [
                        "company"
                    ]
                },
                {
                    groups: [
                        "code",
                        "phone"
                    ]
                },
                {
                    groups: [
                        "name"
                    ]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "name",
            labelId: "nameLabel",
            labelTitle: "Nombre",
            inputType: "text",
            inputId: "name",
            inputName: "name",
            required: true
        },
        {
            htmlFor: "code",
            labelId: "codeLabel",
            labelTitle: "Código",
            inputType: "text",
            inputId: "code",
            inputName: "code"
        },
        {
            htmlFor: "company",
            labelId: "companyLabel",
            labelTitle: "Compañía",
            inputType: "text",
            inputId: "company",
            inputName: "company"
        },
        {
            htmlFor: "phone",
            labelId: "phoneLabel",
            labelTitle: "Teléfono",
            inputType: "tel",
            inputId: "phone",
            inputName: "phone"
        }
    ]
};

export const userFormData = {
    headerIcon: <FaUserCircle style={{ fill: 'white' }} />,
    headerTitle: "NUEVO USUARIO",
    editTitle: "EDITAR USUARIO",
    formSections: [
        {
            rows: [
                {
                    groups: [
                        "role",
                        "departments",
                        "responsibleDepartments"
                    ]
                }
            ]
        },
        {
            title: "Datos personales",
            rows: [
                {
                    groups: [
                        "name",
                        "lastname"
                    ]
                }
            ]
        },
        {
            title: "Datos de usuario",
            rows: [
                {
                    groups: [
                        "username",
                        "email",
                        "password"
                    ]
                },
            ]
        },
    ],
    formFields: [
        {
            htmlFor: "username",
            labelId: "usernameLabel",
            labelTitle: "Usuario",
            inputType: "text",
            inputId: "username",
            inputName: "username",
            required: true
        },
        {
            htmlFor: "name",
            labelId: "nameLabel",
            labelTitle: "Nombre",
            inputType: "text",
            inputId: "name",
            inputName: "name",
            required: true
        },
        {
            htmlFor: "lastname",
            labelId: "lastnameLabel",
            labelTitle: "Apellidos",
            inputType: "text",
            inputId: "lastname",
            inputName: "lastname",
            required: true
        },
        {
            htmlFor: "role",
            labelId: "roleLabel",
            labelTitle: "Rol",
            select: "simple",
            options: [
                "Operario",
                "Administrador",
                "Manager",
                "Especialista",
                "Soporte"
            ],
            inputId: "role",
            inputName: "role"
        },
        {
            htmlFor: "departments",
            labelId: "departmentLabel",
            labelTitle: "Departamento/s",
            select: "multiple",
            options: [
                "Oficina",
                "Dibujo",
                "Solido",
                "Liquido",
                "Montaje",
                "Expediciones",
                "Tecnico"
            ],
            inputId: "departments",
            inputName: "departments"
        },
        {
            htmlFor: "responsibleDepartments",
            labelId: "responsibleDepartmentsLabel",
            labelTitle: "Responsable de",
            select: "multiple",
            options: [
                "Oficina",
                "Dibujo",
                "Solido",
                "Liquido",
                "Montaje",
                "Expediciones",
                "Tecnico"
            ],
            inputId: "responsibleDepartments",
            inputName: "responsibleDepartments"
        },
        {
            htmlFor: "email",
            labelId: "emailLabel",
            labelTitle: "Email",
            inputType: "email",
            inputId: "email",
            inputName: "email",
            required: true
        },
        {
            htmlFor: "password",
            labelId: "passwordLabel",
            labelTitle: "Contraseña",
            inputType: "password",
            inputId: "password",
            inputName: "password",
            required: true,
            minLength: 4
        }
    ]
};

export const groupFormData = {
    headerIcon: <GroupsSvg />,
    headerTitle: "NUEVO GRUPO",
    editTitle: "EDITAR GRUPO",
    formSections: [
        {
            title: "Datos de cliente",
            disableIfFilter: true,
            rows: [
                {
                    groups: [
                        "cliente_nombre",
                        "cliente_codigo"
                    ],
                    rowDisplay: "display8020"
                }
            ]
        },
        {
            title: "Datos de grupo",
            rows: [
                {
                    groups: [
                        "grupo",
                    ]
                },
                {
                    groups: [
                        "ids",
                    ]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "cliente_nombre",
            labelId: "cliente_nombre",
            labelTitle: "Nombre de cliente",
            select: "simple",
            options: [],
            inputId: "cliente_nombre",
            inputName: "cliente_nombre",
            required: true
        },
        {
            htmlFor: "cliente_codigo",
            labelId: "cliente_codigo",
            labelTitle: "Código de cliente",
            select: "simple",
            options: [],
            inputId: "cliente_codigo",
            inputName: "cliente_codigo",
            required: true
        },
        {
            htmlFor: "grupo",
            labelId: "grupo",
            labelTitle: "Nombre del grupo",
            inputType: "text",
            inputId: "grupo",
            inputName: "grupo"
        },
        {
            htmlFor: "ids",
            labelId: "ids",
            labelTitle: "Contactos",
            select: "multiple",
            options: [],
            inputId: "ids",
            inputName: "ids",
            minLength: 1,
            required: true
        },
    ]
};

export const contactFormData = {
    headerIcon: <TiContacts />,
    headerTitle: "NUEVO CONTACTO",
    editTitle: "EDITAR CONTACTO",
    formSections: [
        {
            title: "Cliente",
            disableIfFilter: true,
            rows: [
                {
                    groups: [
                        "cliente_nombre",
                        "cliente_codigo"
                    ],
                    rowDisplay: "display8020"
                },
            ]
        },
        {
            title: "Contacto",
            rows: [
                {
                    groups: [
                        "contacto",
                        "telefono"
                    ],
                    rowDisplay: "display8020"
                },
                {
                    groups: [
                        "email",
                        "departamento"
                    ],
                },
                {
                    groups: [
                        "observaciones"
                    ],
                },

            ]
        }
    ],

    formFields: [
        {
            htmlFor: "contacto",
            labelId: "contacto",
            labelTitle: "Nombre",
            inputType: "text",
            inputId: "contacto",
            inputName: "contacto",
            required: true
        },
        {
            htmlFor: "cliente_nombre",
            labelId: "cliente_nombre",
            labelTitle: "Nombre",
            select: "simple",
            options: [],
            inputId: "cliente_nombre",
            inputName: "cliente_nombre",
            required: true
        },
        {
            htmlFor: "cliente_codigo",
            labelId: "cliente_codigo",
            labelTitle: "Código",
            select: "simple",
            options: [],
            inputId: "cliente_codigo",
            inputName: "cliente_codigo",
            required: true
        },
        {
            htmlFor: "departamento",
            labelId: "departamento",
            labelTitle: "Departamento",
            inputType: "text",
            inputId: "departamento",
            inputName: "departamento",
        },
        {
            htmlFor: "email",
            labelId: "emailLabel",
            labelTitle: "Email",
            inputType: "email",
            inputId: "email",
            inputName: "email",
            required: true
        },
        {
            htmlFor: "telefono",
            labelId: "telefono",
            labelTitle: "Teléfono",
            inputType: "tel",
            inputId: "telefono",
            inputName: "telefono"
        },
        {
            htmlFor: "observaciones",
            labelId: "observaciones",
            labelTitle: "Observaciones",
            inputId: "observaciones",
            inputName: "observaciones",
            textarea: true
        }
    ]
}