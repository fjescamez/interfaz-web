import React from 'react'
import GeneralForm from '../formComponents/GeneralForm'
import { docFormData } from '../../helpers/formsData'

function DocKiosk({ setDocModal, fullOrder }) {
    const docData = {
        tipoUnitario: "illustrator",
        fichaBoceto: false,
        fichaImpresion: false,
        plotter: false,
        montaje: false,
        montajeEspecial: false,
        separaciones: false,
        etiquetasMontaje: false,
        certificado: false,
        certificadoContinuos: false,
        etiquetasPlotter: false,
        certificadoCodigos: false,
        unitarioPng: false,
        paradaFreecut: false,
    }

    return (
        <GeneralForm
            setModal={setDocModal}
            formData={docFormData}
            itemsData={docData}
            endpoint={""}
        />
    )
}

export default DocKiosk