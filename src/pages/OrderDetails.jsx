import "./OrderDetails.css"
import { GoDownload, GoUpload } from "react-icons/go";
import { PiClockUser } from "react-icons/pi";
import { LuCheck } from "react-icons/lu";
import { IoHandLeftOutline } from "react-icons/io5";
import { BsTrash3Fill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTabs } from "../context/TabsContext";
import PedidoMadera from "../components/pedidoComponents/PedidoMadera";
import PedidoCarton from "../components/pedidoComponents/PedidoCarton";
import PedidoFlexible from "../components/pedidoComponents/PedidoFlexible";
import PedidoEtiquetas from "../components/pedidoComponents/PedidoEtiquetas";
import PedidoSideBar from "../components/pedidoComponents/PedidoSideBar";
import { notify } from "../helpers/notify";
import { fetchData, fetchOneItem, postData } from "../helpers/fetchData";
import PdfAsImage from "../components/pedidoComponents/PdfAsImage";
import { sanitizeData } from "../helpers/normalizeData";
import DeleteForm from "../components/formComponents/DeleteForm";
import { orderTableInfo } from "../helpers/tablesInfo";
import { BlinkBlur } from "react-loading-indicators";

function OrderDetails() {
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

  useEffect(() => {
    setFullOrder({});
    setOrderXml({});
    getOrderDetails(id);
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
              <div className="datosPedido flex">
                <div className="title">
                  <p>DATOS DEL PEDIDO</p>
                </div>
                <div className="body">
                  <table>
                    <tbody>
                      <tr>
                        <td><p><span className="highlight">CLIENTE:</span></p></td>
                        <td><p className="openClient" onClick={openClient}>{orderXml.numero?.cliente_nombre} 🔗</p></td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">MARCA:</span></p></td>
                        <td>{orderXml.numero?.marca}</td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">REF. CLIENTE:</span></p></td>
                        <td>{typeof orderXml.numero?.ref_cliente !== "object" ? orderXml.numero?.ref_cliente : ""}</td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">CONTACTO:</span></p></td>
                        <td>{orderXml.numero?.contacto}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="footer">
                  <div className="opcionPedido">
                    <p>BOCETO</p>
                    <input type="checkbox" className="check" checked={orderXml.numero?.boceto === "-1"} readOnly />
                  </div>
                  <div className="opcionPedido">
                    <p>CLICHE</p>
                    <input type="checkbox" className="check" checked={orderXml.numero?.cliche === "-1"} readOnly />
                  </div>
                  <div className="opcionPedido">
                    <p>MONTAJE</p>
                    <input type="checkbox" className="check" checked={orderXml.numero?.montaje === "-1"} readOnly />
                  </div>
                </div>
              </div>
              <div className="datosVersion flex">
                <div className="title">
                  <p>DATOS DE VERSIÓN</p>
                </div>
                <div className="body">
                  <table>
                    <tbody>
                      <tr>
                        <td><p><span className="highlight">REVISIÓN:</span></p></td>
                        <td>{orderXml.actividad?.revisiones?.revision[0]?.revision_id || orderXml.actividad?.revisiones?.revision?.revision_id}</td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">FECHA REV.:</span></p></td>
                        <td>{fechaRevision && fechaRevision[0]} <span className="highlight">{fechaRevision && `(${fechaRevision[1]})`}</span></td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">FECHA SOL.:</span></p></td>
                        <td>{orderXml.numero?.fecha_solicitud}</td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">FECHA ENT.:</span></p></td>
                        <td>{orderXml.numero?.fecha_entrega}</td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">MOT. VER.:</span></p></td>
                        <td>{orderXml.numero?.motivo_version}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="datosPlancha flex">
                <div className="title">
                  <p>DATOS DE PLANCHA</p>
                </div>
                <div className="body">
                  <table>
                    <tbody>
                      <tr>
                        <td><p><span className="highlight">TIPO CLICHÉ:</span></p></td>
                        <td>{orderXml.tecnicos?.tipo_cliche}</td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">ESPESOR:</span></p></td>
                        <td>{orderXml.tecnicos?.espesor}</td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">TIPO IMPRESIÓN:</span></p></td>
                        <td>{orderXml.tecnicos?.tipo_impresion}</td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">DISTORSIÓN:</span></p></td>
                        <td>{orderXml.tecnicos?.distorsion}</td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">DIST. TRAPPING:</span></p></td>
                        <td>{typeof orderXml.tecnicos?.trapping !== "object" ? orderXml.tecnicos?.trapping : ""}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="documentacion flex">
                <div className="title">
                  <p>DOCUMENTACIÓN</p>
                </div>
                <div className="body">
                  <table>
                    <tbody>
                      <tr>
                        <td><p><span className="highlight">FICHA IMPRESA:</span></p></td>
                        <td>{orderXml.tecnicos?.ficha_impresa === "-1" ? "SÍ" : "NO"}</td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">FICHA EMAIL:</span></p></td>
                        <td>{orderXml.tecnicos?.ficha_por_email === "X" ? "SÍ" : "NO"}</td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">FORMATO PDF:</span></p></td>
                        <td>{orderXml.tecnicos?.pdf === "X" ? "SÍ" : "NO"}</td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">FORMATO JPG:</span></p></td>
                        <td>{orderXml.tecnicos?.jpg === "X" ? "SÍ" : "NO"}</td>
                      </tr>
                      <tr>
                        <td><p><span className="highlight">HACER PLOTTER:</span></p></td>
                        <td>{orderXml.tecnicos?.plotter === "X" ? "SÍ" : "NO"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
                <div className="docuRecibida flex">
                  <div className="title">
                    <p>DOCUMENTACIÓN RECIBIDA</p>
                  </div>
                  <div className="body">
                    <p>{orderXml.numero?.recibido_con}</p>
                  </div>
                </div>
                <div className="materialMaquina">
                  <div className="material flex">
                    <div className="title">
                      <p>MATERIAL</p>
                    </div>
                    <div className="body">
                      <p>{typeof orderXml.actividad?.material !== "object" ? orderXml.actividad?.material : ""} <span className="highlight" onClick={openStrategy}>(VER ESTRATEGIA COMPLETA)</span></p>
                    </div>
                  </div>
                  <div className="maquina flex">
                    <div className="title">
                      <p>MÁQUINA</p>
                    </div>
                    <div className="body">
                      <p>{typeof orderXml.tecnicos?.ficha_tecnica !== "object" && orderXml.tecnicos?.ficha_tecnica} <span className="highlight" onClick={openFichaTecnica}>(VER FICHA)</span></p>
                    </div>
                  </div>
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
                  <table>
                    <tbody>
                      <tr>
                        <td><p className="highlight">NOMBRE DE TINTA</p></td>
                        <td><p className="highlight">LPI</p></td>
                        <td><p className="highlight">ANG.</p></td>
                        <td><p className="highlight">TRAMA</p></td>
                        <td><p className="highlight">PLANCHA</p></td>
                      </tr>
                      {orderColors.map((color) => (
                        <tr key={color._id}>
                          <td><p>{color.color}</p></td>
                          <td><p>{color.lineatura}</p></td>
                          <td><p>{typeof color.angulo !== "object" && color.angulo}</p></td>
                          <td><p>{color.trama}</p></td>
                          <td><p>{color.planchaArchivo}</p></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
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