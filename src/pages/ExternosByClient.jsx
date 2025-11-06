import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { trabajosExternosTableInfo } from '../helpers/tablesInfo';
import Table from '../components/Table';

function ExternosByClient() {
    const { cliente } = useParams();
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

    return (
        (tableInfo && clienteFiltro && tableInfo.endPoint === "externalJobs/byClientName") && (
            <Table
                dinamicTableInfo={tableInfo}
                clientFilter={clienteFiltro}
                checkedRows={externosChecked}
                setCheckedRows={setExternosChecked}
            />
        )
    )
}

export default ExternosByClient;