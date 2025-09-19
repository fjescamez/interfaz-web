import { OrbitProgress } from "react-loading-indicators"

function InfoTintasTramas({ info }) {
    return (
        <>
            {info
                ?
                info.map((color, index) => (
                    <div className="formSection">
                        <p>{index + 1}. {color.color}</p>
                        <div className="color">
                            <ul>
                            <li>Resolución: {color.resolucion}</li>
                            <li>Ancho: {color.ancho}</li>
                            <li>Alto: {color.alto}</li>
                            <li>Tramas:</li>
                            <ul className="tramasList">
                                {color.tramas.map((trama, index) => (
                                    <>
                                        <p>{index + 1}. {trama.trama}</p>
                                        <ul className="tramasSpecs">
                                            <li>Lineatura: {trama.lineaturaSugerida} / {trama.lineatura}</li>
                                            <li>Ángulo: {trama.angulo}</li>
                                            <li>Curva Plancha: {trama.curvaPlancha}</li>
                                            <li>Contracurva Plancha: {trama.contraCurva}</li>
                                            <li>Curva Cliente: {trama.curvaCliente}</li>
                                            <li>Contracurva Cliente: {trama.contracurvaCliente}</li>
                                        </ul>
                                    </>
                                ))}
                            </ul>
                        </ul>
                        </div>
                    </div>
                ))
                :
                <OrbitProgress variant="dotted" color="var(--highlight)" size="large" />
            }
        </>
    )
}

export default InfoTintasTramas