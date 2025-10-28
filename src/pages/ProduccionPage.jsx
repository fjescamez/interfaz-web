import { useNavigate } from "react-router-dom";
import DetailsHeader from '../components/DetailsHeader'
import GridComponent from '../components/GridComponent'
import { produccionPlanchasDetails, produccionTrabajosDetails } from '../helpers/detailsGrid';
import { useTabs } from "../context/TabsContext";
import { fetchData } from "../helpers/fetchData";
import { useEffect, useState } from "react";

function ProduccionPage() {
    const [produccionPlanchas, setProduccionPlanchas] = useState(produccionPlanchasDetails);
    const [produccionExternos, setProduccionExternos] = useState(produccionTrabajosDetails);
    const [totalPlanchas, setTotalPlanchas] = useState(0);
    const [totalPreproduccion, setTotalPreproduccion] = useState(0);
    const [totalProduccion, setTotalProduccion] = useState(0);
    const [totalFinalizadas, setTotalFinalizadas] = useState(0);
    const navigate = useNavigate();
    const { tabs, setTabs } = useTabs();

    const planchasClick = async (key, title) => {
        const path = `/produccion/${key}`;

        const tabTitle = key !== "planchas" ? `PLANCHAS ${title.toUpperCase()}` : title.toUpperCase();

        if (!tabs.some(tab => tab.path === path)) {
            setTabs(prev => {
                if (prev.some(tab => tab.path === path)) return prev;
                return [...prev, { path, title: tabTitle }];
            });
        }
        navigate(path);
    };

    const getPlanchas = async () => {
        await fetchData('planchas', null, 1, null, setTotalPlanchas);
        await fetchData('planchasPreproduccion', null, 1, null, setTotalPreproduccion);
        await fetchData('planchasProduccion', null, 1, null, setTotalProduccion);
        await fetchData('planchasFinalizadas', null, 1, null, setTotalFinalizadas);
    };

    useEffect(() => {
        getPlanchas();
    }, []);

    useEffect(() => {
        if (totalFinalizadas > 0) {
            setProduccionPlanchas(prev => ({
                ...prev,
                grid: prev.grid.map(item => {
                    switch (item.key) {
                        case 'planchas':
                            return { ...item, body: totalPlanchas };
                        case 'planchasPreproduccion':
                            return { ...item, body: totalPreproduccion };
                        case 'planchasProduccion':
                            return { ...item, body: totalProduccion };
                        case 'planchasFinalizadas':
                            return { ...item, body: totalFinalizadas };
                        default:
                            return item;
                    }
                })
            }));
        }
    }, [totalFinalizadas, totalPlanchas, totalPreproduccion, totalProduccion]);

    return (
        <div className="detailsContainer">
            <DetailsHeader
                title={"PRODUCCIÓN"}
                hideAvatar={true}
                hideEditIcon={true}
                hideDeleteIcon={true}
            />
            <div className="detailsScroll">
                <GridComponent
                    title={produccionPlanchas.title}
                    grid={produccionPlanchas.grid}
                    gridClick={planchasClick}
                />
                <GridComponent
                    title={produccionExternos.title}
                    grid={produccionExternos.grid}
                />
            </div>
        </div>
    )
}

export default ProduccionPage