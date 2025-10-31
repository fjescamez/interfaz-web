import Table from '../components/Table'
import { trabajosExternosTableInfo } from '../helpers/tablesInfo'

function ExternosPendientesPage() {
    return (
        <Table
            dinamicTableInfo={trabajosExternosTableInfo}
        />
    )
}

export default ExternosPendientesPage
