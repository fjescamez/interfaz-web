import { Route } from "react-router-dom";
import EmailClientPage from "./pages/EmailClientPage";

export function EmailClientRoutes() {
    return (
        <>
            <Route path="/gestor" element={<EmailClientPage />} />

        </>
    );
}