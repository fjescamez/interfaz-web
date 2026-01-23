import { useState } from 'react';
import Table from '../components/Table'
import { trabajosExternosTableInfo } from '../helpers/tablesInfo'
import { postData } from '../helpers/fetchData';
import { useSession } from '../context/SessionContext';
import { notify } from '../helpers/notify';

function ExternosPendientesPage() {
    const [externosChecked, setExternosChecked] = useState([]);
    const { session } = useSession();

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
            } else {
                notify('error', response.title);
            }
            return { status: "success" };
        } else if (action === "restaurar") {
            const response = await postData('externalJobs/restaurar', { trabajos: trabajosCompletos });
            setExternosChecked([]);
            notify('success', response.title);
            return { status: "success" };
        }
    }

    return (
        <Table
            dinamicTableInfo={trabajosExternosTableInfo}
            checkedRows={externosChecked}
            setCheckedRows={setExternosChecked}
            actions={externosActions}
            tdGrandes={["documentName"]}
            tabTitleTemplate="{documentName}"
            specificPath={"/produccion/trabajosExternos"}
        />
    )
}

export default ExternosPendientesPage;