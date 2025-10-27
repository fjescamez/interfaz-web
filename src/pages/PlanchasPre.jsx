import Table from '../components/Table';
import { planchasTableInfo } from '../helpers/tablesInfo';

function PlanchasPre() {
    const tableInfo = {
        ...planchasTableInfo,
        tableName: "planchasPreproduccion",
        endPoint: "planchasPreproduccion",
        headerTitle: "PLANCHAS PREPRODUCCIÓN",
    };

    return (
        <Table
            dinamicTableInfo={tableInfo}
        />
    );
}

export default PlanchasPre;