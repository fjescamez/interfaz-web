export const contactTableInfo = {
    tableName: "contactos",
    endPoint: "contacts",
    headerIcon: "contacts",
    headerTitle: "CONTACTOS",
    tableForm: "ContactForm",
    tableColumns: [
        {
            header: "Nombre",
            active: true,
            key: "contacto"
        },
        {
            header: "Código Cliente",
            active: false,
            key: "cliente_codigo"
        },
        {
            header: "Departamento",
            active: false,
            key: "departamento"
        },
        {
            header: "Email",
            active: true,
            key: "email"
        },
        {
            header: "Teléfono",
            active: true,
            key: "telefono"
        }
    ],
    actions: [
        {
            title: "Eliminar",
            action: "eliminar"
        },
        {
            title: "Crear grupo",
            action: "crearGrupo"
        }
    ]
};

export const contactFormData = {
    headerIcon: "contacts",
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

export const groupFormData = {
    headerIcon: "groups",
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

export const groupTableInfo = {
    endPoint: "groups",
    tableName: "grupos",
    headerIcon: "groups",
    headerTitle: "GRUPOS",
    tableForm: "GroupForm",
    tableColumns: [
        {
            header: "Nombre grupo",
            active: true,
            key: "grupo"
        },
        {
            header: "Cliente Código",
            active: true,
            key: "cliente_codigo"
        },
        {
            header: "Cliente Nombre",
            active: true,
            key: "cliente_nombre"
        },
        {
            header: "Contactos",
            active: true,
            key: "contactNames"
        },
        {
            header: "Emails",
            active: true,
            key: "contactEmails"
        }
    ],
    actions: [
        {
            title: "Eliminar",
            action: "eliminar"
        },
    ]
};