import { useEffect, useState } from 'react'
import { fetchData } from '../helpers/fetchData';
import { useNavigate, useParams } from "react-router-dom";
import { trabajosExternosTableInfo } from '../helpers/tablesInfo';
import Table from '../components/Table';

function ExternosByClient() {
    const { cliente } = useParams();
    const [clienteFiltro, setClienteFiltro] = useState(cliente);  
    const [tableInfo, setTableInfo] = useState(trabajosExternosTableInfo);

    useEffect(() => {
        setClienteFiltro(cliente);
        setTableInfo(prev => ({
            ...prev,
            headerTitle: `EXTERNOS ${cliente.toUpperCase()}`,
            endPoint: "externalJobs/byClientName"
        }));
    }, [cliente]);

    return (
        tableInfo && (
            <Table
                dinamicTableInfo={tableInfo}
                orderFilter={clienteFiltro}
            />
        )
    )
}

export default ExternosByClient;