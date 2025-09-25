import { xmlFormData } from '../../helpers/formsData'
import GeneralForm from '../formComponents/GeneralForm'

function XmlKiosk({ setXmlModal, fullOrder }) {
    const xmlData = {
        tipoUnitario: "illustrator",
        trapping: "noTrapping",
        separaciones: "noSeparaciones",
        montaje: "noMontaje",
        compararUnitario: "noComparar",
        eliminarTintas: "noEliminar",
        bocetoRasterizado: "siBoceto",
        paradaFreecut: "noParada"
    }

    return (
        <GeneralForm
            setModal={setXmlModal}
            formData={xmlFormData}
            itemsData={xmlData}
            endpoint={""}
        />
    )
}

export default XmlKiosk
