import { useState } from 'react'
import Table from '../../../components/Table'
import { refContinuosTableInfo } from '../config/production.config'

function RefContinuos() {
  const [checkedContinuos, setCheckedContinuos] = useState([]);

  return (
    <Table
      dinamicTableInfo={refContinuosTableInfo}
      checkedRows={checkedContinuos}
      setCheckedRows={setCheckedContinuos}
      tabTitleTemplate={'Continuo {propietario} - {tipo} - {desarrollo}'}
      publicForm={true}
    />
  )
}

export default RefContinuos