import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { trabajosExternosTableInfo } from '../helpers/tablesInfo';
import Table from '../components/Table';
import { useSession } from '../context/SessionContext';
import { postData } from '../helpers/fetchData';
import { notify } from '../helpers/notify';

function ExternosByClient() {
    const { cliente } = useParams();
    const { session } = useSession();
    const [clienteFiltro, setClienteFiltro] = useState(cliente);
    const [tableInfo, setTableInfo] = useState(trabajosExternosTableInfo);
    const [externosChecked, setExternosChecked] = useState([]);

    useEffect(() => {
        setClienteFiltro(cliente);
        setTableInfo(prev => ({
            ...prev,
            headerTitle: `EXTERNOS ${cliente.toUpperCase()}`,
            endPoint: "externalJobs/byClientName"
        }));
    }, [cliente]);

    const externosActions = async (variables) => {
        const { action, data, setTableData } = variables;
        const trabajosCompletos = data.filter(item => externosChecked.includes(item._id));

        if (action === "Firmar" || action === "Anular") {
            const signData = {
                action,
                idsTrabajos: externosChecked,
                trabajosCompletos,
                usuario: session.username
            }

            const response = await postData('externalJobs/firmar', signData);

            if (response.status === "success") {
                notify('success', response.title);
                setTableData(prev => prev.filter(item => !response.updatedData.some(updatedItem => updatedItem._id === item._id)));
                setExternosChecked([]);
                return { status: "success" };
            } else {
                notify('error', response.title);
                return { status: "success" };
            }
        } else if (action === "restaurar") {
            const response = await postData('externalJobs/restaurar', { trabajos: trabajosCompletos });
            setExternosChecked([]);
            notify('success', response.title);
            return { status: "success" };
        }
    }

    return (
        (tableInfo && clienteFiltro && tableInfo.endPoint === "externalJobs/byClientName") && (
            <Table
                dinamicTableInfo={tableInfo}
                clientFilter={clienteFiltro}
                checkedRows={externosChecked}
                setCheckedRows={setExternosChecked}
                actions={externosActions}
                tdGrandes={["documentName"]}
                tabTitleTemplate="{documentName}"
                specificPath={"/produccion/trabajosExternos"}
            />
        )
    )
}

export default ExternosByClient;