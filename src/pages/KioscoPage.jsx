import { useEffect, useMemo, useRef, useState } from 'react';
import DetailsHeader from '../components/DetailsHeader';
import { useSession } from '../context/SessionContext';
import { get_overview_with_options } from '../helpers/cloudflow/hub';
import JacketComponent from '../components/JacketComponent';
import WorkableComponent from '../components/WorkableComponent';
import "./KioscoPage.css";
import useSocket from '../helpers/useSocket';
import { HiOutlineRefresh } from "react-icons/hi";
import { useTabs } from '../context/TabsContext';
import { RxCross2 } from "react-icons/rx";
import { FaPause, FaPlay, FaFlag } from "react-icons/fa";
import { BlinkBlur } from "react-loading-indicators";
import { useLocation } from "react-router-dom";

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
    const socket = useSocket();
    const location = useLocation();
    const { session } = useSession();

    const stored = loadState();

    const [userJackets, setUserJackets] = useState([]);
    const [listProgress, setListProgress] = useState([]);

    const [selectedJacketId, setSelectedJacketId] = useState(null);

    const [filters, setFilters] = useState(stored || {});

    const [loading, setLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);

    const requestRef = useRef(0);
    const previousTimestampRef = useRef(null);
    const loadJacketIds = useRef([])

    /* =========================
       FETCH JACKETS
    ========================= */
    const fetchJackets = async (isInitial = false) => {
        const requestId = ++requestRef.current;
        const activeFilters = loadState();
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
                setInitialLoading(false);
                setUserJackets(entries);
                loadJacketIds.current = entriesIds;
                return;
            }

            setUserJackets(prev => {
                const map = new Map(prev.map(j => [j.id, j]));

                // aplicar updates/inserts
                entries.forEach(entry => {
                    map.set(entry.id, {
                        ...(map.get(entry.id) || {}),
                        ...entry
                    });
                });

                // 🔥 eliminar los que vienen en modified
                updatedModified.forEach(id => {
                    map.delete(id);
                });

                // separar nuevos vs existentes
                const newIds = entries.map(e => e.id);

                const newItems = newIds
                    .map(id => map.get(id))
                    .filter(Boolean);

                const oldItems = Array.from(map.values())
                    .filter(j => !newIds.includes(j.id));

                const finalList = [...newItems, ...oldItems];

                // mantener ids sincronizados
                loadJacketIds.current = finalList.map(j => j.id);

                return finalList;
            });

            loadJacketIds.current = userJackets.map(j => j.id);


        } catch (err) {
            console.error("fetch error:", err);
        }
    };

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

    const selectedJacket = useMemo(
        () => userJackets.find(j => j.id === selectedJacketId),
        [userJackets, selectedJacketId]
    );

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