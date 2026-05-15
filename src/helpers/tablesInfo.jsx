
export const pistolaTableInfo = {
    tableName: "pistola",
    headerIcon: "MdBarcodeReader",
    headerTitle: "REGISTRO PISTOLA",
    tableColumns: [
        {
            header: "Nombre",
            active: true,
            key: "name"
        },
        {
            header: "Acción",
            active: true,
            key: "action"
        },
        {
            header: "Usuario",
            active: true,
            key: "username"
        },
        {
            header: "Fecha",
            active: true,
            key: "date"
        },
        {
            header: "Hora",
            active: true,
            key: "time"
        },
    ],
    actions: [
        {
            title: "Limpiar",
            action: "limpiar",
            noCheck: true
        }
    ]
}














export const fileTableInfo = {
    tableName: "fichas",
    endPoint: "files",
    headerIcon: "image",
    headerTitle: "FICHAS",
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
            title: "Imprimir Oficina",
            action: "impresionOfi"
        },
        {
            title: "Imprimir Dibujo",
            action: "impresionDib"
        },
        {
            title: "Imprimir Cliches",
            action: "imprimirCliches"
        },
        {
            title: "Imprimir Godex",
            action: "imprimirGodex"
        },
    ],
    deleteActions: {
        customObjects: true,
        files: true
    }
};



export const lenTableInfo = {
    endPoint: "lenFiles",
    headerIcon: "lenFile",
    headerTitle: "ARCHIVOS LEN",
    tableColumns: [
        {
            header: "Pedido",
            active: true,
            key: "id_pedido"
        },
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
            header: "Cliente",
            active: true,
            key: "cliente_nombre"
        },
        {
            header: "Cod. Cliente",
            active: true,
            key: "cliente_codigo"
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
            title: "Solicitar vista",
            action: "solicitarVista"
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

export const stockTableInfo = {
    endPoint: "products",
    headerIcon: "box",
    headerTitle: "CONTROL DE STOCK",
    tableColumns: [
        {
            header: "Cantidad",
            active: true,
            key: "cantidad"
        },
        {
            header: "Nombre",
            active: true,
            key: "nombre"
        },
        {
            header: "Código",
            active: true,
            key: "codigo"
        },
        {
            header: "Stock mínimo",
            active: true,
            key: "stock_min"
        },
        {
            header: "Barcode",
            active: true,
            key: "barcode"
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