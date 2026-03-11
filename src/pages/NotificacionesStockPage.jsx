import { useState } from 'react';
import Table from '../components/Table'
import { useSession } from '../context/SessionContext';
import { notificacionesStockTableInfo } from '../helpers/tablesInfo'
import OrdenCompraForm from '../components/formComponents/OrdenCompraForm';

function NotificacionesStockPage({ filter }) {
    const { session } = useSession();
    const userFilter = filter ? (session ? session?.departments : "" ) : "";
    const [ordenForm, setOrdenForm] = useState(false);
    const [producto, setProducto] = useState({});

    const notificacionesActions = async (variables) => {
        const { data } = variables;
        setProducto(data);
        setOrdenForm(true);
    }

    return (
        <>
            <Table
                dinamicTableInfo={notificacionesStockTableInfo}
                userFilter={userFilter}
                tdGrandes={['nombre', 'categoria_nombre']}
                actions={notificacionesActions}
                openRows={true}
            />
            {(ordenForm && producto) && <OrdenCompraForm setModal={setOrdenForm} producto={producto} />}
        </>
    )
}

export default NotificacionesStockPage