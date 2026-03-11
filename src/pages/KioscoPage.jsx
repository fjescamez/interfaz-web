import { use, useEffect, useRef, useState } from 'react';
import DetailsHeader from '../components/DetailsHeader';
import { useSession } from '../context/SessionContext';
import { postData, updateData } from '../helpers/fetchData';
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
import { useTabState } from '../context/TabStateContext';
import { useLocation } from "react-router-dom";

const areJacketsEqual = (oldJackets = [], newJackets = []) => {
    if (oldJackets.length !== newJackets.length) return false;

    const oldById = new Map(oldJackets.map(j => [j._id, j]));

    return newJackets.every(j => {
        const old = oldById.get(j._id);
        if (!old) return false; // no existe ese _id en los antiguos

        // comparación sencilla profunda usando JSON
        return JSON.stringify(old) === JSON.stringify(j);
    });
};

function KioscoPage() {
    const socket = useSocket();
    const location = useLocation();
    const tabKey = location.pathname;
    const { closeTab } = useTabs();
    const { session, setSession } = useSession();
    const [userJackets, setUserJackets] = useState([]);
    const jacketsRef = useRef(userJackets);
    const [selectedJacket, setSelectedJacket] = useState(null);
    const [loading, setLoading] = useState(true);
    const { saveTabState, getTabState } = useTabState();
    const [filters, setFilters] = useState(session?.kioskFilters?.filters || getTabState(tabKey)?.filters || {});
    const [limit, setLimit] = useState(session?.kioskFilters?.limit || getTabState(tabKey)?.limit || 15);
    const filtersRef = useRef(filters);
    const limitRef = useRef(limit);

    const listJackets = async () => {
        const result = await postData("orderKiosks/getFilteredJackets", {
            username: session.username,
            filters: filtersRef.current,
            limit: limitRef.current
        });

        const newJackets = result?.jackets || [];

        if (!areJacketsEqual(jacketsRef.current, newJackets)) {
            setUserJackets(newJackets);
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
        saveTabState(tabKey, { filters: filtersRef.current, limit: limitRef.current });
        listJackets();

        updateData("userPreferences", {
            kioskFilters: {
                filters,
                limit
            }
        }, session.username);

        setSession(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                kioskFilters: {
                    filters,
                    limit
                }
            }
        }));
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