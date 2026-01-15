import Table from '../components/Table'
import { useNavigate } from 'react-router-dom';
import { ordenesCompraTableInfo } from '../helpers/tablesInfo'
import { useTabs } from '../context/TabsContext';
import { useState } from 'react';

function OrdenesCompraPage() {
  const navigate = useNavigate();
  const { tabs, setTabs } = useTabs();

  const ordenesActions = async (variables) => {
    const { action, data, setTableData } = variables;

    switch (action) {
      case "addOrder":
        const path = '/stock/crearOrden';
        const tabTitle = 'CREAR ORDEN COMPRA';

        if (!tabs.some(tab => tab.path === path)) {
          setTabs(prev => {
            if (prev.some(tab => tab.path === path)) return prev;
            return [...prev, { path, title: tabTitle }];
          });
        }
        navigate(path);
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