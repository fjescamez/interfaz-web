import Table from '../components/Table'
import { pistolaTableInfo } from '../helpers/tablesInfo'

function TablaPistolaPage() {
  const firmasExistentes = localStorage.getItem('firmasPistola');
  const initialData = firmasExistentes ? JSON.parse(firmasExistentes) : [];

  const firmasActions = (variables) => {
    const { action, setTableData } = variables;

    if (action === "limpiar") {
      localStorage.removeItem('firmasPistola');
      setTableData([]);
      return { status: 'success' };
    }
  }

  return (
    initialData && (
      <Table
        dinamicTableInfo={pistolaTableInfo}
        initialData={initialData}
        actions={firmasActions}
        noActionRows={true}
      />
    )
  )
}

export default TablaPistolaPage;