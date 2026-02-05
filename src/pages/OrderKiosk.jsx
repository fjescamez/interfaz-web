import "./OrderKiosk.css";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import Switch from "@mui/material/Switch";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { kioskActions } from "../helpers/orderKioskActions";
import { BlinkBlur } from "react-loading-indicators";
import UnitarioComponent from "../components/orderKioskComponents/UnitarioComponent";
import TrappingComponent from "../components/orderKioskComponents/TrappingComponent";
import BocetoComponent from "../components/orderKioskComponents/BocetoComponent";
import { fetchData, fetchOneItem, postData } from "../helpers/fetchData";
import DetailsHeader from "../components/DetailsHeader";
import MontajeComponent from "../components/orderKioskComponents/MontajeComponent";
import OtraDocComponent from "../components/orderKioskComponents/OtraDocComponent";
import ColoresComponent from "../components/orderKioskComponents/ColoresComponent";
import FreecutComponent from "../components/orderKioskComponents/FreecutComponent";
import { notify } from "../helpers/notify";
import MontajeAvanzadoComponent from "../components/orderKioskComponents/MontajeAvanzadoComponent";
import ExecutingComponent from "../components/ExecutingComponent";
import "./HomePage.css";
import { useTabs } from "../context/TabsContext";
import { useTabState } from "../context/TabStateContext";
import { useLocation } from "react-router-dom";
import ReporteComponent from "../components/orderKioskComponents/ReporteComponent";
import InfoPopUp from "../components/InfoPopUp";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ChosenSelect from "../components/formComponents/ChosenSelect";
import {
  kioskConfigAuto,
  resetKiosk
} from "../components/orderKioskComponents/configBehavior";
import PosMaculaComponent from "../components/orderKioskComponents/PosMaculaComponent";
import SubmitButton from "../components/buttons/SubmitButton";
import CabeceraModulos from "../components/orderKioskComponents/CabeceraModulos";
import KioskSubmitButton from "../components/orderKioskComponents/KioskSubmitButton";

function OrderKiosk({ configMode }) {
  const { id } = useParams();
  const { tabs } = useTabs();
  const { saveTabState, getTabState, updateTabState, postDataContext } = useTabState();
  const location = useLocation();
  const tabKey = location.pathname;
  const isMountedRef = useRef(true);
  const isSyncingFromTabRef = useRef(false);
  const lastTabKeyRef = useRef(null);

  const [state, setState] = useState(() => getTabState(tabKey) || {
    kioskName: "",
    createKiosk: false,
    kioskOptions: ["Automática", "Manual"],
    chosenKiosk: {},
    defaultKiosk: {},
    step: 1,
    loadingOrderReport: false,
    loadingFileReport: false,
    loadingTrapping: false,
    workableId: null,
    nodeId: null,
    orderReport: [],
    fileReport: [],
    reportModification: null,
    reportWarnings: 0,
    reportErrors: 0,
    reportFixes: 0,
    infoPopUp: false,
    infoContent: "",
    loading: false,
    order: null,
    orderXml: null,
    cliente: null,
    unitarioMetadata: {},
    isOpen: { unitario: true, reportePrevio: true },
    isActive: { unitario: true, reportePrevio: true },
    orderColors: [],
    orderColorsObjects: [],
    unitarios: [],
    unitarioData: {
      archivo: null
    },
    trappingData: {
      distancia_trapping: "0",
      intensidad: 100,
      remetido: "No",
      distancia_remetido: "0",
    },
    isTrappingWaiting: false,
    isTrappingDone: false,
    isTrappingCanceled: false,
    bocetos: [{ id: 0, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }],
    fichas: [{ id: 0, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }],
    posMacula: "",
    freecutData: {
      posiCortes: "Izquierda"
    },
    freeCutColors: [],
    montajeData: [],
    kioscoPersoData: {},
    otraDocumentacion: {},
    countOtraDoc: {},
    salidaColores: [],
    listDigimark: [],
    coloresForm: undefined,
    coloresInputData: {},
    coloresDigimarkForm: undefined,
    digimarkInputData: {},
    configAvanzadaData: [],
    actividad: "",
  });

  const originalState = {
    kioskName: "",
    createKiosk: false,
    kioskOptions: ["Automática", "Manual"],
    chosenKiosk: {},
    defaultKiosk: {},
    step: 1,
    loadingOrderReport: false,
    loadingFileReport: false,
    loadingTrapping: false,
    workableId: null,
    nodeId: null,
    orderReport: [],
    fileReport: [],
    reportModification: null,
    reportWarnings: 0,
    reportErrors: 0,
    reportFixes: 0,
    infoPopUp: false,
    infoContent: "",
    loading: false,
    order: null,
    orderXml: null,
    cliente: null,
    unitarioMetadata: {},
    isOpen: { unitario: true, reportePrevio: true },
    isActive: { unitario: true, reportePrevio: true },
    orderColors: [],
    orderColorsObjects: [],
    unitarios: [],
    unitarioData: {
      archivo: null
    },
    trappingData: {
      distancia_trapping: "0",
      intensidad: 100,
      remetido: "No",
      distancia_remetido: "0",
    },
    isTrappingWaiting: false,
    isTrappingDone: false,
    isTrappingCanceled: false,
    bocetos: [{ id: 0, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }],
    fichas: [{ id: 0, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }],
    posMacula: "",
    freecutData: {
      posiCortes: "Izquierda"
    },
    freeCutColors: [],
    montajeData: [],
    kioscoPersoData: {},
    otraDocumentacion: {},
    countOtraDoc: {},
    salidaColores: [],
    listDigimark: [],
    coloresForm: undefined,
    coloresInputData: {},
    coloresDigimarkForm: undefined,
    digimarkInputData: {},
    configAvanzadaData: [],
    actividad: "",
  };

  const tabExists = useMemo(
    () => tabs.some((tab) => tab.path === tabKey),
    [tabs, tabKey]
  );

  useEffect(() => {
    if (!tabExists) return;
    if (isSyncingFromTabRef.current) {
      isSyncingFromTabRef.current = false;
      return;
    }
    saveTabState(tabKey, state);
  }, [tabKey, state, tabExists]);

  useEffect(() => {
    if (!tabKey || lastTabKeyRef.current === tabKey) return;
    lastTabKeyRef.current = tabKey;
    const externalState = getTabState(tabKey);
    if (!externalState) return;
    isSyncingFromTabRef.current = true;
    setState(externalState);
  }, [tabKey]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const updateState = (keyOrUpdater, value) => {
    if (typeof keyOrUpdater === "function") {
      setState((prev) => {
        const nextPartial = keyOrUpdater(prev) || {};
        const keys = Object.keys(nextPartial);
        const hasChanges = keys.some((key) => !Object.is(prev[key], nextPartial[key]));
        return hasChanges ? { ...prev, ...nextPartial } : prev;
      });
      return;
    }

    if (keyOrUpdater && typeof keyOrUpdater === "object" && !Array.isArray(keyOrUpdater)) {
      setState((prev) => {
        const nextPartial = keyOrUpdater;
        const keys = Object.keys(nextPartial);
        const hasChanges = keys.some((key) => !Object.is(prev[key], nextPartial[key]));
        return hasChanges ? { ...prev, ...nextPartial } : prev;
      });
      return;
    }

    setState((prev) => {
      const nextValue = typeof value === "function" ? value(prev[keyOrUpdater], prev) : value;
      if (Object.is(prev[keyOrUpdater], nextValue)) return prev;
      return {
        ...prev,
        [keyOrUpdater]: nextValue
      };
    });
  };

  useEffect(() => {
    const getUnitarios = async () => {
      const result = await postData("orderKiosks/getUnitario", state.order);

      updateState("unitarios", result.options);

      let unitarioDefault = "";

      if (result.options.filter(option => option.type === "Packz") && result.options.filter(option => option.type === "Packz").length === 1) {
        unitarioDefault = result.options.filter(option => option.type === "Packz")[0];
      } else if (result.options.filter(option => option.type === "Illustrator") && result.options.filter(option => option.type === "Illustrator").length === 1 && result.options.filter(option => option.type === "Packz").length === 0) {
        unitarioDefault = result.options.filter(option => option.type === "Illustrator")[0];
      }

      updateState("unitarioData", {
        archivo: unitarioDefault
      });
    };

    const getClienteConfig = async () => {
      let resultados = [];
      let cliente_id = id;
      let cliente_codigo = "";

      if (state.orderXml?.numero) {
        cliente_codigo = state.orderXml.numero.cliente_codigo || "";
        resultados = await fetchData("clients", cliente_codigo);
        updateState("cliente", resultados[0] || {});
        cliente_id = resultados[0]?._id || "";
      }

      if (configMode) {
        const cliente = await fetchOneItem("clients", id);
        updateState("cliente", cliente.results || {});
      }

      if (cliente_id !== "") {
        const clientConfig = await fetchData("clientConfig", cliente_id);

        if (clientConfig && clientConfig?.configuraciones?.kioscos.length > 0) {
          const kioscoDefault = clientConfig.configuraciones.kioscos.find(kiosk => kiosk.kioscoDefault === true) || clientConfig.configuraciones.kioscos[0];

          updateState("kioskOptions", [
            ...state.kioskOptions,
            ...clientConfig.configuraciones.kioscos.map(kiosk => ({
              ...kiosk,
              textoOpcion: kiosk.nombre
            }))
          ]);
          updateState("defaultKiosk", kioscoDefault);
          updateState("chosenKiosk", kioscoDefault);
        } else {
          updateState("defaultKiosk", state.kioskOptions[0]);
          updateState("chosenKiosk", state.kioskOptions[0]);
        }
      }
    }

    if (!state.cliente) {
      getClienteConfig();
    }

    if (state.order && state.unitarios.length === 0) {
      getUnitarios();
    }
  }, [state.order]);

  useEffect(() => {
    if (state.chosenKiosk !== "Automática" && state.chosenKiosk !== "Manual") {
      const activosDefault = state.chosenKiosk?.activosDefault || [];
      const abiertosDefault = state.chosenKiosk?.abiertosDefault || [];

      if (state.chosenKiosk?.activosDefault?.length > 0) {
        updateState("isActive", (prevIsActive) => {
          const newIsActive = {};
          activosDefault.forEach((item) => {
            newIsActive[item] = true;
          });
          return { ...prevIsActive, ...newIsActive };
        });
      }

      if (state.chosenKiosk?.abiertosDefault?.length > 0) {
        updateState("isOpen", (prevIsOpen) => {
          const newIsOpen = {};
          abiertosDefault.forEach((item) => {
            newIsOpen[item] = true;
          });
          return { ...prevIsOpen, ...newIsOpen };
        });
      }

      const datosDefault = state.chosenKiosk?.datosDefault || {};

      if (datosDefault.trapping && Object.keys(datosDefault.trapping).length > 0) {
        updateState("trappingData", datosDefault.trapping);
      }

      if (datosDefault.bocetos && datosDefault.bocetos.length > 0) {
        updateState("bocetos", datosDefault.bocetos);
      }

      if (datosDefault.fichas && datosDefault.fichas.length > 0) {
        updateState("fichas", datosDefault.fichas);
      }
    } else {
      if (state.orderXml && state.actividad) {
        if (state.chosenKiosk === "Automática") {
          kioskConfigAuto({
            orderXml: state.orderXml,
            actividad: state.actividad,
            fileReport: state.fileReport,
            setIsActive: (updater) => updateState("isActive", updater),
            setIsOpen: (updater) => updateState("isOpen", updater),
            setOtraDocumentacion: (updater) => updateState("otraDocumentacion", updater),
            orderColorsObjects: state.orderColorsObjects
          });
        } else if (state.chosenKiosk === "Manual") {
          resetKiosk({
            setIsActive: (updater) => updateState("isActive", updater),
            setIsOpen: (updater) => updateState("isOpen", updater)
          });
        }
      }
    }

    // TRAPPING
    if (state.orderXml?.tecnicos && state.orderXml?.tecnicos?.trapping !== " ") {
      const trapping = state.orderXml?.tecnicos?.trapping.replace(",", ".").split(" ")[0];

      updateState("trappingData", {
        ...state.trappingData,
        distancia_trapping: trapping
      });
    }
  }, [state.chosenKiosk, state.orderXml, state.actividad, state.orderColorsObjects]);

  useEffect(() => {
    updateState("order", null);
    const getOrder = async () => {
      const result = await fetchOneItem("orders/getOrder", id);
      updateState("order", result);
      updateState("orderXml", result.xml);
      updateState("actividad", result.xml?.actividad?.id || "");
      if (!result.xml?.actividad?.id === "MADERA") {
        updateState("configAvanzadaData", []);
      }
    };

    if (!configMode) getOrder();
  }, [id]);

  useEffect(() => {
    const shouldEnablePosMacula = Boolean((state.isActive?.plotter || state.isActive?.fichas) && state.orderXml?.numero?.cliente_codigo === "0172");

    updateState("isActive", (prevIsActive) => {
      if (prevIsActive?.posMacula === shouldEnablePosMacula) return prevIsActive;

      return {
        ...prevIsActive,
        posMacula: shouldEnablePosMacula
      };
    });
  }, [state.isActive?.plotter, state.isActive?.fichas, state.isActive?.posMacula, state.orderXml]);

  useEffect(() => {
    if (Object.keys(state.otraDocumentacion).length > 0) {
      const tiposCertificado = ['certificadoControl', 'certificadoContinuos', 'certificadoCodigos', 'unitarioPng'];
      const tiposEtiqueta = ['etiquetasMontaje', 'etiquetasPlotter', 'etiquetasPrueba'];

      const certificadosTrue = tiposCertificado.filter((key) => state.otraDocumentacion[key]).length;
      const etiquetasTrue = tiposEtiqueta.filter((key) => state.otraDocumentacion[key]).length;

      updateState("countOtraDoc", {
        certificados: certificadosTrue,
        etiquetas: etiquetasTrue,
      });

      updateState("isActive", (prev) => ({
        ...prev,
        otraDocumentacion: true
      }));
    }
  }, [state.otraDocumentacion]);

  const resetComponentesData = () => {
    updateState({
      trappingData: {
        distancia_trapping: "0",
        intensidad: 100,
        remetido: "No",
        distancia_remetido: "0"
      },
      salidaColores: [],
      listDigimark: [],
      bocetos: [
        { id: 0, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }
      ],
      fichas: [
        { id: 0, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }
      ],
      montajeData: [],
      freecutData: {},
      configAvanzadaData: [],
      otraDocumentacion: {},
    });
  }

  // HOOK DE REPORTE?
  const handleReport = async (action) => {
    const loadingUpdate = (prev) => ({
      isOpen: {
        ...prev.isOpen,
        "unitario": false,
        "reportePrevio": false
      },
      isActive: {
        ...prev.isActive,
        "reportePrevio": true
      },
      step: 2,
      loadingOrderReport: true,
      loadingFileReport: true
    });

    if (action === "forceReport") {
      updateState("isTrappingWaiting", false);
      updateState("isTrappingDone", false);
      updateState("isTrappingCanceled", false);
      resetKiosk({
        setIsActive: (updater) => updateState("isActive", updater),
        setIsOpen: (updater) => updateState("isOpen", updater)
      });
    }

    updateTabState(tabKey, loadingUpdate);
    if (isMountedRef.current) {
      updateState(loadingUpdate);
    }

    await postDataContext("orderKiosks/orderReport", {
      _id: state.order?._id || "",
      id_pedido: state.order?.id_pedido || ""
    }, (res) => {
      const applyOrderReport = (prev) => {
        const previousReport = prev.orderReport || [];
        const incomingReport = res.report || [];
        const uniqueIncoming = incomingReport.filter((item) =>
          !previousReport.some((prevItem) => (
            prevItem.status === item.status
            && prevItem.message === item.message
            && JSON.stringify(prevItem.type || []) === JSON.stringify(item.type || [])
          ))
        );
        const nextOrderReport = previousReport.concat(uniqueIncoming);
        const orderHasErrors = (res.report || []).some((item) => item.status === "error" && !item.type);
        const fileHasErrors = (prev.fileReport || []).some((item) => item.status === "error" && !item.type);
        const canAdvance = !orderHasErrors && !fileHasErrors && !prev.loadingFileReport;

        return {
          orderReport: nextOrderReport,
          loadingOrderReport: false,
          step: canAdvance ? 3 : prev.step
        };
      };

      updateTabState(tabKey, applyOrderReport);
      if (isMountedRef.current) {
        updateState(applyOrderReport);
      }
    }, (res) => {
      const applyOrderReportError = (prev) => ({
        orderReport: [{
          status: "error",
          message: "No se ha podido generar el reporte del pedido."
        }],
        loadingOrderReport: false,
        step: prev.step
      });

      updateTabState(tabKey, applyOrderReportError);
      if (isMountedRef.current) {
        updateState(applyOrderReportError);
        notify("error", res.title || "Error", "Ha ocurrido un error inesperado al generar el reporte del pedido.");
      }
    });

    let dataToReport = {
      _id: state.order?._id || "",
      id_pedido: state.order?.id_pedido || ""
    };

    Object.keys(state.isActive).forEach(key => {
      if (state.isActive[key]) {
        dataToReport[key] = components[key].data;
      }
    });

    await postDataContext("orderKiosks/fileReport", {
      ...dataToReport,
      forceReport: action === "forceReport" ? true : false
    }, (res) => {
      const applyFileReport = (prev) => {
        const nextFileReport = res.report || [];
        const orderHasErrors = (prev.orderReport || []).some((item) => item.status === "error" && !item.type);
        const fileHasErrors = (nextFileReport || []).some((item) => item.status === "error" && !item.type);
        const canAdvance = !orderHasErrors && !fileHasErrors && !prev.loadingOrderReport;

        const orderColorsObjects = res.fileColors?.filter(color => color.type !== "technical") || [];
        const orderColors = orderColorsObjects.map(colorObj => colorObj.name);

        return {
          fileReport: nextFileReport,
          loadingFileReport: false,
          reportModification: res.modification || null,
          unitarioMetadata: {
            number_of_pages: res.number_of_pages || 1
          },
          step: canAdvance ? 3 : prev.step,
          orderColors,
          orderColorsObjects
        };
      };

      updateTabState(tabKey, applyFileReport);
      if (isMountedRef.current) {
        updateState(applyFileReport);
      }
    }, (res) => {
      const applyFileReportError = (prev) => ({
        fileReport: [{
          status: "error",
          message: "No se ha podido generar el reporte del archivo."
        }],
        loadingFileReport: false,
        step: prev.step
      });

      updateTabState(tabKey, applyFileReportError);
      if (isMountedRef.current) {
        updateState(applyFileReportError);
        notify("error", res.title || "Error", "Ha ocurrido un error inesperado al generar el reporte del archivo.");
      }
    });
  }

  useEffect(() => {
    const totalFixes = (state.orderReport?.filter(item => item.status === "info").length || 0) +
      (state.fileReport?.filter(item => item.status === "info").length || 0);
    const totalWarnings = (state.orderReport?.filter(item => item.status === "warning").length || 0) +
      (state.fileReport?.filter(item => item.status === "warning").length || 0);
    const totalErrors = (state.orderReport?.filter(item => item.status === "error").length || 0) +
      (state.fileReport?.filter(item => item.status === "error").length || 0);

    if (totalErrors + totalWarnings > 0 && !state.loadingFileReport && !state.loadingOrderReport) {
      updateState("isOpen", (prevIsOpen) => ({
        ...prevIsOpen,
        reportePrevio: true
      }));
    }

    updateState({
      reportFixes: totalFixes,
      reportWarnings: totalWarnings,
      reportErrors: totalErrors
    });
  }, [state.orderReport, state.fileReport]);

  const maderaConfigBlocks = state.actividad === "MADERA"
    ? (state.orderXml?.actividad?.madera?.madera_premontaje || [])
      .map((item) => item?.madera_tmedida)
      .filter(Boolean)
      .filter((key) => state.montajeData?.[key]?.isActive && state.montajeData?.[key]?.isConfigAvanzadaActive)
    : [];

  const setConfigAvanzadaDataForElementId = (elementId, updater) => {
    updateState("configAvanzadaData", (prevConfigAvanzadaData) => {
      const idx = (prevConfigAvanzadaData || []).findIndex((el) => el?.elementId === elementId);
      if (idx === -1) return prevConfigAvanzadaData;

      const localPrev = [prevConfigAvanzadaData[idx]];
      const localNext = typeof updater === "function" ? updater(localPrev) : updater;
      const nextElement = (localNext && localNext[0]) ? localNext[0] : localPrev[0];

      const nextConfigAvanzadaData = [...prevConfigAvanzadaData];
      nextConfigAvanzadaData[idx] = nextElement;
      return nextConfigAvanzadaData;
    });
  };

  useEffect(() => {
    if (!state.isActive.montaje) {
      updateState("montajeData", []);
      if (state.isActive["configAvanzadaMontaje"]) {
        updateState("isActive", (prevIsActive) => ({
          ...prevIsActive,
          "configAvanzadaMontaje": false
        }));
      }
      if (state.isActive["especial"]) {
        updateState("isActive", (prevIsActive) => ({
          ...prevIsActive,
          "especial": false
        }));
      }
    }
  }, [state.isActive]);

  useEffect(() => {
    console.log(state.isOpen);

  }, [state.isOpen]);

  const components = {
    "unitario": {
      title: `${state.unitarioData?.archivo?.name || ""} - ${state.unitarioData?.archivo?.type || ""}`,
      component: <UnitarioComponent unitarios={state.unitarios} unitarioData={state.unitarioData} setUnitarioData={(value) => updateState("unitarioData", value)} order={state.order} />,
      data: state.unitarioData?.archivo,
      noSave: true
    },
    "reportePrevio": {
      title: (!state.loadingFileReport && !state.loadingOrderReport ? (state.reportErrors + state.reportWarnings === 0 ? "Sin errores ni advertencias" : `Correcciones: ${state.reportFixes} | Advertencias: ${state.reportWarnings} | Errores: ${state.reportErrors} | ${state.reportModification ? `Ult. análisis: ${state.reportModification}` : ""} `) : ""),
      component: <ReporteComponent loadingOrderReport={state.loadingOrderReport} loadingFileReport={state.loadingFileReport} orderReport={state.orderReport} fileReport={state.fileReport} reportModification={state.reportModification} setInfoPopUp={(value) => updateState("infoPopUp", value)} setInfoContent={(value) => updateState("infoContent", value)} />,
      data: state.orderReport,
      noSave: true
    },
    "trapping": {
      title: state.trappingData.manual ? "Manual" : `
      ${state.trappingData.distancia_trapping} mm,
      ${state.trappingData.intensidad}%,
      ${state.trappingData.remetido}${state.trappingData.remetido !== "No" ? `, ${state.trappingData.distancia_remetido} mm` : ""}
      `,
      component: <TrappingComponent state={state} id_pedido={state.order?.id_pedido} trappingData={state.trappingData} updateState={updateState} workableId={state.workableId} nodeId={state.nodeId} loadingTrapping={state.loadingTrapping} isTrappingDone={state.isTrappingDone} isTrappingWaiting={state.isTrappingWaiting} isTrappingCanceled={state.isTrappingCanceled} />,
      data: state.trappingData
    },
    "salidaColores": {
      title: state.salidaColores.length > 0 ?
        `${state.salidaColores.map(color => color).join(", ")}` :
        "",
      component: <ColoresComponent state={state} updateState={updateState} formData={state.coloresForm} colores={state.orderColors} setColoresList={(value) => updateState("salidaColores", value)} inputData={state.coloresInputData} setInputData={(value) => updateState("coloresInputData", value)} />,
      data: state.salidaColores,
      noSave: true
    },
    "listDigimark": {
      title: state.listDigimark.length > 0 ?
        `${state.listDigimark.map(color => color).join(", ")}` :
        "",
      component: <ColoresComponent state={state} updateState={updateState} formData={state.coloresDigimarkForm} colores={state.orderColors} setColoresList={(value) => updateState("listDigimark", value)} inputData={state.digimarkInputData} setInputData={(value) => updateState("digimarkInputData", value)} />,
      data: state.listDigimark,
      noSave: true
    },
    "bocetos": {
      /*  title: state.bocetos.length === 1 ?
         `1 Boceto: ${state.bocetos[0].rasterizado ? `${state.bocetos[0].lpi} lpi, ` : ""}${state.bocetos[0].formato}, ${state.bocetos[0].tipo}` :
         state.bocetos.length > 1 ? `${state.bocetos.length} bocetos (Desplegar para ver más)` : "", */
      title: `Rasterizado: ${state.bocetos.some(boceto => boceto.rasterizado) ? 'Sí' : 'No'}`,
      component: <BocetoComponent opciones={state.bocetos} setOpciones={(value) => updateState("bocetos", value)} />,
      data: state.bocetos
    },
    "fichas": {
      /*  title: state.fichas.length === 1 ?
         `1 Ficha: ${state.fichas[0].rasterizado ? `${state.fichas[0].lpi} lpi, ` : ""}${state.fichas[0].formato}, ${state.fichas[0].tipo}` :
         state.fichas.length > 1 ? `${state.fichas.length} fichas (Desplegar para ver más)` : "", */
      title: `Rasterizado: ${state.fichas.some(ficha => ficha.rasterizado) ? 'Sí' : 'No'}`,
      component: <BocetoComponent opciones={state.fichas} setOpciones={(value) => updateState("fichas", value)} />,
      data: state.fichas
    },
    "plotter": {
      data: {
        plotterData: state.isActive.plotter ? true : false
      }
    },
    "posMacula": {
      component: <PosMaculaComponent state={state} updateState={updateState} />,
      data: state.posMacula
    },
    "montaje": {
      title: "",
      component: <MontajeComponent state={state} orderXml={state.orderXml} montajeData={state.montajeData} configAvanzadaData={state.configAvanzadaData} kioscoPersoData={state.kioscoPersoData} colores={state.orderColors} isActive={state.isActive} updateState={updateState} /* setMontajeData={(value) => updateState("montajeData", value)} setConfigAvanzadaData={(value) => updateState("configAvanzadaData", value)} setIsActive={(value) => updateState("isActive", value)} setIsOpen={(value) => updateState("isOpen", value)} */ />,
      data: state.montajeData,
      noSave: true
    },
    "kioscoPerso": {
      data: state.kioscoPersoData
    },
    "freecut": {
      title: state.freeCutColors.filter(color => color.check).length > 0 ?
        `${state.freeCutColors.filter(color => color.check).map(color => color.color).join(", ")}` :
        "",
      component: <FreecutComponent freecutData={state.freecutData} setFreecutData={(value) => updateState("freecutData", value)} colores={state.orderColors} freeCutColors={state.freeCutColors} setFreeCutColors={(value) => updateState("freeCutColors", value)} />,
      data: state.freecutData,
      noSave: true
    },
    "especial": {
      data: true
    },
    "configAvanzadaMontaje": {
      title: "",
      component: <MontajeAvanzadoComponent state={state} updateState={updateState} configAvanzadaData={state.configAvanzadaData} setConfigAvanzadaData={(value) => updateState("configAvanzadaData", value)} />,
      data: state.configAvanzadaData,
      noSave: true
    },
    "otraDocumentacion": {
      title: `Certificados: ${state.countOtraDoc.certificados || 0} | Etiquetas: ${state.countOtraDoc.etiquetas || 0} | Separaciones: ${state.otraDocumentacion.separaciones?.hacer ? 'Sí' : 'No'}`,
      component: <OtraDocComponent state={state} updateState={updateState} />,
      data: state.otraDocumentacion,
      noSave: true
    }
  };

  return (
    state.loading ? (
      <ExecutingComponent />
    ) : (
      <div className="detailsContainer">
        <ReactTooltip id="my-tooltip" />
        {(!configMode && state.unitarios.length > 0 || (configMode && state.cliente)) && !state.loading ? (
          <>
            <DetailsHeader
              title={
                configMode
                  ? `Config. Kiosco ${state.cliente?.name || ""}`
                  : `Kiosco ${state.order?.id_pedido || ""}`
              }
              subtitle={
                configMode ? "" : state.orderXml?.numero?.cliente_nombre || ""
              }
              insteadOfActions={
                <div className="formGroup">
                  <label>Configuración de Kiosco:</label>
                  <ChosenSelect
                    options={state.kioskOptions || []}
                    name="kioskSelect"
                    onChange={(e) => updateState("chosenKiosk", e.target.value)}
                    value={state.chosenKiosk || state.kioskOptions[0]}
                  />
                </div>
              }
            />
            <div className="detailsKiosk">
              <div className="detailsKioskHeader">
                {configMode && (
                  state.createKiosk ? (
                    <>
                      <button
                        className="submitButton"
                        onClick={() => {
                          updateState((prev) => ({ createKiosk: false, chosenKiosk: prev.defaultKiosk || {} }));
                        }}
                      >
                        Volver a modo edición
                      </button>
                      <div className="formGroup">
                        <label>Nombre de configuración:</label>
                        <input type="text" value={state.kioskName} onChange={(e) => updateState("kioskName", e.target.value)} />
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        className="submitButton"
                        onClick={() => {
                          const selectElement = document.querySelector('select[name="kioskSelect"]');
                          if (selectElement && typeof $(selectElement).chosen === "function") {
                            $(selectElement).chosen("destroy");
                          }
                          updateState("kioskName", "");
                          updateState("createKiosk", true);
                          updateState("chosenKiosk", {});
                          resetComponentesData();
                          updateState({ isOpen: {}, isActive: {} });
                        }}
                      >
                        Pasar a modo creación
                      </button>
                    </>
                  )
                )}
                {/* {!createKiosk && (
                  <div className="formGroup">
                    <label>Configuración de Kiosco:</label>
                    <ChosenSelect
                      options={kioskOptions || []}
                      name="kioskSelect"
                      onChange={(e) => { setChosenKiosk(e.target.value) }}
                      value={chosenKiosk}
                    />
                  </div>
                )} */}
              </div>
              {kioskActions
                .filter(option => {
                  const clientOk = (!option.specificClients || option.specificClients.includes(state.orderXml?.numero?.cliente_codigo));
                  if (!clientOk) return false;

                  if (configMode && option.hideWhenConfig) return false;

                  if (state.order && state.actividad === "MADERA" && option.id === "configAvanzadaMontaje") return false;

                  if (option.id === "salidaColores" && state.orderXml?.numero?.cliente_codigo === "0168") {
                    return state.isActive.plotter;
                  }

                  if (!option.onlyShowIfActive) return true;

                  return state.isActive[option.id];
                })
                .map((option, index) => (
                  ((!configMode && option.steps.includes(state.step)) || configMode) && (
                    <div className="kioskAction" key={option.id}>
                      <CabeceraModulos
                        state={state}
                        originalState={originalState}
                        updateState={updateState}
                        option={option}
                        components={components}
                        configMode={configMode}
                        handleReport={handleReport}
                      />
                      {state.isOpen[option.id] && (components[option.id].component)}
                    </div>
                  )
                ))}

              {/*  MADERA */}
              {maderaConfigBlocks.map((key) => {
                const openKey = `configAvanzada${key}`;
                const element = (state.configAvanzadaData || []).find((el) => el?.elementId === key);
                if (!element) return null;
                const elementArray = [element];

                return (
                  <div className="kioskAction" key={openKey}>
                    {/* <div className={`actionHeader ${state.isOpen[openKey] ? "open" : ""}`}>
                      <Switch className="kioskSwitch" checked={true} disabled />
                      <p>{key}</p>
                      <div></div>
                      <div className="openArrow">
                        {state.isOpen[openKey] ? (
                          <MdKeyboardArrowDown
                            className="openArrowIcon"
                            onClick={() => updateState("isOpen", (prevIsOpen) => ({
                              ...prevIsOpen,
                              [openKey]: !prevIsOpen[openKey]
                            }))}
                          />
                        ) : (
                          <MdKeyboardArrowRight
                            className="openArrowIcon"
                            onClick={() => updateState("isOpen", (prevIsOpen) => ({
                              ...prevIsOpen,
                              [openKey]: !prevIsOpen[openKey]
                            }))}
                          />
                        )}
                      </div>
                    </div> */}
                    <CabeceraModulos
                      state={state}
                      openKey={openKey}
                      originalState={originalState}
                      updateState={updateState}
                      option={element}
                      components={components}
                      configMode={configMode}
                      handleReport={handleReport}
                    />

                    {state.isOpen[openKey] && (
                      <MontajeAvanzadoComponent
                        state={state}
                        updateState={updateState}
                        configAvanzadaData={elementArray}
                        setConfigAvanzadaData={(value) => setConfigAvanzadaDataForElementId(key, value)}
                      />
                    )}
                  </div>
                );
              })}
              <div className="buttons">
                {!configMode ? (
                  !state.loadingTrapping && (
                    state.step === 1 ? <SubmitButton onClick={handleReport} text="Siguiente &#9658;" /> :
                      (state.step === 3 && !state.hideSubmitButton) ? <KioskSubmitButton state={state} updateState={updateState} buttonAction="submit" buttonText="Lanzar &#9658;" components={components} /> : null
                  )
                ) : (
                  <>
                    <KioskSubmitButton state={state} updateState={updateState} buttonAction="saveConfig" buttonText={state.createKiosk ? "Guardar nueva configuración" : "Editar configuración"} components={components} />
                    {!state.createKiosk && <button className="deleteButton" onClick={() => handleSubmit('deleteConfig')}>Borrar configuración de kiosco</button>}
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="executingContainer">
            <BlinkBlur variant="dotted" color="var(--highlight)" size="large" speedPlus="0" />
            <h1>Cargando</h1>
          </div>
        )}
        {state.infoPopUp && <InfoPopUp setInfoPopUp={(value) => updateState("infoPopUp", value)} infoContent={state.infoContent} />}
      </div>
    )
  )
}

export default OrderKiosk;