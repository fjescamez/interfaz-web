import Table from '../../../components/Table'
import { refPlanchasTableInfo } from '../config/production.config'

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