import LenPage from "./pages/LenPage";
import { Route } from "react-router-dom";

export function lenRoutes() {
    return (
        <>
            <Route path="/len" element={<LenPage />} />
        </>
    );
}