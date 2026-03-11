import { useState } from 'react';
import Table from '../components/Table'
import { pistolaTableInfo } from '../helpers/tablesInfo'

function TablaPistolaPage() {
  const registrosExistentes = localStorage.getItem('registroPistola');
  const [initialData, setInitialData] = useState(registrosExistentes ? JSON.parse(registrosExistentes) : []);

  const registrosActions = (variables) => {
    const { action, setTableData } = variables;

    if (action === "limpiar") {
      localStorage.removeItem('registroPistola');
      setTableData([]);
      return { status: 'success' };
    }
  }

  return (
    initialData && (
      <Table
        dinamicTableInfo={pistolaTableInfo}
        initialData={initialData}
        actions={registrosActions}
        noActionRows={true}
        customTable={true}
        noRefreshTable={true}
      />
    )
  )
}

export default TablaPistolaPage;