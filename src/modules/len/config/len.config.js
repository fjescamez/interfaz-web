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