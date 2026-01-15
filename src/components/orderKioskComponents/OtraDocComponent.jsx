import Switch from '@mui/material/Switch';
import { useEffect } from 'react';

function OtraDocComponent({ otraDocumentacion, setOtraDocumentacion }) {
  return (
    <div className="actionBody">
      <div className="otraDoc">
        <section className="otraDocSection">
          <h2>Certificados</h2>
          <div className="switches">
            <div className="switchGroup">
              <Switch
                className="kioskSwitch"
                checked={otraDocumentacion.certificadoControl || false}
                onChange={(e) => {
                  setOtraDocumentacion((prev) => ({
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
                checked={otraDocumentacion.certificadoContinuos || false}
                onChange={(e) => {
                  setOtraDocumentacion((prev) => ({
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
                checked={otraDocumentacion.certificadoCodigos || false}
                onChange={(e) => {
                  setOtraDocumentacion((prev) => ({
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
                checked={otraDocumentacion.unitarioPng || false}
                onChange={(e) => {
                  setOtraDocumentacion((prev) => ({
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
                checked={otraDocumentacion.etiquetasMontaje || false}
                onChange={(e) => {
                  setOtraDocumentacion((prev) => ({
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
                checked={otraDocumentacion.etiquetasPlotter || false}
                onChange={(e) => {
                  setOtraDocumentacion((prev) => ({
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
                checked={otraDocumentacion.etiquetasPrueba || false}
                onChange={(e) => {
                  setOtraDocumentacion((prev) => ({
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
                checked={otraDocumentacion?.separaciones?.hacer || false}
                onChange={(e) => {
                  setOtraDocumentacion((prev) => ({
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