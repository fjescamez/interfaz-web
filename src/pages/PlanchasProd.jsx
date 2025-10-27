import Table from '../components/Table'
import { planchasTableInfo } from '../helpers/tablesInfo'

function PlanchasProd() {
    const tableInfo = {
        ...planchasTableInfo,
        tableName: "planchasProduccion",
        endPoint: "planchasProduccion",
        headerTitle: "PLANCHAS PRODUCCIÓN",
    };

    return (
        <Table
            dinamicTableInfo={tableInfo}
        />
    )
}

export default PlanchasProd
