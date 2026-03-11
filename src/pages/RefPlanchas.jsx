import Table from '../components/Table'
import { refPlanchasTableInfo } from '../helpers/tablesInfo'

function RefPlanchas() {

  return (
    <Table
        dinamicTableInfo={refPlanchasTableInfo}
        tabTitleTemplate={"{fabricante} {espesor} {referencia}"}
        publicForm={true}
    />
  )
}

export default RefPlanchas