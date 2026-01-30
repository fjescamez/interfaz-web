import "./OrderKiosk.css";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import Switch from "@mui/material/Switch";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
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
import { HiOutlineRefresh } from "react-icons/hi";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ChosenSelect from "../components/formComponents/ChosenSelect";
import {
  handleExceptions,
  kioskConfigAuto,
  resetKiosk,
} from "../components/orderKioskComponents/configBehavior";
import { OrbitProgress } from "react-loading-indicators";
import PosMaculaComponent from "../components/orderKioskComponents/PosMaculaComponent";
import CheckSvg from "../assets/svg/CheckSvg";
import WarningSvg from "../assets/svg/WarningSvg";
import ErrorSvg from "../assets/svg/ErrorSvg";
import { FaPause } from "react-icons/fa6";
import SubmitButton from "../components/buttons/SubmitButton";

function OrderKiosk({ configMode }) {
  const { id } = useParams();
  const { tabs, createTab } = useTabs();
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

  const createDefaultStation = (orderBase, item) => ({
    _id: orderBase?._id || "",
    id_pedido: orderBase?.id_pedido || "",
    numeroPaginas: 1,
    OneUp: `${orderBase?.id_pedido} ${orderBase?.xml?.numero?.marca}` || "",
    PageBox: "TrimBox",
    PageIndex: 1,
    Orientation: {
      _id: "left",
      orientation: "left",
      textoOpcion: "Rotada -90º"
    },
    StartNewLane: true,
    HCount: item.madera_mvto_ancho || 1,
    HOffset: 0,
    HGap: item.madera_sepa_ancho ? item.madera_sepa_ancho : 0,
    VCount: item.madera_mvto_desarrollo || 1,
    VOffset: 0,
    VGap: item.madera_sepa_avance ? item.madera_sepa_avance : 0,
    StaggerDirection: "none",
    StaggerOffset: 0,
    RestartAfter: 0,
    HeadTurn: "none",
    BleedLimitLeft: 0,
    BleedLimitRight: 0,
    BleedLimitTop: 0,
    BleedLimitBottom: 0,
    unitarioUrl: state.order?.unitario || ""
  });

  useEffect(() => {
    updateState("order", null);
    const getOrder = async () => {
      const result = await fetchOneItem("orders/getOrder", id);
      updateState("order", result);
      updateState("orderXml", result.xml);
      updateState("actividad", result.xml?.actividad?.id || "");
      if (result.xml?.actividad?.id !== "MADERA") {
        updateState("configAvanzadaData", []);
      } else {
        const maderaElements =
          result?.xml?.actividad?.madera?.madera_premontaje?.map((item) => ({
            elementId: item?.madera_tmedida || "",
            stations: [createDefaultStation(result, item)]
          })) || [];
        updateState("configAvanzadaData", maderaElements);
      }
    };

    if (!configMode) getOrder();
  }, [id]);

  useEffect(() => {
    if (state.order && state.unitarioMetadata && state.unitarioMetadata.number_of_pages && state.orderXml?.actividad?.id !== "MADERA") {
      let HCount, HGap, VCount, VGap;
      const datosCarton = state.orderXml?.actividad?.carton;
      const datosFlexible = state.orderXml?.actividad?.flexible;
      const datosEtiquetas = state.orderXml?.actividad?.adhesivo;

      switch (state.actividad) {
        case "CARTON":
          VCount = datosCarton?.carton_motivos || 1;
          HCount = datosCarton?.carton_caidas || 1;
          break;
        case "FLEXIBLE":
          VCount = datosFlexible?.flexible_motivos || 1;
          HCount = datosFlexible?.flexible_caidas || 1;
          break;
        case "ETIQUETAS":
          HCount = datosEtiquetas?.adhesivo_mvto_avance || 1;
          HGap = datosEtiquetas?.adhesivo_sepa_avance || 0;
          VCount = datosEtiquetas?.adhesivo_mvto_ancho || 1;
          VGap = datosEtiquetas?.adhesivo_sepa_ancho || 0;
          break;

        default:
          break;
      }

      const numberOfPages = state.unitarioMetadata.number_of_pages;
      const stations = Array.from({ length: numberOfPages }, (_, index) => {
        const pageIndex = index + 1;
        return {
          _id: state.order?._id || "",
          id_pedido: state.order?.id_pedido || "",
          numeroPaginas: numberOfPages,
          OneUp: `${state.order?.id_pedido} ${state.order?.xml?.numero?.marca}` || "",
          PageBox: "TrimBox",
          PageIndex: pageIndex,
          Orientation: {
            _id: "up",
            orientation: "up",
            textoOpcion: "Original"
          },
          StartNewLane: true,
          HCount,
          HOffset: 0,
          HGap: HGap || 0,
          VCount,
          VOffset: 0,
          VGap: VGap || 0,
          StaggerDirection: "none",
          StaggerOffset: 0,
          RestartAfter: 0,
          HeadTurn: "none",
          BleedLimitLeft: 0,
          BleedLimitRight: 0,
          BleedLimitTop: 0,
          BleedLimitBottom: 0,
          unitarioUrl: state.order?.unitario || ""
        };
      });

      updateState("configAvanzadaData", [
        {
          elementId: state.order?.id_pedido || state.order?._id || "",
          stations
        }
      ]);
    }
  }, [state.unitarioMetadata, state.order, state.actividad]);

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

  useEffect(() => {
    const getOrderColors = async () => {
      const response = await fetchData("colors", state.order?.unitario);
      updateState("orderColors", response.map(color => {
        return color.color;
      }));
      updateState("orderColorsObjects", response);
    }

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
      if (state.order?.unitario) {
        getOrderColors();
      }
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
            setIsActive: (updater) => updateState("isActive", updater),
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

    if (state.orderXml?.tecnicos && state.orderXml?.tecnicos?.trapping !== " ") {
      const trapping = state.orderXml?.tecnicos?.trapping.replace(",", ".").split(" ")[0];

      updateState("trappingData", {
        ...state.trappingData,
        distancia_trapping: trapping
      });
    }
  }, [state.chosenKiosk, state.orderXml, state.actividad, state.orderColorsObjects]);

  useEffect(() => {
    const shouldEnablePosMacula = Boolean(state.isActive?.plotter || state.isActive?.fichas);

    updateState("isActive", (prevIsActive) => {
      if (prevIsActive?.posMacula === shouldEnablePosMacula) return prevIsActive;

      return {
        ...prevIsActive,
        posMacula: shouldEnablePosMacula
      };
    });
  }, [state.isActive?.plotter, state.isActive?.fichas, state.isActive?.posMacula]);

  useEffect(() => {
    const generateColoresForm = () => {
      const formSections = [
        {
          rows: [
            ...state.orderColors.map((color) => {
              return {
                groups: [color]
              }
            })
          ]
        }
      ];

      updateState("coloresForm", {
        formSections,
        formFields: [
          ...state.orderColors.map((color) => ({
            htmlFor: `${color}`,
            labelId: `${color}Label`,
            labelTitle: `${color}`,
            inputType: "checkbox",
            inputId: `${color}`,
            inputName: `${color}`
          }))
        ]
      });
    };

    const generateColoresDigimarkForm = () => {
      const formSections = [
        {
          rows: [
            ...state.orderColors.map((color) => {
              return {
                groups: [`${color}_Digimark`]
              }
            })
          ]
        }
      ];

      updateState("coloresDigimarkForm", {
        formSections,
        formFields: state.orderColors.map((color) => ({
          htmlFor: `${color}_Digimark`,
          labelId: `${color}_DigimarkLabel`,
          labelTitle: `${color}`,
          inputType: "checkbox",
          inputId: `${color}_Digimark`,
          inputName: `${color}_Digimark`
        }))
      });
    };

    if (state.orderColors.length > 0) {
      generateColoresForm();
      generateColoresDigimarkForm();
    }
  }, [state.orderColors]);

  useEffect(() => {
    if (state.orderColorsObjects.length > 0) {
      updateState("freeCutColors", state.orderColorsObjects.map(color => ({
        check: false,
        color: color.color,
        distancia: "0",
        caidas: "CORTADAS",
        plancha: color.planchaArchivo || ""
      })));
    }
  }, [state.orderColorsObjects]);

  // Control de errores trapping
  useEffect(() => {
    // Mensajes de error
    if (state.trappingData.manual) {
      updateState("orderReport", (prevOrderReport) => prevOrderReport.filter(item => !item?.type?.includes("trapping") && item?.status !== "warning"));
    } else {
      const error1 = {
        status: "warning",
        message: "No hay distancia de trapping ni remetido",
        type: ["trapping"]
      };
      const error2 = {
        status: "warning",
        message: "Se ha indicado remetido pero no se ha indicado distancia de remetido",
        type: ["trapping"]
      };

      updateState("orderReport", (prevOrderReport) => {
        let next = prevOrderReport;
        // Añadir error1 si corresponde
        if ((state.trappingData.distancia_trapping === "0" || state.trappingData.distancia_trapping === "") && state.trappingData.remetido === "No") {
          const exists = prevOrderReport.some(item => item.message === error1.message && JSON.stringify(item.type) === JSON.stringify(error1.type));
          if (!exists) next = [...next, error1];
        } else {
          // Eliminar error1 si ya no corresponde
          next = next.filter(item => !(item.message === error1.message && JSON.stringify(item.type) === JSON.stringify(error1.type)));
        }
        // Añadir error2 si corresponde
        if (state.trappingData.remetido !== "No" && (state.trappingData.distancia_remetido === "0" || state.trappingData.distancia_remetido === "")) {
          const exists = next.some(item => item.message === error2.message && JSON.stringify(item.type) === JSON.stringify(error2.type));
          if (!exists) next = [...next, error2];
        } else {
          // Eliminar error2 si ya no corresponde
          next = next.filter(item => !(item.message === error2.message && JSON.stringify(item.type) === JSON.stringify(error2.type)));
        }
        return next;
      });
    }
  }, [state.trappingData]);

  useEffect(() => {
    if (!state.isActive?.posMacula) return;

    const errorPosMacula = {
      status: "error",
      message: "No hay posición de mácula seleccionada",
      type: ["posMacula"]
    };

    const hasValue = String(state.posMacula ?? "").trim() !== "";

    updateState("orderReport", (prevOrderReport) => {
      let next = prevOrderReport;

      if (!hasValue) {
        const exists = prevOrderReport.some(
          (item) => item.message === errorPosMacula.message && JSON.stringify(item.type) === JSON.stringify(errorPosMacula.type)
        );
        if (!exists) next = [...next, errorPosMacula];
      } else {
        next = next.filter(
          (item) => !(item.message === errorPosMacula.message && JSON.stringify(item.type) === JSON.stringify(errorPosMacula.type))
        );
      }

      return next;
    });
  }, [state.posMacula, state.isActive?.posMacula]);

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
      component: <TrappingComponent id_pedido={state.order?.id_pedido} trappingData={state.trappingData} updateState={updateState} workableId={state.workableId} nodeId={state.nodeId} loadingTrapping={state.loadingTrapping} isTrappingDone={state.isTrappingDone} isTrappingWaiting={state.isTrappingWaiting} isTrappingCanceled={state.isTrappingCanceled} />,
      data: state.trappingData
    },
    "salidaColores": {
      title: state.salidaColores.length > 0 ?
        `${state.salidaColores.map(color => color).join(", ")}` :
        "",
      component: <ColoresComponent formData={state.coloresForm} colores={state.orderColors} setColoresList={(value) => updateState("salidaColores", value)} inputData={state.coloresInputData} setInputData={(value) => updateState("coloresInputData", value)} />,
      data: state.salidaColores,
      noSave: true
    },
    "listDigimark": {
      title: state.listDigimark.length > 0 ?
        `${state.listDigimark.map(color => color).join(", ")}` :
        "",
      component: <ColoresComponent formData={state.coloresDigimarkForm} colores={state.orderColors} setColoresList={(value) => updateState("listDigimark", value)} inputData={state.digimarkInputData} setInputData={(value) => updateState("digimarkInputData", value)} />,
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
      component: <PosMaculaComponent posMacula={state.posMacula} setPosMacula={(value) => updateState("posMacula", value)} />,
      data: state.posMacula
    },
    "montaje": {
      title: "",
      component: <MontajeComponent orderXml={state.orderXml} montajeData={state.montajeData} configAvanzadaData={state.configAvanzadaData} kioscoPersoData={state.kioscoPersoData} colores={state.orderColors} isActive={state.isActive} updateState={updateState} /* setMontajeData={(value) => updateState("montajeData", value)} setConfigAvanzadaData={(value) => updateState("configAvanzadaData", value)} setIsActive={(value) => updateState("isActive", value)} setIsOpen={(value) => updateState("isOpen", value)} */ />,
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
      component: <MontajeAvanzadoComponent actividad={state.actividad} configAvanzadaData={state.configAvanzadaData} setConfigAvanzadaData={(value) => updateState("configAvanzadaData", value)} />,
      data: state.configAvanzadaData,
      noSave: true
    },
    "otraDocumentacion": {
      title: `Certificados: ${state.countOtraDoc.certificados || 0} | Etiquetas: ${state.countOtraDoc.etiquetas || 0} | Separaciones: ${state.otraDocumentacion.separaciones?.hacer ? 'Sí' : 'No'}`,
      component: <OtraDocComponent otraDocumentacion={state.otraDocumentacion} setOtraDocumentacion={(value) => updateState("otraDocumentacion", value)} setCountOtraDoc={(value) => updateState("countOtraDoc", value)} />,
      data: state.otraDocumentacion,
      noSave: true
    }
  }

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

  const handleSubmit = async (action) => {
    let dataToSend = {
      _id: state.order?._id || "",
      id_pedido: state.order?.id_pedido || ""
    };

    if (action === "submit") {
      dataToSend.salidaColores = state.salidaColores || [];
      dataToSend.listDigimark = state.listDigimark || [];
      dataToSend.listMontajes = Object.keys(state.montajeData || {}).filter((key) => state.montajeData[key]?.isActive) || [];

      Object.keys(state.isActive).forEach(key => {
        if (state.isActive[key]) {
          dataToSend[key] = components[key].data;
        }
      });
    } else if (action === "saveConfig") {
      Object.keys(components).forEach(key => {
        if (!components[key].noSave) {
          dataToSend[key] = components[key].data;
        }
      });
    }

    // En MADERA la config avanzada se activa por elemento desde "Montaje",
    // no desde el switch general de kioskActions.
    if (state.actividad === "MADERA") {
      const activeConfigKeys = Object.keys(state.montajeData || {}).filter((key) => {
        const item = state.montajeData?.[key];
        return item?.isActive && item?.isConfigAvanzadaActive;
      });

      if (activeConfigKeys.length > 0) {
        dataToSend.configAvanzadaMontaje = (state.configAvanzadaData || []).filter((el) =>
          activeConfigKeys.includes(el?.elementId)
        );
      }
    }

    if (action === "submit") {
      if (state.isActive.trapping && !state.isTrappingDone) {
        updateState("loadingTrapping", true);
        dataToSend.holdInKiosk = true;
      } else {
        updateState("loading", true);
      }

      const result = await postData("orderKiosks/kioscoPedidoAuto", dataToSend);
      if (result.status === "success") {
        if (result.workable_id && result.node_id) {
          updateState("workableId", result.workable_id);
          updateState("nodeId", result.node_id);
          updateState("isTrappingWaiting", true);
          updateState("isOpen", (prevIsOpen) => ({
            ...prevIsOpen,
            trapping: true
          }));
        }
        notify("success", result.title, result.message);
      } else {
        notify("error", result.title, result.message);
      }
      console.log(dataToSend);

    } else if (action === "saveConfig") {
      const activosDefault = Object.keys(state.isActive).filter(key => state.isActive[key]);
      const abiertosDefault = Object.keys(state.isOpen).filter(key => state.isOpen[key]);
      const datosDefault = dataToSend;

      const data = {
        cliente_id: state.cliente._id || "",
        nombre: state.kioskName || "",
        activosDefault,
        abiertosDefault,
        datosDefault
      }

      const result = await postData("clientConfig/update", data);
      if (result.status === "success") {
        notify("success", "Configuración guardada", "La configuración del kiosco se ha guardado correctamente para este cliente.");
        /* closeTab(location.pathname); */
      } else {
        notify("error", "Error al guardar", "Ha ocurrido un error al guardar la configuración del kiosco para este cliente.");
      }
    } else if (action === "deleteConfig") {
      const result = await postData("clientConfig/delete", { cliente_id: state.cliente._id, key: "kioscos", nombre: state.chosenKiosk.nombre || null });

      if (result.status === "success") {
        notify(result.status, result.title, result.message);
        /* closeTab(location.pathname); */
      } else if (result.status === "warning") {
        notify(result.status, result.title, result.message);
      }
    }

    updateState("loadingTrapping", false);
    updateState("loading", false);
  };

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
      updateState("isTrappingDone", false);
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

        return {
          fileReport: nextFileReport,
          loadingFileReport: false,
          reportModification: res.modification || null,
          unitarioMetadata: {
            number_of_pages: res.number_of_pages || 1
          },
          step: canAdvance ? 3 : prev.step
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

  const navigateToConfig = () => {
    const path = `/cliente/${state.cliente._id}/kioscoConfig`;

    createTab(path, `CONFIG. KIOSCO ${state.cliente?.name || ""}`);
  }

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

                  if (!option.onlyShowIfActive) return true;

                  return state.isActive[option.id];
                })
                .map((option, index) => (
                  ((!configMode && option.steps.includes(state.step)) || configMode) && (
                    <div className="kioskAction" key={option.id}>
                      <div className={`actionHeader ${state.isOpen[option.id] ? "open" : ""}`}>
                        <Switch
                          className="kioskSwitch"
                          checked={state.isActive[option.id] || false}
                          disabled={option.disableSwitch || false}
                          onClick={() => {
                            if ((option.id === "salidaColores" || option.id === "listDigimark") && state.orderColors.length === 0) {
                              notify("warning", "Sin colores", "Este pedido no tiene colores");
                            } else {
                              if (state.isActive[option.id] && state.isOpen[option.id]) {
                                updateState("isOpen", (prevIsOpen) => ({
                                  ...prevIsOpen,
                                  [option.id]: false
                                }));
                              }

                              if (!state.isActive[option.id] && option.openOnActive) {
                                updateState("isOpen", (prevIsOpen) => ({
                                  ...prevIsOpen,
                                  [option.id]: true
                                }));
                              }

                              updateState("isActive", (prevIsActive) => ({
                                ...prevIsActive,
                                [option.id]: !prevIsActive[option.id]
                              }));

                              handleExceptions({
                                module: option.id,
                                isActive: state.isActive,
                                setIsActive: (updater) => updateState("isActive", updater),
                                actividad: state.actividad,
                                cliente: state.cliente,
                                setOtraDocumentacion: (updater) => updateState("otraDocumentacion", updater)
                              });
                            }
                          }}
                        />
                        <p>{option.title} <span>{state.isActive[option.id] && components[option.id]?.title || ""}</span></p>
                        {!configMode && (state.orderReport.some(item => item.type && item.type.includes(option.id)) || state.fileReport.some(item => item.type && item.type.includes(option.id))) ? (
                          <div
                            className="warning"
                            onClick={() => {
                              updateState("infoContent", state.orderReport.concat(state.fileReport)
                                .filter(item => item.type && item.type.includes(option.id))
                                .map(item => {
                                  const icon = item.status === "success" || item.status === "info" ? <CheckSvg /> :
                                    item.status === "warning" ? <WarningSvg /> :
                                      <ErrorSvg />;
                                  return (<p>{icon} {item.message}</p>)
                                }));
                              updateState("infoPopUp", true);
                            }}
                          >
                            <div className="warningContent">
                              <p>{state.orderReport.concat(state.fileReport)
                                .filter(item => item.type && item.type.includes(option.id))
                                .length}</p>
                              {state.orderReport.concat(state.fileReport)
                                .filter(item => item.type && item.type.includes(option.id))
                                .some(item => item.status === "error") ? (
                                <IoWarningOutline className="errorIcon" />
                              ) : (
                                <IoWarningOutline className="warningIcon" />
                              )}
                            </div>
                          </div>
                        ) : (
                          option.id === "unitario" || option.id === "reportePrevio" ? (
                            <div
                              className="warning"
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content={
                                option.id === "unitario" ?
                                  (!state.loadingFileReport && !state.loadingOrderReport ? "Reiniciar unitario" : "Generando reporte previo, espere...") :
                                  (!state.loadingFileReport && !state.loadingOrderReport ? "Reenviar reporte previo" : "Generando reporte previo, espere...")
                              }
                              onClick={() => {
                                if (!state.loadingFileReport && !state.loadingOrderReport) {
                                  if (option.id === "unitario") {
                                    updateState((prev) => ({
                                      step: 1,
                                      isOpen: {
                                        ...prev.isOpen,
                                        "unitario": true
                                      },
                                      orderReport: prev.orderReport.filter(item => (item.type && item.type.includes("trapping"))),
                                      fileReport: []
                                    }));
                                  } else if (option.id === "reportePrevio") {
                                    updateState("isOpen", (prevIsOpen) => ({
                                      ...prevIsOpen,
                                      "reportePrevio": true
                                    }));
                                    handleReport("forceReport");
                                  }
                                } else {
                                  notify("warning", "Reporte en curso", "Espere a que termine el reporte en curso");
                                }
                              }}
                            >
                              {((state.loadingOrderReport || state.loadingFileReport) && option.id === "reportePrevio") ? (
                                <OrbitProgress variant="dotted" color={"var(--highlight)"} size="small" />
                              ) : (
                                <HiOutlineRefresh className="refreshIcon" />
                              )}
                            </div>
                          ) : (
                            <div>
                              {state.loadingTrapping && option.id === "trapping" && <OrbitProgress variant="dotted" color={"var(--highlight)"} size="small" />}
                              {state.isTrappingWaiting && !state.loadingTrapping && option.id === "trapping" && <FaPause color={"var(--highlight)"} />}
                              {state.isTrappingDone && !state.loadingTrapping && option.id === "trapping" && <CheckSvg />}
                              {state.isTrappingCanceled && !state.loadingTrapping && option.id === "trapping" && <ErrorSvg />}
                            </div>
                          )
                        )
                        }
                        <div className="openArrow">
                          {state.isOpen[option.id] ?
                            <MdKeyboardArrowDown
                              className="openArrowIcon"
                              onClick={() =>
                                updateState("isOpen", (prevIsOpen) => ({
                                  ...prevIsOpen,
                                  [option.id]: !prevIsOpen[option.id]
                                }))
                              } />
                            :
                            <MdKeyboardArrowRight
                              className="openArrowIcon"
                              onClick={() => {
                                if (!(option.id === "unitario" && state.step > 1) && !option.disableOpen) {
                                  updateState("isOpen", (prevIsOpen) => ({
                                    ...prevIsOpen,
                                    [option.id]: !prevIsOpen[option.id]
                                  }))
                                }
                              }} />}
                        </div>
                      </div>
                      {state.isOpen[option.id] && (components[option.id].component)}
                    </div>
                  )
                ))}

              {maderaConfigBlocks.map((key) => {
                const openKey = `configAvanzada${key}`;
                const element = (state.configAvanzadaData || []).find((el) => el?.elementId === key);
                if (!element) return null;
                const elementArray = [element];

                return (
                  <div className="kioskAction" key={openKey}>
                    <div className={`actionHeader ${state.isOpen[openKey] ? "open" : ""}`}>
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
                    </div>

                    {state.isOpen[openKey] && (
                      <MontajeAvanzadoComponent
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
                    state.step === 1 ? <SubmitButton onClick={handleReport} text="Preparar &#9658;" /> :
                      state.step === 3 && <button className="playButton" onClick={() => handleSubmit('submit')}>Lanzar &#9658;</button>
                  )
                ) : (
                  <>
                    <SubmitButton onClick={() => handleSubmit('saveConfig')} text={state.createKiosk ? "Guardar nueva configuración" : "Editar configuración"} />
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

export default OrderKiosk