import Table from '../components/Table'
import { planchasTableInfo } from '../helpers/tablesInfo';

function PlanchasFin() {
    const tableInfo = {
        ...planchasTableInfo,
        tableName: "planchasFinalizadas",
        endPoint: "planchasFinalizadas",
        headerTitle: "PLANCHAS FINALIZADAS",
    };

  return (
    <Table
        dinamicTableInfo={tableInfo}
    />
  )
}

export default PlanchasFin