import Table from "../components/Table.jsx";
import { strategyTableInfo } from "../helpers/tablesInfo.jsx";

function StrategyPage({ filter }) {

    return (
        <>
            <Table
                clientFilter={filter}
                dinamicTableInfo={strategyTableInfo}
                tabTitleTemplate={"ESTRATEGIA {codigo_estrategia}"}
                specificPath={`/${strategyTableInfo.tableName}`}
            />
        </>
    )
}

export default StrategyPage