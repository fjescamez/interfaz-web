import Switch from '@mui/material/Switch';
import { useEffect } from 'react';
import { notify } from '../../helpers/notify';
import KioscoPersoMontaje from './KioscoPersoMontaje';
import { globalKioskVariables } from './kioscoPersoConfig';
import FormGroup from '../formComponents/FormGroup';
import { avanzadoFormData } from '../../helpers/orderKioskActions';

function MontajeComponent({ state, orderXml, montajeData, configAvanzadaData, updateState, kioscoPersoData, colores, isActive }) {
  useEffect(() => {
    if (orderXml?.actividad?.id !== "MADERA" || !isActive.montaje) return;

    const items = orderXml?.actividad?.madera?.madera_premontaje || [];
    if (items.length === 0) return;

    updateState("montajeData", (prev) => {
      let changed = false;
      const next = { ...prev };

      items.forEach((item) => {
        const key = item?.madera_tmedida;
        if (!key) return;
        const prevEntry = prev?.[key];
        if (prevEntry) return;

        next[key] = {
          ...prevEntry,
          isActive: true,
          Orientation: {
            _id: "left",
            orientation: "left",
            textoOpcion: "Rotada -90º"
          },
          HeadTurn: item.madera_capituladas === "-1" ? {
            _id: "column",
            headTurn: "column",
            textoOpcion: "Cada columna (por los culos)"
          } : {
            _id: "none",
            headTurn: "none",
            textoOpcion: "Ninguno"
          }
        };
        changed = true;
      });

      return changed ? next : prev;
    });
  }, [orderXml?.actividad?.id, orderXml?.actividad?.madera?.madera_premontaje, isActive.montaje, updateState]);

  useEffect(() => {
    if (orderXml?.actividad?.id !== "MADERA" || !isActive.montaje) return;

    const items = orderXml?.actividad?.madera?.madera_premontaje || [];
    if (items.length === 0) return;

    const itemsToConfigure = items.filter((item) => (item.madera_montaje_esp === "-1"));

    if (itemsToConfigure.length === 0) return;

    updateState("montajeData", (prev) => {
      let changed = false;
      const next = { ...prev };

      itemsToConfigure.forEach((item) => {
        const key = item.madera_tmedida;
        if (!key) return;
        const prevEntry = prev?.[key];

        if (prevEntry?.manualOverride) return;

        if (prevEntry) {
          const shouldActivate = !prevEntry.isActive || !prevEntry.isConfigAvanzadaActive;
          if (!shouldActivate) return;

          next[key] = {
            ...prevEntry,
            isActive: true,
            isConfigAvanzadaActive: true
          };
          changed = true;
          return;
        }

        next[key] = {
          ...prevEntry,
          isActive: true,
          isConfigAvanzadaActive: true
        };
        changed = true;
      });

      return changed ? next : prev;
    });

    updateState("isOpen", (prev) => {
      let changed = false;
      const next = { ...prev };

      itemsToConfigure.forEach((item) => {
        const key = item.madera_tmedida;
        if (!key) return;
        if (!next[key]) {
          next[key] = true;
          changed = true;
        }
        const configKey = `configAvanzada${key}`;
        if (!next[configKey]) {
          next[configKey] = true;
          changed = true;
        }
      });

      return changed ? next : prev;
    });

    updateState("configAvanzadaData", (prev) => {
      let changed = false;
      const next = (prev || []).map((data) => {
        const item = itemsToConfigure.find((it) => it.madera_tmedida === data.elementId);
        if (!item) return data;

        if (item.madera_capituladas === "-1") {
          if (data.stations?.[0]?.HeadTurn.headTurn === "column") return data;
          changed = true;
          return {
            ...data,
            stations: [
              {
                ...data.stations[0],
                HeadTurn: {
                  _id: "column",
                  headTurn: "column",
                  textoOpcion: "Cada columna"
                },
              },
              ...data.stations.slice(1)
            ]
          };
        }

        if (item.madera_tablero_rotado === "-1") {
          if (data.stations?.[0]?.Orientation.orientation === "up") return data;
          changed = true;
          return {
            ...data,
            stations: [
              {
                ...data.stations[0],
                Orientation: {
                  _id: "up",
                  orientation: "up",
                  textoOpcion: "Original"
                }
              },
              ...data.stations.slice(1)
            ]
          };
        }

        return data;
      });

      return changed ? next : prev;
    });
  }, [orderXml?.actividad?.id, orderXml?.actividad?.madera?.madera_premontaje, isActive.montaje]);

  const createDefaultStation = (orderBase, item) => ({
    _id: orderBase?._id || "",
    id_pedido: orderBase?.id_pedido || "",
    numeroPaginas: 1,
    OneUp: `${orderBase?.id_pedido} ${orderBase?.xml?.numero?.marca}` || "",
    PageBox: "TrimBox",
    PageIndex: item.madera_tmedida,
    Orientation: {
      _id: "left",
      orientation: "left",
      textoOpcion: "Rotada -90º"
    },
    StartNewLane: true,
    HCount: item.madera_mvto_ancho || 1,
    HOffset: 0,
    HGap: item.madera_sepa_ancho ? item.madera_sepa_ancho.replace(",", ".") : 0,
    VCount: item.madera_mvto_desarrollo || 1,
    VOffset: 0,
    VGap: item.madera_sepa_avance ? item.madera_sepa_avance.replace(",", ".") : 0,
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
    unitarioUrl: state.order?.unitario || "",
    listadoTablillas: orderBase?.xml?.actividad?.madera?.madera_premontaje.map(item => item.madera_tmedida) || [],
    actividadPedido: "MADERA"
  });

  useEffect(() => {
    if (orderXml?.actividad?.id === "MADERA") {
      const maderaElements =
        orderXml?.actividad?.madera?.madera_premontaje?.map((item) => ({
          elementId: item?.madera_tmedida || "",
          stations: [createDefaultStation(state?.order, item)]
        })) || [];
      updateState("configAvanzadaData", maderaElements);
    }
  }, [orderXml]);

  return (
    <div className="actionBody">
      <div className="montaje">
        {orderXml?.actividad?.id !== "MADERA" ? (
          <div className="switches">
            {orderXml?.actividad?.id !== "FLEXIBLE" && (
              <div className="switchGroup">
                <Switch
                  className="kioskSwitch"
                  checked={isActive.especial || false}
                  onChange={e => {
                    if (isActive.montaje) {
                      updateState("isActive", prev => ({
                        ...prev,
                        especial: e.target.checked
                      }));

                      updateState("isOpen", (prev) => ({
                        ...prev,
                        especial: true
                      }));
                    } else {
                      notify("warning", "Activa el montaje para usar esta opción");
                    }
                  }}
                />
                <p>Especial</p>
              </div>
            )}
            <div className="switchGroup">
              <Switch
                className="kioskSwitch"
                checked={isActive.configAvanzadaMontaje || false}
                onChange={e => {
                  if (isActive.montaje) {
                    updateState("isActive", prev => ({
                      ...prev,
                      configAvanzadaMontaje: e.target.checked
                    }));

                    updateState("isOpen", (prev) => ({
                      ...prev,
                      configAvanzadaMontaje: true
                    }));
                  } else {
                    notify("warning", "Activa el montaje para usar esta opción");
                  }
                }}
              />
              <p>Config. Avanzada</p>
            </div>
          </div>
        ) : (
          // PARA MADERA
          <div className="montajeMadera">
            {orderXml?.actividad?.madera?.madera_premontaje.map((item, index) => {
              return (
                <div className="switches" key={index}>
                  <div className="switchGroup">
                    <Switch
                      className="kioskSwitch"
                      checked={montajeData[item.madera_tmedida]?.isActive || false}
                      onChange={e => {
                        const isActive = e.target.checked;
                        updateState("montajeData", prev => ({
                          ...prev,
                          [item.madera_tmedida]: {
                            ...prev[item.madera_tmedida],
                            manualOverride: true,
                            isActive,
                            isConfigAvanzadaActive: isActive ? prev[item.madera_tmedida]?.isConfigAvanzadaActive || false : false
                          }
                        }));

                        updateState("isOpen", (prev) => ({
                          ...prev,
                          [item.madera_tmedida]: true
                        }));
                      }}
                    />
                    <p>{item.madera_tmedida}</p>
                  </div>
                  <div className={`formGroup ${montajeData[item.madera_tmedida]?.isConfigAvanzadaActive ? "hidden" : ""}`}>
                    <FormGroup
                      handleForm={(e) => updateState("montajeData", prev => ({
                        ...prev,
                        [item.madera_tmedida]: {
                          ...prev[item.madera_tmedida],
                          Orientation: e.target.value
                        }
                      }))}
                      value={montajeData[item.madera_tmedida]?.Orientation || ""}
                      field={avanzadoFormData.formFields.find(field => field.htmlFor === "OrientationMadera") || {}}
                    />
                  </div>
                  <div className={`formGroup ${montajeData[item.madera_tmedida]?.isConfigAvanzadaActive ? "hidden" : ""}`}>
                    <FormGroup
                      handleForm={(e) => updateState("montajeData", prev => ({
                        ...prev,
                        [item.madera_tmedida]: {
                          ...prev[item.madera_tmedida],
                          HeadTurn: e.target.value
                        }
                      }))}
                      value={montajeData[item.madera_tmedida]?.HeadTurn || ""}
                      field={avanzadoFormData.formFields.find(field => field.htmlFor === "HeadTurnMadera") || {}}
                    />
                  </div>
                  <div className="switchGroup">
                    <Switch
                      className="kioskSwitch"
                      checked={montajeData[item.madera_tmedida]?.isConfigAvanzadaActive || false}
                      onChange={e => {
                        const isConfigAvanzadaActive = e.target.checked;
                        updateState("montajeData", prev => ({
                          ...prev,
                          [item.madera_tmedida]: {
                            ...prev[item.madera_tmedida],
                            manualOverride: true,
                            isConfigAvanzadaActive,
                            isActive: isConfigAvanzadaActive ? true : prev[item.madera_tmedida]?.isActive || false
                          }
                        }));

                        updateState("isOpen", (prev) => ({
                          ...prev,
                          [`configAvanzada${item.madera_tmedida}`]: true
                        }));

                        updateState("configAvanzadaData", (prev) => {
                          return prev.map(config => config.elementId === item.madera_tmedida ? {
                            ...config,
                            stations: [{
                              ...config.stations[0],
                              Orientation: montajeData[item.madera_tmedida]?.Orientation,
                              HeadTurn: montajeData[item.madera_tmedida]?.HeadTurn
                            }]
                          } : config);
                        });
                      }}
                    />
                    <p>Config. Avanzada</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {(orderXml?.numero?.cliente_codigo && Object.values(globalKioskVariables).some(arr => arr.includes(orderXml.numero.cliente_codigo)) || (orderXml?.actividad?.id === "CARTON" && orderXml?.actividad?.carton?.carton_tcaja !== "TROQUELADA PLATO")) && (
          <KioscoPersoMontaje orderXml={orderXml} kioscoPersoData={kioscoPersoData} updateState={updateState} colores={colores} configAvanzadaData={configAvanzadaData} state={state} />
        )}
      </div>
    </div>
  )
}

export default MontajeComponent