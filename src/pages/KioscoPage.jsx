import { useEffect, useMemo, useRef, useState } from 'react';
import DetailsHeader from '../components/DetailsHeader';
import { get_overview_with_options, get_jacket_actions } from '../helpers/cloudflow/hub';
import JacketComponent from '../components/JacketComponent';
import WorkableComponent from '../components/WorkableComponent';
import "./KioscoPage.css";
import { HiOutlineRefresh } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { FaPause, FaPlay, FaFlag } from "react-icons/fa";
import { BlinkBlur } from "react-loading-indicators";

const STORAGE_KEY = "kiosk_filters";

/* =========================
   LOCAL STORAGE
========================= */
const loadState = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
};



const saveState = (state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

function KioscoPage() {
    const stored = loadState();

    const [userJackets, setUserJackets] = useState([]);
    const [listProgress, setListProgress] = useState([]);

    const [selectedJacketId, setSelectedJacketId] = useState(null);

    const [filters, setFilters] = useState(stored || {});

    const [loading, setLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [actions, setActions] = useState([]);

    const requestRef = useRef(0);
    const previousTimestampRef = useRef(null);
    const loadJacketIds = useRef([])

    const sortJackets = (list) =>
        [...list].sort((a, b) => b.id.localeCompare(a.id));


    /* =========================
       FETCH JACKETS
    ========================= */
    const fetchJackets = async (isInitial = false) => {
        const requestId = ++requestRef.current;
        const activeFilters = loadState() || {};
        const timeStamp = isInitial
            ? null
            : previousTimestampRef.current;

        try {
            const res = await get_overview_with_options(
                activeFilters,
                loadJacketIds.current,
                timeStamp,
            );

            if (requestId !== requestRef.current) return;

            const updatedEntries = res?.entries || [];
            const updatedModified = res?.modified || [];
            const timestampRes = res?.timestamp || null;
            const progress = res?.progress || [];

            setLoading(false);
            previousTimestampRef.current = timestampRes;

            /* 🔥 PROGRESS SIEMPRE */
            applyProgress(progress);

            const entries = updatedEntries.slice(0, 100);
            const entriesIds = entries.map(j => j.id);

            if (isInitial) {
                const initialEntries = sortJackets(entries);

                setInitialLoading(false);
                setUserJackets(initialEntries);

                loadJacketIds.current = initialEntries.map(j => j.id);
                return;
            }

            setUserJackets(prev => {
                const map = new Map(prev.map(j => [j.id, j]));

                // actualizar / insertar
                entries.forEach(entry => {
                    map.set(entry.id, {
                        ...(map.get(entry.id) || {}),
                        ...entry
                    });
                });

                // eliminar modificadas
                updatedModified.forEach(id => {
                    map.delete(id);
                });

                const finalList = sortJackets(Array.from(map.values()));

                loadJacketIds.current = finalList.map(j => j.id);

                return finalList;
            });

            loadJacketIds.current = userJackets.map(j => j.id);


        } catch (err) {
            console.error("fetch error:", err);
        }
    };

    const fetchActions = async () => {

        try {
            const res = await get_jacket_actions(selectedJacketId);
            setActions(res.actions)

        } catch (error) {
            console.error("fetch error:", err);
        }
    }

    const applyProgress = (progress) => {
        if (!progress) return;
        setListProgress(progress);
    }

    /* =========================
       POLLING LOOP
    ========================= */
    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            await fetchJackets(true);

            while (!cancelled) {
                await fetchJackets(false);
                await new Promise(r => setTimeout(r, 8500));
            }
        };

        run();

        return () => {
            cancelled = true;
        };
    }, []);

    /* =========================
       SELECTED JACKET
    ========================= */
    useEffect(() => {
        if (!userJackets.length) return;

        setSelectedJacketId(prev => {
            if (!prev) return userJackets[0].id;

            const exists = userJackets.some(j => j.id === prev);
            return exists ? prev : userJackets[0].id;
        });
    }, [userJackets]);

    useEffect(() => {

        if (!selectedJacketId) return;

        fetchActions();

    }, [selectedJacketId]);

    const selectedJacket = useMemo(
        () => userJackets.find(j => j.id === selectedJacketId),
        [userJackets, selectedJacketId]
    );

    const cleanDeleted = (id_jacket) => {
        setUserJackets(prev =>
            prev.filter(j => j.id !== id_jacket)
        );

        // opcional: limpiar selección si era la eliminada
        setSelectedJacketId(prev =>
            prev === id_jacket ? null : prev
        );
    };

    /* =========================
       FILTERS
    ========================= */
    const handleFilterChange = (key) => {
        const next = { ...filters };
        setLoading(true);

        if (next[key]) delete next[key];
        else next[key] = key === "state" ? "error" : true;

        setFilters(next);
        saveState(next);
        fetchJackets(true);
    };

    const showEmptyState = !loading && !initialLoading && userJackets.length === 0;

    /* =========================
       RENDER
    ========================= */

    return (
        <div className="detailsContainer kioskPage">

            <DetailsHeader
                title="KIOSCO GENERAL"
                subtitle={
                    <HiOutlineRefresh
                        onClick={() => {
                            setLoading(true);
                            fetchJackets(true);
                        }}
                        style={{ opacity: loading ? 0.5 : 1 }}
                    />
                }
            />

            {loading && (
                <div className="kioskRefreshingOverlay">
                    <BlinkBlur variant="dotted" color="var(--highlight)" size="large" />
                </div>
            )}

            <div className="kioskContainer">

                <div className="filterButtons">
                    <div className={`filtersButton ${filters.state ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("state")}>
                        <RxCross2 /> Error
                    </div>

                    <div className={`filtersButton ${filters.hold_in_kiosk ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("hold_in_kiosk")}>
                        <FaPause /> Hold
                    </div>

                    <div className={`filtersButton ${filters.running ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("running")}>
                        <FaPlay /> Running
                    </div>

                    <div className={`filtersButton ${filters.done ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("done")}>
                        <FaFlag /> Finished
                    </div>
                </div>

                {initialLoading ? (
                    <div />
                ) : showEmptyState ? (
                    <div />
                ) : (
                    <div className="kioskColumns">
                        <div className="jacketList">
                            {userJackets.map(j => (
                                <JacketComponent
                                    key={j.id}
                                    jacket={j}
                                    selectedJacketId={selectedJacketId}
                                    setSelectedJacketId={setSelectedJacketId}
                                    actions={actions}
                                    cleanDeleted={cleanDeleted}
                                />
                            ))}
                        </div>

                        <div className="workableList">
                            {selectedJacket?.workables?.map(w => (
                                <WorkableComponent
                                    key={w.id}
                                    jacketId={selectedJacket.id}
                                    workable={w}
                                    listProgress={listProgress}
                                    setUserJackets={setUserJackets}
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