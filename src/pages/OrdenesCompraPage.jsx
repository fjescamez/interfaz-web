import Table from '../components/Table'
import { ordenesCompraTableInfo } from '../helpers/tablesInfo'
import { useTabs } from '../context/TabsContext';

function OrdenesCompraPage() {
  const { createTab } = useTabs();

  const ordenesActions = async (variables) => {
    const { action } = variables;

    switch (action) {
      case "addOrder":
        const path = '/stock/crearOrden';
        const tabTitle = 'CREAR ORDEN COMPRA';

        createTab(path, tabTitle);
        return { status: 'success' };
      default:
        break;
    }
  }

  return (
    <Table
      dinamicTableInfo={ordenesCompraTableInfo}
      actions={ordenesActions}
      extraStyles={[
        {
          key: 'estado_nombre',
          condition: (value) => value === 'Solicitado',
          styles: {
            color: 'green'
          }
        }
      ]}
    />
  )
}

export default OrdenesCompraPage