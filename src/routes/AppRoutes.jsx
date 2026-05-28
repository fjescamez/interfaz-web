import { Route, Routes } from "react-router-dom"
import { useParams } from "react-router-dom";
import OrderKiosk from "../pages/OrderKiosk";
import ErrorPage from "../pages/ErrorPage"
import LoginPage from "../pages/LoginPage"

import TablaPistolaPage from "../pages/TablaPistolaPage";
import Soporte from "../pages/Soporte";

import { clientsRoutes } from "../modules/clients/routes";
import { usersRoutes } from "../modules/users/routes";
import { contactsRoutes } from "../modules/contacts/routes";
import { productionRoutes } from "../modules/production/routes";
import { stockRoutes } from "../modules/stock/routes";
import { ordersRoutes } from "../modules/orders/routes";
import { lenRoutes } from "../modules/len/routes";
import { strategiesRoutes } from "../modules/strategies/routes";


function OrderKioskRouted({ configMode }) {
    const { id } = useParams();

    return (
        <OrderKiosk
            key={`${configMode ? "config" : "order"}-${id || ""}`}
            configMode={configMode}
        />
    );
}

function AppRoutes({ toggleKiosk }) {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/pistola" element={<TablaPistolaPage />} />
            <Route path="/soporte" element={<Soporte />} />

            {/* módulos */}
            {clientsRoutes(toggleKiosk)}
            {usersRoutes(toggleKiosk)}
            {contactsRoutes(toggleKiosk)}
            {stockRoutes()}
            {ordersRoutes(OrderKioskRouted)}
            {productionRoutes()}
            {lenRoutes()}
            {strategiesRoutes()}

        </Routes>
    )
}

export default AppRoutes;