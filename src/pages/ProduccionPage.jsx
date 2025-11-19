import { useNavigate } from "react-router-dom";
import DetailsHeader from '../components/DetailsHeader'
import GridComponent from '../components/GridComponent'
import { IoDocumentTextOutline } from "react-icons/io5";
import { produccionPlanchasDetails, produccionReferenciasDetails, produccionTrabajosDetails } from '../helpers/detailsGrid';
import { useTabs } from "../context/TabsContext";
import { fetchData } from "../helpers/fetchData";
import { useEffect, useState } from "react";

function ProduccionPage() {
    const [produccionReferencias, setProduccionReferencias] = useState(produccionReferenciasDetails);
    const [produccionPlanchas, setProduccionPlanchas] = useState(produccionPlanchasDetails);
    const [produccionExternos, setProduccionExternos] = useState(produccionTrabajosDetails);
    const [totales, setTotales] = useState({
        planchas: 0,
        preproduccion: 0,
        produccion: 0,
        finalizadas: 0,
        externos_pendientes: 0,
        externos_finalizados: 0,
        externos_anulados: 0
    });
    const navigate = useNavigate();
    const { tabs, setTabs } = useTabs();

    const referenciasGridClick = async (key, title) => {
        const path = `/produccion/${key}`;

        const tabTitle = key === "refPlanchas" ? "REF. PLANCHAS" : "REF. CONTINUOS";

        if (!tabs.some(tab => tab.path === path)) {
            setTabs(prev => {
                if (prev.some(tab => tab.path === path)) return prev;
                return [...prev, { path, title: tabTitle }];
            });
        }
        navigate(path);
    };

    const planchasGridClick = async (key, title) => {
        const path = `/produccion/${key}`;

        const tabTitle = key === "trabajosPlanchas" ? "TRABAJOS PLANCHAS" : (key !== "planchas" ? `PLANCHAS ${title.toUpperCase()}` : title.toUpperCase());

        if (!tabs.some(tab => tab.path === path)) {
            setTabs(prev => {
                if (prev.some(tab => tab.path === path)) return prev;
                return [...prev, { path, title: tabTitle }];
            });
        }
        navigate(path);
    };

    const externosGridClick = async (key, title) => {
        const path = `/produccion/${key}`;

        const tabTitle = `EXTERNOS ${title.toUpperCase()}`;

        if (!tabs.some(tab => tab.path === path)) {
            setTabs(prev => {
                if (prev.some(tab => tab.path === path)) return prev;
                return [...prev, { path, title: tabTitle }];
            });
        }
        navigate(path);
    };

    const getPlanchasCount = async () => {
        await fetchData('planchas/counts', null, 1, null, setTotales);
    };

    const getExternalJobs = async () => {
        const externos = await fetchData('externalJobs/noLimit');
        const clientes = externos.reduce((acc, job) => {
            const existingCliente = acc.find(cliente => cliente.username === job.username);
            if (existingCliente) {
                existingCliente.total += 1; // Si ya existe, incrementa el total
            } else {
                acc.push({
                    username: job.username,
                    total: 1 // Si no existe, añade un nuevo objeto
                });
            }
            return acc;
        }, []);

        setProduccionExternos(prev => {
            const [firstElement, ...rest] = prev.grid;
            return {
                ...prev,
                grid: [
                    firstElement,
                    ...clientes.map(cliente => ({
                        icon: <IoDocumentTextOutline />,
                        title: cliente.username,
                        key: cliente.username,
                        body: cliente.total
                    })),
                    ...rest
                ]
            };
        });
    };

    useEffect(() => {
        getPlanchasCount();
        getExternalJobs();
    }, []);

    useEffect(() => {
        if (totales && totales.finalizadas > 0) {
            setProduccionPlanchas(prev => ({
                ...prev,
                grid: prev.grid.map(item => {
                    switch (item.key) {
                        case 'planchas':
                            return { ...item, body: totales.planchas };
                        case 'planchasPreproduccion':
                            return { ...item, body: totales.preproduccion };
                        case 'planchasProduccion':
                            return { ...item, body: totales.produccion };
                        case 'planchasFinalizadas':
                            return { ...item, body: totales.finalizadas };
                        default:
                            return item;
                    }
                })
            }));
            setProduccionExternos(prev => ({
                ...prev,
                grid: prev.grid.map(item => {
                    if (item.key === 'externosFinalizados') {
                        return { ...item, body: totales.externos_finalizados };
                    } else if (item.key === 'externosAnulados') {
                        return { ...item, body: totales.externos_anulados };
                    } else if (item.key === 'externosPendientes') {
                        return { ...item, body: totales.externos_pendientes };
                    }
                    return item;
                })
            }));
        }
    }, [totales]);

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
                    title={produccionReferencias.title}
                    grid={produccionReferencias.grid}
                    gridClick={referenciasGridClick}
                />
                <GridComponent
                    title={produccionPlanchas.title}
                    grid={produccionPlanchas.grid}
                    gridClick={planchasGridClick}
                />
                <GridComponent
                    title={produccionExternos.title}
                    grid={produccionExternos.grid}
                    gridClick={externosGridClick}
                />
            </div>
        </div>
    )
}

export default ProduccionPage