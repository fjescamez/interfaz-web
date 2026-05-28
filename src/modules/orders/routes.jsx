
import { Route } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage";
import OrderDetails from "./pages/OrderDetails";
import ObservacionesTecnicas from "./pages/ObservacionesTecnicas";
import EmailDetails from "./pages/EmailDetails";
import KioscoPage from "../../pages/KioscoPage";
import PactionsPage from "../pactions/pages/PactionsPage";

export function ordersRoutes(OrderKioskRouted) {
    return (
        <>
            <Route path="/home" element={<OrdersPage />} />
            <Route path="/home/:id" element={<OrderDetails />} />
            <Route path="/pedidos" element={<OrdersPage />} />
            <Route path="/pedidos/:id" element={<OrderDetails />} />
            <Route path="/pedidos/:id/kiosco" element={<OrderKioskRouted />} />
            <Route path="/pedidos/:id/pactions" element={<PactionsPage />} />
            <Route path="/kiosco" element={<KioscoPage />} />
            <Route path="/bandeja" element={<OrdersPage filterBandeja={true} />} />
            <Route path="/bandeja/:id" element={<OrderDetails />} />
            <Route path="/infoEmail/:id_pedido/:id" element={<EmailDetails />} />
            <Route path="/fichaTecnica/:id" element={<ObservacionesTecnicas />} />
            <Route path="/test" element={<OrdersPage />} />
        </>
    );
}