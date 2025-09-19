function PedidoEtiquetas({ orderXml }) {
  const adhesivo = orderXml.actividad?.adhesivo;

  return (
    <div className="etiquetas">
      <div className="medidas flex">
        <div className="title">
          <p>MEDIDAS</p>
        </div>
        <div className="body">
          <table>
            <tbody>
              <tr>
                <td><span className="highlight">AVANCE:</span></td>
                <td>{adhesivo.adhesivo_avance}</td>
              </tr>
              <tr>
                <td><span className="highlight">SEPARACIÓN:</span></td>
                <td>{adhesivo.adhesivo_separacion}</td>
              </tr>
              <tr>
                <td><span className="highlight">DESARROLLO:</span></td>
                <td>{adhesivo.adhesivo_desarrollo}</td>
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
                <td><span className="highlight">Nº TROQUEL:</span></td>
                <td>{adhesivo.adhesivo_troquel}</td>
                <td><span className="highlight">MOTIVOS AVANCE:</span></td>
                <td>{adhesivo.adhesivo_mvto_avance}</td>
              </tr>
              <tr>
                <td><span className="highlight">VALOR Z:</span></td>
                <td>{adhesivo.adhesivo_z}</td>
                <td><span className="highlight">MOTIVOS ANCHO:</span></td>
                <td>{adhesivo.adhesivo_mvto_ancho}</td>
              </tr>
              <tr>
                <td><span className="highlight">BOBINADO:</span></td>
                <td>{adhesivo.adhesivo_bobinado}</td>
                <td><span className="highlight">SEPARACION AVANCE:</span></td>
                <td>{adhesivo.adhesivo_sepa_avance}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td><span className="highlight">SEPARACION ANCHO:</span></td>
                <td>{adhesivo.adhesivo_sepa_ancho}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PedidoEtiquetas