export const userTableInfo = {
    endPoint: "users",
    headerIcon: "usersCircle",
    headerTitle: "USUARIOS",
    tableForm: "UserForm",
    tableColumns: [
        {
            header: "Avatar",
            active: true,
            key: "avatar"
        },
        {
            header: "Usuario",
            active: true,
            key: "username"
        },
        {
            header: "Nombre",
            active: true,
            key: "name"
        },
        {
            header: "Apellido",
            active: true,
            key: "lastname"
        },
        {
            header: "Rol",
            active: true,
            key: "role"
        },
        {
            header: "Departamentos",
            active: true,
            key: "departments"
        },
        {
            header: "Responsable de",
            active: true,
            key: "responsibleDepartments"
        },
        {
            header: "Email",
            active: true,
            key: "email"
        }
    ]
};

export const userFormData = {
    headerIcon: "usersCircle",
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
                        "password",
                        "teleWork"
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
        },
        {
            htmlFor: "teleWork",
            labelId: "teleWorkLabel",
            labelTitle: "Teletrabajo",
            inputType: "checkbox",
            inputId: "teleWork",
            inputName: "teleWork"
        }
    ]
};

export const usersDetails = {
    grid: []
};