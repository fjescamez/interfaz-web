import ClientsPage from "./pages/ClientsPage";
import ClientDetails from "./pages/ClientDetails";
import OrdersPage from "../orders/pages/OrdersPage";
import ContactsPage from "../contacts/pages/ContactsPage";
import GroupsPage from "../contacts/pages/ContactsPage";
import StrategyPage from "../strategies/pages/StrategyPage";
import ClientConfig from "../../pages/ClientConfig";
import OrderKiosk from "../../pages/OrderKiosk";
import { useParams, Route } from "react-router-dom";

function OrderKioskRouted({ configMode }) {
    const { id } = useParams();

    return (
        <OrderKiosk
            key={`${configMode ? "config" : "order"}-${id || ""}`}
            configMode={configMode}
        />
    );
}

export function clientsRoutes(toggleKiosk) {
    return (
        <>
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/clientes/:id" element={<ClientDetails toggleKiosk={toggleKiosk} />} />
            <Route path="/clientes/:id/pedidos" element={<OrdersPage filter={true} />} />
            <Route path="/clientes/:id/contactos" element={<ContactsPage filter={true} />} />
            <Route path="/clientes/:id/grupos" element={<GroupsPage filter={true} />} />
            <Route path="/clientes/:id/estrategias" element={<StrategyPage filter={true} />} />
            <Route path="/clientes/:id/configuracion" element={<ClientConfig toggleKiosk={toggleKiosk} />} />
            <Route path="/clientes/:id/kioscoConfig" element={<OrderKioskRouted configMode={true} />} />
        </>
    );
}