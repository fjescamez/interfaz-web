import { FaUserCircle } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import { PiEnvelopeLight, PiNoteLight } from "react-icons/pi";
import { SlBriefcase } from "react-icons/sl";
import GroupsSvg from "../assets/svg/GroupsSvg";

export const emailFormData = {
    headerIcon: <PiEnvelopeLight />,
    headerTitle: "EMAIL",
    formSections: [
        {
            title: "",
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
    headerTitle: "noFormContainer",
    formSections: [
        {
            title: "",
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
            title: "",
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

export const ripFormData = {
    headerTitle: "noFormContainer",
    formSections: [
        {
            title: "",
            rows: [
                {
                    groups: [
                        "impresion",
                        "curva",
                        "resolucion"
                    ]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "impresion",
            labelId: "impresionLabel",
            labelTitle: "Tipo de impresión",
            select: "simple",
            options: [
                "Interior",
                "Exterior"
            ],
            inputId: "impresion",
            inputName: "impresion"
        },
        {
            htmlFor: "curva",
            labelId: "curvaLabel",
            labelTitle: "Curva",
            select: "simple",
            options: [
                "Lineal"
            ],
            inputId: "curva",
            inputName: "curva"
        },
        {
            htmlFor: "resolucion",
            labelId: "resolucionLabel",
            labelTitle: "Resolución",
            select: "simple",
            options: [
                "4000",
                "2400"
            ],
            inputId: "resolucion",
            inputName: "resolucion"
        },
    ]
}

export const noteFormData = {
    headerIcon: <PiNoteLight />,
    headerTitle: "NUEVA NOTA",
    editTitle: "EDITAR NOTA",
    formSections: [
        {
            title: "",
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