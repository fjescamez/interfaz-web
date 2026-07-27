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
import {
    MdInbox,
    MdAssignmentInd,
    MdPersonPin,
    MdArchive,
    MdPauseCircle,
    MdDelete,
    MdSearch,
    MdTurnLeft
} from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { BlinkBlur } from "react-loading-indicators";
import { useSession } from "../../../context/SessionContext";

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

function EmailSearchBar({ onSearch, onClear, loading }) {
    const [value, setValue] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        if (loading) return;

        onSearch(value.trim());
    };

    const handleClear = () => {
        setValue("");
        onClear();
    };

    return (
        <form
            className="emailSearchBar"
            onSubmit={handleSubmit}
        >
            <div className="emailSearchInputContainer">
                <MdSearch className="emailSearchIcon" />

                <input
                    type="search"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    placeholder="Buscar"
                    aria-label="Buscar correos"
                />

                {value && (
                    <button
                        type="button"
                        className="emailSearchClear"
                        onClick={handleClear}
                        aria-label="Limpiar búsqueda"
                        title="Limpiar búsqueda"
                    >
                        ×
                    </button>
                )}
            </div>
        </form>
    );
}

function EmailClientPage() {

    const { session } = useSession();
    const username = session.username;
    const stored = loadState();
    const collection = "Email";

    const [emailList, setEmailList] = useState([]);
    const [pulsedAction, setPulsedAction] = useState(false);

    const pulsedActionRef = useRef(false);
    const actionTimerRef = useRef(null);
    const appliedSearchRef = useRef("");

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
                order_by,
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

    const normalizeDateSearch = value => {
        const match = value.match(
            /^(\d{2})[/-](\d{2})[/-](\d{4})$/
        );

        if (!match) {
            return value;
        }

        const [, day, month, year] = match;

        return `${year}-${month}-${day}`;
    };

    const setQuery = () => {
        if (!activeFilter.current) {
            return [];
        }

        let mailboxQuery;

        if (activeFilter.current === "misAsignados") {
            mailboxQuery = [
                "buzon",
                "contains text like",
                username
            ];
        } else {
            mailboxQuery = [
                "buzon",
                "contains text like",
                activeFilter.current
            ];
        }

        const searchValue = appliedSearchRef.current.trim();

        if (!searchValue) {
            return mailboxQuery;
        }

        const normalizedDate = normalizeDateSearch(searchValue);

        const searchQuery = [
            "(",
            "emisor",
            "contains text like",
            searchValue,

            "or",

            "destinatario",
            "contains text like",
            searchValue,

            "or",

            "asunto",
            "contains text like",
            searchValue,

            "or",

            "entryDate",
            "contains text like",
            normalizedDate,
            ")"
        ];

        return [
            "(",
            ...mailboxQuery,
            ")",
            "and",
            ...searchQuery
        ];
    };

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

        if (!startActionLock()) {
            return [];
        }

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

    const openEmailFolder = (fileEmail, isTeleWork = false) => {
        if (!fileEmail) {
            console.warn("El correo no tiene file_email");
            return;
        }

        if (!startActionLock()) {
            return [];
        }

        const cloudflowPrefix = "cloudflow://RECURSOS_CLOUDFLOW/";

        if (!fileEmail.startsWith(cloudflowPrefix)) {
            console.warn("Ruta de correo no reconocida:", fileEmail);
            return;
        }

        let relativeFilePath;

        try {
            relativeFilePath = decodeURIComponent(
                fileEmail.slice(cloudflowPrefix.length)
            )
                .replaceAll("\\", "/")
                .replace(/^\/+|\/+$/g, "");
        } catch (error) {
            console.error("No se pudo decodificar la ruta:", fileEmail, error);
            return;
        }

        // Quitamos el archivo .eml y conservamos únicamente su carpeta
        const pathParts = relativeFilePath.split("/");

        if (pathParts.length < 2) {
            console.warn("La ruta no contiene una carpeta válida:", fileEmail);
            return;
        }

        pathParts.pop();

        const relativeFolderPath = pathParts.join("/");

        const platform =
            navigator.userAgentData?.platform ||
            navigator.platform ||
            "";

        const isWindows =
            /windows|win32|win64/i.test(platform) ||
            /windows/i.test(navigator.userAgent);

        if (isWindows) {
            const mode = isTeleWork ? "telework" : "office";

            const protocolUrl =
                "disengraf-folder://open" +
                `?mode=${encodeURIComponent(mode)}` +
                `&area=${encodeURIComponent("resources")}` +
                `&folder=${encodeURIComponent(relativeFolderPath)}`;

            console.log("Abriendo carpeta de correo:", protocolUrl);

            window.location.href = protocolUrl;
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

    const startActionLock = useCallback(() => {
        if (pulsedActionRef.current) {
            return false;
        }

        pulsedActionRef.current = true;
        setPulsedAction(true);

        clearTimeout(actionTimerRef.current);

        actionTimerRef.current = setTimeout(() => {
            pulsedActionRef.current = false;
            setPulsedAction(false);
        }, 2500);

        return true;
    }, []);

    useEffect(() => {
        return () => {
            clearTimeout(actionTimerRef.current);
        };
    }, []);

    const handleReferenceTagsChange = useCallback(
        async (emailId, previousTags, nextTags) => {
            // Actualización inmediata de la interfaz
            setEmailList(currentEmails =>
                currentEmails.map(currentEmail =>
                    getEmailId(currentEmail) === emailId
                        ? {
                            ...currentEmail,
                            reference_tags: nextTags
                        }
                        : currentEmail
                )
            );

            try {
                await set_keys(collection, emailId, {
                    reference_tags: nextTags
                });
            } catch (error) {
                // Si falla el guardado, restauramos el estado anterior
                setEmailList(currentEmails =>
                    currentEmails.map(currentEmail =>
                        getEmailId(currentEmail) === emailId
                            ? {
                                ...currentEmail,
                                reference_tags: previousTags
                            }
                            : currentEmail
                    )
                );

                throw error;
            }
        },
        [collection]
    );

    const handleSearch = async value => {
        if (value === appliedSearchRef.current) {
            return;
        }

        appliedSearchRef.current = value;

        clearSelection();
        setLoading(true);

        await fetchEmails(true);
    };

    const handleClearSearch = async () => {
        if (!appliedSearchRef.current) {
            return;
        }

        appliedSearchRef.current = "";

        clearSelection();
        setLoading(true);

        await fetchEmails(true);
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

                    <EmailSearchBar
                        onSearch={handleSearch}
                        onClear={handleClearSearch}
                        loading={loading}
                    />

                </div>



                <div
                    className={`actionsBlock ${pulsedAction ? "actionsBlocked" : ""
                        }`}
                >
                    <div className="filterButtons">
                        {selectedCount > 0 && (
                            <>
                                <div className={`filtersButton success`}
                                    onClick={clearSelection}>
                                    Limpiar selección
                                </div>

                                {selectedCount === 1 && (
                                    <>
                                        <div className={`filtersButton action`}
                                            onClick={event => {
                                                event.stopPropagation();
                                                openEmailFolder(selectedEmails[0].file_email);
                                            }}
                                        >
                                            <IoMdFolderOpen />
                                            Carpeta
                                        </div>

                                        <div className={`filtersButton action`}
                                            onClick={event => {
                                                event.stopPropagation();
                                                openEmailFolder(selectedEmails[0].file_email);
                                            }}
                                        >
                                            <FaDownload />
                                            Adjuntos
                                        </div>
                                    </>
                                )}


                                {(actionEntrada) && (
                                    <div className={`filtersButton action`}
                                        onClick={() => handleBulkAction("entrada")}>
                                        <MdTurnLeft />
                                        A Entrada
                                    </div>
                                )}
                                {(actionAsignar) && (
                                    <div className={`filtersButton action`}
                                        onClick={() => handleBulkAction("asignar")}>
                                        <MdAssignmentInd />
                                        Asignar
                                    </div>
                                )}
                                {(actionArchivar) && (
                                    <div className={`filtersButton action`}
                                        onClick={() => handleBulkAction("archivar")}>
                                        <MdArchive />
                                        Archivar
                                    </div>
                                )}
                                {(actionParar) && (
                                    <div className={`filtersButton action`}
                                        onClick={() => handleBulkAction("parar")}>
                                        <MdPauseCircle />
                                        Parar
                                    </div>
                                )}
                                {(actionEliminar) && (
                                    <div className={`filtersButton action danger`}
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
                                            pulsedAction={pulsedAction}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        <div className="emailDetailList">
                            {selectedCount <= 1 ? (
                                <DetailEmailComponent
                                    email={selectedEmail}
                                    onReferenceTagsChange={handleReferenceTagsChange}
                                />
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