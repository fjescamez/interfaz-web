import { xmlFormData } from '../../helpers/formsData'
import GeneralForm from '../formComponents/GeneralForm'

function XmlKiosk({ setXmlModal, fullOrder }) {
    const xmlData = {
        entradaUnitario: "Illustrator",
        hacerTrapping: "noTrapping",
        hacerSeparaciones: "noSeparaciones",
        hacerMontaje: "noMontaje",
        compararVersion: "noComparar",
        canalDel: "noEliminar",
        rasterizar: "siBoceto",
        paradaFreecut: false,
        archivoXml: fullOrder.archivoXml,
        id_pedido: fullOrder.id_pedido,
        _id: fullOrder._id
    }

    return (
        <GeneralForm
            setModal={setXmlModal}
            formData={xmlFormData}
            itemsData={xmlData}
            endpoint={"orderKiosks/lanzarXml"}
            submitText={"Iniciar Tarea"}
        />
    )
}

export default XmlKiosk