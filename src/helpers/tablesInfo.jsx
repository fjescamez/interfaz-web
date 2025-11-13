import { FaBoxOpen, FaUserCircle, FaStamp } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import { MdOutlineEmail } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiImagesLight, PiNoteLight } from "react-icons/pi";
import { TbColorSwatch } from "react-icons/tb";
import { RiPaintFill } from "react-icons/ri";
import { BsInfoLg } from "react-icons/bs";
import { SlBriefcase } from "react-icons/sl";
import { MdBarcodeReader } from "react-icons/md";
import LenFile from "../assets/svg/LenFile";
import Plotter from "../assets/svg/Plotter";
import MontajeSvg from "../assets/svg/MontajeSvg";
import GroupsSvg from "../assets/svg/GroupsSvg";

export const pistolaTableInfo = {
    tableName: "pistola",
    headerIcon: <MdBarcodeReader />,
    headerTitle: "ACCIONES PISTOLA",
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

export const trabajosExternosTableInfo = {
    tableName: "trabajosExternos",
    endPoint: "externalJobs",
    headerIcon: <FaStamp />,
    headerTitle: "TRABAJOS EXTERNOS",
    tableColumns: [
        {
            header: "Nombre",
            active: true,
            key: "documentName"
        },
        {
            header: "Cliente",
            active: true,
            key: "username"
        },
        {
            header: "Plancha",
            active: true,
            key: "refPlancha"
        },
        {
            header: "Colores",
            active: true,
            key: "numero_colores"
        },
        {
            header: "Fecha",
            active: true,
            key: "fecha"
        },
    ],
    actions: [
        {
            title: "Firmar",
            action: "firmar"
        },
        {
            title: "Anular",
            action: "anular"
        }
    ],
    defaultChecks: true
}

export const externosFinalizadosTableInfo = {
    tableName: "externosFinalizados",
    endPoint: "planchas/externosFinalizados",
    headerIcon: <FaStamp />,
    headerTitle: "EXTERNOS FINALIZADOS",
    tableColumns: [
        {
            header: "Nombre",
            active: true,
            key: "documentName"
        },
        {
            header: "Cliente",
            active: true,
            key: "username"
        },
        {
            header: "Plancha",
            active: true,
            key: "refPlancha"
        },
        {
            header: "Colores",
            active: true,
            key: "clichesColor"
        },
        {
            header: "Fecha",
            active: true,
            key: "fecha"
        },
        {
            header: "Usuario",
            active: true,
            key: "nombre_usuario"
        },
        {
            header: "Estado",
            active: true,
            key: "nombre_estado"
        },
    ]
}

export const trabajosPlanchaTableInfo = {
    tableName: "trabajosPlancha",
    endPoint: "planchas/trabajos",
    headerIcon: <FaStamp />,
    headerTitle: "TRABAJOS",
    tableColumns: [
        {
            header: "Nombre trabajo",
            active: true,
            key: "name"
        },
        {
            header: "Resolución",
            active: true,
            key: "resolution"
        },
        {
            header: "Ancho",
            active: true,
            key: "usedWidth"
        },
        {
            header: "Alto",
            active: true,
            key: "usedHeight"
        },
        {
            header: "Area",
            active: true,
            key: "usedArea"
        }
    ],
}

export const trabajosPlanchasTableInfo = {
    tableName: "trabajosPlanchas",
    endPoint: "planchas/trabajos",
    headerIcon: <FaStamp />,
    headerTitle: "TRABAJOS PLANCHAS",
    tableColumns: [
        {
            header: "Nombre plancha",
            active: true,
            key: "nombre_plancha"
        },
        {
            header: "Estado plancha",
            active: true,
            key: "nombre_estado_plancha"
        },
        {
            header: "Fecha",
            active: true,
            key: "fecha_plancha"
        },
        {
            header: "Nombre trabajo",
            active: true,
            key: "name"
        },
        {
            header: "Resolución",
            active: true,
            key: "resolution"
        },
        {
            header: "Ancho",
            active: true,
            key: "usedWidth"
        },
        {
            header: "Alto",
            active: true,
            key: "usedHeight"
        },
        {
            header: "Area",
            active: true,
            key: "usedArea"
        }
    ],
}

export const planchasTableInfo = {
    tableName: "planchas",
    endPoint: "planchas",
    headerIcon: <FaStamp />,
    headerTitle: "PLANCHAS",
    tableColumns: [
        {
            header: "Nombre",
            active: true,
            key: "nombre_plancha"
        },
        {
            header: "Referencia",
            active: true,
            key: "ref_plancha"
        },
        {
            header: "CDI",
            active: true,
            key: "cdi"
        },
        {
            header: "Estado",
            active: true,
            key: "nombre_estado"
        },
        {
            header: "Fecha",
            active: true,
            key: "fecha"
        },
        {
            header: "Albarán",
            active: true,
            key: "nombre_estado_albaran"
        },
        {
            header: "Preproducción",
            active: true,
            key: "usuario_dfs"
        },
        {
            header: "Producción",
            active: true,
            key: "usuario_produccion"
        },
        {
            header: "Finalizada",
            active: true,
            key: "usuario_finalizada"
        },
    ],
    actions: [
        {
            title: "Eliminar",
            action: "eliminar"
        },
        {
            title: "Sincronizar",
            action: "sincronizar",
            noCheck: true
        },
        {
            title: "Firmar",
            action: "firmar"
        },
        /* {
            title: "Imprimir",
            action: "imprimir"
        }, */
        {
            title: "Solicitar Albarán",
            action: "solicitarAlbaran"
        },
        {
            title: "Resetear Albarán",
            action: "resetearAlbaran"
        }
    ],
    defaultChecks: true
};

export const emailInfoTableInfo = {
    tableName: "emailInfo",
    endPoint: "",
    headerIcon: <BsInfoLg />,
    headerTitle: "INFO EMAIL",
    tableColumns: [
        {
            header: "Fecha",
            active: true,
            key: "fecha"
        },
        {
            header: "Hora",
            active: true,
            key: "hora"
        },
        {
            header: "Acción",
            active: true,
            key: "accion"
        },
        {
            header: "Para",
            active: true,
            key: "contacto.textoOpcion"
        },
        {
            header: "Usuario",
            active: true,
            key: "usuario"
        },
        {
            header: "Asunto",
            active: true,
            key: "asunto"
        },
    ]
}

export const tintasTableInfo = {
    tableName: "tintas",
    endPoint: "colors",
    headerIcon: <RiPaintFill />,
    headerTitle: "TINTAS",
    tableColumns: [
        {
            header: "Color",
            active: true,
            key: "color"
        },
        {
            header: "Lineatura",
            active: true,
            key: "lineatura"
        },
        {
            header: "Ángulo",
            active: true,
            key: "angulo"
        },
        {
            header: "Trama",
            active: true,
            key: "trama"
        },
        {
            header: "Plancha",
            active: true,
            key: "planchaArchivo"
        },
    ],
    actions: [
        {
            title: "Imprimir Separaciones A3",
            action: "imprimirA3"
        },
        {
            title: "Config. Planchas",
            action: "configPlancha",
            noCheck: true
        }
    ],
    tableChecks: true
}

export const infoGmgTableInfo = {
    tableName: "infoGmg",
    endPoint: "plotter/infoPlotter",
    headerIcon: <Plotter />,
    headerTitle: "INFORMACIÓN GMG",
    tableColumns: [
        {
            header: "Fecha",
            active: true,
            key: "date"
        },
        {
            header: "Hora",
            active: true,
            key: "hour"
        },
        {
            header: "Operario",
            active: true,
            key: "username"
        },
        {
            header: "Perfil de color",
            active: true,
            key: "perfilColor"
        }
    ]
}

export const ripTableInfo = {
    tableName: "rip",
    endPoint: "montajes/rip",
    headerIcon: <MontajeSvg />,
    headerTitle: "RIP MONTAJE",
    tableChecks: true,
    tableColumns: [
        {
            header: "Color",
            active: true,
            key: "color"
        },
        {
            header: "Lineatura",
            active: true,
            key: "lineatura"
        },
        {
            header: "Ángulo",
            active: true,
            key: "angulo"
        },
        {
            header: "Trama",
            active: true,
            key: "trama"
        },
        {
            header: "Plancha",
            active: true,
            key: "planchaArchivo"
        },
    ],
    actions: [
        {
            title: "Rip Auto",
            action: "ripAuto"
        },
        {
            title: "Rip Interior",
            action: "ripInterior"
        },
        {
            title: "Rip Exterior",
            action: "ripExterior"
        },
        {
            title: "Rip Pixel",
            action: "ripPixel"
        },
        {
            title: "Freecut Manual",
            action: "freecutManual",
            noCheck: true
        },
        {
            title: "Config. Planchas",
            action: "configPlancha",
            noCheck: true
        },
        {
            title: "Arrastrador",
            action: "arrastradores",
            hidden: true
        },
        {
            title: "Marcas Corte Desarrollo",
            action: "cortes_desarrollo",
            hidden: true
        }
    ]
}

export const allMontajesTableInfo = {
    tableName: "allMontajes",
    endPoint: "montajes/allMontajes",
    headerIcon: <MontajeSvg />,
    headerTitle: "MONTAJES",
    tableColumns: [
        {
            header: "Archivo",
            active: true,
            key: "id_archivo"
        }
    ]
};

export const montajeTableInfo = {
    tableName: "montajes",
    endPoint: "montajes",
    headerIcon: <MontajeSvg />,
    headerTitle: "MONTAJES",
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
            title: "Enviar a Corte",
            action: "maquinaCorte"
        },
        {
            title: "Actualizar Estación",
            action: "actualizarEstacion"
        },
        {
            title: "Generar Email y Ferro",
            action: "generarFerro"
        },
        {
            title: "Imprimir Ferro",
            action: "imprimirFerro"
        },
        {
            title: "Comparar",
            action: "comparar"
        },
        {
            title: "Solicitar Vista",
            action: "solicitarVista",
            hidden: false
        },
        {
            title: "Visualizar montaje",
            action: "visualizarMontaje",
            hidden: true,
            noCheck: true
        },
    ],
};

export const plotterTableInfo = {
    tableName: "plotter",
    endPoint: "plotter",
    headerIcon: <Plotter />,
    headerTitle: "PLOTTER",
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
            title: "Info GMG",
            action: "infoGmg",
            noCheck: true
        },
        {
            title: "Imprimir Ferro",
            action: "imprimirFerro"
        },
        {
            action: "openRow"
        }
    ],
};

export const fileTableInfo = {
    tableName: "fichas",
    endPoint: "files",
    headerIcon: <PiImagesLight />,
    headerTitle: "FICHAS",
    tableChecks: true,
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

export const orderLenTableInfo = {
    tableName: "archivosLen",
    endPoint: "lenFiles",
    headerIcon: <LenFile />,
    headerTitle: "ARCHIVOS LEN",
    tableChecks: true,
    tableColumns: [
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
            title: "Info curvas",
            action: "infoCurvas",
            noCheck: true
        },
        {
            title: "Solicitar vista",
            action: "solicitarVista",
            hidden: false,
            noCheck: true
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

export const lenTableInfo = {
    endPoint: "lenFiles",
    headerIcon: <LenFile />,
    headerTitle: "ARCHIVOS LEN",
    tableChecks: true,
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
    headerIcon: <FaBoxOpen />,
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

export const noteTableInfo = {
    endPoint: "notes",
    headerIcon: <PiNoteLight />,
    headerTitle: "NOTAS DEL PEDIDO",
    tableColumns: [
        {
            header: "Versión",
            key: "version"
        },
        {
            header: "Fecha",
            key: "fecha"
        },
        {
            header: "Nota",
            key: "nota"
        },
        {
            header: "Usuario",
            key: "username"
        }
    ]
};

export const versionTableInfo = {
    tableName: "versiones",
    endPoint: "orders/versions",
    headerIcon: <IoDocumentTextOutline />,
    headerTitle: "VERSIONES DEL PEDIDO",
    tableColumns: [
        {
            header: "Número",
            active: true,
            key: "id_pedido"
        },
        {
            header: "F.Creado",
            active: true,
            key: "xml.numero.fecha_solicitud"
        },
        {
            header: "F.Entrega",
            active: true,
            key: "xml.numero.fecha_entrega"
        },
        {
            header: "Boceto",
            active: true,
            key: "xml.numero.boceto",
            check: true
        },
        {
            header: "Cliché",
            active: true,
            key: "xml.numero.cliche",
            check: true
        },
        {
            header: "Prioridad",
            active: true,
            key: "xml.numero.prioridad"
        },
        {
            header: "Estado v.actual",
            active: true,
            key: "xml.numero.state"
        }
    ]
};

export const orderTableInfo = {
    tableName: "pedidos",
    endPoint: "orders",
    headerIcon: <IoDocumentTextOutline />,
    deleteTitle: "VERSIÓN",
    headerTitle: "PEDIDOS DE CLIENTES",
    tableColumns: [
        {
            header: "Previo",
            active: true,
            key: "unitario"
        },
        {
            header: "Número",
            active: true,
            key: "id_pedido"
        },
        {
            header: "Marca",
            active: true,
            key: "xml.numero.marca"
        },
        {
            header: "Cliente",
            active: true,
            key: "xml.numero.cliente_nombre"
        },
        {
            header: "F.Creado",
            active: true,
            key: "xml.numero.fecha_solicitud"
        },
        {
            header: "F.Entrega",
            active: true,
            key: "xml.numero.fecha_entrega"
        },
        {
            header: "Boceto",
            active: true,
            key: "xml.numero.boceto",
            check: true
        },
        {
            header: "Cliché",
            active: true,
            key: "xml.numero.cliche",
            check: true
        },
        {
            header: "Plotter",
            active: true,
            key: "xml.tecnicos.plotter",
            check: true
        },
        {
            header: "Prioridad",
            active: true,
            key: "xml.numero.prioridad"
        },
        {
            header: "Ref. Cliente",
            active: true,
            key: "xml.numero.ref_cliente"
        },
        {
            header: "Actividad",
            active: true,
            key: "xml.actividad.id"
        },
        {
            header: "En",
            active: true,
            key: "departamento_asignado"
        },
        {
            header: "Asignado a",
            active: true,
            key: "nombre_usuario_asignado"
        },
        {
            header: "Albarán",
            active: true,
            key: "xml.numero.albaran"
        },
        {
            header: "Estado v.actual",
            active: true,
            key: "xml.numero.state"
        }
    ],
    actions: [
        {
            title: "Asignar",
            action: "asignar"
        },
        {
            title: "Desasignar",
            action: "desasignar"
        }
    ],
    rolesActions: ["Manager", "Soporte"],
    usersActions: ["n.morante", "a.artacho"]
};

export const clientTableInfo = {
    endPoint: "clients",
    headerIcon: <SlBriefcase />,
    headerTitle: "CLIENTES",
    tableColumns: [
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

export const groupTableInfo = {
    endPoint: "groups",
    tableName: "grupos",
    headerIcon: <GroupsSvg />,
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

export const userTableInfo = {
    endPoint: "users",
    headerIcon: <FaUserCircle />,
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

export const contactTableInfo = {
    tableName: "contactos",
    endPoint: "contacts",
    headerIcon: <TiContacts />,
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

export const emailTableInfo = {
    tableName: "emails",
    endPoint: "emails",
    headerIcon: <MdOutlineEmail />,
    headerTitle: "PLANTILLAS DE EMAIL",
    tableColumns: [
        {
            header: "Nombre",
            active: true,
            key: "name"
        },
        {
            header: "Asunto",
            active: true,
            key: "subject"
        },
        {
            header: "Cuerpo",
            active: true,
            key: "body"
        }
    ]
};

export const strategyTableInfo = {
    endPoint: "strategies",
    tableName: "estrategias",
    headerIcon: <TbColorSwatch />,
    headerTitle: "ESTRATEGIAS DE COLOR",
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
    ]
};