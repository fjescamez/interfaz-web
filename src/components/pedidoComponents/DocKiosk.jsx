import GeneralForm from '../formComponents/GeneralForm'
import { docFormData } from '../../helpers/formsData'

function DocKiosk({ setDocModal, fullOrder }) {
    const docData = {
        entradaUnitario: "Illustrator",
        "Ficha Boceto": false,
        "Ficha Impresion": false,
        "Plotter": false,
        "Montaje": false,
        "Montaje Especial": false,
        "Separaciones": false,
        "Etiquetas de Montaje": false,
        "Certificado": false,
        "Certificado Continuos": false,
        "Etiquetas Plotter": false,
        "Certificado Codigos": false,
        unitarioPng: false,
        paradaFreecut: false,
        archivoXml: fullOrder.archivoXml,
        id_pedido: fullOrder.id_pedido,
        _id: fullOrder._id
    }

    return (
        <GeneralForm
            setModal={setDocModal}
            formData={docFormData}
            itemsData={docData}
            endpoint={"orderKiosks/lanzarDoc"}
            submitText={"Iniciar Tarea"}
        />
    )
}

export default DocKiosk