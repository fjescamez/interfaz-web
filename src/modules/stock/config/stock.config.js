export const addOrderTableInfo = {
    tableName: "addOrder",
    endPoint: "stockProducts",
    headerIcon: "box",
    headerTitle: "CREAR ORDEN DE COMPRA",
    tableColumns: [
        {
            header: "Código",
            active: true,
            key: "codigo"
        },
        {
            header: "Nombre",
            active: true,
            key: "nombre"
        },
        {
            header: "Categoría",
            active: true,
            key: "categoria_nombre"
        },
        {
            header: "Departamento",
            active: true,
            key: "departamento_nombre"
        },
        {
            header: "Cantidad",
            active: true,
            key: "cantidad"
        }
    ]
}

export const categoriasStockTableInfo = {
    tableName: "categoriasStock",
    endPoint: "stockCategories",
    headerIcon: "box",
    headerTitle: "CATEGORÍAS DE PRODUCTOS",
    tableForm: "CategoriaStockForm",
    tableColumns: [
        {
            header: "Nombre",
            active: true,
            key: "nombre"
        },
        {
            header: "Descripción",
            active: true,
            key: "descripcion"
        }
    ]
};

export const productosStockTableInfo = {
    tableName: "productosStock",
    endPoint: "stockProducts",
    headerIcon: "box",
    headerTitle: "PRODUCTOS",
    tableForm: "ProductoStockForm",
    tableColumns: [
        {
            header: "Código",
            active: true,
            key: "codigo"
        },
        {
            header: "Nombre",
            active: true,
            key: "nombre"
        },
        {
            header: "Categoría",
            active: true,
            key: "categoria_nombre"
        },
        {
            header: "Departamento",
            active: true,
            key: "departamento_nombre"
        },
        {
            header: "Cantidad",
            active: true,
            key: "cantidad"
        }
    ],
    actions: [
        {
            title: "Descontar",
            action: "descontar"
        },
        {
            title: "Incidencia",
            action: "incidencia"
        }
    ]
};

export const categoriasStockFormData = {
    headerIcon: "box",
    headerTitle: "AÑADIR CATEGORÍA DE PRODUCTO",
    editTitle: "EDITAR CATEGORÍA DE PRODUCTO",
    formSections: [
        {
            rows: [
                {
                    groups: ["nombre"]
                },
                {
                    groups: ["descripcion"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "nombre",
            labelId: "nombreLabel",
            labelTitle: "Nombre",
            inputType: "text",
            inputId: "nombre",
            inputName: "nombre",
            required: true
        },
        {
            htmlFor: "descripcion",
            labelId: "descripcionLabel",
            labelTitle: "Descripción",
            textarea: true,
            inputId: "descripcion",
            inputName: "descripcion",
            required: true
        }
    ]
}

export const descontarProductoFormData = {
    headerIcon: "FaBoxOpen",
    headerTitle: "DESCONTAR STOCK",
    formSections: [
        {
            rows: [
                {
                    groups: ["producto"]
                },
                {
                    groups: ["estado_nombre", "departamento_nombre"]
                },
                {
                    groups: ["stock_min", "cantidad"]
                },
                {
                    groups: ["descontar"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "producto",
            labelId: "productoLabel",
            labelTitle: "Producto",
            inputType: "text",
            inputId: "producto",
            inputName: "producto",
            required: true,
            disableField: true
        },
        {
            htmlFor: "estado_nombre",
            labelId: "estado_nombreLabel",
            labelTitle: "Estado",
            inputType: "text",
            inputId: "estado_nombre",
            inputName: "estado_nombre",
            required: true,
            disableField: true
        },
        {
            htmlFor: "departamento_nombre",
            labelId: "departamento_nombreLabel",
            labelTitle: "Departamento",
            select: "simple",
            options: [],
            inputId: "departamento_nombre",
            inputName: "departamento_nombre",
            required: true,
            disableField: true
        },
        {
            htmlFor: "stock_min",
            labelId: "stock_minLabel",
            labelTitle: "Stock Mínimo",
            inputType: "number",
            inputId: "stock_min",
            inputName: "stock_min",
            disableField: true
        },
        {
            htmlFor: "cantidad",
            labelId: "cantidadLabel",
            labelTitle: "Stock Actual",
            inputType: "number",
            inputId: "cantidad",
            inputName: "cantidad",
            required: true,
            disableField: true
        },
        {
            htmlFor: "descontar",
            labelId: "descontarLabel",
            labelTitle: "Descontar",
            inputType: "number",
            minNumber: 0,
            inputId: "descontar",
            inputName: "descontar",
            required: true
        },
    ]
};

export const incidenciaProductoFormData = {
    headerIcon: "box",
    headerTitle: "NUEVA INCIDENCIA DE PRODUCTO",
    formSections: [
        {
            rows: [
                {
                    groups: ["solicitante"]
                },
                {
                    groups: ["producto", "estado"]
                },
                {
                    groups: ["descripcion"]
                },
                {
                    groups: ["observaciones"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "solicitante",
            labelId: "solicitanteLabel",
            labelTitle: "Solicitante",
            inputType: "text",
            inputId: "solicitante",
            inputName: "solicitante",
            disableField: true
        },
        {
            htmlFor: "producto",
            labelId: "productoLabel",
            labelTitle: "Producto",
            inputType: "text",
            inputId: "producto",
            inputName: "producto",
            disableField: true
        },
        {
            htmlFor: "estado",
            labelId: "estadoLabel",
            labelTitle: "Estado",
            select: "simple",
            options: [],
            inputId: "estado",
            inputName: "estado",
            required: true
        },
        {
            htmlFor: "descripcion",
            labelId: "descripcionLabel",
            labelTitle: "Descripción",
            inputType: "text",
            inputId: "descripcion",
            inputName: "descripcion",
            required: true
        },
        {
            htmlFor: "observaciones",
            labelId: "observacionesLabel",
            labelTitle: "Observaciones",
            textarea: true,
            inputId: "observaciones",
            inputName: "observaciones",
            required: true
        }
    ]
}

export const notificacionesStockTableInfo = {
    tableName: "notificacionesStock",
    endPoint: "stockProducts/notifications",
    headerIcon: "box",
    headerTitle: "NOTIFICACIONES",
    tableColumns: [
        {
            header: "Categoría",
            active: true,
            key: "categoria_nombre"
        },
        {
            header: "Producto",
            active: true,
            key: "nombre"
        },
        {
            header: "Departamento",
            active: true,
            key: "departamento_nombre"
        },
        {
            header: "Stock Mínimo",
            active: true,
            key: "stock_min"
        },
        {
            header: "Stock Actual",
            active: true,
            key: "cantidad"
        }
    ]
}

export const ordenesFormData = {
    headerIcon: "box",
    headerTitle: "NUEVA ORDEN DE COMPRA",
    formSections: [
        {
            rows: [
                {
                    groups: ["solicitante", "departamento"]
                },
                {
                    groups: ["producto"]
                },
                {
                    groups: ["cantidad_solicitada"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "solicitante",
            labelId: "solicitanteLabel",
            labelTitle: "Solicitante",
            inputType: "text",
            inputId: "solicitante",
            inputName: "solicitante",
            required: true,
            disableField: true
        },
        {
            htmlFor: "departamento",
            labelId: "departamentoLabel",
            labelTitle: "Departamento",
            inputType: "text",
            inputId: "departamento",
            inputName: "departamento",
            required: true,
            disableField: true
        },
        {
            htmlFor: "producto",
            labelId: "productoLabel",
            labelTitle: "Producto",
            inputType: "text",
            inputId: "producto",
            inputName: "producto",
            required: true,
            disableField: true
        },
        {
            htmlFor: "cantidad_solicitada",
            labelId: "cantidad_solicitadaLabel",
            labelTitle: "Cantidad",
            inputType: "number",
            minNumber: 0,
            noDecimals: true,
            inputId: "cantidad_solicitada",
            inputName: "cantidad_solicitada",
            required: true
        },
    ]
}

export const ordenesCompraTableInfo = {
    tableName: "ordenesCompra",
    endPoint: "stockOrdenes",
    headerIcon: "box",
    headerTitle: "ÓRDENES DE COMPRA",
    tableColumns: [
        {
            header: "Código",
            active: true,
            key: "codigo"
        },
        {
            header: "Solicitante",
            active: true,
            key: "usuario_nombre"
        },
        {
            header: "Fecha",
            active: true,
            key: "fecha"
        },
        {
            header: "Producto",
            active: true,
            key: "producto_nombre"
        },
        {
            header: "Referencia",
            active: true,
            key: "producto_codigo"
        },
        {
            header: "Uds. Solicitadas",
            active: true,
            key: "cantidad_solicitada"
        },
        {
            header: "Uds. Pendientes",
            active: true,
            key: "cantidad_pendiente"
        },
        {
            header: "Estado",
            active: true,
            key: "estado_nombre"
        }
    ],
    actions: [
        {
            title: "Añadir",
            action: "addOrder",
            noCheck: true
        }
    ]
}

export const productosStockFormData = {
    headerIcon: "box",
    headerTitle: "AÑADIR PRODUCTO DE STOCK",
    editTitle: "EDITAR PRODUCTO DE STOCK",
    formSections: [
        {
            rows: [
                {
                    groups: ["nombre"]
                },
                {
                    groups: ["categoria"]
                },
                {
                    groups: ["departamento"]
                },
                {
                    groups: ["stock_min", "cantidad"]
                }
            ]
        }
    ],
    formFields: [
        {
            htmlFor: "nombre",
            labelId: "nombreLabel",
            labelTitle: "Nombre",
            inputType: "text",
            inputId: "nombre",
            inputName: "nombre",
            required: true
        },
        {
            htmlFor: "categoria",
            labelId: "categoriaLabel",
            labelTitle: "Categoría",
            select: "simple",
            options: [],
            inputId: "categoria",
            inputName: "categoria",
            required: true
        },
        {
            htmlFor: "departamento",
            labelId: "departamentoLabel",
            labelTitle: "Departamento",
            select: "simple",
            options: [],
            inputId: "departamento",
            inputName: "departamento",
            required: true
        },
        {
            htmlFor: "stock_min",
            labelId: "stock_minLabel",
            labelTitle: "Stock Min",
            inputType: "number",
            minNumber: 0,
            inputId: "stock_min",
            inputName: "stock_min",
            required: true
        },
        {
            htmlFor: "cantidad",
            labelId: "cantidadLabel",
            labelTitle: "Cantidad",
            inputType: "number",
            minNumber: 0,
            inputId: "cantidad",
            inputName: "cantidad",
            required: true
        },
    ]
}

export const registroTableInfo = {
    tableName: "registro",
    endPoint: "register",
    headerIcon: "box",
    headerTitle: "REGISTRO DE ACCIONES",
    tableColumns: [
        {
            header: "Usuario",
            active: true,
            key: "usuario_nombre"
        },
        {
            header: "Fecha",
            active: true,
            key: "fecha"
        },
        {
            header: "Acción",
            active: true,
            key: "descripcion"
        },
        {
            header: "Dpto.",
            active: true,
            key: "departamento_nombre"
        },
    ]
}