import Table from '../components/Table'
import { trabajosPlanchasTableInfo } from '../helpers/tablesInfo'

function TrabajosPlanchasPage() {
    return (
        <Table
            dinamicTableInfo={trabajosPlanchasTableInfo}
            tabTitleTemplate="PLANCHA {nombre_plancha}"
            specificPath={"/produccion/planchas"}
        />
    )
}

export default TrabajosPlanchasPage
