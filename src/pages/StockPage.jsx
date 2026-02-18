import DetailsHeader from '../components/DetailsHeader';
import { stockDetails } from "../helpers/detailsGrid";
import GridComponent from "../components/GridComponent";
import { useTabs } from '../context/TabsContext';
import { useEffect, useState } from 'react';
import { fetchData } from '../helpers/fetchData';
import { useSession } from '../context/SessionContext';
import { FaBoxOpen } from "react-icons/fa";

function StockPage() {
    const { grid } = stockDetails;
    const [total, setTotal] = useState(0);
    const [gridWithTotal, setGridWithTotal] = useState(grid);
    const { createTab } = useTabs();
    const { session } = useSession();
    const userFilter = session ? session?.departments : "";
    const isAdmin = session?.role === "Administrador" || session?.role === "Soporte";
    const isJefeDepartamento = session?.responsibleDepartments && session?.responsibleDepartments.length > 0;

    const stockGridClick = (key, title) => {
        const path = '/stock/' + key;
        let tabTitle = `${key.toUpperCase()} STOCK`;

        if (key === "notificacionesDepartamento") {
            tabTitle = `NOTIFICACIONES STOCK ${session?.departments?.[0].toUpperCase() || ""}`;
        } else if (key === "ordenesCompra") {
            tabTitle = "ÓRDENES DE COMPRA";
        }

        createTab(path, tabTitle);
    }

    const getTotalNotificaciones = async () => {
        await fetchData('stockProducts/notifications', null, "1", null, setTotal, "", userFilter);
    }

    useEffect(() => {
        getTotalNotificaciones();

        setGridWithTotal(prev => {
            const newGrid = [...prev];

            if (isAdmin || isJefeDepartamento) {
                const newElement = {
                    icon: <FaBoxOpen />,
                    title: "Notificaciones",
                    key: "notificaciones"
                };

                const position = 3;
                newGrid.splice(position, 0, newElement);
            }

            return newGrid;
        });
    }, []);

    useEffect(() => {
        setGridWithTotal(prev => {
            const updatedGrid = prev.map(item => {
                if (item.key === "notificacionesDepartamento") {
                    return { ...item, body: total, title: `Notificaciones ${session?.departments?.[0] || ""}` };
                }
                return item;
            });

            return updatedGrid;
        });
    }, [total]);

    return (
        <div className="detailsContainer">
            <DetailsHeader
                title={"CONTROL DE STOCK"}
                hideAvatar={true}
                hideEditIcon={true}
                hideDeleteIcon={true}
            />
            <div className="detailsScroll">
                <GridComponent
                    grid={gridWithTotal}
                    gridClick={stockGridClick}
                />
            </div>
        </div>
    )
}

export default StockPage