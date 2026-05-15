import UsersPage from "./pages/UsersPage";
import UserDetails from "./pages/UserDetails";
import { Route } from "react-router-dom";

export function usersRoutes(toggleKiosk) {
    return (
        <>
            <Route path="/usuarios" element={<UsersPage />} />
            <Route path="/usuarios/:id" element={<UserDetails toggleKiosk={toggleKiosk} />} />
        </>
    );
}