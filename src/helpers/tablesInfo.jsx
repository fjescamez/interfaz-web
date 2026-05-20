
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


