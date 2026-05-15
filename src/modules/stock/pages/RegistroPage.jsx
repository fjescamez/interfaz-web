import React from 'react'
import Table from '../../../components/Table'
import { registroTableInfo } from '../config/stock.config'

function RegistroPage() {
  return (
    <Table
        dinamicTableInfo={registroTableInfo}
        noActionRows={true}
        tdGrandes={['fecha', 'descripcion']}
    />
  )
}

export default RegistroPage