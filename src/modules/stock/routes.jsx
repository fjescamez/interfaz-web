
import { Route } from "react-router-dom";
import StockPage from "./pages/StockPage";
import CategoriasStockPage from "./pages/CategoriasStockPage";
import ProductosStockPage from "./pages/ProductosStockPage";
import CategoriaDetails from "./pages/CategoriaDetails";
import ProductoDetails from "./pages/ProductoDetails";
import RegistroPage from "./pages/RegistroPage";
import NotificacionesStockPage from "./pages/NotificacionesStockPage";
import OrdenesCompraPage from "./pages/OrdenesCompraPage";
import AddStockOrderPage from "./pages/AddStockOrderPage";

export function stockRoutes() {
    return (
        <>
            <Route path="/stock" element={<StockPage />} />
            <Route path="/stock/categorias" element={<CategoriasStockPage />} />
            <Route path="/stock/categorias/:id" element={<CategoriaDetails />} />
            <Route path="/stock/productos" element={<ProductosStockPage />} />
            <Route path="/stock/productos/:id" element={<ProductoDetails />} />
            <Route path="/stock/registro" element={<RegistroPage />} />
            <Route path="/stock/notificaciones" element={<NotificacionesStockPage />} />
            <Route path="/stock/notificacionesDepartamento" element={<NotificacionesStockPage filter={true} />} />
            <Route path="/stock/ordenesCompra" element={<OrdenesCompraPage />} />
            <Route path="/stock/crearOrden" element={<AddStockOrderPage />} />
        </>
    );
}