import { useEffect, useState } from 'react';
import { avanzadoFormData } from '../../helpers/orderKioskActions';
import FormSection from '../formComponents/FormSection';
import { IoDocumentOutline, IoDocumentsOutline } from "react-icons/io5";
import { Tooltip as ReactTooltip } from "react-tooltip";
import InputWithSearch from '../formComponents/InputWithSearch';
import { postData } from '../../helpers/fetchData';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ThreeDot } from 'react-loading-indicators';

function MontajeAvanzadoComponent({ state, updateState, configAvanzadaData, setConfigAvanzadaData }) {
  const [formData, setFormData] = useState(avanzadoFormData);
  const [actualElementIndex, setActualElementIndex] = useState(0);
  const [actualStationIndex, setActualStationIndex] = useState(0);
  const [executingAction, setExecutingAction] = useState(false);

  const activeElement = configAvanzadaData?.[actualElementIndex];
  const stations = activeElement?.stations || [];
  const activeStation = stations?.[actualStationIndex];

  const handleChange = (fieldName, value) => {
    setConfigAvanzadaData((prev) => prev.map((element, elementIndex) => {
      if (elementIndex !== actualElementIndex) return element;

      return {
        ...element,
        stations: (element.stations || []).map((station, stationIndex) => {
          if (stationIndex !== actualStationIndex) return station;
          return {
            ...station,
            [fieldName]: value
          };
        })
      };
    }));
  }

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      formFields: prev.formFields.map(field => {
        if (field.htmlFor === "PageIndex") {
          if (activeStation && activeStation.actividadPedido === "MADERA") {
            return {
              ...field,
              options: activeStation?.listadoTablillas || [],
              labelTitle: "Tablilla"
            }
          } else {
            return {
              ...field,
              options: [
                ...Array.from({ length: activeStation?.numeroPaginas || 1 }, (_, i) => i + 1)
              ],
              labelTitle: "Página"
            }
          }
        }
        return field;
      })
    }));
  }, [actualElementIndex, actualStationIndex, activeStation?.numeroPaginas]);

  useEffect(() => {
    if (actualElementIndex > (configAvanzadaData?.length || 0) - 1) {
      setActualElementIndex(0);
      setActualStationIndex(0);
    }
  }, [configAvanzadaData?.length, actualElementIndex]);

  useEffect(() => {
    if (actualStationIndex > (stations?.length || 0) - 1) {
      setActualStationIndex(Math.max(0, (stations?.length || 0) - 1));
    }
  }, [stations?.length, actualStationIndex, actualElementIndex]);

  const addFileConfig = async (order) => {
    const actividadPedido = order?.xml?.actividad?.id;
    setExecutingAction(true);
    const metadata = await postData("orders/getUnitarioMetadata", { file: order.unitario });
    setExecutingAction(false);

    const nextIndex = activeElement?.stations?.length || 0;
    const newStation = {
      _id: order?._id || "",
      id_pedido: order?.id_pedido || "",
      numeroPaginas: metadata?.number_of_pages || 1,
      OneUp: `${order?.id_pedido} ${order?.xml?.numero?.marca}` || "",
      PageBox: "TrimBox",
      PageIndex: actividadPedido === "MADERA" ? order?.xml?.actividad?.madera?.madera_premontaje?.[0]?.madera_tmedida : 1,
      Orientation: {
        _id: "up",
        orientation: "up",
        textoOpcion: "Original"
      },
      StartNewLane: true,
      HCount: 1,
      HOffset: 0,
      HGap: 0,
      VCount: 1,
      VOffset: 0,
      VGap: 0,
      StaggerDirection: "none",
      StaggerOffset: 0,
      RestartAfter: 0,
      HeadTurn: {
        _id: "none",
        headTurn: "none",
        textoOpcion: "Ninguno"
      },
      BleedLimitLeft: 0,
      BleedLimitRight: 0,
      BleedLimitTop: 0,
      BleedLimitBottom: 0,
      unitarioUrl: order?.unitario || "",
      listadoTablillas: actividadPedido === "MADERA" ? order?.xml?.actividad?.madera?.madera_premontaje.map(item => item.madera_tmedida) || [] : [],
      actividadPedido
    };

    setConfigAvanzadaData((prev) => prev.map((element, elementIndex) => {
      if (elementIndex !== actualElementIndex) return element;
      return {
        ...element,
        stations: [
          ...(element.stations || []),
          newStation
        ]
      };
    }));
    setActualStationIndex(nextIndex);
  };

  const duplicateFileConfig = () => {
    if (stations.length === 0) return;
    const nextIndex = stations.length;
    setConfigAvanzadaData((prev) => prev.map((element, elementIndex) => {
      if (elementIndex !== actualElementIndex) return element;
      const cloned = { ...element.stations?.[actualStationIndex] };
      return {
        ...element,
        stations: [
          ...(element.stations || []),
          cloned
        ]
      };
    }));
    setActualStationIndex(nextIndex);
  };

  const removeFileConfig = () => {
    if (stations.length < 2) return;

    setConfigAvanzadaData((prev) => prev.map((element, elementIndex) => {
      if (elementIndex !== actualElementIndex) return element;
      return {
        ...element,
        stations: (element.stations || []).filter((_, index) => index !== actualStationIndex)
      };
    }));

    setActualStationIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const moveLeft = () => {
    if (actualStationIndex <= 0) return;

    setConfigAvanzadaData((prev) => prev.map((element, elementIndex) => {
      if (elementIndex !== actualElementIndex) return element;
      const newStations = [...(element.stations || [])];
      const temp = newStations[actualStationIndex - 1];
      newStations[actualStationIndex - 1] = newStations[actualStationIndex];
      newStations[actualStationIndex] = temp;
      return {
        ...element,
        stations: newStations
      };
    }));
    setActualStationIndex(prev => prev - 1);
  }

  const moveRight = () => {
    if (actualStationIndex >= stations.length - 1) return;

    setConfigAvanzadaData((prev) => prev.map((element, elementIndex) => {
      if (elementIndex !== actualElementIndex) return element;
      const newStations = [...(element.stations || [])];
      const temp = newStations[actualStationIndex + 1];
      newStations[actualStationIndex + 1] = newStations[actualStationIndex];
      newStations[actualStationIndex] = temp;
      return {
        ...element,
        stations: newStations
      };
    }));
    setActualStationIndex(prev => prev + 1);
  }

  useEffect(() => {
    if (state.order && state.unitarioMetadata && state.unitarioMetadata.number_of_pages && state.orderXml?.actividad?.id !== "MADERA") {
      let HCount, HGap, VCount, VGap;
      let StartNewLane = true;
      const datosCarton = state.orderXml?.actividad?.carton;
      const datosFlexible = state.orderXml?.actividad?.flexible;
      const datosEtiquetas = state.orderXml?.actividad?.adhesivo;
      const numberOfPages = state.unitarioMetadata.number_of_pages;

      switch (state.actividad) {
        case "CARTON":
          VCount = datosCarton?.carton_motivos || 1;
          HCount = datosCarton?.carton_caidas || 1;
          break;
        case "FLEXIBLE":
          VCount = datosFlexible?.flexible_motivos || 1;
          HCount = datosFlexible.flexible_caidas ? parseInt(datosFlexible?.flexible_caidas / numberOfPages) : 1; // dividir
          break;
        case "ETIQUETAS":
          StartNewLane = false;
          HCount = datosEtiquetas?.adhesivo_mvto_avance || 1;
          HGap = datosEtiquetas?.adhesivo_sepa_avance.replace(",", ".") || 0;
          VCount = datosEtiquetas?.adhesivo_mvto_ancho ? parseInt(datosEtiquetas?.adhesivo_mvto_ancho / numberOfPages) : 1; // dividir
          VGap = datosEtiquetas?.adhesivo_sepa_ancho.replace(",", ".") || 0;
          break;

        default:
          break;
      }

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
          StartNewLane,
          HCount,
          HOffset: 0,
          HGap: HGap || 0,
          VCount,
          VOffset: 0,
          VGap: VGap || 0,
          StaggerDirection: "none",
          StaggerOffset: 0,
          RestartAfter: 0,
          HeadTurn: {
            _id: "none",
            headTurn: "none",
            textoOpcion: "Ninguno"
          },
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

  return (
    <div className="actionBody">
      <div className="configAvanzadaMontaje">
        <div className="formSections">
          <div className="formSection">
            {executingAction ? (
              <p>Cargando <ThreeDot color="black" /></p>
            ) : (
              <>
                <h2>Estaciones</h2>
                <div className="fileConfigSelector">
                  {stations.map((config, index) => (
                    <div
                      key={index}
                      onClick={() => setActualStationIndex(index)}
                      className={`selectorItem ${actualStationIndex === index ? "selectorActive" : ""}`}
                    >
                      <p>{config.id_pedido}</p>
                      <p>{config.actividadPedido !== "MADERA" && "Página: "}{config.PageIndex}</p>
                    </div>
                  ))}
                </div>
                <div className="filesActions">
                  <InputWithSearch clickBehavior={(result) => addFileConfig(result)} placeholder="Buscar pedido..." />
                  <div
                    className="actionItem"
                    onClick={moveLeft}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Mover hacia la izquierda"
                  >
                    <FaArrowLeft />
                  </div>
                  <div
                    className="actionItem"
                    onClick={moveRight}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Mover hacia la derecha"
                  >
                    <FaArrowRight />
                  </div>
                  <div
                    className="actionItem"
                    onClick={duplicateFileConfig}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Duplicar estación"
                  >
                    <p>+</p>
                    <IoDocumentsOutline />
                  </div>
                  <div
                    className="actionItem"
                    onClick={removeFileConfig}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Eliminar estación"
                  >
                    <p>-</p>
                    <IoDocumentOutline />
                  </div>
                </div>
              </>
            )}
          </div>
          {stations.length > 0 && (
            formData.formSections.map((section, sectionIndex) => (
              <FormSection
                sectionData={section}
                formFields={formData.formFields}
                handleForm={e => handleChange(e.target.name, e.target.type === "checkbox" ? e.target.checked : e.target.value)}
                inputData={activeStation}
              />
            ))
          )}
        </div>
      </div>
      <ReactTooltip id="my-tooltip" delayShow={750} />
    </div>
  )
}

export default MontajeAvanzadoComponent