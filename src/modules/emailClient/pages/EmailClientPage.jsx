import { useEffect, useMemo, useRef, useState } from 'react';
import DetailsHeader from '../../../components/DetailsHeader';
import { list_with_options } from '../../../helpers/cloudflow/custom_objects';
import ItemEmailComponent from '../components/ItemEmailComponent';
import DetailEmailComponent from '../components/DetailEmailComponent';
//import "./EmailClientPage2.css";
import { HiOutlineRefresh } from "react-icons/hi";
import { BlinkBlur } from "react-loading-indicators";
import { useSession } from "../../../context/SessionContext";
import {
    MdInbox,
    MdAssignmentInd,
    MdPersonPin,
    MdArchive,
    MdPauseCircle,
    MdDelete
} from "react-icons/md";

const STORAGE_KEY = "gestor_filters";

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

function EmailClientPage() {

    const { session } = useSession();
    const username = session.username;
    const stored = loadState();
    const collection = "Email";

    const [emailList, setEmailList] = useState([]);
    const [listProgress, setListProgress] = useState([]);

    const [selectedEmailId, setSelectedEmailId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [actions, setActions] = useState([]);

    const requestRef = useRef(0);
    const activeFilter = useRef(stored || "entrada");



    /* =========================
       FETCH JACKETS
    ========================= */
    const fetchEmails = async (isInitial = false) => {
        const requestId = ++requestRef.current;
        const order_by = ["_id", "descending"];
        const query = setQuery();

        try {
            const res = await list_with_options(
                collection,
                query,
                order_by
            );

            if (requestId !== requestRef.current) return;

            const results = res?.results || [];
            const count = res?.count || 0;

            setEmailList(results)
            setLoading(false);
            setInitialLoading(false);



        } catch (err) {
            console.error("fetch error:", err);
        }
    };



    /* =========================
       POLLING LOOP
    ========================= */
    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            await fetchEmails(true);

            while (!cancelled) {
                await fetchEmails(false);
                await new Promise(r => setTimeout(r, 8500));
            }
        };

        run();

        return () => {
            cancelled = true;
        };
    }, []);




    const selectedEmail = useMemo(
        () => emailList.find(email => email._id === selectedEmailId),
        [emailList, selectedEmailId]
    );



    const cleanDeleted = (id_email) => {
        setEmailList(prev =>
            prev.filter(j => j.id !== id_email)
        );

        // opcional: limpiar selección si era la eliminada
        setSelectedEmailId(prev =>
            prev === id_email ? null : prev
        );
    };


    const defaultFilters = {
        entrada: false,
        asignado: false,
        misAsignados: false,
        archivados: false,
        parados: false,
        papelera: false
    }

    const setQuery = () => {

        if (!activeFilter.current) return [];
        if (activeFilter.current === "misAsignados")
            return ["buzon", "contains text like", username];

        return ["buzon", "contains text like", activeFilter.current];
    }

    /* =========================
       FILTERS
    ========================= */
    const handleFilterChange = (key) => {
        const next = {
            ...defaultFilters,
            [key]: true,
        };

        setLoading(true);
        activeFilter.current = key;
        saveState(key);
        fetchEmails(true, next);
    };

    const setFilterName = (filter) => {
        if (filter === "entrada") return "Bandeja de Entrada";
        else if (filter === "asignado") return "Asignados";
        else if (filter === "misAsignados") return "Mis Asignados";
        else if (filter === "archivados") return "Archivados";
        else if (filter === "parados") return "Parados";
        else if (filter === "papelera") return "Papelera";
        return filter;
    }

    const showEmptyState = !loading && !initialLoading && emailList.length === 0;

    /* =========================
       RENDER
    ========================= */

    const title = `GESTOR DE CORREO - ${setFilterName(activeFilter.current)}`;

    return (
        <div className="detailsContainer kioskPage">

            <DetailsHeader
                title={title}
                subtitle={
                    <HiOutlineRefresh
                        onClick={() => {
                            setLoading(true);
                            fetchEmails(true);
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
                    <div className={`filtersButton ${activeFilter.current === "entrada" ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("entrada")}>
                        <MdInbox /> Bandeja de Entrada
                    </div>

                    <div className={`filtersButton ${activeFilter.current === "asignado" ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("asignado")}>
                        <MdAssignmentInd /> Asignados
                    </div>

                    <div className={`filtersButton ${activeFilter.current === "misAsignados" ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("misAsignados")}>
                        <MdPersonPin /> Mis Asignados
                    </div>

                    <div className={`filtersButton ${activeFilter.current === "archivados" ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("archivados")}>
                        <MdArchive /> Archivados
                    </div>

                    <div className={`filtersButton ${activeFilter.current === "parados" ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("parados")}>
                        <MdPauseCircle /> Parados
                    </div>

                    <div className={`filtersButton ${activeFilter.current === "papelera" ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("papelera")}>
                        <MdDelete /> Papelera
                    </div>
                </div>

                {initialLoading ? (
                    <div />
                ) : showEmptyState ? (
                    <div />
                ) : (
                    <div className="kioskColumns">
                        <div className="jacketList">

                            {emailList.map(j => (
                                <ItemEmailComponent
                                    key={j.id}
                                    email={j}
                                    selectedEmailId={selectedEmailId}
                                    setSelectedEmailId={setSelectedEmailId}
                                    actions={actions}
                                    cleanDeleted={cleanDeleted}
                                />
                            ))}
                        </div>

                        <div className="workableList">
                            {selectedEmail ? (
                                <DetailEmailComponent email={selectedEmail} />
                            ) : (
                                <div className="emptyEmailDetail">
                                    Selecciona un correo para previsualizarlo
                                </div>
                            )}
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default EmailClientPage;