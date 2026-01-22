import "./OrderKiosk.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { IoWarningOutline, IoRefresh } from "react-icons/io5";
import { kioskActions } from "../helpers/orderKioskActions";
import { BlinkBlur } from "react-loading-indicators";
import { FaGear } from 'react-icons/fa6';
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
import { toast } from "react-toastify";
import MontajeAvanzadoComponent from "../components/orderKioskComponents/MontajeAvanzadoComponent";
import ExecutingComponent from "../components/ExecutingComponent";
import "./HomePage.css";
import { useTabs } from "../context/TabsContext";
import { useNavigate, useLocation } from 'react-router-dom';
import ReporteComponent from "../components/orderKioskComponents/ReporteComponent";
import { useSession } from "../context/SessionContext";
import InfoPopUp from "../components/InfoPopUp";
import { HiOutlineRefresh } from "react-icons/hi";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ChosenSelect from "../components/formComponents/ChosenSelect";
import { handleExceptions, kioskConfigAuto, kioskConfigManual } from "../components/orderKioskComponents/configBehavior";
import { OrbitProgress } from "react-loading-indicators";

function OrderKiosk({ configMode }) {
  const { id } = useParams();
  const { setTabs, tabs, closeTab } = useTabs();
  const navigate = useNavigate();
  const location = useLocation();
  const [kioskName, setKioskName] = useState("");
  const [createKiosk, setCreateKiosk] = useState(false);
  const [kioskOptions, setKioskOptions] = useState([
    "Automática",
    "Manual"
  ]);
  const [chosenKiosk, setChosenKiosk] = useState({});
  const [defaultKiosk, setDefaultKiosk] = useState({});
  const [step, setStep] = useState(1);
  const [loadingOrderReport, setLoadingOrderReport] = useState(false);
  const [loadingFileReport, setLoadingFileReport] = useState(false);
  const [orderReport, setOrderReport] = useState([]);
  const [fileReport, setFileReport] = useState([]);
  const [reportModification, setReportModification] = useState(null);
  const [reportWarnings, setReportWarnings] = useState(0);
  const [reportErrors, setReportErrors] = useState(0);
  const [reportFixes, setReportFixes] = useState(0);
  const [infoPopUp, setInfoPopUp] = useState(false);
  const [infoContent, setInfoContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [orderXml, setOrderXml] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [unitarioMetadata, setUnitarioMetadata] = useState({});
  const { session } = useSession();
  const [isOpen, setIsOpen] = useState({
    "unitario": true,
    "reportePrevio": true
  });
  const [isActive, setIsActive] = useState({
    "unitario": true,
    "reportePrevio": true,
  });
  const [orderColors, setOrderColors] = useState([]);
  const [orderColorsObjects, setOrderColorsObjects] = useState([]);
  const [unitarios, setUnitarios] = useState([]);
  const [unitarioData, setUnitarioData] = useState(null);
  const [trappingData, setTrappingData] = useState({
    distancia_trapping: "0",
    intensidad: 100,
    remetido: "No",
    distancia_remetido: "0"
  });
  const [bocetos, setBocetos] = useState([
    { id: 0, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }
  ]);
  const [fichas, setFichas] = useState([
    { id: 0, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }
  ]);
  const [freecutData, setFreecutData] = useState({});
  const [freeCutColors, setFreecutColors] = useState([]);
  const [montajeData, setMontajeData] = useState([]);
  //const [montajeMaderaData, setMontajeMaderaData] = useState([]);
  const [otraDocumentacion, setOtraDocumentacion] = useState({});
  const [coloresCambiar, setColoresCambiar] = useState([]);
  const [coloresDigimark, setColoresDigimark] = useState([]);
  const [coloresForm, setColoresForm] = useState(undefined);
  const [coloresInputData, setColoresInputData] = useState({});
  const [coloresDigimarkForm, setColoresDigimarkForm] = useState(undefined);
  const [digimarkInputData, setDigimarkInputData] = useState({});
  const [configAvanzadaData, setConfigAvanzadaData] = useState([]);
  const [actividad, setActividad] = useState("");

  const createDefaultStation = (orderBase, item) => ({
    _id: orderBase?._id || "",
    id_pedido: orderBase?.id_pedido || "",
    numeroPaginas: 1,
    OneUp: `${orderBase?.id_pedido} ${orderBase?.xml?.numero?.marca}` || "",
    PageBox: "TrimBox",
    PageIndex: 1,
    Orientation: "left",
    StartNewLane: true,
    HCount: item.madera_mvto_ancho || 1,
    HOffset: 0,
    HGap: item.madera_sepa_ancho || 0,
    VCount: item.madera_mvto_desarrollo || 1,
    VOffset: 0,
    VGap: item.madera_sepa_avance || 0,
    StaggerDirection: "none",
    StaggerOffset: 0,
    RestartAfter: 0,
    HeadTurn: "none",
    BleedLimitLeft: 0,
    BleedLimitRight: 0,
    BleedLimitTop: 0,
    BleedLimitBottom: 0
  });

  useEffect(() => {
    setOrder(null);
    const getOrder = async () => {
      const result = await fetchOneItem("orders/getOrder", id);
      setOrder(result);
      setOrderXml(result.xml);
      setActividad(result.xml?.actividad?.id || "");
      if (result.xml?.actividad?.id !== "MADERA") {
        setConfigAvanzadaData([]);
      } else {
        const maderaElements =
          result?.xml?.actividad?.madera?.madera_premontaje?.map((item) => ({
            elementId: item?.madera_tmedida || "",
            stations: [createDefaultStation(result, item)]
          })) || [];
        setConfigAvanzadaData(maderaElements);
      }
    };

    if (!configMode) getOrder();
  }, [id]);

  useEffect(() => {
    if (order && unitarioMetadata && unitarioMetadata.number_of_pages && orderXml?.actividad?.id !== "MADERA") {
      let HCount, HGap, VCount, VGap;
      const datosCarton = orderXml?.actividad?.carton;
      const datosFlexible = orderXml?.actividad?.flexible;
      const datosEtiquetas = orderXml?.actividad?.adhesivo;

      switch (actividad) {
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

      const numberOfPages = unitarioMetadata.number_of_pages;
      const stations = Array.from({ length: numberOfPages }, (_, index) => {
        const pageIndex = index + 1;
        return {
          _id: order?._id || "",
          id_pedido: order?.id_pedido || "",
          numeroPaginas: numberOfPages,
          OneUp: `${order?.id_pedido} ${order?.xml?.numero?.marca}` || "",
          PageBox: "TrimBox",
          PageIndex: pageIndex,
          Orientation: "up",
          StartNewLane: true,
          HCount,
          HOffset: 0,
          HGap,
          VCount,
          VOffset: 0,
          VGap,
          StaggerDirection: "none",
          StaggerOffset: 0,
          RestartAfter: 0,
          HeadTurn: "none",
          BleedLimitLeft: 0,
          BleedLimitRight: 0,
          BleedLimitTop: 0,
          BleedLimitBottom: 0
        };
      });

      setConfigAvanzadaData([
        {
          elementId: order?.id_pedido || order?._id || "",
          stations
        }
      ]);
    }
  }, [unitarioMetadata, order, actividad]);

  useEffect(() => {
    const getOrderColors = async () => {
      const response = await fetchData("colors", order?.unitario);
      setOrderColors(response.map(color => {
        return color.color;
      }));
      setOrderColorsObjects(response);
    }

    const getUnitarios = async () => {
      const result = await postData("orderKiosks/getUnitario", order);

      setUnitarios(result.options);

      let unitarioDefault = "";

      if (result.options.filter(option => option.type === "Packz") && result.options.filter(option => option.type === "Packz").length === 1) {
        unitarioDefault = result.options.filter(option => option.type === "Packz")[0];
      } else if (result.options.filter(option => option.type === "Illustrator") && result.options.filter(option => option.type === "Illustrator").length === 1 && result.options.filter(option => option.type === "Packz").length === 0) {
        unitarioDefault = result.options.filter(option => option.type === "Illustrator")[0];
      }

      setUnitarioData({
        archivo: unitarioDefault
      });
    }

    const getClienteConfig = async () => {
      let resultados = [];
      let cliente_id = id;
      let cliente_codigo = "";

      if (orderXml?.numero) {
        cliente_codigo = orderXml.numero.cliente_codigo || "";
        resultados = await fetchData("clients", cliente_codigo);
        setCliente(resultados[0] || {});
        cliente_id = resultados[0]?._id || "";
      }

      if (configMode) {
        const cliente = await fetchOneItem("clients", id);
        setCliente(cliente.results || {});
      }

      if (cliente_id !== "") {
        const clientConfig = await fetchData("clientConfig", cliente_id);

        if (clientConfig && clientConfig?.configuraciones?.kioscos.length > 0) {
          const kioscoDefault = clientConfig.configuraciones.kioscos.find(kiosk => kiosk.kioscoDefault === true) || clientConfig.configuraciones.kioscos[0];

          setKioskOptions(prevOptions => [
            ...prevOptions,
            ...clientConfig.configuraciones.kioscos.map(kiosk => ({
              ...kiosk,
              textoOpcion: kiosk.nombre
            }))
          ]);
          setDefaultKiosk(kioscoDefault);
          setChosenKiosk(kioscoDefault);
        } else {
          setDefaultKiosk(kioskOptions[0]);
          setChosenKiosk(kioskOptions[0]);
        }
      }
    }

    getClienteConfig();

    if (order?.unitario) {
      getOrderColors();
      getUnitarios();
    }
  }, [order]);

  useEffect(() => {
    if (chosenKiosk !== "Automática" && chosenKiosk !== "Manual") {
      const activosDefault = chosenKiosk?.activosDefault || [];
      const abiertosDefault = chosenKiosk?.abiertosDefault || [];

      if (chosenKiosk?.activosDefault?.length > 0) {
        setIsActive((prev) => {
          const newIsActive = {};
          activosDefault.forEach((item) => {
            newIsActive[item] = true;
          });
          return { ...prev, ...newIsActive };
        });
      }

      if (chosenKiosk?.abiertosDefault?.length > 0) {
        setIsOpen((prev) => {
          const newIsOpen = {};
          abiertosDefault.forEach((item) => {
            newIsOpen[item] = true;
          });
          return { ...prev, ...newIsOpen };
        });
      }

      const datosDefault = chosenKiosk?.datosDefault || {};

      if (datosDefault.trapping && Object.keys(datosDefault.trapping).length > 0) {
        setTrappingData(datosDefault.trapping);
      }

      if (datosDefault.bocetos && datosDefault.bocetos.length > 0) {
        setBocetos(datosDefault.bocetos);
      }

      if (datosDefault.fichas && datosDefault.fichas.length > 0) {
        setFichas(datosDefault.fichas);
      }
    } else {
      if (orderXml && actividad) {
        if (chosenKiosk === "Automática") {
          kioskConfigAuto({ orderXml, actividad, setIsActive, setOtraDocumentacion, orderColorsObjects });
        } else if (chosenKiosk === "Manual") {
          kioskConfigManual({ setIsActive });
        }
      }
    }


  }, [chosenKiosk, orderXml, actividad, orderColorsObjects]);

  useEffect(() => {
    const generateColoresForm = () => {
      const formSections = [
        {
          rows: [
            ...orderColors.map((color) => {
              return {
                groups: [color]
              }
            })
          ]
        }
      ];

      setColoresForm({
        formSections,
        formFields: [
          ...orderColors.map((color) => ({
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
            ...orderColors.map((color) => {
              return {
                groups: [`${color}_Digimark`]
              }
            })
          ]
        }
      ];

      setColoresDigimarkForm({
        formSections,
        formFields: orderColors.map((color) => ({
          htmlFor: `${color}_Digimark`,
          labelId: `${color}_DigimarkLabel`,
          labelTitle: `${color}`,
          inputType: "checkbox",
          inputId: `${color}_Digimark`,
          inputName: `${color}_Digimark`
        }))
      });
    };

    if (orderColors.length > 0) {
      generateColoresForm();
      generateColoresDigimarkForm();
    }
  }, [orderColors]);

  useEffect(() => {
    if (orderColors.length > 0) {
      setFreecutColors(orderColors.map(color => ({
        checked: false,
        color,
        des_vert: "0",
        caidas: "Cortadas"
      })));
    }
  }, [orderColors]);

  // Control de errores trapping
  useEffect(() => {
    // Mensajes de error
    if (trappingData.manual) {
      setOrderReport(prev => prev.filter(item => !item?.type?.includes("trapping") && item?.status !== "warning"));
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

      setOrderReport(prev => {
        let next = prev;
        // Añadir error1 si corresponde
        if ((trappingData.distancia_trapping === "0" || trappingData.distancia_trapping === "") && trappingData.remetido === "No") {
          const exists = prev.some(item => item.message === error1.message && JSON.stringify(item.type) === JSON.stringify(error1.type));
          if (!exists) next = [...next, error1];
        } else {
          // Eliminar error1 si ya no corresponde
          next = next.filter(item => !(item.message === error1.message && JSON.stringify(item.type) === JSON.stringify(error1.type)));
        }
        // Añadir error2 si corresponde
        if (trappingData.remetido !== "No" && (trappingData.distancia_remetido === "0" || trappingData.distancia_remetido === "")) {
          const exists = next.some(item => item.message === error2.message && JSON.stringify(item.type) === JSON.stringify(error2.type));
          if (!exists) next = [...next, error2];
        } else {
          // Eliminar error2 si ya no corresponde
          next = next.filter(item => !(item.message === error2.message && JSON.stringify(item.type) === JSON.stringify(error2.type)));
        }
        return next;
      });
    }
  }, [trappingData]);

  const components = {
    "unitario": {
      title: `${unitarioData?.archivo?.name || ""} - ${unitarioData?.archivo?.type || ""}`,
      component: <UnitarioComponent unitarios={unitarios} unitarioData={unitarioData} setUnitarioData={setUnitarioData} order={order} />,
      data: unitarioData?.archivo,
      noSave: true
    },
    "reportePrevio": {
      title: (!loadingFileReport && !loadingOrderReport ? (reportErrors + reportWarnings === 0 ? "Sin errores ni advertencias" : `Correcciones: ${reportFixes} | Advertencias: ${reportWarnings} | Errores: ${reportErrors} `) : ""),
      component: <ReporteComponent loadingOrderReport={loadingOrderReport} loadingFileReport={loadingFileReport} orderReport={orderReport} fileReport={fileReport} reportModification={reportModification} setInfoPopUp={setInfoPopUp} setInfoContent={setInfoContent} />,
      data: orderReport,
      noSave: true
    },
    "trapping": {
      title: trappingData.manual ? "Manual" : `
      ${trappingData.distancia_trapping} mm,
      ${trappingData.intensidad}%,
      ${trappingData.remetido}${trappingData.remetido !== "No" ? `, ${trappingData.distancia_remetido} mm` : ""}
      `,
      component: <TrappingComponent trappingData={trappingData} setTrappingData={setTrappingData} />,
      data: trappingData
    },
    "salidaColores": {
      title: coloresCambiar.length > 0 ?
        `${coloresCambiar.map(color => color).join(", ")}` :
        "",
      component: <ColoresComponent formData={coloresForm} colores={orderColors} setColoresList={setColoresCambiar} inputData={coloresInputData} setInputData={setColoresInputData} />,
      data: coloresCambiar,
      noSave: true
    },
    "listDigimark": {
      title: coloresDigimark.length > 0 ?
        `${coloresDigimark.map(color => color).join(", ")}` :
        "",
      component: <ColoresComponent formData={coloresDigimarkForm} colores={orderColors} setColoresList={setColoresDigimark} inputData={digimarkInputData} setInputData={setDigimarkInputData} />,
      data: coloresDigimark,
      noSave: true
    },
    "bocetos": {
      title: bocetos.length === 1 ?
        `1 Boceto: ${bocetos[0].rasterizado ? `${bocetos[0].lpi} lpi, ` : ""}${bocetos[0].formato}, ${bocetos[0].tipo}` :
        bocetos.length > 1 ? `${bocetos.length} bocetos (Desplegar para ver más)` : "",
      component: <BocetoComponent opciones={bocetos} setOpciones={setBocetos} />,
      data: bocetos
    },
    "fichas": {
      title: fichas.length === 1 ?
        `1 Ficha: ${fichas[0].rasterizado ? `${fichas[0].lpi} lpi, ` : ""}${fichas[0].formato}, ${fichas[0].tipo}` :
        fichas.length > 1 ? `${fichas.length} fichas (Desplegar para ver más)` : "",
      component: <BocetoComponent opciones={fichas} setOpciones={setFichas} />,
      data: fichas
    },
    "plotter": {
      data: {
        plotterData: isActive.plotter ? true : false
      }
    },
    "montaje": {
      title: "",
      component: <MontajeComponent orderXml={orderXml} montajeData={montajeData} setMontajeData={setMontajeData} setConfigAvanzadaData={setConfigAvanzadaData} isActive={isActive} setIsActive={setIsActive} setIsOpen={setIsOpen} />,
      data: montajeData,
      noSave: true
    },
    "freecut": {
      title: freeCutColors.filter(color => color.checked).length > 0 ?
        `${freeCutColors.filter(color => color.checked).map(color => color).join(", ")}` :
        "",
      component: <FreecutComponent freecutData={freecutData} setFreecutData={setFreecutData} colores={orderColors} freeCutColors={freeCutColors} setFreeCutColors={setFreecutColors} />,
      data: freecutData,
      noSave: true
    },
    "especial": {
      data: true
    },
    "configAvanzadaMontaje": {
      title: "",
      component: <MontajeAvanzadoComponent actividad={actividad} configAvanzadaData={configAvanzadaData} setConfigAvanzadaData={setConfigAvanzadaData} />,
      data: configAvanzadaData,
      noSave: true
    },
    "otraDocumentacion": {
      title: "",
      component: <OtraDocComponent otraDocumentacion={otraDocumentacion} setOtraDocumentacion={setOtraDocumentacion} />,
      data: otraDocumentacion,
      noSave: true
    }
  }

  const resetComponentesData = () => {
    setTrappingData({
      distancia_trapping: "0",
      intensidad: 100,
      remetido: "No",
      distancia_remetido: "0"
    });
    setColoresCambiar([]);
    setColoresDigimark([]);
    setBocetos([
      { id: 0, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }
    ]);
    setFichas([
      { id: 0, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }
    ]);
    setMontajeData([]);
    setFreecutData({});
    setConfigAvanzadaData([]);
    setOtraDocumentacion({});
  }

  const handleSubmit = async (action) => {
    setLoading(true);
    let dataToSend = {
      _id: order?._id || "",
      id_pedido: order?.id_pedido || ""
    };

    if (action === "submit") {
      Object.keys(isActive).forEach(key => {
        if (isActive[key]) {
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
    if (actividad === "MADERA") {
      const activeConfigKeys = Object.keys(montajeData || {}).filter((key) => {
        const item = montajeData?.[key];
        return item?.isActive && item?.isConfigAvanzadaActive;
      });

      if (activeConfigKeys.length > 0) {
        dataToSend.configAvanzadaMontaje = (configAvanzadaData || []).filter((el) =>
          activeConfigKeys.includes(el?.elementId)
        );
      }
    }

    if (action === "submit") {
      console.log(dataToSend);

      const result = await postData("orderKiosks/kioscoPedidoAuto", dataToSend);
      if (result.status === "success") {
        notify(toast.success, "success", result.title, result.message);
        /* closeTab(location.pathname); */
      } else {
        notify(toast.error, "error", result.title, result.message);
      }
    } else if (action === "saveConfig") {
      const activosDefault = Object.keys(isActive).filter(key => isActive[key]);
      const abiertosDefault = Object.keys(isOpen).filter(key => isOpen[key]);
      const datosDefault = dataToSend;

      const data = {
        cliente_id: cliente._id || "",
        nombre: kioskName || "",
        activosDefault,
        abiertosDefault,
        datosDefault
      }

      const result = await postData("clientConfig/update", data);
      if (result.status === "success") {
        notify(toast.success, "success", "Configuración guardada", "La configuración del kiosco se ha guardado correctamente para este cliente.");
        /* closeTab(location.pathname); */
      } else {
        notify(toast.error, "error", "Error al guardar", "Ha ocurrido un error al guardar la configuración del kiosco para este cliente.");
      }
    } else if (action === "deleteConfig") {
      const result = await postData("clientConfig/delete", { cliente_id: cliente._id, key: "kioscos", nombre: chosenKiosk.nombre || null });

      if (result.status === "success") {
        notify(toast[result.status], result.status, result.title, result.message);
        /* closeTab(location.pathname); */
      } else if (result.status === "warning") {
        notify(toast[result.status], result.status, result.title, result.message);
      }
    }

    setLoading(false);
  };

  const handleReport = async (action) => {
    setIsOpen((prev) => ({
      ...prev,
      "unitario": false,
      "reportePrevio": true
    }));
    setIsActive((prev) => ({
      ...prev,
      "reportePrevio": true
    }));
    setStep(2);
    setLoadingOrderReport(true);
    setLoadingFileReport(true);

    const reportResult1 = await postData("orderKiosks/orderReport", {
      _id: order?._id || "",
      id_pedido: order?.id_pedido || ""
    }).then(res => {
      setOrderReport(prev => {
        if (action === "forceReport") {
          return res.report || [];
        } else {
          const newReport = res.report || [];
          return [...newReport, ...prev];
        }
      });
      setLoadingOrderReport(false);
      return res;
    });

    let dataToReport = {
      _id: order?._id || "",
      id_pedido: order?.id_pedido || ""
    };

    Object.keys(isActive).forEach(key => {
      if (isActive[key]) {
        dataToReport[key] = components[key].data;
      }
    });

    const reportResult2 = await postData("orderKiosks/fileReport", {
      /* _id: order?._id || "",
      unitario: unitarioData?.archivo || null,
      id_pedido: order?.id_pedido || "",
      forceReport: action === "forceReport" ? true : false,
      trappingData */
      ...dataToReport,
      forceReport: action === "forceReport" ? true : false
    }).then(res => {
      setFileReport(res.report || []);
      setLoadingFileReport(false);
      setReportModification(res.modification || null);
      setUnitarioMetadata({
        number_of_pages: res.number_of_pages || 1
      });
      return res;
    });

    //setReportePrevio(result.report);
    if (!reportResult1?.report?.some(item => item.status === "error") && !reportResult2?.report?.some(item => item.status === "error")) setStep(3);
  }

  useEffect(() => {
    const totalFixes = (orderReport?.filter(item => item.status === "info").length || 0) +
      (fileReport?.filter(item => item.status === "info").length || 0);
    const totalWarnings = (orderReport?.filter(item => item.status === "warning").length || 0) +
      (fileReport?.filter(item => item.status === "warning").length || 0);
    const totalErrors = (orderReport?.filter(item => item.status === "error").length || 0) +
      (fileReport?.filter(item => item.status === "error").length || 0);

    setReportFixes(totalFixes);
    setReportWarnings(totalWarnings);
    setReportErrors(totalErrors);
  }, [orderReport, fileReport]);

  const maderaConfigBlocks = actividad === "MADERA"
    ? (orderXml?.actividad?.madera?.madera_premontaje || [])
      .map((item) => item?.madera_tmedida)
      .filter(Boolean)
      .filter((key) => montajeData?.[key]?.isActive && montajeData?.[key]?.isConfigAvanzadaActive)
    : [];

  const setConfigAvanzadaDataForElementId = (elementId, updater) => {
    setConfigAvanzadaData((prevGlobal) => {
      const idx = (prevGlobal || []).findIndex((el) => el?.elementId === elementId);
      if (idx === -1) return prevGlobal;

      const localPrev = [prevGlobal[idx]];
      const localNext = typeof updater === "function" ? updater(localPrev) : updater;
      const nextElement = (localNext && localNext[0]) ? localNext[0] : localPrev[0];

      const nextGlobal = [...prevGlobal];
      nextGlobal[idx] = nextElement;
      return nextGlobal;
    });
  };

  const navigateToConfig = () => {
    const path = `/cliente/${cliente._id}/kioscoConfig`;

    if (!tabs.some(tab => tab.path === path)) {
      setTabs(prev => {
        if (prev.some(tab => tab.path === path)) return prev;
        return [...prev, { path, title: `CONFIG. KIOSCO ${cliente?.name || ""}` }];
      });
    }

    navigate(path);
  }

  useEffect(() => {
    if (!isActive.montaje) {
      setMontajeData([]);
      if (isActive["configAvanzadaMontaje"]) {
        setIsActive((prev) => ({
          ...prev,
          "configAvanzadaMontaje": false
        }));
      }
      if (isActive["especial"]) {
        setIsActive((prev) => ({
          ...prev,
          "especial": false
        }));
      }
    }
  }, [isActive]);

  return (
    loading ? (
      <ExecutingComponent />
    ) : (
      <div className="detailsContainer">
        <ReactTooltip id="my-tooltip" />
        {((!configMode && unitarioData) || (configMode && cliente)) && !loading ? (
          <>
            <DetailsHeader
              title={configMode ? `Config. Kiosco ${cliente?.name || ""}` : `Kiosco ${order?.id_pedido || ""}`}
              subtitle={configMode ? "" : orderXml?.numero?.cliente_nombre || ""}
              /* hideAvatar={true}
              hideEditIcon={!configMode}
              hideDeleteIcon={true} */
              insteadOfActions={
                <div className="formGroup">
                  <label>Configuración de Kiosco:</label>
                  <ChosenSelect
                    options={kioskOptions || []}
                    name="kioskSelect"
                    onChange={(e) => setChosenKiosk(e.target.value)}
                    value={chosenKiosk || kioskOptions[0]}
                  />
                </div>
              }
            />
            <div className="detailsKiosk">
              <div className="detailsKioskHeader">
                {configMode && (
                  createKiosk ? (
                    <>
                      <button
                        className="submitButton"
                        onClick={() => {
                          setCreateKiosk(false);
                          setChosenKiosk(defaultKiosk || {});
                        }}
                      >
                        Volver a modo edición
                      </button>
                      <div className="formGroup">
                        <label>Nombre de configuración:</label>
                        <input type="text" value={kioskName} onChange={(e) => setKioskName(e.target.value)} />
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
                          setKioskName("");
                          setCreateKiosk(true);
                          setChosenKiosk({});
                          resetComponentesData();
                          setIsOpen({});
                          setIsActive({});
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
                  const clientOk = (!option.specificClients || option.specificClients.includes(orderXml?.numero?.cliente_codigo));
                  if (!clientOk) return false;

                  if (configMode && option.hideWhenConfig) return false;

                  if (order && actividad === "MADERA" && option.id === "configAvanzadaMontaje") return false;

                  if (!option.onlyShowIfActive) return true;

                  return isActive[option.id];
                })
                .map((option, index) => (
                  ((!configMode && option.steps.includes(step)) || configMode) && (
                    <div className="kioskAction" key={option.id}>
                      <div className={`actionHeader ${isOpen[option.id] ? "open" : ""}`}>
                        <Switch
                          className="kioskSwitch"
                          checked={isActive[option.id] || false}
                          disabled={option.disableSwitch || false}
                          onClick={() => {
                            if ((option.id === "coloresCambiar" || option.id === "coloresDigimark") && orderColors.length === 0) {
                              notify(toast.warning, "warning", "Sin colores", "Este pedido no tiene colores");
                            } else {
                              if (isActive[option.id] && isOpen[option.id]) {
                                setIsOpen((prev) => ({
                                  ...prev,
                                  [option.id]: false
                                }));
                              }

                              if (!isActive[option.id] && option.openOnActive) {
                                setIsOpen((prev) => ({
                                  ...prev,
                                  [option.id]: true
                                }));
                              }

                              setIsActive((prev) => ({
                                ...prev,
                                [option.id]: !prev[option.id]
                              }));

                              handleExceptions({
                                module: option.id,
                                isActive,
                                setIsActive,
                                actividad,
                                cliente,
                                setOtraDocumentacion
                              });
                            }
                          }}
                        />
                        <p>{option.title} <span>{isActive[option.id] && components[option.id]?.title || ""}</span></p>
                        {!configMode && (orderReport.some(item => item.type && item.type.includes(option.id)) || fileReport.some(item => item.type && item.type.includes(option.id))) ? (
                          <div
                            className="warning"
                            onClick={() => {
                              setInfoContent(orderReport.concat(fileReport)
                                .filter(item => item.type && item.type.includes(option.id))
                                .map(item => item.message)
                              );
                              setInfoPopUp(true);
                            }}
                          >
                            <div className="warningContent">
                              <p>{orderReport.concat(fileReport)
                                .filter(item => item.type && item.type.includes(option.id))
                                .length}</p>
                              <IoWarningOutline className="warningIcon" />
                            </div>
                          </div>
                        ) : (
                          option.id === "unitario" || option.id === "reportePrevio" ? (
                            <div
                              className="warning"
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content={
                                option.id === "unitario" ?
                                  (!loadingFileReport && !loadingOrderReport ? "Reiniciar unitario" : "Generando reporte previo, espere...") :
                                  (!loadingFileReport && !loadingOrderReport ? "Reenviar reporte previo" : "Generando reporte previo, espere...")
                              }
                              onClick={() => {
                                if (!loadingFileReport && !loadingOrderReport) {
                                  if (option.id === "unitario") {
                                    setStep(1);
                                    setIsOpen((prev) => ({
                                      ...prev,
                                      "unitario": true
                                    }));
                                    setOrderReport(prev => [
                                      ...prev.filter(item => (item.type && item.type.includes("trapping")))
                                    ]);
                                    setFileReport([]);
                                  } else if (option.id === "reportePrevio") {
                                    setIsOpen((prev) => ({
                                      ...prev,
                                      "reportePrevio": true
                                    }));
                                    handleReport("forceReport");
                                  }
                                } else {
                                  notify(toast.warning, "warning", "Reporte en curso", "Espere a que termine el reporte en curso");
                                }
                              }}
                            >
                              {((loadingOrderReport || loadingFileReport) && option.id === "reportePrevio") ? (
                                <OrbitProgress variant="dotted" color={"var(--highlight)"} size="medium" />
                              ) : (
                                <HiOutlineRefresh className="refreshIcon" />
                              )}
                            </div>
                          ) : (
                            <div></div>
                          )
                        )
                        }
                        <div className="openArrow">
                          {isOpen[option.id] ?
                            <MdKeyboardArrowDown
                              className={"openArrowIcon"}
                              onClick={() =>
                                setIsOpen((prev) => ({
                                  ...prev,
                                  [option.id]: !prev[option.id]
                                }))
                              } />
                            :
                            <MdKeyboardArrowRight
                              className={"openArrowIcon"}
                              onClick={() => {
                                if (!(option.id === "unitario" && step > 1) && !option.disableOpen) {
                                  setIsOpen((prev) => ({
                                    ...prev,
                                    [option.id]: !prev[option.id]
                                  }))
                                }
                              }} />}
                        </div>
                      </div>
                      {isOpen[option.id] && (components[option.id].component)}
                    </div>
                  )
                ))}

              {maderaConfigBlocks.map((key) => {
                const openKey = `configAvanzada${key}`;
                const element = (configAvanzadaData || []).find((el) => el?.elementId === key);
                if (!element) return null;
                const elementArray = [element];

                return (
                  <div className="kioskAction" key={openKey}>
                    <div className={`actionHeader ${isOpen[openKey] ? "open" : ""}`}>
                      <Switch className="kioskSwitch" checked={true} disabled />
                      <p>{key}</p>
                      <div className="openArrow">
                        {isOpen[openKey] ? (
                          <MdKeyboardArrowDown
                            onClick={() => setIsOpen((prev) => ({
                              ...prev,
                              [openKey]: !prev[openKey]
                            }))}
                          />
                        ) : (
                          <MdKeyboardArrowRight
                            onClick={() => setIsOpen((prev) => ({
                              ...prev,
                              [openKey]: !prev[openKey]
                            }))}
                          />
                        )}
                      </div>
                    </div>

                    {isOpen[openKey] && (
                      <MontajeAvanzadoComponent
                        configAvanzadaData={elementArray}
                        setConfigAvanzadaData={(updater) => setConfigAvanzadaDataForElementId(key, updater)}
                      />
                    )}
                  </div>
                );
              })}
              <div className="buttons">
                {!configMode ? (
                  step === 1 ? <button className="submitButton" onClick={handleReport}>Preparar &#9658;</button> :
                    step === 3 && <button className="playButton" onClick={() => handleSubmit('submit')}>Lanzar &#9658;</button>
                ) : (
                  <>
                    <button className="submitButton" onClick={() => handleSubmit('saveConfig')}>{createKiosk ? "Guardar nueva configuración" : "Editar configuración"}</button>
                    {!createKiosk && <button className="deleteButton" onClick={() => handleSubmit('deleteConfig')}>Borrar configuración de kiosco</button>}
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
        {infoPopUp && <InfoPopUp setInfoPopUp={setInfoPopUp} infoContent={infoContent} />}
      </div>
    )
  )
}

export default OrderKiosk