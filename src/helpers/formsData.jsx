import { FaUserCircle } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import { PiEnvelopeLight, PiNoteLight } from "react-icons/pi";
import { BsFiletypeDoc, BsFiletypeXml } from "react-icons/bs";
import { SlBriefcase } from "react-icons/sl";
import { TbColorSwatch } from "react-icons/tb";
import GroupsSvg from "../assets/svg/GroupsSvg";
import Plotter from "../assets/svg/Plotter";
import MontajeSvg from "../assets/svg/MontajeSvg";

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
    formSections: [
        {
            title: "Cliente",
            rows: [
                {
                    groups: ["cliente_nombre", "cliente_codigo"],
                    rowDisplay: "display8020"
                }
            ]
        },
        {
            title: "Material",
            rows: [
                {
                    groups: ["material_nombre", "material_codigo"],
                    rowDisplay: "display8020"
                }
            ]
        },
        {
            title: "Plancha",
            rows: [
                {
                    groups: ["plancha_fabricante", "plancha_espesor", "plancha_referencia"]
                }
            ]
        },
        {
            title: "Perfil de Color",
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
            rows: [
                {
                    groups: ["curva_plotter_nombre", "curva_plotter_formato"],
                    rowDisplay: "display8020"
                }
            ]
        },
        {
            title: "Curva de Clichés",
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
            inputName: "cliente_nombre",
            disableField: true
        },
        {
            htmlFor: "cliente_codigo",
            labelId: "cliente_codigoLabel",
            labelTitle: "Código",
            inputType: "text",
            inputId: "cliente_codigo",
            inputName: "cliente_codigo",
            disableField: true
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
                        "paradaFreecut"
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
        },
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
        {
            rows: [
                {
                    groups: [
                        "role",
                        "departments"
                    ]
                }
            ]
        }
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
                "Sólido",
                "Líquido",
                "Montaje",
                "Expediciones",
                "Técnico"
            ],
            inputId: "departments",
            inputName: "departments"
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