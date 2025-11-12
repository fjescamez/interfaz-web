import { useState } from "react";

function PedidoFlexible({ orderXml }) {
  const flexible = orderXml.actividad?.flexible;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (flexible) {
      Object.keys(flexible).forEach((key) => {
        if (
          flexible[key] &&
          typeof flexible[key] === "object" &&
          Object.keys(flexible[key]).length === 0
        ) {
          flexible[key] = "";
        }
      });
    }
    setLoading(false); // Mark as complete
  }, [flexible]);

  if (loading) {
    return null; // Render nothing while loading
  }

  return (
    <div className="flexible">
      <div className="medidas flex">
        <div className="title">
          <p>MEDIDAS</p>
        </div>
        <div className="body">
          <table>
            <tbody>
              <tr>
                <td className="highlight">ANCHO CAIDA:</td>
                <td>{flexible.flexible_ancho_caida}</td>
                <td className="highlight">DES MOTIVO:</td>
                <td>{flexible.flexible_desamvto}</td>
              </tr>
              <tr>
                <td className="highlight">Nº CAIDAS:</td>
                <td>{flexible.flexible_caidas}</td>
                <td className="highlight">Nº MOTIVOS:</td>
                <td>{flexible.flexible_motivos}</td>
              </tr>
              <tr>
                <td className="highlight">ANCHO TOTAL:</td>
                <td>{flexible.flexible_ancho_impre}</td>
                <td className="highlight">DESARROLLO:</td>
                <td>{flexible.flexible_desatotal}</td>
              </tr>
              <tr>
                <td className="highlight">ANCHO MATERIAL:</td>
                <td>{flexible.flexible_ancho_mat}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="datosMontaje flex">
        <div className="title">
          <p>DATOS MONTAJE</p>
        </div>
        <div className="body">
          <table>
            <tbody>
              <tr>
                <td className="highlight">BOBINADO:</td>
                <td>{flexible.flexible_bobinado}</td>
              </tr>
              <tr>
                <td className="highlight separate">CORTADAS: <input type="checkbox" className="check" checked={flexible.flexible_cortadas === "X"} readOnly /></td>
                <td>{flexible.flexible_cortadas === "X" && `${flexible.flexible_cortadas1} + ${flexible.flexible_cortadas2}`}</td>
              </tr>
              <tr>
                <td className="highlight">TIPO FLEXIBLE:</td>
                <td>{flexible.flexible_tflexible}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PedidoFlexible