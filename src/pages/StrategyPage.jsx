import Table from "../components/Table.jsx";
import { strategyTableInfo } from "../helpers/tablesInfo.jsx";

function StrategyPage({ filter }) {

    return (
        <>
            <Table
                filter={filter}
                dinamicTableInfo={strategyTableInfo}
            />
        </>
    )
}

export default StrategyPage