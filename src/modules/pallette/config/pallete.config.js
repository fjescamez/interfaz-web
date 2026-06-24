export const palleteTableInfo = {
    tableName: "paleta",
    endPoint: "contacts",
    headerIcon: "pallete",
    headerTitle: "PALETA DE COLOR",
    tableForm: "PalleteForm",
    searchFields: ["description", "modifiedBy", "modifiedIn", "observations"],
    tableColumns: [
        {
            header: "Descripcion",
            active: true,
            key: "description"
        },
        {
            header: "Delta",
            active: true,
            key: "delta"
        },
        {
            header: "L",
            active: true,
            key: "l_value"
        },
        {
            header: "A",
            active: true,
            key: "a_value"
        },
        {
            header: "B",
            active: true,
            key: "b_value"
        },
        {
            header: "Modificado por",
            active: true,
            key: "modifiedBy"
        },
        {
            header: "Modificado en",
            active: true,
            key: "modifiedIn"
        },
        {
            header: "Observaciones",
            active: false,
            key: "observations"
        },
    ],
    actions: [
        {
            title: "Eliminar",
            action: "eliminar"
        }
    ]
};

export const collection = "paleta_colores";

export const palleteFormData = {
    headerIcon: "pallete",
    headerTitle: "NUEVO COLOR",
    editTitle: "EDITAR COLOR",
    formSections: [

        {
            title: "Valores del Color",
            rows: [
                {
                    groups: [
                        "description",
                        "delta"
                    ],
                },
                {
                    groups: [
                        "l_value",
                        "a_value",
                        "b_value",
                    ],
                },
                {
                    groups: [
                        "modifiedBy",
                        "modifiedIn",
                    ],
                },
                {
                    groups: [
                        "observations"
                    ],
                },
            ]
        }
    ],

    formFields: [
        {
            htmlFor: "description",
            labelId: "description",
            labelTitle: "Descripcion",
            inputType: "text",
            inputId: "description",
            inputName: "description",
            required: true
        },
        {
            htmlFor: "delta",
            labelId: "delta",
            labelTitle: "Delta",
            inputType: "text",
            inputId: "delta",
            inputName: "delta",
        },
        {
            htmlFor: "l_value",
            labelId: "l_value",
            labelTitle: "L",
            inputType: "text",
            inputId: "l_value",
            inputName: "l_value",
        },
        {
            htmlFor: "a_value",
            labelId: "a_value",
            labelTitle: "A",
            inputType: "text",
            inputId: "a_value",
            inputName: "a_value",
        },
        {
            htmlFor: "b_value",
            labelId: "b_value",
            labelTitle: "B",
            inputType: "text",
            inputId: "b_value",
            inputName: "b_value",
        },
        {
            htmlFor: "modifiedBy",
            labelId: "modifiedBy",
            labelTitle: "Modificado por",
            inputType: "text",
            disableField: true,
            inputId: "modifiedBy",
            inputName: "modifiedBy",
            hidaInCreate: true
        },
        {
            htmlFor: "modifiedIn",
            labelId: "modifiedIn",
            labelTitle: "Modificado en",
            inputType: "text",
            disableField: true,
            inputId: "modifiedIn",
            inputName: "modifiedIn",
            hidaInCreate: true
        },
        {
            htmlFor: "observations",
            labelId: "observations",
            labelTitle: "Observaciones",
            inputId: "observations",
            inputName: "observations",
            textarea: true
        }
    ]
}