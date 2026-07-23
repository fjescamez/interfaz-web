import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import DetailsHeader from '../../../components/DetailsHeader';
import { list_with_options, get, set_keys } from '../../../helpers/cloudflow/custom_objects';
import ItemEmailComponent from '../components/ItemEmailComponent';
import DetailEmailComponent from '../components/DetailEmailComponent';
import "./EmailClientPage2.css";
import { HiOutlineRefresh } from "react-icons/hi";
import { IoMdFolderOpen } from "react-icons/io";
import { MdTurnLeft } from "react-icons/md";
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

const getEmailId = email => email?._id ?? email?.id;


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

    const [selectedEmailIds, setSelectedEmailIds] = useState(
        () => new Set()
    );

    const lastSelectedIndexRef = useRef(null);

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


    const selectedEmails = useMemo(
        () =>
            emailList.filter(email =>
                selectedEmailIds.has(getEmailId(email))
            ),
        [emailList, selectedEmailIds]
    );

    const selectedEmail =
        selectedEmails.length === 1
            ? selectedEmails[0]
            : null;

    const selectedCount = selectedEmailIds.size;

    const clearSelection = useCallback(() => {
        setSelectedEmailIds(new Set());
        lastSelectedIndexRef.current = null;
    }, []);

    const handleSelectEmail = useCallback(
        (emailId, index, event) => {
            const additiveSelection =
                event.ctrlKey || event.metaKey;

            const rangeSelection =
                event.shiftKey &&
                lastSelectedIndexRef.current !== null;

            setSelectedEmailIds(currentSelection => {
                const nextSelection = additiveSelection
                    ? new Set(currentSelection)
                    : new Set();

                if (rangeSelection) {
                    const start = Math.min(
                        lastSelectedIndexRef.current,
                        index
                    );

                    const end = Math.max(
                        lastSelectedIndexRef.current,
                        index
                    );

                    for (
                        let currentIndex = start;
                        currentIndex <= end;
                        currentIndex += 1
                    ) {
                        const currentEmail = emailList[currentIndex];
                        const currentId = getEmailId(currentEmail);

                        if (currentId) {
                            nextSelection.add(currentId);
                        }
                    }

                    return nextSelection;
                }

                if (additiveSelection) {
                    if (nextSelection.has(emailId)) {
                        nextSelection.delete(emailId);
                    } else {
                        nextSelection.add(emailId);
                    }
                } else {
                    nextSelection.add(emailId);
                }

                return nextSelection;
            });

            if (!event.shiftKey) {
                lastSelectedIndexRef.current = index;
            }
        },
        [emailList]
    );

    const cleanDeleted = useCallback(idEmail => {
        setEmailList(currentEmails =>
            currentEmails.filter(
                email => getEmailId(email) !== idEmail
            )
        );

        setSelectedEmailIds(currentSelection => {
            const nextSelection = new Set(currentSelection);
            nextSelection.delete(idEmail);
            return nextSelection;
        });
    }, []);




    const defaultFilters = {
        entrada: false,
        asignado: false,
        misAsignados: false,
        archivado: false,
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
    const handleFilterChange = key => {
        setLoading(true);

        activeFilter.current = key;
        saveState(key);

        clearSelection();
        fetchEmails(true);
    };

    const handleBulkAction = async (
        actionName,
        ids = Array.from(selectedEmailIds)
    ) => {
        if (ids.length === 0) return [];

        try {
            const emails = await Promise.all(
                ids.map(id => get(collection, id))
            );

            let newBuzon;

            if (actionName === "entrada") {
                newBuzon = "Bandeja Entrada";
            } else if (actionName === "asignar") {
                newBuzon = `Asignado ${username}`;
            } else if (actionName === "archivar") {
                newBuzon = "Archivado";
            } else if (actionName === "parar") {
                newBuzon = "Parado";
            } else if (actionName === "eliminar") {
                newBuzon = "papelera";
            }

            if (!newBuzon) {
                throw new Error(`Acción desconocida: ${actionName}`);
            }

            await Promise.all(
                emails.map(email =>
                    set_keys(collection, email._id, {
                        buzon: newBuzon
                    })
                )
            );

            clearSelection();
            await fetchEmails();

            return emails;
        } catch (error) {
            console.error(`Error ejecutando ${actionName}:`, error);
            return [];
        }
    };

    const setFilterName = (filter) => {
        if (filter === "entrada") return "Bandeja de Entrada";
        else if (filter === "asignado") return "Asignados";
        else if (filter === "misAsignados") return "Mis Asignados";
        else if (filter === "archivado") return "Archivado";
        else if (filter === "parado") return "Parados";
        else if (filter === "papelera") return "Papelera";
        return filter;
    }

    const showEmptyState = !loading && !initialLoading && emailList.length === 0;


    const encodeSmbPath = path =>
        path
            .split("/")
            .filter(Boolean)
            .map(segment => encodeURIComponent(segment))
            .join("/");

    const openEmailFolder = (fileEmail, isTeleWork=false) => {
        if (!fileEmail) {
            console.warn("El correo no tiene file_email");
            return;
        }

        const cloudflowPrefix = "cloudflow://RECURSOS_CLOUDFLOW/";

        if (!fileEmail.startsWith(cloudflowPrefix)) {
            console.warn("Ruta de correo no reconocida:", fileEmail);
            return;
        }

        const relativeFilePath = decodeURIComponent(
            fileEmail.slice(cloudflowPrefix.length)
        )
            .replaceAll("\\", "/")
            .replace(/^\/+/, "");

        // Quitamos el archivo .eml para abrir su carpeta
        const relativeFolderPath = relativeFilePath
            .split("/")
            .slice(0, -1)
            .join("/");

        const isWindows =
            navigator.userAgentData?.platform === "Windows" ||
            navigator.userAgent.includes("Windows");

        if (isWindows) {
            window.location.href =
                "disengraf-folder://open" +
                `?root=${encodeURIComponent("recursos")}` +
                `&folder=${encodeURIComponent(relativeFolderPath)}`;

            return;
        }

        const server = isTeleWork
            ? "192.4.26.120"
            : "CLOUDFLOW2023";

        const encodedFolder = relativeFolderPath
            .split("/")
            .map(segment => encodeURIComponent(segment))
            .join("/");

        window.location.href =
            `smb://${server}/Recursos/${encodedFolder}`;
    };

    /* =========================
       RENDER
    ========================= */

    const title = `GESTOR DE CORREO - ${setFilterName(activeFilter.current)}`;
    const actionEntrada = activeFilter.current !== "entrada";
    const actionAsignar = activeFilter.current === "entrada" || activeFilter.current === "misAsignados";
    const actionArchivar = activeFilter.current === "entrada" || activeFilter.current === "misAsignados";
    const actionParar = activeFilter.current === "entrada" || activeFilter.current === "misAsignados";
    const actionEliminar = activeFilter.current === "entrada" || activeFilter.current === "misAsignados";

    return (
        <div className="detailsContainer gestorPage">

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


            <div className="gestorContainer">

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

                    <div className={`filtersButton ${activeFilter.current === "archivado" ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("archivado")}>
                        <MdArchive /> Archivados
                    </div>

                    <div className={`filtersButton ${activeFilter.current === "parado" ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("parado")}>
                        <MdPauseCircle /> Parados
                    </div>

                    <div className={`filtersButton ${activeFilter.current === "papelera" ? 'clicked' : ''}`}
                        onClick={() => handleFilterChange("papelera")}>
                        <MdDelete /> Papelera
                    </div>

                </div>

                <div className="actionsBlock">
                    <div className="filterButtons">
                        {selectedCount > 0 && (
                            <>
                                <div className={`filtersButton success`}
                                    onClick={clearSelection}>
                                    Limpiar selección
                                </div>

                                {selectedCount === 1 && (
                                    <div
                                        className="filtersButton"
                                        onClick={event => {
                                            event.stopPropagation();
                                            openEmailFolder(selectedEmails[0].file_email);
                                        }}
                                    >
                                        <IoMdFolderOpen />
                                        Carpeta
                                    </div>
                                )}

                                {(actionEntrada) && (
                                    <div className={`filtersButton`}
                                        onClick={() => handleBulkAction("entrada")}>
                                        <MdTurnLeft />
                                        A Entrada
                                    </div>
                                )}
                                {(actionAsignar) && (
                                    <div className={`filtersButton`}
                                        onClick={() => handleBulkAction("asignar")}>
                                        <MdAssignmentInd />
                                        Asignar
                                    </div>
                                )}
                                {(actionArchivar) && (
                                    <div className={`filtersButton`}
                                        onClick={() => handleBulkAction("archivar")}>
                                        <MdArchive />
                                        Archivar
                                    </div>
                                )}
                                {(actionParar) && (
                                    <div className={`filtersButton`}
                                        onClick={() => handleBulkAction("parar")}>
                                        <MdPauseCircle />
                                        Parar
                                    </div>
                                )}
                                {(actionEliminar) && (
                                    <div className={`filtersButton danger`}
                                        onClick={() => handleBulkAction("eliminar")}>
                                        <MdDelete /> Papelera
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>


                {initialLoading ? (
                    <div />
                ) : showEmptyState ? (
                    <div />
                ) : (
                    <div className="gestorColumns">
                        <div className="emailListPanel">
                            <div className="emailList">
                                {emailList.map((email, index) => {
                                    const emailId = getEmailId(email);

                                    return (
                                        <ItemEmailComponent
                                            key={emailId}
                                            email={email}
                                            index={index}
                                            isSelected={selectedEmailIds.has(emailId)}
                                            isSingleSelected={
                                                selectedCount === 1 &&
                                                selectedEmailIds.has(emailId)
                                            }
                                            onSelect={handleSelectEmail}
                                            onQuickAction={(actionName, id) =>
                                                handleBulkAction(actionName, [id])
                                            }
                                            canAssign={actionAsignar}
                                            canArchive={actionArchivar}
                                            canDelete={actionEliminar}
                                            canEntrada={actionEntrada}
                                            openEmailFolder={openEmailFolder}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        <div className="emailDetailList">
                            {selectedCount <= 1 ? (
                                <DetailEmailComponent email={selectedEmail} />
                            ) : (

                                <>
                                    <div className="emailDetail">
                                        <div className="multipleEmailSelection">
                                            <strong>
                                                {selectedCount} correos seleccionados
                                            </strong>

                                            <span>
                                                Utiliza las acciones disponibles sobre la lista.
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default EmailClientPage;