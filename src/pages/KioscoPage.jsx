import { useEffect, useRef, useState } from 'react';
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
        if (!old) return false;
        return JSON.stringify(old) === JSON.stringify(j);
    });
};

function KioscoPage() {
    const socket = useSocket();
    const location = useLocation();
    const tabKey = location.pathname;

    const { closeTab } = useTabs();
    const { session, setSession } = useSession();
    const { saveTabState, getTabState } = useTabState();

    const [userJackets, setUserJackets] = useState([]);
    const [selectedJacket, setSelectedJacket] = useState(null);

    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const requestIdRef = useRef(0);
    const jacketsRef = useRef(userJackets);

    const [filters, setFilters] = useState(
        session?.kioskFilters?.filters || getTabState(tabKey)?.filters || {}
    );

    const [limit, setLimit] = useState(
        session?.kioskFilters?.limit || getTabState(tabKey)?.limit || 10
    );

    const filtersRef = useRef(filters);
    const limitRef = useRef(limit);

    // ==============================
    // FETCH BASE (sin loading)
    // ==============================
    const listJackets = async () => {
        const requestId = ++requestIdRef.current;

        const filtersSnapshot = filtersRef.current;
        const limitSnapshot = limitRef.current;

        try {
            const result = await postData("orderKiosks/getFilteredJackets", {
                username: session.username,
                filters: filtersSnapshot,
                limit: limitSnapshot
            });

            if (requestId !== requestIdRef.current) return;

            const newJackets = result?.jackets || [];

            setUserJackets(prev => {
                if (areJacketsEqual(prev, newJackets)) return prev;
                return newJackets;
            });

        } catch (err) {
            console.error(err);
        }
    };

    // ==============================
    // FETCH CON LOADING (solo filtros)
    // ==============================
    const fetchWithLoading = async () => {
        setLoading(true);

        try {
            await listJackets();
        } finally {
            setLoading(false);
        }
    };

    // ==============================
    // INIT + POLLING
    // ==============================
    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            await listJackets();
            setInitialLoading(false);

            while (!cancelled) {
                await listJackets();
                await new Promise(r => setTimeout(r, 7500));
            }
        };

        run();

        return () => {
            cancelled = true;
        };
    }, []);

    // ==============================
    // UPDATE SELECTED JACKET
    // ==============================
    useEffect(() => {
        jacketsRef.current = userJackets;

        setSelectedJacket(prev => {
            if (!userJackets.length) return null;
            return userJackets.find(j => j._id === prev?._id) || userJackets[0];
        });
    }, [userJackets]);

    // ==============================
    // FILTERS EFFECT (con loading)
    // ==============================
    useEffect(() => {
        filtersRef.current = filters;
        limitRef.current = limit;

        saveTabState(tabKey, { filters, limit });

        const run = async () => {
            await fetchWithLoading();
        };

        run();

        updateData("userPreferences", {
            kioskFilters: { filters, limit }
        }, session.username);

        setSession(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                kioskFilters: { filters, limit }
            }
        }));
    }, [filters, limit]);

    // ==============================
    // SOCKET (sin loading)
    // ==============================
    useEffect(() => {
        if (!socket) return;

        const handler = ({ username, tabKey }) => {
            if (username === session?.username) {
                void listJackets();

                if (tabKey) closeTab(tabKey, false);
            }
        };

        socket.on("updateKiosk", handler);

        return () => {
            socket.off("updateKiosk", handler);
        };
    }, [session?.username]);

    // ==============================
    // HANDLER FILTROS
    // ==============================
    const handleFilterChange = (filterKey) => {
        setFilters(prev => {
            const updated = { ...prev };

            if (updated[filterKey]) {
                delete updated[filterKey];
            } else {
                updated[filterKey] = filterKey === "state" ? "error" : true;
            }

            return updated;
        });
    };

    const showEmptyState = !loading && !initialLoading && userJackets.length === 0;

    return (
        <div className="detailsContainer kioskPage">

            <DetailsHeader
                title="KIOSCO GENERAL"
                subtitle={
                    <HiOutlineRefresh
                        onClick={fetchWithLoading}
                        style={{ border: "none", opacity: loading ? 0.5 : 1 }}
                    />
                }
                insteadOfActions={<></>}
            />

            {loading && (
                <div className="kioskRefreshingOverlay">
                    <div className="executingContainer">
                        <BlinkBlur variant="dotted" color="var(--highlight)" size="large" />
                        <h1>Cargando</h1>
                    </div>
                </div>
            )}

            <div className="kioskContainer">

                <div className="filterButtons">
                    <div className={`filtersButton ${filters.state ? 'clicked' : ''}`} onClick={() => handleFilterChange("state")}>
                        <RxCross2 /> Error
                    </div>

                    <div className={`filtersButton ${filters.hold_in_kiosk ? 'clicked' : ''}`} onClick={() => handleFilterChange("hold_in_kiosk")}>
                        <FaPause /> Hold
                    </div>

                    <div className={`filtersButton ${filters.running ? 'clicked' : ''}`} onClick={() => handleFilterChange("running")}>
                        <FaPlay /> Running
                    </div>

                    <div className={`filtersButton ${filters.done ? 'clicked' : ''}`} onClick={() => handleFilterChange("done")}>
                        <FaFlag /> Finished
                    </div>

                    <div className="formGroup noLabel">
                        <FormGroup
                            handleForm={(e) => setLimit(Number(e.target.value.id))}
                            value={limit}
                            field={{
                                htmlFor: "limit",
                                select: "simple",
                                options: [
                                    { id: 10, textoOpcion: "Mostrar 10" },
                                    { id: 15, textoOpcion: "Mostrar 15" },
                                    { id: 25, textoOpcion: "Mostrar 25" },
                                    { id: 50, textoOpcion: "Mostrar 50" },
                                    { id: 100, textoOpcion: "Mostrar 100" }
                                ],
                                inputId: "limit",
                                inputName: "limit"
                            }}
                        />
                    </div>
                </div>

                {initialLoading ? (
                    <div className="executingContainer">

                    </div>
                ) : showEmptyState ? (
                    <div className="executingContainer">

                    </div>
                ) : (
                    <div className="kioskColumns">

                        <div className="jacketList">
                            {userJackets.map(jacket => (
                                <JacketComponent
                                    key={jacket?._id}
                                    jacket={jacket}
                                    selectedJacket={selectedJacket}
                                    setSelectedJacket={setSelectedJacket}
                                />
                            ))}
                        </div>

                        <div className="workableList">
                            {selectedJacket?.log?.map(workable => (
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
                )}

            </div>
        </div>
    );
}

export default KioscoPage;