import { use, useEffect, useRef, useState } from 'react';
import DetailsHeader from '../components/DetailsHeader';
import { useSession } from '../context/SessionContext';
import { postData } from '../helpers/fetchData';
import JacketComponent from '../components/JacketComponent';
import "./KioscoPage.css";
import WorkableComponent from '../components/WorkableComponent';
import useSocket from '../helpers/useSocket';
import { HiOutlineRefresh } from "react-icons/hi";
import { useTabs } from '../context/TabsContext';
import { RxCross2 } from "react-icons/rx";
import { FaPause, FaPlay, FaFlag } from "react-icons/fa";
import FormGroup from '../components/formComponents/FormGroup';
import { BlinkBlur } from "react-loading-indicators";

function KioscoPage() {
    const socket = useSocket();
    const { closeTab } = useTabs();
    const { session } = useSession();
    const [userJackets, setUserJackets] = useState([]);
    const jacketsRef = useRef(userJackets);
    const [selectedJacket, setSelectedJacket] = useState(null);
    const [filters, setFilters] = useState({});
    const filtersRef = useRef(filters);
    const [limit, setLimit] = useState(15);
    const limitRef = useRef(limit);
    const [loading, setLoading] = useState(true);

    const listJackets = async () => {
        const result = await postData("orderKiosks/getFilteredJackets", { username: session.username, filters: filtersRef.current, limit: limitRef.current });
        // Solo setear si hay algún jacket nuevo
        const hasNewJacket = result?.jackets?.some(
            newJacket => !jacketsRef?.current?.some(existing => existing._id === newJacket._id)
        );
        if (hasNewJacket || result?.jackets?.length !== jacketsRef?.current?.length) {
            setUserJackets(result?.jackets || []);
        }
    }

    const fetchData = async () => {
        setUserJackets([]);
        setLoading(true);
        await listJackets();
        setLoading(false);
    };

    useEffect(() => {
        setSelectedJacket(userJackets.find(jacket => jacket._id === selectedJacket?._id) || userJackets[0]);
        jacketsRef.current = userJackets;
    }, [userJackets]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            listJackets();
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        filtersRef.current = filters;
        limitRef.current = limit;
        listJackets();
    }, [filters, limit])

    useEffect(() => {
        if (!socket) return;

        socket.on("updateKiosk", ({ username, tabKey }) => {
            if (username === session?.username) {
                listJackets();

                if (tabKey) {
                    closeTab(tabKey, false); // Cerrar la pestaña sin redirigir
                }
            }
        });

        return () => {
            socket.off("updateKiosk");
        };
    }, [socket]);

    const handleFilterChange = (filterKey) => {
        if (!filters[filterKey]) {
            setFilters(prevFilters => ({
                ...prevFilters,
                [filterKey]: filterKey === "state" ? "error" : true
            }));
        } else {
            setFilters(prevFilters => {
                const updatedFilters = { ...prevFilters };
                delete updatedFilters[filterKey];
                return updatedFilters;
            });
        }
    }

    return (
        <div className="detailsContainer kioskPage">
            <DetailsHeader
                title="KIOSCO GENERAL"
                subtitle={<HiOutlineRefresh onClick={fetchData} style={{ border: "none" }} />}
                insteadOfActions={<></>}
            />
            <div className="kioskContainer">
                <div className="filterButtons">
                    <div
                        className={`filtersButton ${filters.state ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("state")}
                    >
                        <RxCross2 /> Error
                    </div>
                    <div
                        className={`filtersButton ${filters.hold_in_kiosk ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("hold_in_kiosk")}
                    >
                        <FaPause /> Hold
                    </div>
                    <div
                        className={`filtersButton ${filters.running ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("running")}
                    >
                        <FaPlay /> Running
                    </div>
                    <div
                        className={`filtersButton ${filters.done ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("done")}
                    >
                        <FaFlag /> Finished
                    </div>
                    <div className="formGroup noLabel">
                        <FormGroup
                            handleForm={(e) => setLimit(parseInt(e.target.value.id))}
                            value={limit}
                            field={{
                                htmlFor: "limit",
                                select: "simple",
                                options: [
                                    {
                                        id: 15,
                                        textoOpcion: "Mostrar 15"
                                    },
                                    {
                                        id: 25,
                                        textoOpcion: "Mostrar 25"
                                    },
                                    {
                                        id: 50,
                                        textoOpcion: "Mostrar 50"
                                    },
                                    {
                                        id: 100,
                                        textoOpcion: "Mostrar 100"
                                    }
                                ],
                                inputId: "limit",
                                inputName: "limit"
                            }}
                        />
                    </div>
                </div>
                {userJackets.length > 0 ? (
                    <div className="kioskColumns">
                        <div className="jacketList">
                            {userJackets.map(jacket => (
                                <JacketComponent key={jacket._id} jacket={jacket} selectedJacket={selectedJacket} setSelectedJacket={setSelectedJacket} />
                            ))}
                        </div>
                        <div className="workableList">
                            {selectedJacket && selectedJacket.log.map(workable => (
                                <WorkableComponent
                                    key={workable.workable}
                                    jacketId={selectedJacket._id}
                                    workable={workable}
                                    id_pedido={selectedJacket?.variables?.id_pedido || null}
                                    trappingData={selectedJacket?.variables?.trapping || null}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    loading ? (
                        <div className="executingContainer">
                            <BlinkBlur variant="dotted" color="var(--highlight)" size="large" speedPlus="0" />
                            <h1>Cargando</h1>
                        </div>
                    ) : (
                        <div className="executingContainer">
                            <h1>No hay elementos que cumplan los filtros aplicados</h1>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default KioscoPage