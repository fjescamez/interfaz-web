import Switch from '@mui/material/Switch';
import { useEffect } from 'react';
import { notify } from '../../helpers/notify';
import { toast } from "react-toastify";

function MontajeComponent({ orderXml, montajeData, setMontajeData, setConfigAvanzadaData, isActive, setIsActive, setIsOpen }) {
  useEffect(() => {
    if (orderXml?.actividad?.id === "MADERA" && isActive.montaje) {
      orderXml?.actividad?.madera?.madera_premontaje.forEach(item => {
        if (item.madera_capituladas === "-1" || item.madera_montaje_esp === "-1" || item.madera_tablero_rotado === "-1") {
          setMontajeData(prev => ({
            ...prev,
            [item.madera_tmedida]: {
              isActive: true,
              isConfigAvanzadaActive: true
            }
          }));

          setIsOpen((prev) => ({
            ...prev,
            [item.madera_tmedida]: true,
            [`configAvanzada${item.madera_tmedida}`]: true
          }));

          if (item.madera_capituladas === "-1") {
            setConfigAvanzadaData(prev => prev.map(data => {
              if (data.elementId === item.madera_tmedida) {
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
              return data;
            }));
          } else if (item.madera_tablero_rotado === "-1") {
            setConfigAvanzadaData(prev => prev.map(data => {
              if (data.elementId === item.madera_tmedida) {
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
            }));
          }
        }
      });
    }
  }, [isActive]);

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
                    notify(toast.warning, "warning", "Activa el montaje para usar esta opción");
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
                    notify(toast.warning, "warning", "Activa el montaje para usar esta opción");
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
                    notify(toast.warning, "warning", "Activa el montaje para usar esta opción");
                  }
                }}
              />
              <p>Config. Avanzada</p>
            </div>
          </div>
        ) : (
          // PARA MADERA
          orderXml?.actividad?.madera?.madera_premontaje.map((item, index) => (
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
          ))
        )}
      </div>
    </div>
  )
}

export default MontajeComponent