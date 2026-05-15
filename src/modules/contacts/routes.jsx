import ContactsPage from "./pages/ContactsPage"
import ContactDetails from "./pages/ContactDetails";
import { Route } from "react-router-dom";

export function contactsRoutes(toggleKiosk) {
    return (
        <>
            <Route path="/contactos" element={<ContactsPage />} />
            <Route path="/contactos/:id" element={<ContactDetails toggleKiosk={toggleKiosk} />} />
        </>
    );
}