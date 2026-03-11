import { useSession } from "../context/SessionContext";

export const checkRole = () => {
    const { session } = useSession();
    const isSoporte = session?.role === "Soporte";
    const isAdmin = session?.role === "Administrador" || session?.role === "Soporte";
    const isTecnico = session?.departments?.includes("Tecnico");
    const isOficina = session?.departments?.includes("Oficina");
    const isProduccion = session?.departments?.includes("Solido") || session?.departments?.includes("Liquido");
    const isJefeDepartamento = session?.responsibleDepartments && session?.responsibleDepartments.length > 0;
    const isTeleWork = session?.teleWork;

    return {
        isSoporte,
        isAdmin,
        isTecnico,
        isOficina,
        isProduccion,
        isJefeDepartamento,
        isTeleWork
    }
}

export const sessionInfo = () => {
    const { session } = useSession();

    return [session?.role, ...(session?.departments || []), session?.username];
}