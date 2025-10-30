import Table from '../components/Table'
import { trabajosPlanchasTableInfo } from '../helpers/tablesInfo'

function TrabajosPlanchasPage() {
    return (
        <Table
            dinamicTableInfo={trabajosPlanchasTableInfo}
        />
    )
}

export default TrabajosPlanchasPage
