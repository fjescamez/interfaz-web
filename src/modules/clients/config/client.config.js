export const clientTableInfo = {
    endPoint: "clients",
    headerIcon: "briefcase",
    headerTitle: "CLIENTES",
    tableColumns: [
        {
            header: "Avatar",
            active: true,
            key: "avatar"
        },
        {
            header: "Nombre comercial",
            active: true,
            key: "name"
        },
        {
            header: "Empresa",
            active: true,
            key: "company"
        },
        {
            header: "Código",
            active: true,
            key: "code"
        }
    ]
};


export const clientFormData = {
    headerIcon: "briefcase",
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


export const clientsDetails = {
    title: "Clientes",
    grid: [
        {
            icon: "document",
            title: "Pedidos",
            key: "pedidos"
        },
        {
            icon: "contacts",
            title: "Contactos",
            key: "contactos"
        },
        {
            icon: "groups",
            title: "Grupos",
            key: "grupos"
        },
        {
            icon: "palette",
            title: "Estrategias Color",
            key: "estrategias"
        },
        {
            icon: "gear",
            title: "Configuración",
            key: "configuracion"
        }
    ]
};