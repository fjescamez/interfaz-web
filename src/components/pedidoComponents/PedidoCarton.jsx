function PedidoCarton({ orderXml }) {
  const carton = orderXml.actividad?.carton;
  const carton_premontaje = orderXml.actividad?.carton.carton_premontaje;

  return (
    <div className="carton">
      <div className="datosMontaje flex">
        <div className="title">
          <p>DATOS MONTAJE</p>
        </div>
        <div className="body">
          <table>
            <tbody>
              <tr>
                <td className="highlight">TIPO CAJA:</td>
                <td>{carton.carton_tcaja}</td>
                <td className="highlight">Nº MOTIVOS:</td>
                <td><span className="invis">i</span>{carton.carton_motivos}</td>
              </tr>
              <tr>
                <td className="highlight">Nº TROQUEL:</td>
                <td>{carton.carton_troquel}</td>
                <td className="highlight">Nº CAIDAS:</td>
                <td><span className="invis">i</span>{carton.carton_caidas}</td>
              </tr>
              <tr>
                <td className="highlight">MEDIDA CAJA:</td>
                <td>{`${carton.carton_caja_largo} x ${carton.carton_caja_ancho} x ${carton.carton_caja_alto}`}</td>
                <td className="highlight">PREMONTADO:</td>
                <td><input type="checkbox" className="check" checked={carton.carton_premontado === "X"} readOnly /></td>
              </tr>
              <tr>
                <td className="highlight">MEDIDA CLICHÉ:</td>
                <td>{`${carton.carton_cliche_ancho} x ${carton.carton_cliche_alto}` !== "0 x 0" && `${carton.carton_cliche_ancho} x ${carton.carton_cliche_alto}`}</td>
                <td className="highlight">ARRASTRADORES:</td>
                <td><input type="checkbox" className="check" checked={carton.carton_arrastradores === "X"} readOnly /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="premontaje flex">
        <div className="title">
          <p>PREMONTAJE</p>
        </div>
        <div className="body">
          <table>
            <tbody>
              <tr>
                <td><span className="highlight">ANCHO</span></td>
                <td><span className="highlight">ALTO</span></td>
                <td><span className="highlight">GRAMAJE</span></td>
                <td><span className="highlight">CANTIDAD</span></td>
              </tr>
              {carton_premontaje?.map((carton) => (
                <tr key={carton.carton_premontaje_id}>
                  <td>{carton.carton_premontaje_ancho}</td>
                  <td>{typeof carton.carton_premontaje_largo !== "object" && carton.carton_premontaje_largo}</td>
                  <td>{carton.carton_premontaje_gramaje}</td>
                  <td>{carton.carton_premontaje_cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PedidoCarton