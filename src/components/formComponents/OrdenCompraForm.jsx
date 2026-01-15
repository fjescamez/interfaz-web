import { useSession } from '../../context/SessionContext';
import { useTabs } from '../../context/TabsContext';
import { ordenesFormData } from '../../helpers/formsData';
import GeneralForm from './GeneralForm'
import { useLocation } from "react-router-dom";

function OrdenCompraForm({ setModal, producto }) {
    const { session } = useSession();
    const username = session?.username || "unknown_user";
    const location = useLocation();
    const { closeTab } = useTabs();

    const itemsData = {
        solicitante: username,
        departamento: producto?.departamento_nombre || "",
        producto: producto?.nombre || "",
        id_categoria: producto?.id_categoria || "",
        id_producto: producto?.id || "",
        id_estado: producto?.id_estado || "",
        cantidad_solicitada: 0,
        codigo_producto: producto?.codigo || ""
    }

    return (
        <GeneralForm
            setModal={setModal}
            formData={ordenesFormData}
            itemsData={itemsData}
            endpoint={"stockOrdenes/crearOrden"}
            submitText={"Crear Orden"}
            // Cerrar pestaña si estamos en la página de crear orden
            afterSubmit={() => { if (location.pathname === '/stock/crearOrden') closeTab(location.pathname); }}
        />
    )
}

export default OrdenCompraForm