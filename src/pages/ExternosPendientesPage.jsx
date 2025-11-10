import { useState } from 'react';
import Table from '../components/Table'
import { trabajosExternosTableInfo } from '../helpers/tablesInfo'
import { postData } from '../helpers/fetchData';
import { useSession } from '../context/SessionContext';
import { notify } from '../helpers/notify';
import { toast } from "react-toastify";

function ExternosPendientesPage() {
    const [externosChecked, setExternosChecked] = useState([]);
    const { session } = useSession();

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
        <Table
            dinamicTableInfo={trabajosExternosTableInfo}
            checkedRows={externosChecked}
            setCheckedRows={setExternosChecked}
            actions={externosActions}
        />
    )
}

export default ExternosPendientesPage;