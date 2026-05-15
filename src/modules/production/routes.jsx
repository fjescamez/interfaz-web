import { Route } from "react-router-dom";
import ProduccionPage from "./pages/ProduccionPage";
import PlanchasPage from "./pages/PlanchasPage";
import PlanchasDetails from "./pages/PlanchasDetails";
import TrabajosPlanchasPage from "./pages/TrabajosPlanchasPage";
import ExternosFinalizadosPage from "./pages/ExternosFinalizadosPage";
import ExternosPendientesPage from "./pages/ExternosPendientesPage";
import ExternosByClient from "./pages/ExternosByClient";
import ExternosDetails from "./pages/ExternosDetails";
import RefPlanchas from "./pages/RefPlanchas";
import RefContinuos from "./pages/RefContinuos";
import RefPlanchaDetails from "./pages/RefPlanchaDetails";
import RefContinuoDetails from "./pages/RefContinuoDetails";

export function productionRoutes() {
    return (
        <>
            <Route path="/produccion" element={<ProduccionPage />} />
            <Route path="/produccion/planchas/:id" element={<PlanchasDetails />} />
            <Route path="/produccion/planchas" element={<PlanchasPage />} />
            <Route path="/produccion/planchasPreproduccion" element={<PlanchasPage />} />
            <Route path="/produccion/planchasProduccion" element={<PlanchasPage />} />
            <Route path="/produccion/planchasFinalizadas" element={<PlanchasPage />} />
            <Route path="/produccion/trabajosPlanchas" element={<TrabajosPlanchasPage />} />
            <Route path="/produccion/trabajosExternos/:id" element={<ExternosDetails />} />
            <Route path="/produccion/externosPendientes" element={<ExternosPendientesPage />} />
            <Route path="/produccion/externosFinalizados" element={<ExternosFinalizadosPage />} />
            <Route path="/produccion/externosAnulados" element={<ExternosFinalizadosPage />} />
            <Route path="/produccion/:cliente" element={<ExternosByClient />} />
            <Route path="/produccion/refPlanchas" element={<RefPlanchas />} />
            <Route path="/produccion/refPlanchas/:id" element={<RefPlanchaDetails />} />
            <Route path="/produccion/refContinuos" element={<RefContinuos />} />
            <Route path="/produccion/refContinuos/:id" element={<RefContinuoDetails />} />
        </>
    );
}