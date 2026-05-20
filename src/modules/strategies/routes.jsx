import { Route } from "react-router-dom";
import StrategyPage from "./pages/StrategyPage";
import StrategyDetails from "./pages/StrategyDetails";

export function strategiesRoutes() {
    return (
        <>
            <Route path="/estrategias" element={<StrategyPage />} />
            <Route path="/estrategias/:id" element={<StrategyDetails />} />
        </>
    );
}