import "./OrderDetails.css"
import { useEffect, useState, useMemo, Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTabs } from "../../../context/TabsContext";
import PedidoMadera from "../components/PedidoMadera";
import PedidoCarton from "../components/PedidoCarton";
import PedidoFlexible from "../components/PedidoFlexible";
import PedidoEtiquetas from "../components/PedidoEtiquetas";
import PedidoSideBar from "../components/PedidoSideBar";
import { notify } from "../../../helpers/notify";
import { fetchData, fetchOneItem, postData } from "../../../helpers/fetchData";
import PdfAsImage from "../../../components/PdfAsImage";
import { sanitizeData } from "../../../helpers/normalizeData";
import DeleteForm from "../../../components/formComponents/DeleteForm";
import { orderTableInfo } from "../config/order.config";
import { BlinkBlur } from "react-loading-indicators";
import { InfoCambianColores } from "../components/InfoCambianColores";
import InfoCard from "../components/InfoCard";
import InfoTable from "../components/InfoTable";
import { yesNo, safeValue } from "../helpers/orderFormatters";
import { normalizeOrderData } from "../helpers/normalizeOrderData";
import { collection as palleteCollection } from "../../pallette/config/pallete.config";
import { list_with_options } from "../../../helpers/cloudflow/custom_objects";
import { MdDescription } from "react-icons/md";
import { HiColorSwatch } from "react-icons/hi";


function OrderDetails() {
  const [colorInPallete, setColorInPallete] = useState([]);
  const [selectedPaletteColor, setSelectedPaletteColor] = useState(null);
  const [fullOrder, setFullOrder] = useState({});
  const [orderXml, setOrderXml] = useState({});
  const [unitarioView, setUnitarioView] = useState("");
  const [orderColors, setOrderColors] = useState([]);
  const [estrategiaId, setEstrategiaId] = useState("");
  const [codigoEstrategia, setCodigoEstrategia] = useState("");
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { closeTab, createTab } = useTabs();
  const [deletePopup, setDeletePopup] = useState(false);

  const getColorsInPalette = async () => {
    const colorNameList = orderColors.map(color => color.color);

    const query = colorNameList.flatMap((color, index) => [
      ...(index > 0 ? ["or"] : []),
      "description",
      "contains text like",
      color
    ]);

    const response = await list_with_options(
      palleteCollection,
      query
    );

    return response?.results || [];
  };


  const order = useMemo(() => {
    if (!orderXml || Object.keys(orderXml).length === 0) {
      return null;
    }

    return normalizeOrderData(orderXml);
  }, [orderXml]);

  const getOrderDetails = async (id) => {
    try {
      const orderData = await fetchOneItem("orders/getOrder", id);
      if (!orderData) {
        closeTab(location.pathname);
        navigate("/pedidos");
        return;
      }
      setOrderXml(sanitizeData(orderData.xml)); // Sanitizar los datos XML
      setFullOrder(sanitizeData(orderData));

    } catch (error) {
      notify("error", "Error en el pedido", "Ha ocurrido un error al cargar los datos del pedido");
    }
  }

  const getOrderColors = async () => {
    const response = await fetchData("colors", fullOrder?.unitario);
    setOrderColors(response);
  }

  const openClient = async () => {
    const cliente = await fetchData("clients", orderXml.numero?.cliente_codigo, 1);
    const { _id } = cliente[0];
    const path = `/clientes/${_id}`;
    const tabTitle = orderXml.numero?.cliente_nombre;

    createTab(path, tabTitle);
  }

  const getStrategyDetails = async () => {
    setCodigoEstrategia("");
    setEstrategiaId("");
    let estrategia;
    let codigo;

    if (typeof fullOrder?.xml?.actividad?.material === "object") {
      return;
    }

    const materialSplit = fullOrder.xml.actividad.material.split("_");

    materialSplit.forEach(part => {
      if (part.length === 4 && part.startsWith("E")) {
        codigo = part;
        setCodigoEstrategia(codigo);
      }
    });

    if (!codigo) {
      return;
    }

    const estrategias = await fetchData("strategies", codigo);

    if (estrategias.length === 1) {
      estrategia = estrategias[0];
      setEstrategiaId(estrategia._id);
    }
  }

  const openStrategy = () => {
    if (estrategiaId) {
      const path = `/estrategias/${estrategiaId}`;
      const tabTitle = `ESTRATEGIA ${codigoEstrategia}`;

      createTab(path, tabTitle);
    } else {
      notify("warning", "No hay estrategia asociada");
    }
  }

  const openColorPalette = (paletteInfo) => {

    if (!paletteInfo) {
      return
    }
    const path = `/paleta/${paletteInfo?._id}`;
    const tabTitle = `PALETA | ${paletteInfo.description}`;

    createTab(path, tabTitle);
  }


  const openFichaTecnica = () => {
    const path = `/fichaTecnica/${id}`;
    const tabTitle = `OBS. TÉCNICAS ${fullOrder.id_pedido}`;

    createTab(path, tabTitle);
  }

  const getUnitarioView = async () => {
    setUnitarioView("");
    if (!fullOrder.unitario.includes("sinUnitario.png")) {
      const response = await postData("orders/getUnitarioView", { orderId: fullOrder.id_pedido, action: "solicitarVista" });
      if (typeof response === "string") {
        setUnitarioView(response);
      }
    }
  }

  const infoSalidaColores = fullOrder.infoSalidaColores ? fullOrder.infoSalidaColores.salidaColores : [];

  useEffect(() => {
    setFullOrder({});
    setOrderXml({});
    getOrderDetails(id);

    const loadColors = async () => {
      const colors = await getColorsInPalette();
      setColorInPallete(colors);
    };

    loadColors();
  }, [id]);

  useEffect(() => {
    if (fullOrder._id) {
      getStrategyDetails();
      getUnitarioView();
      getOrderColors();
    }
  }, [fullOrder]);

  const fechaHora = orderXml?.actividad?.revisiones?.revision[0]?.revision_fechahora;
  const fechaRevision = fechaHora?.split(" ");
  const filePath = fullOrder?.unitario?.includes("sinUnitario.png") ? "" : fullOrder?.unitario?.replace("cloudflow://", "").replace("PEDIDOS_", "Pedidos ");

  return (
    fullOrder._id ? (
      <>

        {deletePopup && <DeleteForm setModal={setDeletePopup} id={fullOrder._id} tableInfo={orderTableInfo} />}
        <PedidoSideBar
          getOrderDetails={getOrderDetails}
          fullOrder={fullOrder}
          setFullOrder={setFullOrder}
          filePath={filePath}
        />
        <div className="detailsContainer">
          <div className="orderFile">

            {/* <div className="row1">
            <div className="acciones flex">
              <div className="title">
                <p>ACCIONES DE PEDIDO</p>
              </div>
              <div className="body">
                <div className="botones">
                  <div className="buttonGroup">
                    <button className="boton">
                      <p>ASIGNAR</p>
                    </button>
                    <button className="boton2">
                      <GoDownload />
                    </button>
                  </div>
                  <div className="buttonGroup">
                    <button className="boton">
                      <p>DESASIGNAR</p>
                    </button>
                    <button className="boton2">
                      <GoUpload />
                    </button>
                  </div>
                  <div className="buttonGroup">
                    <button className="boton">
                      <p>PTE. VERIFICACIÓN</p>
                    </button>
                    <button className="boton2">
                      <PiClockUser />
                    </button>
                  </div>
                  <div className="buttonGroup">
                    <button className="boton">
                      <p>VERIFICAR</p>
                    </button>
                    <button className="boton2">
                      <LuCheck />
                    </button>
                  </div>
                  <div className="buttonGroup">
                    <button className="boton">
                      <p>PARADO</p>
                    </button>
                    <button className="boton2">
                      <IoHandLeftOutline />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="estado flex">
              <div className="title">
                <p>ESTADO DE PEDIDO</p>
              </div>
              <div className="body">
                <p>SAMPLE SAMPLE SAMPLE SAMPLE SAMPLE</p>
              </div>
            </div>
          </div> */}
            <div className="row2">
              <div className="pedido flex">
                <div className="group1">
                  <div className="title">
                    <p>PEDIDO</p>
                  </div>
                  <div className="body">
                    <p>{orderXml.numero?.id}</p>
                  </div>
                </div>
                <div className="group2">
                  <div className="title version">
                    <p>VERSIÓN</p>
                  </div>
                  <div className="body">
                    <p>{orderXml.numero?.version}</p>
                  </div>
                </div>
                <div className="footer">
                  <div className="body">
                    <p>{typeof orderXml.numero?.prioridad === "object" ? "NORMAL" : orderXml.numero?.prioridad}</p>
                  </div>
                </div>
              </div>

              <InfoCard title="DATOS DEL PEDIDO"
                className="datosPedido"
                footer={(
                  <>
                    <div className="opcionPedido">
                      <p>BOCETO</p>
                      <input
                        type="checkbox"
                        className="check"
                        checked={orderXml.numero?.boceto === "-1"}
                        readOnly
                      />
                    </div>

                    <div className="opcionPedido">
                      <p>CLICHÉ</p>
                      <input
                        type="checkbox"
                        className="check"
                        checked={orderXml.numero?.cliche === "-1"}
                        readOnly
                      />
                    </div>

                    <div className="opcionPedido">
                      <p>MONTAJE</p>
                      <input
                        type="checkbox"
                        className="check"
                        checked={orderXml.numero?.montaje === "-1"}
                        readOnly
                      />
                    </div>
                  </>
                )}
              >
                <InfoTable
                  rows={[
                    [
                      "CLIENTE",
                      (
                        <p className="openClient" onClick={openClient}>
                          {orderXml.numero?.cliente_nombre} ({orderXml.numero?.cliente_codigo}) 🔗
                        </p>
                      )
                    ],

                    [
                      "MARCA",
                      orderXml.numero?.marca
                    ],

                    [
                      "REF. CLIENTE",
                      typeof orderXml.numero?.ref_cliente !== "object"
                        ? orderXml.numero?.ref_cliente
                        : ""
                    ],

                    [
                      "CONTACTO",
                      orderXml.numero?.contacto
                    ]
                  ]}
                />
              </InfoCard>

              <InfoCard title="DATOS DE VERSIÓN"
                className="datosVersion"
              >
                <InfoTable
                  rows={[
                    [
                      "REVISIÓN",
                      orderXml.actividad?.revisiones?.revision[0]?.revision_id ||
                      orderXml.actividad?.revisiones?.revision?.revision_id
                    ],

                    [
                      "FECHA REV.",
                      <>
                        {fechaRevision?.[0]}{" "}
                        {fechaRevision?.[1] && (
                          <span className="highlight">
                            ({fechaRevision[1]})
                          </span>
                        )}
                      </>
                    ],

                    [
                      "FECHA SOL.",
                      orderXml.numero?.fecha_solicitud
                    ],

                    [
                      "FECHA ENT.",
                      orderXml.numero?.fecha_entrega
                    ],

                    [
                      "MOT. VER.",
                      orderXml.numero?.motivo_version
                    ]
                  ]}
                />
              </InfoCard>

              <InfoCard title="DATOS DE PLANCHA"
                className="datosPlancha"
              >
                <InfoTable
                  rows={[
                    [
                      "TIPO CLICHÉ",
                      orderXml.tecnicos?.tipo_cliche
                    ],

                    [
                      "ESPESOR",
                      orderXml.tecnicos?.espesor
                    ],

                    [
                      "TIPO IMPRESIÓN",
                      orderXml.tecnicos?.tipo_impresion
                    ],

                    [
                      "DISTORSIÓN",
                      orderXml.tecnicos?.distorsion
                    ],

                    [
                      "DIST. TRAPPING",
                      safeValue(orderXml.tecnicos?.trapping)
                    ]
                  ]}
                />
              </InfoCard>

              <InfoCard title="DOCUMENTACIÓN"
                className="documentacion"
              >
                <InfoTable
                  rows={[
                    [
                      "FICHA IMPRESA",
                      yesNo(orderXml.tecnicos?.ficha_impresa, "-1")
                    ],

                    [
                      "FICHA EMAIL",
                      yesNo(orderXml.tecnicos?.ficha_por_email)
                    ],

                    [
                      "FORMATO PDF",
                      yesNo(orderXml.tecnicos?.pdf)
                    ],

                    [
                      "FORMATO JPG",
                      yesNo(orderXml.tecnicos?.jpg)
                    ],

                    [
                      "HACER PLOTTER",
                      yesNo(orderXml.tecnicos?.plotter)
                    ]
                  ]}
                />
              </InfoCard>

            </div>
            <div className="row3">
              <div className="divPrevio flex">
                <div className="title">
                  <p>PREVIO DEL TRABAJO</p>
                </div>
                <div className="body">
                  <div className="imgPrevio" onClick={() => { if (unitarioView !== "") window.open(unitarioView, "_blank") }}> {/* if para comprobar que haya link y no abra una pestaña vacía */}
                    <PdfAsImage url={filePath} noOpen={true} />
                  </div>
                </div>
              </div>
              <div className="gridMaterial">

                <InfoCard title="DOCUMENTACIÓN RECIBIDA"
                  className="docuRecibida"
                >
                  <p>{orderXml.numero?.recibido_con}</p>
                </InfoCard>

                <div className="materialMaquina">
                  <InfoCard title="MATERIAL"
                    className="material flex"
                  >
                    <p>{typeof orderXml.actividad?.material !== "object" ? orderXml.actividad?.material : ""} <span className="highlight" onClick={openStrategy}>(VER ESTRATEGIA COMPLETA)</span></p>
                  </InfoCard>

                  <InfoCard title="MÁQUINA"
                    className="maquina"
                  >
                    <p>{typeof orderXml.tecnicos?.ficha_tecnica !== "object" && orderXml.tecnicos?.ficha_tecnica} <span className="highlight" onClick={openFichaTecnica}>(VER FICHA)</span></p>
                  </InfoCard>
                </div>


                <div className="instrucciones flex">

                  <div className="title">
                    <p>INSTRUCCIONES DE PEDIDO</p>
                  </div>
                  <div className="body">
                    {Array.isArray(orderXml?.actividad?.revisiones?.revision) ? (
                      orderXml.actividad?.revisiones.revision.map((revision) => (
                        <div className="revisiones" key={revision.revision_id}>
                          <p className="revision">Revisión Nº {revision.revision_id} | Fecha: {revision.revision_fechahora} | Motivo: {revision.revision_mot}</p>
                          <br />
                          <p>{revision.revision_obs}</p>
                          <br />
                        </div>
                      ))
                    ) : (
                      orderXml.actividad?.revisiones.revision && (
                        <div className="revisiones" key={orderXml.actividad.revisiones.revision.revision_id}>
                          <p className="revision">Revisión Nº {orderXml.actividad.revisiones.revision.revision_id} | Fecha: {orderXml.actividad.revisiones.revision.revision_fechahora} | Motivo: {orderXml.actividad.revisiones.revision.revision_mot}</p>
                          <br />
                          <p>{orderXml.actividad.revisiones.revision.revision_obs}</p>
                          <br />
                        </div>
                      )
                    )
                    }
                  </div>
                </div>

              </div>
            </div>
            <div className="row4">
              <div className="tipoMaterial">
                {orderXml.actividad?.id === "MADERA" && <PedidoMadera orderXml={orderXml} />}
                {orderXml.actividad?.id === "CARTON" && <PedidoCarton orderXml={orderXml} />}
                {orderXml.actividad?.id === "FLEXIBLE" && <PedidoFlexible orderXml={orderXml} />}
                {orderXml.actividad?.id === "ETIQUETAS" && <PedidoEtiquetas orderXml={orderXml} />}
                <div className="datosTecnicos flex">
                  <div className="title">
                    <p>DATOS TÉCNICOS</p>
                  </div>
                  <div className="body">
                    <p dangerouslySetInnerHTML={{ __html: orderXml?.actividad?.obs_actividad.replace(/\n/g, "<br />") }}></p>
                  </div>
                </div>
              </div>

              <div className="colores flex">
                <div className="title">
                  <p>TINTAS DEL TRABAJO</p>
                </div>
                <div className="body">
                  <InfoCambianColores fullOrder={fullOrder} />
                  <table>

                    <tbody>

                      <tr>
                        <td><p className="highlight">NOMBRE DE TINTA</p></td>
                        <td><p className="highlight">LPI</p></td>
                        <td><p className="highlight">ANG.</p></td>
                        <td><p className="highlight">TRAMA</p></td>
                        <td><p className="highlight">PLANCHA</p></td>
                      </tr>

                      {orderColors.map((color) => {
                        const paletteInfo = colorInPallete?.find(
                          paletteColor => paletteColor.description === color.color
                        );

                        return (
                          <Fragment key={color._id}>
                            <tr>
                              <td>
                                <p
                                  className={paletteInfo ? "openEnlace" : ""}
                                  onClick={() => paletteInfo && openColorPalette(paletteInfo)}
                                >
                                  <HiColorSwatch
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (!paletteInfo) return;

                                    setSelectedPaletteColor(
                                      selectedPaletteColor?._id === paletteInfo._id
                                        ? null
                                        : paletteInfo
                                    );
                                  }}
                                  style={{
                                    width: "2rem",
                                    height: "2rem",
                                    color: paletteInfo ? "green" : "#999",
                                    marginRight: 8,
                                    verticalAlign: "middle",
                                    cursor: paletteInfo ? "pointer" : "default"
                                  }}
                                />

                                {color.color}

                              </p>
                            </td>

                            <td><p>{color.lineatura}</p></td>
                            <td><p>{typeof color.angulo !== "object" && color.angulo}</p></td>
                            <td><p>{color.trama}</p></td>
                            <td><p>{color.planchaArchivo}</p></td>
                          </tr>

                            {
                          paletteInfo && selectedPaletteColor?._id === paletteInfo._id && (
                            <tr className="paletteDetails">
                              <td colSpan={5}>
                                <div>
                                  {paletteInfo.delta && (
                                    <p>ΔE: {paletteInfo.delta}</p>
                                  )}

                                  <p>L: {paletteInfo.l_value}</p>
                                  <p>A: {paletteInfo.a_value}</p>
                                  <p>B: {paletteInfo.b_value}</p>

                                  {paletteInfo.observations && (
                                    <p>
                                      Observaciones: {paletteInfo.observations}
                                    </p>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        }

                          </Fragment>
                    );
                      })}

                  </tbody>
                </table>

              </div>
            </div>

          </div>
        </div>
      </div >
      </>
    ) : (
    <div className="detailsContainer">
      <div className="executingContainer">
        <BlinkBlur variant="dotted" color="var(--highlight)" size="large" speedPlus="0" />
        <h1>Cargando</h1>
      </div>
    </div>
  )
  )
}

export default OrderDetails