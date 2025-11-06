import { useState } from 'react';
import Table from '../components/Table'
import { trabajosExternosTableInfo } from '../helpers/tablesInfo'
import { postData } from '../helpers/fetchData';
import { useSession } from '../context/SessionContext';

function ExternosPendientesPage() {
    const [externosChecked, setExternosChecked] = useState([]);
    const { session } = useSession();

    const externosActions = async (variables) => {
        const { action, data, setTableData } = variables;

        switch (action) {
            case "firmar":
                const firmaData = {
                    idsTrabajos: externosChecked,
                    usuario: session._id
                }

                const firma = await postData("externalJobs/firmar", firmaData);
                
                return { status: 'success' };
            case "anular":
                return { status: 'success' };
        }

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