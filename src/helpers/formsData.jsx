import { FaUserCircle } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import { PiEnvelopeLight, PiNoteLight } from "react-icons/pi";
import { BsFiletypeDoc, BsFiletypeXml } from "react-icons/bs";
import { SlBriefcase } from "react-icons/sl";
import GroupsSvg from "../assets/svg/GroupsSvg";
import Plotter from "../assets/svg/Plotter";
import MontajeSvg from "../assets/svg/MontajeSvg";

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
                        "tipoUnitario"
                    ]
                },
                {
                    groups: [
                        "trapping"
                    ]
                },
                {
                    groups: [
                        "separaciones"
                    ]
                },
                {
                    groups: [
                        "montaje"
                    ]
                },
                {
                    groups: [
                        "compararUnitario"
                    ]
                },
                {
                    groups: [
                        "eliminarTintas"
                    ]
                },
                {
                    groups: [
                        "bocetoRasterizado"
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
            htmlFor: "tipoUnitario",
            labelId: "tipoUnitarioLabel",
            labelTitle: "Unitario",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "illustrator",
                    labelId: "illustratorLabel",
                    labelTitle: "Illustrator",
                    inputId: "illustrator",
                    inputName: "tipoUnitario"
                },
                {
                    htmlFor: "artPro",
                    labelId: "artProLabel",
                    labelTitle: "ArtPro+",
                    inputId: "artPro",
                    inputName: "tipoUnitario"
                },
            ],
            inputId: "tipoUnitario",
            inputName: "tipoUnitario"
        },
        {
            htmlFor: "trapping",
            labelId: "trappingLabel",
            labelTitle: "Trapping/Preimpresión",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "siAuto",
                    labelId: "siAutoLabel",
                    labelTitle: "Automático",
                    inputId: "siAuto",
                    inputName: "trapping"
                },
                {
                    htmlFor: "siManual",
                    labelId: "siManualLabel",
                    labelTitle: "Manual",
                    inputId: "siManual",
                    inputName: "trapping"
                },
                {
                    htmlFor: "noTrapping",
                    labelId: "noTrappingLabel",
                    labelTitle: "No",
                    inputId: "noTrapping",
                    inputName: "trapping"
                },
            ],
            inputId: "trapping",
            inputName: "trapping"
        },
        {
            htmlFor: "separaciones",
            labelId: "separacionesLabel",
            labelTitle: "Hacer Separaciones",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "siSeparaciones",
                    labelId: "siSeparacionesLabel",
                    labelTitle: "Sí",
                    inputId: "siSeparaciones",
                    inputName: "separaciones"
                },
                {
                    htmlFor: "noSeparaciones",
                    labelId: "noSeparacionesLabel",
                    labelTitle: "No",
                    inputId: "noSeparaciones",
                    inputName: "separaciones"
                },
            ],
            inputId: "separaciones",
            inputName: "separaciones"
        },
        {
            htmlFor: "montaje",
            labelId: "montajeLabel",
            labelTitle: "Hacer Montaje",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "nuevo",
                    labelId: "nuevoLabel",
                    labelTitle: "Nuevo",
                    inputId: "nuevo",
                    inputName: "montaje"
                },
                {
                    htmlFor: "especial",
                    labelId: "especialLabel",
                    labelTitle: "Especial",
                    inputId: "especial",
                    inputName: "montaje"
                },
                {
                    htmlFor: "noMontaje",
                    labelId: "noMontajeLabel",
                    labelTitle: "No",
                    inputId: "noMontaje",
                    inputName: "montaje"
                },
            ],
            inputId: "montaje",
            inputName: "montaje"
        },
        {
            htmlFor: "compararUnitario",
            labelId: "compararUnitarioLabel",
            labelTitle: "Comparar Unitario",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "siComparar",
                    labelId: "siCompararLabel",
                    labelTitle: "Sí",
                    inputId: "siComparar",
                    inputName: "compararUnitario"
                },
                {
                    htmlFor: "noComparar",
                    labelId: "noCompararLabel",
                    labelTitle: "No",
                    inputId: "noComparar",
                    inputName: "compararUnitario"
                },
            ],
            inputId: "compararUnitario",
            inputName: "compararUnitario"
        },
        {
            htmlFor: "eliminarTintas",
            labelId: "eliminarTintasLabel",
            labelTitle: "Eliminar tintas sin uso",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "siEliminar",
                    labelId: "siEliminarLabel",
                    labelTitle: "Sí",
                    inputId: "siEliminar",
                    inputName: "eliminarTintas"
                },
                {
                    htmlFor: "noEliminar",
                    labelId: "noEliminarLabel",
                    labelTitle: "No",
                    inputId: "noEliminar",
                    inputName: "eliminarTintas"
                },
            ],
            inputId: "eliminarTintas",
            inputName: "eliminarTintas"
        },
        {
            htmlFor: "bocetoRasterizado",
            labelId: "bocetoRasterizadoLabel",
            labelTitle: "Boceto Rasterizado",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "siBoceto",
                    labelId: "siBocetoLabel",
                    labelTitle: "Sí",
                    inputId: "siBoceto",
                    inputName: "bocetoRasterizado"
                },
                {
                    htmlFor: "noBoceto",
                    labelId: "noBocetoLabel",
                    labelTitle: "No",
                    inputId: "noBoceto",
                    inputName: "bocetoRasterizado"
                },
            ],
            inputId: "bocetoRasterizado",
            inputName: "bocetoRasterizado"
        },
        {
            htmlFor: "paradaFreecut",
            labelId: "paradaFreecutLabel",
            labelTitle: "Parada Freecut",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "siParada",
                    labelId: "siParadaLabel",
                    labelTitle: "Sí",
                    inputId: "siParada",
                    inputName: "paradaFreecut"
                },
                {
                    htmlFor: "noParada",
                    labelId: "noParadaLabel",
                    labelTitle: "No",
                    inputId: "noParada",
                    inputName: "paradaFreecut"
                },
            ],
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
                        "tipoUnitario"
                    ]
                },
                {
                    groups: [
                        "fichaBoceto"
                    ]
                },
                {
                    groups: [
                        "fichaImpresion"
                    ]
                },
                {
                    groups: [
                        "plotter"
                    ]
                },
                {
                    groups: [
                        "montaje"
                    ]
                },
                {
                    groups: [
                        "montajeEspecial"
                    ]
                },
                {
                    groups: [
                        "separaciones"
                    ]
                },
                {
                    groups: [
                        "etiquetasMontaje"
                    ]
                },
                {
                    groups: [
                        "certificado"
                    ]
                },
                {
                    groups: [
                        "certificadoContinuos"
                    ]
                },
                {
                    groups: [
                        "etiquetasPlotter"
                    ]
                },
                {
                    groups: [
                        "certificadoCodigos"
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
            htmlFor: "tipoUnitario",
            labelId: "tipoUnitarioLabel",
            labelTitle: "Unitario",
            inputType: "radioGroup",
            radioButtons: [
                {
                    htmlFor: "illustrator",
                    labelId: "illustratorLabel",
                    labelTitle: "Illustrator",
                    inputId: "illustrator",
                    inputName: "tipoUnitario"
                },
                {
                    htmlFor: "artPro",
                    labelId: "artProLabel",
                    labelTitle: "ArtPro+",
                    inputId: "artPro",
                    inputName: "tipoUnitario"
                },
            ],
            inputId: "tipoUnitario",
            inputName: "tipoUnitario"
        },
        {
            htmlFor: "fichaBoceto",
            labelId: "fichaBocetoLabel",
            labelTitle: "Ficha Boceto",
            inputType: "checkbox",
            inputId: "fichaBoceto",
            inputName: "fichaBoceto"
        },
        {
            htmlFor: "fichaImpresion",
            labelId: "fichaImpresionLabel",
            labelTitle: "Ficha Impresión",
            inputType: "checkbox",
            inputId: "fichaImpresion",
            inputName: "fichaImpresion"
        },
        {
            htmlFor: "plotter",
            labelId: "plotterLabel",
            labelTitle: "Plotter",
            inputType: "checkbox",
            inputId: "plotter",
            inputName: "plotter"
        },
        {
            htmlFor: "montaje",
            labelId: "montajeLabel",
            labelTitle: "Montaje",
            inputType: "checkbox",
            inputId: "montaje",
            inputName: "montaje"
        },
        {
            htmlFor: "montajeEspecial",
            labelId: "montajeEspecialLabel",
            labelTitle: "Montaje Especial",
            inputType: "checkbox",
            inputId: "montajeEspecial",
            inputName: "montajeEspecial"
        },
        {
            htmlFor: "separaciones",
            labelId: "separacionesLabel",
            labelTitle: "Hacer Separaciones",
            inputType: "checkbox",
            inputId: "separaciones",
            inputName: "separaciones"
        },
        {
            htmlFor: "etiquetasMontaje",
            labelId: "etiquetasMontajeLabel",
            labelTitle: "Etiquetas de Montaje",
            inputType: "checkbox",
            inputId: "etiquetasMontaje",
            inputName: "etiquetasMontaje"
        },
        {
            htmlFor: "certificado",
            labelId: "certificadoLabel",
            labelTitle: "Certificado",
            inputType: "checkbox",
            inputId: "certificado",
            inputName: "certificado"
        },
        {
            htmlFor: "certificadoContinuos",
            labelId: "certificadoContinuosLabel",
            labelTitle: "Certificado Continuos",
            inputType: "checkbox",
            inputId: "certificadoContinuos",
            inputName: "certificadoContinuos"
        },
        {
            htmlFor: "etiquetasPlotter",
            labelId: "etiquetasPlotterLabel",
            labelTitle: "Etiquetas Plotter",
            inputType: "checkbox",
            inputId: "etiquetasPlotter",
            inputName: "etiquetasPlotter"
        },
        {
            htmlFor: "certificadoCodigos",
            labelId: "certificadoCodigosLabel",
            labelTitle: "Certificado Códigos",
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
            select: "multiple",
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
            title: "Rol Dpto.",
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
                "Administrador",
                "Manager",
                "Especialista",
                "Operario"
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