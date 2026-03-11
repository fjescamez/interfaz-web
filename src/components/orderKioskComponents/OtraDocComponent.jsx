import Switch from '@mui/material/Switch';
import { useEffect } from 'react';

function OtraDocComponent({ state, updateState }) {
  return (
    <div className="actionBody">
      <div className="otraDoc">
        <section className="otraDocSection">
          <h2>Certificados</h2>
          <div className="switches">
            <div className="switchGroup">
              <Switch
                className="kioskSwitch"
                checked={state.otraDocumentacion.certificadoControl || false}
                onChange={(e) => {
                  updateState("otraDocumentacion", (prev) => ({
                    ...prev,
                    certificadoControl: e.target.checked
                  }));
                }}
              />
              <p>Control</p>
            </div>
            <div className="switchGroup">
              <Switch
                className="kioskSwitch"
                checked={state.otraDocumentacion.certificadoContinuos || false}
                onChange={(e) => {
                  updateState("otraDocumentacion", (prev) => ({
                    ...prev,
                    certificadoContinuos: e.target.checked
                  }));
                }}
              />
              <p>Continuos</p>
            </div>
            <div className="switchGroup">
              <Switch
                className="kioskSwitch"
                checked={state.otraDocumentacion.certificadoCodigos || false}
                onChange={(e) => {
                  updateState("otraDocumentacion", (prev) => ({
                    ...prev,
                    certificadoCodigos: e.target.checked
                  }));
                }}
              />
              <p>Códigos</p>
            </div>
            <div className="switchGroup">
              <Switch
                className="kioskSwitch"
                checked={state.otraDocumentacion.unitarioPng || false}
                onChange={(e) => {
                  updateState("otraDocumentacion", (prev) => ({
                    ...prev,
                    unitarioPng: e.target.checked
                  }));
                }}
              />
              <p>Unitario PNG</p>
            </div>
          </div>
        </section>
        <section className="otraDocSection">
          <h2>Etiquetas</h2>
          <div className="switches">
            <div className="switchGroup">
              <Switch
                className="kioskSwitch"
                checked={state.otraDocumentacion.etiquetasMontaje || false}
                onChange={(e) => {
                  updateState("otraDocumentacion", (prev) => ({
                    ...prev,
                    etiquetasMontaje: e.target.checked
                  }));
                }}
              />
              <p>Montaje</p>
            </div>
            <div className="switchGroup">
              <Switch
                className="kioskSwitch"
                checked={state.otraDocumentacion.etiquetasPlotter || false}
                onChange={(e) => {
                  updateState("otraDocumentacion", (prev) => ({
                    ...prev,
                    etiquetasPlotter: e.target.checked
                  }));
                }}
              />
              <p>Plotter</p>
            </div>
            <div className="switchGroup">
              <Switch
                className="kioskSwitch"
                checked={state.otraDocumentacion.etiquetasPrueba || false}
                onChange={(e) => {
                  updateState("otraDocumentacion", (prev) => ({
                    ...prev,
                    etiquetasPrueba: e.target.checked
                  }));
                }}
              />
              <p>Prueba</p>
            </div>
          </div>
        </section>
        <section className="otraDocSection">
          <h2>Separaciones</h2>
          <div className="switches">
            <div className="switchGroup">
              <Switch
                className="kioskSwitch"
                checked={state.otraDocumentacion?.separaciones?.hacer || false}
                onChange={(e) => {
                  updateState("otraDocumentacion", (prev) => ({
                    ...prev,
                    separaciones: {
                      ...prev.separaciones,
                      hacer: e.target.checked
                    }
                  }));
                }}
              />
              <p>Hacer separaciones</p>
            </div>
          </div>
        </section>
      </div>
    </div >
  )
}

export default OtraDocComponent