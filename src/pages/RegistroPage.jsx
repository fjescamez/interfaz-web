import React from 'react'
import Table from '../components/Table'
import { registroTableInfo } from '../helpers/tablesInfo'

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