import { useState } from "react";
import Table from "../components/Table.jsx";
import { strategyTableInfo } from "../helpers/tablesInfo.jsx";
import { postData } from "../helpers/fetchData.jsx";
import { useSession } from "../context/SessionContext.jsx";

function StrategyPage({ filter }) {
    const [checkedRows, setCheckedRows] = useState([]);
    const { session } = useSession();
    const isTecnico = session.departments.includes("Tecnico");

    const strategyActions = async (variables) => {
        const { action, data, setTableData } = variables;
        const estrategia = data.find(item => item.id === checkedRows[0]);

        switch (action) {
            case "duplicar":
                const duplicated = await postData('strategies/duplicar', estrategia);

                if (duplicated.status === 'success') {
                    setTableData(prev => [duplicated.newItem, ...prev]);
                }
                return { status: 'success' };
        }
    };

    return (
        <Table
            clientFilter={filter}
            dinamicTableInfo={strategyTableInfo}
            tabTitleTemplate={"ESTRATEGIA {codigo_estrategia}"}
            specificPath={`/${strategyTableInfo.tableName}`}
            checkedRows={checkedRows}
            setCheckedRows={setCheckedRows}
            actions={strategyActions}
            publicForm={isTecnico}
        />
    )
}

export default StrategyPage