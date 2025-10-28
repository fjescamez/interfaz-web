import { useEffect, useState } from 'react';
import Table from '../components/Table';
import { planchasTableInfo } from '../helpers/tablesInfo';

function PlanchasPage() {
    const [planchas, setPlanchas] = useState([]);
    const [tableInfo, setTableInfo] = useState(null); // Inicialmente null
    const location = window.location.pathname;

    useEffect(() => {
        setPlanchas([]);
        const updatedTableInfo = { ...planchasTableInfo }; // Copia inicial
        if (location.includes("/planchasProduccion")) {
            updatedTableInfo.tableName = "planchasProduccion";
            updatedTableInfo.endPoint = "planchasProduccion";
            updatedTableInfo.headerTitle = "PLANCHAS PRODUCCIÓN";
        } else if (location.includes("/planchasPreproduccion")) {
            updatedTableInfo.tableName = "planchasPreproduccion";
            updatedTableInfo.endPoint = "planchasPreproduccion";
            updatedTableInfo.headerTitle = "PLANCHAS PREPRODUCCIÓN";
        } else if (location.includes("/planchasFinalizadas")) {
            updatedTableInfo.tableName = "planchasFinalizadas";
            updatedTableInfo.endPoint = "planchasFinalizadas";
            updatedTableInfo.headerTitle = "PLANCHAS FINALIZADAS";
        }
        setTableInfo(updatedTableInfo); // Actualiza el estado
    }, [location]);

    const planchasActions = () => {
        // Define las acciones aquí
    };

    // Renderiza la tabla solo si tableInfo está listo
    return (
        tableInfo && (
            <Table
                actions={planchasActions}
                dinamicTableInfo={tableInfo}
                checkedRows={planchas}
                setCheckedRows={setPlanchas}
            />
        )
    );
}

export default PlanchasPage;