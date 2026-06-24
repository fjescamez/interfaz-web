import { Route } from "react-router-dom";
import PalletePage from "./pages/PalletePage";
import PalleteDetails from "./pages/PalleteDetails";

export function palleteRoutes(toggleKiosk) {
    return (
        <>
            <Route path="/paleta" element={<PalletePage />} />
            <Route path="/paleta/:id" element={<PalleteDetails toggleKiosk={toggleKiosk} />} />
        </>
    );
}