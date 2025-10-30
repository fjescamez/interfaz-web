import { useEffect, useState } from 'react'
import Table from '../components/Table'
import { externosFinalizadosTableInfo } from '../helpers/tablesInfo'

function ExternosFinalizadosPage() {
    const [tableInfo, setTableInfo] = useState(null); // Inicialmente null
    const location = window.location.pathname;

    useEffect(() => {
        const updatedTableInfo = { ...externosFinalizadosTableInfo }; // Copia inicial
        if (location.includes("/externosFinalizados")) {
            updatedTableInfo.tableName = "externosFinalizados";
            updatedTableInfo.endPoint = "planchas/externosFinalizados";
            updatedTableInfo.headerTitle = "EXTERNOS FINALIZADOS";
        } else if (location.includes("/externosAnulados")) {
            updatedTableInfo.tableName = "externosAnulados";
            updatedTableInfo.endPoint = "planchas/externosAnulados";
            updatedTableInfo.headerTitle = "EXTERNOS ANULADOS";
        }
        setTableInfo(updatedTableInfo); // Actualiza el estado
    }, [location]);

    return (
        tableInfo && (
            <Table
                dinamicTableInfo={tableInfo}
            />
        )
    )
}

export default ExternosFinalizadosPage;