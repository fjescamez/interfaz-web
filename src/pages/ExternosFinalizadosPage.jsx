import { useEffect, useState } from 'react'
import Table from '../components/Table'
import { externosFinalizadosTableInfo } from '../helpers/tablesInfo'
import { postData } from '../helpers/fetchData';
import { notify } from '../helpers/notify';
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function ExternosFinalizadosPage() {
    const [tableInfo, setTableInfo] = useState(null); // Inicialmente null
    const [externosChecked, setExternosChecked] = useState([]);
    const location = useLocation();

    const finalizadosActions = async (variables) => {
        const { action, data, setTableData } = variables;
        const trabajos = data.filter(item => externosChecked.includes(item._id));

        if (action === "restaurar") {
            const response = await postData('externalJobs/restaurar', { trabajos });

            if (response.status === "success") {
                setTableData(prev => prev.filter(item => !response.trabajos.some(trabajo => trabajo._id === item._id)));
                setExternosChecked([]);
                notify(toast.success, 'success', response.title);
            }
            return { status: "success" };
        }
    }

    useEffect(() => {
        const updatedTableInfo = { ...externosFinalizadosTableInfo }; // Copia inicial
        if (location.pathname.includes("/externosFinalizados")) {
            updatedTableInfo.tableName = "externosFinalizados";
            updatedTableInfo.endPoint = "externalJobs/externosFinalizados";
            updatedTableInfo.headerTitle = "EXTERNOS FINALIZADOS";
        } else if (location.pathname.includes("/externosAnulados")) {
            updatedTableInfo.tableName = "externosAnulados";
            updatedTableInfo.endPoint = "externalJobs/externosAnulados";
            updatedTableInfo.headerTitle = "EXTERNOS ANULADOS";
        }
        setTableInfo(updatedTableInfo); // Actualiza el estado
    }, [location]);

    return (
        tableInfo && (
            <Table
                dinamicTableInfo={tableInfo}
                actions={finalizadosActions}
                checkedRows={externosChecked}
                setCheckedRows={setExternosChecked}
                tdGrandes={["documentName"]}
                normalizedData={true}
                tabTitleTemplate="{documentName}"
                specificPath={"/produccion/trabajosExternos"}
            />
        )
    )
}

export default ExternosFinalizadosPage;