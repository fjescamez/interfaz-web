export const strategyFormData = {
    headerIcon: "palette",
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
                    groups: ["material", "material_codigo"],
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
            inputName: "cliente_nombre",
            required: true
        },
        {
            htmlFor: "cliente_codigo",
            labelId: "cliente_codigoLabel",
            labelTitle: "Código",
            inputType: "text",
            inputId: "cliente_codigo",
            inputName: "cliente_codigo",
            required: true
        },
        {
            htmlFor: "material",
            labelId: "materialLabel",
            labelTitle: "Nombre",
            inputType: "text",
            inputId: "material",
            inputName: "material"
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
            labelTitle: "Nombre Estrategia PCW",
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

export const strategyTableInfo = {
    endPoint: "strategies",
    tableName: "estrategias",
    headerIcon: "palette",
    headerTitle: "ESTRATEGIAS DE COLOR",
    tableForm: "StrategyForm",
    tableColumns: [
        {
            header: "Cod. Cliente",
            active: true,
            key: "cliente_codigo"
        },
        {
            header: "Cod. Estrategia",
            active: false,
            key: "codigo_estrategia"
        },
        {
            header: "Material",
            active: true,
            key: "material"
        },
        {
            header: "Cod. Material",
            active: false,
            key: "material_codigo"
        },
        {
            header: "Fabricante Plancha",
            active: true,
            key: "plancha_fabricante"
        },

        {
            header: "Espesor Plancha",
            active: true,
            key: "plancha_espesor"
        },
        {
            header: "Ref. Plancha",
            active: true,
            key: "plancha_referencia"
        },
        {
            header: "Perfil de Color",
            active: true,
            key: "perfil_nombre"
        },
        {
            header: "Perfil Tipo",
            active: false,
            key: "username"
        },
        {
            header: "Curva Plotter",
            active: false,
            key: "curvaP"
        },
        {
            header: "Curva Cliches",
            active: false,
            key: "curvaC"
        },
        {
            header: "PCW",
            active: true,
            key: "nombrePCW"
        },
        {
            header: "Tipo de Tramado",
            active: false,
            key: "tipoTramado"
        }
    ],
    actions: [
        {
            title: "Duplicar",
            action: "duplicar"
        },
        {
            title: "Eliminar",
            action: "eliminar"
        }
    ]
};