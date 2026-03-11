import ProductoTable from "../components/tableComponents/ProductoTable"
import { useSession } from "../context/SessionContext";
import { checkRole } from "../helpers/roleChecker";

function ProductosStockPage() {
    const { session } = useSession();
    const { isAdmin, isJefeDepartamento } = checkRole();
    const userFilter = (isAdmin || isJefeDepartamento) ? false : (session ? session?.departments : "");

    return (
        <ProductoTable
            userFilter={userFilter}
        />
    )
}

export default ProductosStockPage