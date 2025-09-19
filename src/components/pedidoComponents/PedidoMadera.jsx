import { TfiLayoutColumn3Alt } from "react-icons/tfi"
import Separador from "../../assets/svg/Separador"
import Capiculado from "../../assets/svg/Capiculado"

function PedidoMadera({ orderXml }) {
    const madera = orderXml.actividad?.madera;
    const madera_premontaje = orderXml.actividad?.madera.madera_premontaje;

    return (
        <div className="madera">
            <div className="specs flex">
                <div className="title">
                    <p>ESPECIFICACIONES MADERA</p>
                </div>
                <div className="body">
                    <table>
                        <tbody>
                            <tr>
                                <td><p className="highlight">TABLILLA</p></td>
                                <td><p className="highlight">ANCHO</p></td>
                                <td><p className="highlight">ALTO</p></td>
                                <td className="noPadding"><TfiLayoutColumn3Alt /></td>
                                <td className="noPadding"><TfiLayoutColumn3Alt className="rotate" /></td>
                                <td className="noPadding"><Separador /></td>
                                <td className="noPadding rotate"><Separador /></td>
                                <td className="noPadding"><Capiculado /></td>
                                <td><p className="highlight">ANCHO T.</p></td>
                                <td><p className="highlight">ALTO T.</p></td>
                                <td><p className="highlight">ROTAR</p></td>
                                <td><p className="highlight">ESPEC.</p></td>
                            </tr>
                            {madera_premontaje?.map((spec) => (
                                <tr key={spec.madera_premontaje_id}>
                                    <td><p>{spec.madera_tmedida}</p></td>
                                    <td><p>{spec.madera_ancho}</p></td>
                                    <td><p>{spec.madera_alto}</p></td>
                                    <td><p>{spec.madera_mvto_ancho}</p></td>
                                    <td><p>{spec.madera_mvto_desarrollo}</p></td>
                                    <td><p>{spec.madera_sepa_ancho}</p></td>
                                    <td><p>{spec.madera_sepa_avance}</p></td>
                                    <td><input type="checkbox" className="check" checked={spec.madera_capituladas === "-1"} readOnly /></td>
                                    <td><p>{spec.madera_tablero_ancho}</p></td>
                                    <td><p>{spec.madera_tablero_alto}</p></td>
                                    <td><input type="checkbox" className="check" checked={spec.madera_tablero_rotado === "-1"} readOnly /></td>
                                    <td><input type="checkbox" className="check" checked={spec.madera_montaje_esp === "-1"} readOnly /></td>
                                </tr>
                            ))}
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
                                <td><p className="highlight">ANCHO:</p></td>
                                <td>{madera.madera_camisa_ancho}</td>
                            </tr>
                            <tr>
                                <td><p className="highlight">ALTO:</p></td>
                                <td>{madera.madera_camisa_desa}</td>
                            </tr>
                            <tr>
                                <td><p className="highlight">PREMONTADO:</p></td>
                                <td><input type="checkbox" className="check" checked={madera.madera_camisa_premonta === "-1"} readOnly/></td>
                            </tr>
                            <tr>
                                <td><p className="highlight">UNIDADES:</p></td>
                                <td>{madera.madera_camisa_uds}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default PedidoMadera