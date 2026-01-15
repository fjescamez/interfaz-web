import ProductoTable from "../components/tableComponents/ProductoTable"
import { useSession } from "../context/SessionContext";

function ProductosStockPage() {
    const { session } = useSession();
    const isAdmin = session.role === "Administrador" || session.role === "Soporte";
    const isJefeDepartamento = session.responsibleDepartments && session.responsibleDepartments.length > 0;
    const userFilter = (isAdmin || isJefeDepartamento) ? false : (session ? session?.departments : "");

    return (
        <ProductoTable
            userFilter={userFilter}
        />
    )
}

export default ProductosStockPage