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

    const afterSubmit = () => {
        setXmlModal(false);
        window.open("http://192.4.26.120:9090/portal.cgi?hub&topbar=true", "_blank");
    }

    return (
        <GeneralForm
            setModal={setXmlModal}
            formData={xmlFormData}
            itemsData={xmlData}
            endpoint={"orderKiosks/lanzarXml"}
            submitText={"Iniciar Tarea"}
            afterSubmit={afterSubmit}
        />
    )
}

export default XmlKiosk