import Table from '../components/Table'
import { planchasTableInfo } from '../helpers/tablesInfo'

function PlanchasPage() {

    return (
        <Table
            dinamicTableInfo={planchasTableInfo}
        />
    )
}

export default PlanchasPage