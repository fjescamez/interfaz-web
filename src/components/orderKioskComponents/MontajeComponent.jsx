import Switch from '@mui/material/Switch';
import { useEffect } from 'react';
import { notify } from '../../helpers/notify';

function MontajeComponent({ orderXml, montajeData, setMontajeData, setConfigAvanzadaData, isActive, setIsActive, setIsOpen }) {
  useEffect(() => {
    if (orderXml?.actividad?.id !== "MADERA" || !isActive.montaje) return;

    const items = orderXml?.actividad?.madera?.madera_premontaje || [];
    if (items.length === 0) return;

    setMontajeData((prev) => {
      let changed = false;
      const next = { ...prev };

      items.forEach((item) => {
        const key = item?.madera_tmedida;
        if (!key) return;
        const prevEntry = prev?.[key];
        if (prevEntry) return;

        next[key] = {
          ...prevEntry,
          isActive: true
        };
        changed = true;
      });

      return changed ? next : prev;
    });
  }, [orderXml?.actividad?.id, orderXml?.actividad?.madera?.madera_premontaje, isActive.montaje, setMontajeData]);

  useEffect(() => {
    if (orderXml?.actividad?.id !== "MADERA" || !isActive.montaje) return;

    const items = orderXml?.actividad?.madera?.madera_premontaje || [];
    if (items.length === 0) return;

    const itemsToConfigure = items.filter((item) => (
      item.madera_capituladas === "-1"
      || item.madera_montaje_esp === "-1"
      || item.madera_tablero_rotado === "-1"
    ));

    if (itemsToConfigure.length === 0) return;

    setMontajeData((prev) => {
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

    setIsOpen((prev) => {
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

    setConfigAvanzadaData((prev) => {
      let changed = false;
      const next = (prev || []).map((data) => {
        const item = itemsToConfigure.find((it) => it.madera_tmedida === data.elementId);
        if (!item) return data;

        if (item.madera_capituladas === "-1") {
          if (data.stations?.[0]?.HeadTurn === "column") return data;
          changed = true;
          return {
            ...data,
            stations: [
              {
                ...data.stations[0],
                HeadTurn: "column"
              },
              ...data.stations.slice(1)
            ]
          };
        }

        if (item.madera_tablero_rotado === "-1") {
          if (data.stations?.[0]?.Orientation === "up") return data;
          changed = true;
          return {
            ...data,
            stations: [
              {
                ...data.stations[0],
                Orientation: "up"
              },
              ...data.stations.slice(1)
            ]
          };
        }

        return data;
      });

      return changed ? next : prev;
    });
  }, [orderXml?.actividad?.id, orderXml?.actividad?.madera?.madera_premontaje, isActive.montaje, setMontajeData, setIsOpen, setConfigAvanzadaData]);

  return (
    <div className="actionBody">
      <div className="montaje">
        {orderXml?.actividad?.id !== "MADERA" ? (
          <div className="switches">
            {/* <div className="switchGroup">
              <Switch
                className="kioskSwitch"
                checked={isActive.freecut || false}
                onChange={e => {
                  if (isActive.montaje) {
                    setIsActive(prev => ({
                      ...prev,
                      freecut: e.target.checked
                    }));

                    setIsOpen((prev) => ({
                      ...prev,
                      freecut: true
                    }));
                  } else {
                    notify("warning", "Activa el montaje para usar esta opción");
                  }
                }}
              />
              <p>Freecut</p>
            </div> */}
            <div className="switchGroup">
              <Switch
                className="kioskSwitch"
                checked={isActive.especial || false}
                onChange={e => {
                  if (isActive.montaje) {
                    setIsActive(prev => ({
                      ...prev,
                      especial: e.target.checked
                    }));

                    setIsOpen((prev) => ({
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
            <div className="switchGroup">
              <Switch
                className="kioskSwitch"
                checked={isActive.configAvanzadaMontaje || false}
                onChange={e => {
                  if (isActive.montaje) {
                    setIsActive(prev => ({
                      ...prev,
                      configAvanzadaMontaje: e.target.checked
                    }));

                    setIsOpen((prev) => ({
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
          orderXml?.actividad?.madera?.madera_premontaje.map((item, index) => {
            return (
              <div className="switches" key={index}>
                <div className="switchGroup">
                  <Switch
                    className="kioskSwitch"
                    checked={montajeData[item.madera_tmedida]?.isActive || false}
                    onChange={e => {
                      const isActive = e.target.checked;
                      setMontajeData(prev => ({
                        ...prev,
                        [item.madera_tmedida]: {
                          ...prev[item.madera_tmedida],
                          manualOverride: true,
                          isActive,
                          isConfigAvanzadaActive: isActive ? prev[item.madera_tmedida]?.isConfigAvanzadaActive || false : false
                        }
                      }));

                      setIsOpen((prev) => ({
                        ...prev,
                        [item.madera_tmedida]: true
                      }));
                    }}
                  />
                  <p>{item.madera_tmedida}</p>
                </div>
                <div className="switchGroup">
                  <Switch
                    className="kioskSwitch"
                    checked={montajeData[item.madera_tmedida]?.isConfigAvanzadaActive || false}
                    onChange={e => {
                      const isConfigAvanzadaActive = e.target.checked;
                      setMontajeData(prev => ({
                        ...prev,
                        [item.madera_tmedida]: {
                          ...prev[item.madera_tmedida],
                          manualOverride: true,
                          isConfigAvanzadaActive,
                          isActive: isConfigAvanzadaActive ? true : prev[item.madera_tmedida]?.isActive || false
                        }
                      }));

                      setIsOpen((prev) => ({
                        ...prev,
                        [`configAvanzada${item.madera_tmedida}`]: true
                      }));
                    }}
                  />
                  <p>Config. Avanzada</p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default MontajeComponent