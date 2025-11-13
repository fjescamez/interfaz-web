import { useEffect, useState } from 'react';
import Table from '../components/Table';
import { planchasTableInfo } from '../helpers/tablesInfo';
import { postData } from '../helpers/fetchData';
import { useSession } from '../context/SessionContext';
import { notify } from '../helpers/notify';
import { toast } from "react-toastify";

function PlanchasPage() {
    const [planchas, setPlanchas] = useState([]);
    const { session } = useSession();
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
            updatedTableInfo.actions = updatedTableInfo.actions.filter(action => action.action !== "firmar");
        }
        setTableInfo(updatedTableInfo); // Actualiza el estado
    }, [location]);

    const planchasActions = async (variables) => {
        const { action, data, setTableData } = variables;

        switch (action) {
            case "sincronizar":
                const sincronizado = await postData('planchas/sincronizar');
                setPlanchas([]);
                if (sincronizado.status === 'success') {
                    notify(toast.success, 'success', sincronizado.title, sincronizado.message);
                    setTableData(prev => [...sincronizado.newItems, ...prev]);
                }
                return { status: 'success' };
            case "firmar":
                const updated = await postData('planchas/firmar', { ids: planchas, username: session.username });
                setPlanchas([]);
                if (updated.status === 'success') {
                    notify(toast.success, 'success', updated.title, updated.message);
                    setTableData(updated.updatedData.results);
                }
                return { status: 'success' };
            case "solicitarAlbaran":
                const plancha = data.find(item => item.id === planchas[0]);

                if (planchas.length > 1) {
                    notify(toast.error, 'error', '', 'Solo se puede solicitar el albarán de una plancha a la vez');
                    return { status: 'success' };
                } else if (plancha.id_estado_albaran === 4) {
                    notify(toast.error, 'error', '', 'El albarán de esta plancha ya está solicitado');
                    return { status: 'success' };
                }

                const albaran = await postData('planchas/solicitarAlbaran', { plancha, accion: 'solicitarAlbaran' });
                setPlanchas([]);
                if (albaran.status === 'success') {
                    notify(toast.success, 'success', albaran.title, albaran.message);
                    // Actualizar la plancha en la tabla
                    setTableData(prev =>
                        prev.map(item =>
                            item.id === albaran.updatedData.id ? albaran.updatedData : item
                        )
                    );
                } else {
                    notify(toast.error, 'error', albaran.title, albaran.message);
                }
                return { status: 'success' };
            case "resetearAlbaran":
                const planchaReset = data.find(item => item.id === planchas[0]);

                if (planchas.length > 1) {
                    notify(toast.error, 'error', '', 'Solo se puede resetear el albarán de una plancha a la vez');
                    return { status: 'success' };
                } else if (planchaReset.id_estado_albaran === 20) {
                    notify(toast.error, 'error', '', 'El albarán de esta plancha no está solicitado');
                    return { status: 'success' };
                }

                const resetAlbaran = await postData('planchas/resetearAlbaran', { id: planchas[0] });
                setPlanchas([]);
                if (resetAlbaran.status === 'success') {
                    notify(toast.success, 'success', resetAlbaran.title, resetAlbaran.message);
                    setTableData(resetAlbaran.updatedData.results);
                } else {
                    notify(toast.error, 'error', resetAlbaran.title, resetAlbaran.message);
                }
                return { status: 'success' };
            default:
                break;
        }
    };

    // Renderiza la tabla solo si tableInfo está listo
    return (
        tableInfo && (
            <Table
                actions={planchasActions}
                dinamicTableInfo={tableInfo}
                checkedRows={planchas}
                setCheckedRows={setPlanchas}
                alwaysVisibleActions={["sincronizar"]}
            />
        )
    );
}

export default PlanchasPage;