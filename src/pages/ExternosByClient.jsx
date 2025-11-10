import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { trabajosExternosTableInfo } from '../helpers/tablesInfo';
import Table from '../components/Table';
import { useSession } from '../context/SessionContext';
import { postData } from '../helpers/fetchData';
import { notify } from '../helpers/notify';
import { toast } from "react-toastify";

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
        const { action, data } = variables;
        const trabajosCompletos = data.filter(item => externosChecked.includes(item._id));

        const signData = {
            action,
            idsTrabajos: externosChecked,
            trabajosCompletos,
            usuario: session.username
        }

        const response = await postData('externalJobs/firmar', signData);

        if (response.status === "success") {
            notify(toast.success, 'success', response.title);
            setExternosChecked([]);
        } else {
            notify(toast.error, 'error', response.title);
        }

        return { status: "success" };
    }

    return (
        (tableInfo && clienteFiltro && tableInfo.endPoint === "externalJobs/byClientName") && (
            <Table
                dinamicTableInfo={tableInfo}
                clientFilter={clienteFiltro}
                checkedRows={externosChecked}
                setCheckedRows={setExternosChecked}
                actions={externosActions}
            />
        )
    )
}

export default ExternosByClient;