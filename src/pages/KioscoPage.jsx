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

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const jacketsRef = useRef(userJackets);

    const [filters, setFilters] = useState(
        session?.kioskFilters?.filters || getTabState(tabKey)?.filters || {}
    );

    const [limit, setLimit] = useState(
        session?.kioskFilters?.limit || getTabState(tabKey)?.limit || 10
    );

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
    };

    const fetchData = async () => {
        setIsRefreshing(true);
        await listJackets();
        setInitialLoading(false);
        setIsRefreshing(false);
    };

    useEffect(() => {
        jacketsRef.current = userJackets;

        setSelectedJacket(prev => {
            if (!userJackets.length) return null;
            return userJackets.find(j => j._id === prev?._id) || userJackets[0];
        });
    }, [userJackets]);

    useEffect(() => {

        fetchData();
        const interval = setInterval(() => {
            listJackets();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        filtersRef.current = filters;
        limitRef.current = limit;

        saveTabState(tabKey, { filters, limit });

        listJackets();

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

    useEffect(() => {
        if (!socket) return;

        socket.on("updateKiosk", ({ username, tabKey }) => {
            if (username === session?.username) {
                listJackets();
                if (tabKey) closeTab(tabKey, false);
            }
        });

        return () => socket.off("updateKiosk");
    }, [socket]);

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

    const showEmptyState = !initialLoading && userJackets.length === 0;

    return (
        <div className="detailsContainer kioskPage">

            <DetailsHeader
                title="KIOSCO GENERAL"
                subtitle={
                    <HiOutlineRefresh
                        onClick={fetchData}
                        style={{ border: "none", opacity: isRefreshing ? 0.5 : 1 }}
                    />
                }
                insteadOfActions={<></>}
            />

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

                {/* ===== ZONA ESTABLE (sin saltos) ===== */}
                {initialLoading ? (
                    <div className="executingContainer">
                        <BlinkBlur variant="dotted" color="var(--highlight)" size="large" />
                        <h1>Cargando</h1>
                    </div>
                ) : showEmptyState ? (
                    <div className="executingContainer">
                        <h1>No hay elementos que cumplan los filtros aplicados</h1>
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

                {/* overlay suave de refresh (NO rompe layout) */}
                {isRefreshing && !initialLoading && (
                    <div className="kioskRefreshingOverlay">
                        <span>Actualizando…</span>
                    </div>
                )}

            </div>
        </div>
    );
}

export default KioscoPage;