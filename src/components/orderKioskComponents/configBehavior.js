export function kioskConfigAuto({ orderXml, actividad, fileReport, setIsActive, setIsOpen, setOtraDocumentacion, orderColorsObjects }) {
    const { numero, tecnicos } = orderXml;
    const { cliente_codigo, cliche } = numero;
    const isCliche = cliche === "-1" ? true : false;

    // Bocetos
    if (actividad === "FLEXIBLE" || actividad === "ETIQUETAS" || !isCliche) {
        setIsActive(prev => ({
            ...prev,
            bocetos: true
        }));

        if (cliente_codigo === "0159") {
            setIsActive(prev => ({
                ...prev,
                salidaColores: true
            }));
            setIsOpen(prev => ({
                ...prev,
                salidaColores: true
            }));
        }
    }

    // Fichas
    if ((actividad === "CARTON" && isCliche && (tecnicos.ficha_impresa === "-1" || tecnicos.ficha_por_email === "X")) || (actividad === "FLEXIBLE" && (cliente_codigo === "0055" || cliente_codigo === "0282"))) {
        setIsActive(prev => ({
            ...prev,
            fichas: true
        }));
    }

    // Montaje
    if (isCliche) {
        setIsActive(prev => ({
            ...prev,
            montaje: true
        }));
        setIsOpen(prev => ({
            ...prev,
            montaje: true
        }));

        if (actividad === "MADERA" || actividad === "ETIQUETAS") {
            setIsActive(prev => ({
                ...prev,
                fichas: true
            }));
        }

        if (actividad === "MADERA" || actividad === "CARTON") {
            setIsActive(prev => ({
                ...prev,
                otraDocumentacion: true
            }));
            setOtraDocumentacion(prev => ({
                ...prev,
                etiquetasMontaje: true
            }));
        }

        if (cliente_codigo === "0159") {
            setOtraDocumentacion(prev => ({
                ...prev,
                unitarioPng: true
            }));
        }
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

        if (cliente_codigo === "0159") {
            setIsActive(prev => ({
                ...prev,
                salidaColores: true
            }));
            setIsOpen(prev => ({
                ...prev,
                salidaColores: true
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

    if (orderColorsObjects.length > 0 && orderColorsObjects.some(color => typeof color.process === 'string' && color.process.toUpperCase().includes('FAST'))) {
        setIsActive(prev => ({
            ...prev,
            otraDocumentacion: true
        }));
        setOtraDocumentacion(prev => ({
            ...prev,
            certificadoContinuos: true
        }));
    }

    if (cliente_codigo === "0022" && fileReport && fileReport.some(report => report.message === "Códigos de barras detectados")) {
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

export function resetKiosk({ setIsActive, setIsOpen }) {
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
    setIsOpen(prev => {
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

export function handleExceptions({ module, state, updateState }) {
    const { isActive, actividad, cliente } = state;

    if (module === "trapping" && !state.isActive.trapping && (state.trappingData?.distancia_trapping === "0" || state.trappingData?.distancia_trapping === 0 || state.trappingData?.distancia_trapping === "")) {
        updateState("isOpen", (prev) => ({
            ...prev,
            trapping: true
        }));
    }

    if (module === "montaje" && !isActive.montaje && (actividad === "MADERA" || actividad === "ETIQUETAS")) {
        updateState("isActive", (prev) => ({
            ...prev,
            fichas: true
        }));
    }

    if (module === "montaje" && !isActive.montaje && (actividad === "MADERA" || actividad === "CARTON")) {
        updateState("otraDocumentacion", (prev) => ({
            ...prev,
            etiquetasMontaje: true
        }));
    }

    if (module === "montaje" && !isActive.montaje && cliente.code === "0159") {
        updateState("otraDocumentacion", (prev) => ({
            ...prev,
            unitarioPng: true
        }));
    }

    if (module === "plotter" && !isActive.plotter && cliente.code === "0022") {
        updateState("otraDocumentacion", (prev) => ({
            ...prev,
            etiquetasPlotter: true
        }));
    }

    if (((module === "bocetos" && !isActive.bocetos) || (module === "plotter" && !isActive.plotter)) && cliente.code === "0159") {
        updateState("isActive", (prev) => ({
            ...prev,
            salidaColores: true
        }));
        updateState("isOpen", (prev) => ({
            ...prev,
            salidaColores: true
        }));
    }

    if (module === "otraDocumentacion" && isActive.otraDocumentacion) {
        updateState("otraDocumentacion", {});
        updateState("countOtraDoc", {});
    }
}