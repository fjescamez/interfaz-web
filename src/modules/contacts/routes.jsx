import ContactsPage from "./pages/ContactsPage"
import ContactDetails from "./pages/ContactDetails";
import GroupsPage from "./pages/GroupsPage";
import GroupDetails from "./pages/GroupDetails";
import { Route } from "react-router-dom";

export function contactsRoutes(toggleKiosk) {
    return (
        <>
            <Route path="/contactos" element={<ContactsPage />} />
            <Route path="/contactos/:id" element={<ContactDetails toggleKiosk={toggleKiosk} />} />
            <Route path="/grupos" element={<GroupsPage />} />
            <Route path="/grupos/:id" element={<GroupDetails />} />
        </>
    );
}