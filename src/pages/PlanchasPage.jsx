import { useEffect, useState } from 'react';
import Table from '../components/Table';
import { planchasTableInfo } from '../helpers/tablesInfo';
import { postData } from '../helpers/fetchData';
import { useSession } from '../context/SessionContext';
import { notify } from '../helpers/notify';
import { toast } from "react-toastify";
import AlbaranParcialComponent from '../components/AlbaranParcialComponent';
//import IncidenciaForm from '../components/formComponents/IncidenciaForm';

function PlanchasPage() {
    const [planchas, setPlanchas] = useState([]);
    const [planchaSuelta, setPlanchaSuelta] = useState(null);
    const { session } = useSession();
    const [tableInfo, setTableInfo] = useState(null); // Inicialmente null
    const [trabajosPopUp, setTrabajosPopUp] = useState(false);
    const [incidenciaPopUp, setIncidenciaPopUp] = useState(false);
    const [planchasDataSetter, setPlanchasDataSetter] = useState(null);
    const location = window.location.pathname;

    useEffect(() => {
        setTableInfo(null);
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
        const plancha = data.find(item => item.id === planchas[0]);
        setPlanchaSuelta(plancha);

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

                if (planchas.length > 1) {
                    notify(toast.error, 'error', '', 'Solo se puede solicitar el albarán de una plancha a la vez');
                    return { status: 'success' };
                } else if (plancha.id_estado_albaran !== 20) {
                    notify(toast.error, 'error', '', 'El albarán de esta plancha ya está solicitado');
                    return { status: 'success' };
                }

                const albaran = await postData('planchas/solicitarAlbaran', { plancha, accion: 'solicitarAlbaran' });
                setPlanchas([]);
                if (albaran.status === 'success') {
                    notify(toast.success, 'success', albaran.title, albaran.message);
                    // Actualizar la plancha en la tabla
                    if (albaran.updatedData) {
                        setTableData(prev =>
                            prev.map(item =>
                                item.id === albaran.updatedData?.id ? albaran.updatedData : item
                            )
                        );
                    }
                } else {
                    notify(toast.error, 'error', albaran.title, albaran.message);
                }
                return { status: 'success' };
            case "albaranParcial":
                if (planchas.length > 1) {
                    notify(toast.error, 'error', '', 'Solo se puede solicitar el albarán parcial de una plancha a la vez');
                    return { status: 'success' };
                } else if (plancha.id_estado_albaran !== 20) {
                    notify(toast.error, 'error', '', 'El albarán de esta plancha ya está solicitado');
                    return { status: 'success' };
                }
                
                setPlanchasDataSetter(() => setTableData);
                setTrabajosPopUp(true);
                return { status: 'success' };
            case "resetearAlbaran":
                if (planchas.length > 1) {
                    notify(toast.error, 'error', '', 'Solo se puede resetear el albarán de una plancha a la vez');
                    return { status: 'success' };
                } else if (plancha.id_estado_albaran === 20) {
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
            case "incidencia":
                if (planchas.length > 1) {
                    notify(toast.error, 'error', '', 'Solo se puede generar una incidencia para una plancha a la vez');
                    return { status: 'success' };
                }

                const response = await postData('planchas/generarIncidencia', { username: session.username, planchaId: planchas[0] });

                if (response.status === 'success') {
                    notify(toast.success, 'success', response.title);
                    setTableData(prev =>
                        prev.map(item =>
                            item.id === response.plancha
                                ? { ...item, usuario_incidencia: response.usuario }
                                : item
                        )
                    );
                } else {
                    notify(toast.error, 'error', response.title);
                }

                // setIncidenciaPopUp(true);
                setPlanchas([]);
                return { status: 'success' };
            default:
                break;
        }
        return { status: 'success' };
    };

    // Renderiza la tabla solo si tableInfo está listo
    return (
        tableInfo && (
            <>
                <Table
                    actions={planchasActions}
                    dinamicTableInfo={tableInfo}
                    checkedRows={planchas}
                    setCheckedRows={setPlanchas}
                    alwaysVisibleActions={["sincronizar"]}
                    tdGrandes={["nombre_plancha"]}
                    tabTitleTemplate="PLANCHA {nombre_plancha}"
                    specificPath="/produccion/planchas"
                />
                {trabajosPopUp && <AlbaranParcialComponent setTrabajosPopUp={setTrabajosPopUp} planchaId={planchas[0]} plancha={planchaSuelta} setTableData={planchasDataSetter} />}
                {/* {incidenciaPopUp && <IncidenciaForm setIncidenciaPopUp={setIncidenciaPopUp} planchaId={planchas[0]} plancha={planchaSuelta} />} */}
            </>
        )
    );
}

export default PlanchasPage;