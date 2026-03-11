import React from 'react'
import GeneralForm from './GeneralForm'
import { incidenciaFormData } from '../../helpers/formsData'
import { useSession } from '../../context/SessionContext'

function IncidenciaForm({ setIncidenciaPopUp, planchaId, plancha }) {
    const { session } = useSession();
    const { username } = session;
    
    const incidenciaData = {
        username,
        incidencia: ""
    };

    return (
        <GeneralForm
            setModal={setIncidenciaPopUp}
            formData={incidenciaFormData}
            itemsData={incidenciaData}
            endpoint={"planchas/generarIncidencia"}
            submitText={"Confirmar"}
        />
    )
}

export default IncidenciaForm
