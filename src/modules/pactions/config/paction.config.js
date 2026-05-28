export const listActions = [
    "Exportar PDF",
];

export const kioskActions = [
    {
        title: "UNITARIO",
        id: "unitario",
        disableSwitch: true,
        steps: [1, 2, 3],
    },
    {
        title: "REPORTE PREVIO",
        id: "reportePrevio",
        disableSwitch: true,
        steps: [2, 3]
    },
    {
        title: "EXPORTAR PDF",
        id: "exportPdf",
        action: "Exportar PDF",
        steps: [2]
    },
    {
        title: "ANALIZAR Y CORREGIR",
        id: "analyze",
        steps: [2],
        action: "Analizar y Corregir",
    },

]

export const actionFlowMap = {
    "Exportar PDF": {
        isActive: ["unitario", "exportPdf"],
        isOpen: ["unitario"]
    },

    "Analizar y Corregir": {
        isActive: ["unitario", "reportePrevio", "trapping"],
        isOpen: ["unitario", "reportePrevio"]
    }
};

export const salidaOptions = [
    { value: "composite", label: "Compuesto" },
    { value: "PDFX4", label: "PDF/X-4" },
    { value: "CMYK", label: "CMYK" },
    { value: "CMYKFromColorbook", label: "CMYK desde Libro de Color" },
    { value: "RGB", label: "RGB" },
    { value: "Gray", label: "Gris" }
]

export const separarOptions = [
    { value: "not", label: "No Separar" },
    { value: "separateFiles", label: "Archivo por separación" },
    { value: "newPage", label: "Página por Separación" },
    { value: "separated", label: "Página por Separación + Compuesto en Primera Página" }
]

export const transformarOptions = [
    { value: "not", label: "No Transformar" },
    { value: "horizontal", label: "Voltear Horizontal" },
    { value: "vertical", label: "Voltear Vertical" },
    { value: "left", label: "Girar Izquierda" },
    { value: "right", label: "Girar Derecha" },
    { value: "180", label: "Girar 180" }
]

export const distorsinoOptions = [
    { value: "page", label: "Desde Página" },
    { value: "none", label: "Ningún" }
]

export const aplicarCurvaOptions = [
    { value: "none", label: "Ningún" }
]

export const compresionOptions = [
    { value: "loseless", label: "Sin Pérdida" },
    { value: "jpeghigh", label: "JPEG Alta Calidad" },
    { value: "jpegmedium", label: "JPEG Media Calidad" },
    { value: "jpeglow", label: "JPEG Baja Calidad" },
    { value: "jpegverylow", label: "JPEG Muy Alta Calidad" },
]

export const defaultConfigExportPdf = {
    colorOutput: "composite",
    separated: "not",
    separatedBlackWhite: false,
    rotated: "not",
    applyCurves: "not",
    horizontalDistortion: "page",
    verticalDistortion: "page",
    imageCompression: "loseless",
    rasterizeOn: false,
    rasterize: 300,
    downsampleImageOn: false,
    downsampleImage: 300,
    flatten: false,
    clipImages: false,
    simplifyFile: false,
    vectorizeText: false,
    vectorizePatterns: false,
    vectorizeStrokes: false,
    removeEmptyObjects: false,
    acrobatLayersOfTopLevelLayersOnly: false,
    preserveMetadata: false,
    includeNonPrinintgLayers: false,
    forceOpaqueInkstoKnockout: false,
    useLabForSpotColors: false,
    allSeparations: true,
    separations: "",
    processAndSpotSeparations: false,
    technicalSeparations: false,
    varnishSeparations: false,
    includeSeparationNames: []
};

