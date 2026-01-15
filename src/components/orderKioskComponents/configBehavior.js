export function kioskConfigAuto({ orderXml, actividad, setIsActive, setOtraDocumentacion, orderColorsObjects }) {
    const { numero, tecnicos } = orderXml;
    const { cliente_codigo, cliche } = numero;
    const isCliche = cliche === "-1" ? true : false;

    // Bocetos
    if (actividad === "FLEXIBLE" || actividad === "ETIQUETAS" || !isCliche) {
        setIsActive(prev => ({
            ...prev,
            bocetos: true
        }));
    }

    // Fichas
    if ((actividad === "CARTON" && (tecnicos.ficha_impresa === "-1" || tecnicos.ficha_por_email === "X")) || (actividad === "FLEXIBLE" && (cliente_codigo === "0055" || cliente_codigo === "0282"))) {
        setIsActive(prev => ({
            ...prev,
            fichas: true
        }));
    }

    // Plotter
    if (tecnicos.plotter === "-1" || tecnicos.plotter === "X") {
        setIsActive(prev => ({
            ...prev,
            plotter: true
        }));

        if (cliente_codigo === "0022") {
            setIsActive(prev => ({
                ...prev,
                otraDocumentacion: true
            }));
            setOtraDocumentacion(prev => ({
                ...prev,
                etiquetasPlotter: true
            }));
        }
    }

    // Otra documentacion
    // Certificados
    const clientesControl = ["0159", "0245", "0265"];

    if (clientesControl.includes(cliente_codigo) && isCliche) {
        setIsActive(prev => ({
            ...prev,
            otraDocumentacion: true
        }));
        setOtraDocumentacion(prev => ({
            ...prev,
            certificadoControl: true
        }));
    }

    if (orderColorsObjects.length > 0 && orderColorsObjects.some(color => typeof color.planchaArchivo === 'string' && color.planchaArchivo.toUpperCase().includes('FAST'))) {
        setIsActive(prev => ({
            ...prev,
            otraDocumentacion: true
        }));
        setOtraDocumentacion(prev => ({
            ...prev,
            certificadoContinuos: true
        }));
    }

    if (cliente_codigo === "0022") {
        setIsActive(prev => ({
            ...prev,
            otraDocumentacion: true
        }));
        setOtraDocumentacion(prev => ({
            ...prev,
            certificadoCodigos: true
        }));
    }

    // Etiquetas
    if (actividad === "CARTON" && isCliche && orderXml?.actividad?.carton?.carton_premontado === "-1") {
        setIsActive(prev => ({
            ...prev,
            otraDocumentacion: true
        }));
        setOtraDocumentacion(prev => ({
            ...prev,
            etiquetasMontaje: true
        }));
    }

    const clientesPrueba = ["0101", "0160"];
    const clientesPruebaCliche = ["0022", "0135", "0177", "0030"];

    const isClientePrueba = clientesPrueba.includes(cliente_codigo);
    const isClienteCliche = clientesPruebaCliche.includes(cliente_codigo) && isCliche;

    if (isClientePrueba || isClienteCliche) {
        setIsActive(prev => ({
            ...prev,
            otraDocumentacion: true
        }));
        setOtraDocumentacion(prev => ({
            ...prev,
            etiquetasPrueba: true
        }));
    }
}

export function kioskConfigManual({ setIsActive }) {
    setIsActive(prev => {
        const allKeysFalse = Object.keys(prev).reduce((acc, key) => {
            if (key !== "unitario" && key !== "reportePrevio") {
                acc[key] = false;
            }
            return acc;
        }, {});
        return {
            ...prev,
            ...allKeysFalse
        };
    });
}

export function kioskConfigPerso() {

}

export function handleExceptions({ module, isActive, setIsActive, actividad, cliente, setOtraDocumentacion }) {
    if (module === "montaje" && !isActive.montaje && (actividad === "MADERA" || actividad === "ETIQUETAS")) {
        setIsActive((prev) => ({
            ...prev,
            fichas: true
        }));
    }

    if (module === "montaje" && !isActive.montaje && cliente.code === "0159") {
        setOtraDocumentacion((prev) => ({
            ...prev,
            unitarioPng: true
        }));
    }

    if (module === "plotter" && !isActive.plotter && actividad === "CARTON") {
        setOtraDocumentacion((prev) => ({
            ...prev,
            etiquetasPlotter: true
        }));
    }

    if (module === "montaje" && !isActive.montaje && actividad === "MADERA") {
        setOtraDocumentacion((prev) => ({
            ...prev,
            etiquetasMontaje: true
        }));
    }
}