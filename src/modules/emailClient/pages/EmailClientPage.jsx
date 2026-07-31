import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import DetailsHeader from '../../../components/DetailsHeader';
import {
    create,
    delete_multiple,
    list_with_options,
    get,
    set_keys,
    count as countCustomObjects
} from '../../../helpers/cloudflow/custom_objects';
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
import { postData } from "../../../helpers/fetchData";
import { start_from_whitepaper_with_options } from "../../../helpers/cloudflow/hub";

const STORAGE_KEY = "gestor_filters";
const EMAIL_REPLY_COLLECTION = "EmailReply";

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

function buildReplySubject(value) {
    const subject =
        String(value || "").trim();

    if (!subject) {
        return "RE:";
    }

    if (/^re\s*:/i.test(subject)) {
        return subject;
    }

    return `RE: ${subject}`;
}

function EmailSearchBar({
    onSearch,
    loading
}) {
    const [value, setValue] = useState("");

    const debounceRef = useRef(null);
    const onSearchRef = useRef(onSearch);
    const firstRenderRef = useRef(true);

    /*
     * Conservamos siempre la versión más reciente
     * de onSearch sin reiniciar el debounce.
     */
    useEffect(() => {
        onSearchRef.current = onSearch;
    }, [onSearch]);

    /*
     * Búsqueda automática después de dejar
     * de escribir durante 400 ms.
     */
    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }

        clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            onSearchRef.current(value.trim());
        }, 400);

        return () => {
            clearTimeout(debounceRef.current);
        };
    }, [value]);

    /*
     * Limpieza al desmontar el buscador.
     */
    useEffect(() => {
        return () => {
            clearTimeout(debounceRef.current);
        };
    }, []);


    const handleSubmit = event => {
        event.preventDefault();

        clearTimeout(debounceRef.current);
        onSearchRef.current(value.trim());
    };

    const handleClear = () => {
        clearTimeout(debounceRef.current);

        setValue("");
        onSearchRef.current("");
    };

    return (
        <form
            className="emailSearchBar"
            onSubmit={handleSubmit}
            aria-busy={loading}
        >
            <div className="emailSearchInputContainer">
                <MdSearch className="emailSearchIcon" />

                <input
                    type="search"
                    value={value}
                    onChange={event =>
                        setValue(event.target.value)
                    }
                    placeholder="Buscar"
                    aria-label="Buscar correos"
                    autoComplete="off"
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
    const [searchActive, setSearchActive] = useState(false);
    const [searchResetKey, setSearchResetKey] = useState(0);

    const pulsedActionRef = useRef(false);
    const actionTimerRef = useRef(null);
    const appliedSearchRef = useRef("");

    const [selectedEmailIds, setSelectedEmailIds] = useState(
        () => new Set()
    );

    const lastSelectedIndexRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [replyingEmail, setReplyingEmail] = useState(null);
    const [sendingReply, setSendingReply] = useState(false);

    const [replyDraftId, setReplyDraftId] = useState(null);

    const [
        creatingReplyDraft,
        setCreatingReplyDraft
    ] = useState(false);

    const [
        deletingReplyDraft,
        setDeletingReplyDraft
    ] = useState(false);

    const [
        loadingReplyDraft,
        setLoadingReplyDraft
    ] = useState(false);

    const [
        replyDraftMessage,
        setReplyDraftMessage
    ] = useState("");

    const [
        emailReplies,
        setEmailReplies
    ] = useState([]);

    const [
        replyDraftSaveStatus,
        setReplyDraftSaveStatus
    ] = useState("saved");

    const replyDraftSaveTimerRef =
        useRef(null);

    const replyDraftSaveVersionRef =
        useRef(0);

    const replyDraftSaveChainRef =
        useRef(Promise.resolve());

    const handleReplyEmail = useCallback(
        async email => {
            if (
                !email?._id ||
                replyingEmail ||
                creatingReplyDraft ||
                loadingReplyDraft
            ) {
                return;
            }

            setCreatingReplyDraft(true);

            try {
                const now = new Date().toISOString();

                const recipient = String(
                    email.from ||
                    email.emisor ||
                    ""
                ).trim();

                const originalSubject =
                    email.subject ||
                    email.asunto ||
                    "";

                const draftData = {
                    email_id: email._id,
                    status: "draft",
                    recipient,
                    subject: buildReplySubject(
                        originalSubject
                    ),
                    message: "",
                    created_at: now,
                    updated_at: now,
                    created_by: username || ""
                };

                const createResult = await create(
                    EMAIL_REPLY_COLLECTION,
                    draftData
                );

                const createdDraftId =
                    typeof createResult === "string"
                        ? createResult
                        : createResult?._id;

                if (!createdDraftId) {
                    throw new Error(
                        "Cloudflow no devolvió el ID del borrador"
                    );
                }

                clearTimeout(
                    replyDraftSaveTimerRef.current
                );

                replyDraftSaveVersionRef.current += 1;

                setReplyDraftId(createdDraftId);
                setReplyDraftMessage("");
                setReplyDraftSaveStatus("saved");
                setReplyingEmail(email);

                setEmailReplies(currentReplies => [
                    {
                        _id: createdDraftId,
                        ...draftData
                    },
                    ...currentReplies.filter(
                        reply =>
                            reply._id !== createdDraftId
                    )
                ]);

                console.log(
                    "Borrador EmailReply creado:",
                    createdDraftId
                );
            } catch (error) {
                console.error(
                    "No se pudo crear el borrador:",
                    error
                );

                setReplyDraftId(null);
                setReplyingEmail(null);
                setReplyDraftMessage("");
                setReplyDraftSaveStatus("saved");
            } finally {
                setCreatingReplyDraft(false);
            }
        },
        [
            replyingEmail,
            creatingReplyDraft,
            loadingReplyDraft,
            username
        ]
    );

    const handleCancelReply = useCallback(
        async () => {
            if (
                sendingReply ||
                creatingReplyDraft ||
                deletingReplyDraft
            ) {
                return;
            }

            if (!replyDraftId) {
                setReplyingEmail(null);
                return;
            }

            const draftId = replyDraftId;

            clearTimeout(
                replyDraftSaveTimerRef.current
            );

            replyDraftSaveVersionRef.current += 1;
            setDeletingReplyDraft(true);

            try {
                await replyDraftSaveChainRef.current
                    .catch(() => undefined);

                await delete_multiple(
                    EMAIL_REPLY_COLLECTION,
                    [draftId]
                );

                setEmailReplies(currentReplies =>
                    currentReplies.filter(
                        reply =>
                            reply._id !== draftId
                    )
                );

                setReplyDraftId(null);
                setReplyDraftMessage("");
                setReplyDraftSaveStatus("saved");
                setReplyingEmail(null);

                console.log(
                    "Borrador EmailReply eliminado:",
                    draftId
                );
            } catch (error) {
                console.error(
                    "No se pudo eliminar el borrador:",
                    error
                );
            } finally {
                setDeletingReplyDraft(false);
            }
        },
        [
            replyDraftId,
            sendingReply,
            creatingReplyDraft,
            deletingReplyDraft
        ]
    );

    const handleReplyDraftMessageChange =
        useCallback(
            nextMessage => {
                const normalizedMessage =
                    String(nextMessage ?? "");

                setReplyDraftMessage(
                    normalizedMessage
                );

                if (replyDraftId) {
                    setEmailReplies(currentReplies =>
                        currentReplies.map(reply =>
                            reply._id === replyDraftId
                                ? {
                                    ...reply,
                                    message:
                                        normalizedMessage
                                }
                                : reply
                        )
                    );
                }

                clearTimeout(
                    replyDraftSaveTimerRef.current
                );

                if (!replyDraftId) {
                    return;
                }

                const draftId = replyDraftId;

                const saveVersion =
                    ++replyDraftSaveVersionRef.current;

                setReplyDraftSaveStatus(
                    "pending"
                );

                replyDraftSaveTimerRef.current =
                    window.setTimeout(() => {
                        if (
                            saveVersion ===
                            replyDraftSaveVersionRef.current
                        ) {
                            setReplyDraftSaveStatus(
                                "saving"
                            );
                        }

                        const updatedAt =
                            new Date().toISOString();

                        const saveRequest =
                            replyDraftSaveChainRef.current
                                .catch(() => undefined)
                                .then(() =>
                                    set_keys(
                                        EMAIL_REPLY_COLLECTION,
                                        draftId,
                                        {
                                            message:
                                                normalizedMessage,
                                            updated_at:
                                                updatedAt
                                        }
                                    )
                                );

                        replyDraftSaveChainRef.current =
                            saveRequest;

                        saveRequest
                            .then(() => {
                                if (
                                    saveVersion ===
                                    replyDraftSaveVersionRef.current
                                ) {
                                    setReplyDraftSaveStatus(
                                        "saved"
                                    );
                                }
                            })
                            .catch(error => {
                                console.error(
                                    "No se pudo guardar el borrador:",
                                    error
                                );

                                if (
                                    saveVersion ===
                                    replyDraftSaveVersionRef.current
                                ) {
                                    setReplyDraftSaveStatus(
                                        "error"
                                    );
                                }
                            });
                    }, 800);
            },
            [replyDraftId]
        );

    const requestRef = useRef(0);
    const activeFilter = useRef(stored || "entrada");

    const [mailboxCounts, setMailboxCounts] = useState({
        entrada: null,
        asignado: null,
        misAsignados: null,
        archivado: null,
        parado: null,
        papelera: null
    });

    const fetchMailboxCounts = async () => {
        const filters = [
            "entrada",
            "asignado",
            "misAsignados",
            "archivado",
            "parado",
            "papelera"
        ];

        try {
            const entries = await Promise.all(
                filters.map(async filter => {
                    const response = await countCustomObjects(
                        collection,
                        getMailboxQuery(filter)
                    );

                    /*
                     * Según cómo responda postDataCloud,
                     * count puede ser directamente un número
                     * o venir dentro de un objeto.
                     */
                    const total =
                        typeof response === "number"
                            ? response
                            : response?.count ?? 0;

                    return [filter, total];
                })
            );

            setMailboxCounts(
                Object.fromEntries(entries)
            );
        } catch (error) {
            console.error(
                "Error obteniendo contadores:",
                error
            );
        }
    };

    const formatMailboxCount = value => {
        if (value === null) {
            return "…";
        }

        return value > 100
            ? "+100"
            : value;
    };

    /* =========================
       FETCH JACKETS
    ========================= */
    const fetchEmails = async (isInitial = false) => {
        const requestId = ++requestRef.current;
        let order_by = ["_id", "descending"];
        const query = setQuery();
        const fields = [];
        const page = 1;
        const limit = 101;

        if (activeFilter.current === "misAsignados") {
            order_by = ["_id", "ascending"];
        }

        try {
            const res = await list_with_options(
                collection,
                query,
                order_by,
                fields,
                page,
                limit
            );

            if (requestId !== requestRef.current) return;

            const results = res?.results || [];
            setEmailList(results)
            setLoading(false);
            setInitialLoading(false);

        } catch (err) {
            console.error("fetch error:", err);
        }
    };

    const getMailboxQuery = filter => {

        switch (filter) {
            case "entrada":
                return [
                    "buzon",
                    "is like",
                    "Bandeja de Entrada"
                ];

            case "asignado":
                return [
                    "buzon",
                    "begins like",
                    "Asignado "
                ];

            case "misAsignados":
                return [
                    "buzon",
                    "is like",
                    `Asignado ${username}`
                ];

            case "archivado":
                return [
                    "buzon",
                    "is like",
                    "Archivado"
                ];

            case "parado":
                return [
                    "buzon",
                    "is like",
                    "Parado"
                ];

            case "papelera":
                return [
                    "buzon",
                    "is like",
                    "papelera"
                ];

            default:
                return [];
        }
    };

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

    const selectedEmailId = getEmailId(selectedEmail);

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
        const searchValue =
            appliedSearchRef.current.trim();

        /*
         * Si hay búsqueda, buscamos en todos los buzones.
         */
        if (searchValue) {
            const normalizedDate =
                normalizeDateSearch(searchValue);

            return [
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
        }

        /*
         * Si no hay búsqueda, mostramos únicamente
         * el buzón seleccionado.
         */
        if (!activeFilter.current) {
            return [];
        }

        return getMailboxQuery(
            activeFilter.current
        );
    };

    /* =========================
       FILTERS
    ========================= */
    const handleFilterChange = async key => {
        /*
         * Primero cambiamos el buzón.
         */
        activeFilter.current = key;
        saveState(key);

        /*
         * Después anulamos la búsqueda.
         */
        appliedSearchRef.current = "";
        setSearchActive(false);

        /*
         * Reinicia visualmente el input y cancela
         * cualquier debounce que estuviera pendiente.
         */
        setSearchResetKey(current =>
            current + 1
        );

        clearSelection();
        setLoading(true);

        await fetchEmails(true);
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
                newBuzon = "Bandeja de Entrada";
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

            await Promise.all([
                fetchEmails(),
                fetchMailboxCounts()
            ]);

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

    const releaseActionLock = useCallback(() => {
        clearTimeout(actionTimerRef.current);
        actionTimerRef.current = null;

        pulsedActionRef.current = false;
        setPulsedAction(false);
    }, []);

    const startActionLock = useCallback(
        (autoReleaseMs = 2500) => {
            if (pulsedActionRef.current) {
                return false;
            }

            pulsedActionRef.current = true;
            setPulsedAction(true);

            clearTimeout(actionTimerRef.current);
            actionTimerRef.current = null;

            /*
             * Para acciones inmediatas, como abrir carpeta,
             * liberamos automáticamente tras 2,5 segundos.
             *
             * Si recibimos 0, el bloqueo deberá liberarse
             * manualmente cuando termine la acción asíncrona.
             */
            if (autoReleaseMs > 0) {
                actionTimerRef.current = setTimeout(() => {
                    releaseActionLock();
                }, autoReleaseMs);
            }

            return true;
        },
        [releaseActionLock]
    );

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
        const normalizedValue =
            String(value || "").trim();

        /*
         * Evitamos repetir exactamente
         * la misma consulta.
         */
        if (
            normalizedValue ===
            appliedSearchRef.current
        ) {
            return;
        }

        appliedSearchRef.current =
            normalizedValue;

        setSearchActive(
            Boolean(normalizedValue)
        );

        clearSelection();
        setLoading(true);

        await fetchEmails(true);
    };

    const extractEmlAttachments = useCallback(
        async file => {
            if (!file) {
                console.warn(
                    "No se ha indicado ningún archivo EML"
                );

                return [];
            }

            /*
             * Pasamos 0 para que no se libere automáticamente.
             * El bloqueo continuará hasta llegar al finally.
             */
            if (!startActionLock(0)) {
                return [];
            }

            try {
                const result = await postData(
                    "email/attachments",
                    {
                        file
                    }
                );

                if (result.status !== "success") {
                    console.error(
                        "No se pudieron extraer los adjuntos:",
                        result.message
                    );

                    return [];
                }

                console.log(
                    "Adjuntos guardados:",
                    result.attachments
                );

                return result.attachments || [];
            } catch (error) {
                console.error(
                    "Error solicitando los adjuntos:",
                    error
                );

                return [];
            } finally {
                /*
                 * Se ejecuta tanto si funciona como si falla.
                 */
                releaseActionLock();
            }
        },
        [
            startActionLock,
            releaseActionLock
        ]
    );

    const handleSendReply = useCallback(
        async ({
            email,
            recipient,
            subject,
            message
        }) => {
            if (
                sendingReply ||
                !replyDraftId
            ) {
                return;
            }

            const draftId = replyDraftId;
            const processingAt =
                new Date().toISOString();

            setSendingReply(true);

            clearTimeout(
                replyDraftSaveTimerRef.current
            );

            replyDraftSaveVersionRef.current += 1;

            try {
                await replyDraftSaveChainRef.current
                    .catch(() => undefined);

                /*
                 * Marcamos el registro como processing antes
                 * de iniciar el whitepaper. Así Cloudflow puede
                 * cambiarlo después a sent sin que React vuelva
                 * a sobrescribir ese estado.
                 */
                await set_keys(
                    EMAIL_REPLY_COLLECTION,
                    draftId,
                    {
                        recipient:
                            String(recipient || ""),
                        subject:
                            String(subject || ""),
                        message:
                            String(message || ""),
                        status: "processing",
                        processing_at: processingAt,
                        updated_at: processingAt,
                        error_message: ""
                    }
                );

                setEmailReplies(currentReplies =>
                    currentReplies.map(reply =>
                        reply._id === draftId
                            ? {
                                ...reply,
                                recipient:
                                    String(recipient || ""),
                                subject:
                                    String(subject || ""),
                                message:
                                    String(message || ""),
                                status: "processing",
                                processing_at:
                                    processingAt,
                                updated_at:
                                    processingAt,
                                error_message: ""
                            }
                            : reply
                    )
                );

                const options = {
                    variables: {
                        reply_id: draftId,
                        email_id: email._id,
                        id_pedido:
                            email.id_pedido || "",
                        asunto:
                            subject || "",
                        responder:
                            email.file_email ||
                            email._id,
                        contacto:
                            recipient || "",
                        mensaje:
                            message || "",
                        created_by:
                            username || ""
                    },
                    files: []
                };

                const result =
                    await start_from_whitepaper_with_options(
                        "Funciones_Genericas",
                        "start_email_reply",
                        options
                    );

                console.log(
                    "Resultado completo start_email_reply:",
                    JSON.stringify(result, null, 2)
                );

                const cloudflowMessages =
                    Array.isArray(result?.messages)
                        ? result.messages
                            .map(item =>
                                item?.description ||
                                item?.message ||
                                item?.error ||
                                JSON.stringify(item)
                            )
                            .filter(Boolean)
                            .join(" | ")
                        : "";

                const cloudflowError =
                    cloudflowMessages ||
                    result?.message ||
                    result?.error ||
                    result?.error_code ||
                    "";

                if (
                    result?.error ||
                    result?.error_code ||
                    result?.status === "error"
                ) {
                    throw new Error(
                        cloudflowError ||
                        "No se pudo iniciar el flujo"
                    );
                }

                /*
                 * El editor se cierra, pero emailReplies conserva
                 * el registro como processing. El polling lo
                 * actualizará a sent cuando Cloudflow termine.
                 */
                setReplyDraftId(null);
                setReplyDraftMessage("");
                setReplyDraftSaveStatus("saved");
                setReplyingEmail(null);
            } catch (error) {
                console.error(
                    "No se pudo iniciar la respuesta:",
                    error
                );

                const failedAt =
                    new Date().toISOString();

                /*
                 * Si no se pudo arrancar el whitepaper, el contenido
                 * sigue siendo un borrador editable para reintentar.
                 */
                try {
                    await set_keys(
                        EMAIL_REPLY_COLLECTION,
                        draftId,
                        {
                            status: "draft",
                            updated_at: failedAt,
                            error_message:
                                error?.message ||
                                String(error)
                        }
                    );
                } catch (registerError) {
                    console.error(
                        "No se pudo restaurar el borrador:",
                        registerError
                    );
                }

                setEmailReplies(currentReplies =>
                    currentReplies.map(reply =>
                        reply._id === draftId
                            ? {
                                ...reply,
                                status: "draft",
                                updated_at: failedAt,
                                error_message:
                                    error?.message ||
                                    String(error)
                            }
                            : reply
                    )
                );

                setReplyDraftId(draftId);
                setReplyDraftSaveStatus("error");
                setReplyingEmail(email);
            } finally {
                setSendingReply(false);
            }
        },
        [
            sendingReply,
            replyDraftId,
            username
        ]
    );

    /* =========================
       PAGE LIFECYCLE / POLLING
    ========================= */
    useEffect(() => {
        let disposed = false;

        const refreshEmails = async isInitial => {
            if (disposed) {
                return;
            }

            await fetchEmails(isInitial);
        };

        refreshEmails(true);
        fetchMailboxCounts();

        const emailIntervalId =
            window.setInterval(
                () => {
                    refreshEmails(false);
                },
                8500
            );

        const mailboxIntervalId =
            window.setInterval(
                () => {
                    fetchMailboxCounts();
                },
                30000
            );

        return () => {
            disposed = true;

            window.clearInterval(
                emailIntervalId
            );

            window.clearInterval(
                mailboxIntervalId
            );

            clearTimeout(
                actionTimerRef.current
            );

            clearTimeout(
                replyDraftSaveTimerRef.current
            );
        };
    }, []);

    /* =========================
       EMAIL REPLIES
    ========================= */
    useEffect(() => {
        let cancelled = false;
        let requestInFlight = false;

        /*
         * Al cambiar de correo retiramos inmediatamente
         * la información perteneciente al anterior.
         */
        setEmailReplies([]);
        setReplyingEmail(null);
        setReplyDraftId(null);
        setReplyDraftMessage("");
        setReplyDraftSaveStatus("saved");

        if (
            !selectedEmailId ||
            !selectedEmail
        ) {
            setLoadingReplyDraft(false);
            return undefined;
        }

        setLoadingReplyDraft(true);

        const loadEmailReplies = async ({
            initial = false
        } = {}) => {
            if (
                cancelled ||
                requestInFlight
            ) {
                return;
            }

            requestInFlight = true;

            try {
                const response =
                    await list_with_options(
                        EMAIL_REPLY_COLLECTION,
                        [
                            "email_id",
                            "is like",
                            selectedEmailId
                        ],
                        [
                            "created_at",
                            "ascending"
                        ],
                        [],
                        1,
                        100
                    );

                if (cancelled) {
                    return;
                }

                const replies =
                    Array.isArray(response?.results)
                        ? response.results
                        : [];

                setEmailReplies(replies);

                const existingDraft =
                    replies.find(
                        reply =>
                            reply.status === "draft"
                    ) || null;

                if (existingDraft?._id) {
                    /*
                     * Solo hidratamos el texto al abrir un borrador
                     * distinto. El polling no debe sobrescribir lo
                     * que el usuario está escribiendo.
                     */
                    setReplyDraftId(currentDraftId => {
                        if (
                            currentDraftId !==
                            existingDraft._id
                        ) {
                            setReplyDraftMessage(
                                String(
                                    existingDraft.message ||
                                    ""
                                )
                            );

                            setReplyDraftSaveStatus(
                                "saved"
                            );
                        }

                        return existingDraft._id;
                    });

                    setReplyingEmail(
                        currentEmail =>
                            getEmailId(currentEmail) ===
                            selectedEmailId
                                ? currentEmail
                                : selectedEmail
                    );
                } else {
                    setReplyDraftId(null);
                    setReplyDraftMessage("");
                    setReplyDraftSaveStatus("saved");
                    setReplyingEmail(null);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error(
                        "No se pudieron cargar las respuestas:",
                        error
                    );
                }
            } finally {
                requestInFlight = false;

                if (
                    initial &&
                    !cancelled
                ) {
                    setLoadingReplyDraft(false);
                }
            }
        };

        loadEmailReplies({
            initial: true
        });

        const repliesIntervalId =
            window.setInterval(
                () => {
                    loadEmailReplies();
                },
                3000
            );

        return () => {
            cancelled = true;

            window.clearInterval(
                repliesIntervalId
            );
        };
    }, [selectedEmailId]);

    /* =========================
       RENDER
    ========================= */

    const title = `GESTOR DE CORREO - ${setFilterName(activeFilter.current)}`;
    const actionEntrada = activeFilter.current !== "entrada";
    const actionAsignar = activeFilter.current === "entrada" || activeFilter.current === "misAsignados";
    const actionArchivar = activeFilter.current === "entrada" || activeFilter.current === "misAsignados";
    const actionParar = activeFilter.current === "entrada" || activeFilter.current === "misAsignados";
    const actionEliminar = activeFilter.current === "entrada" || activeFilter.current === "misAsignados";

    const shouldShowMailboxCount = value => {
        return typeof value === "number" && value > 1;
    };

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
                    <div
                        className={`filtersButton ${activeFilter.current === "entrada" ? "clicked" : ""
                            }`}
                        onClick={() => handleFilterChange("entrada")}
                    >
                        <MdInbox />
                        Bandeja de Entrada

                        {shouldShowMailboxCount(mailboxCounts.entrada) && (
                            <span className="mailboxCount">
                                {formatMailboxCount(mailboxCounts.entrada)}
                            </span>
                        )}
                    </div>

                    <div
                        className={`filtersButton ${activeFilter.current === "asignado" ? "clicked" : ""
                            }`}
                        onClick={() => handleFilterChange("asignado")}
                    >
                        <MdAssignmentInd />
                        Asignados

                        {shouldShowMailboxCount(mailboxCounts.asignado) && (
                            <span className="mailboxCount">
                                {formatMailboxCount(mailboxCounts.asignado)}
                            </span>
                        )}
                    </div>

                    <div
                        className={`filtersButton ${activeFilter.current === "misAsignados" ? "clicked" : ""
                            }`}
                        onClick={() => handleFilterChange("misAsignados")}
                    >
                        <MdPersonPin />
                        Mis Asignados

                        {shouldShowMailboxCount(mailboxCounts.misAsignados) && (
                            <span className="mailboxCount">
                                {formatMailboxCount(mailboxCounts.misAsignados)}
                            </span>
                        )}
                    </div>

                    <div
                        className={`filtersButton ${activeFilter.current === "archivado" ? "clicked" : ""
                            }`}
                        onClick={() => handleFilterChange("archivado")}
                    >
                        <MdArchive />
                        Archivados

                        {shouldShowMailboxCount(mailboxCounts.archivado) && (
                            <span className="mailboxCount">
                                {formatMailboxCount(mailboxCounts.archivado)}
                            </span>
                        )}
                    </div>

                    <div
                        className={`filtersButton ${activeFilter.current === "parado" ? "clicked" : ""
                            }`}
                        onClick={() => handleFilterChange("parado")}
                    >
                        <MdPauseCircle />
                        Parados

                        {shouldShowMailboxCount(mailboxCounts.parado) && (
                            <span className="mailboxCount">
                                {formatMailboxCount(mailboxCounts.parado)}
                            </span>
                        )}
                    </div>

                    <div
                        className={`filtersButton ${activeFilter.current === "papelera" ? "clicked" : ""
                            }`}
                        onClick={() => handleFilterChange("papelera")}
                    >
                        <MdDelete />
                        Papelera

                        {shouldShowMailboxCount(mailboxCounts.papelera) && (
                            <span className="mailboxCount">
                                {formatMailboxCount(mailboxCounts.papelera)}
                            </span>
                        )}
                    </div>

                    <EmailSearchBar
                        key={searchResetKey}
                        onSearch={handleSearch}
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
                                                extractEmlAttachments(selectedEmails[0].file_email);
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
                                            showAssignedUser={
                                                !searchActive &&
                                                activeFilter.current === "asignado"
                                            }
                                            showMailbox={searchActive}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        <div className="emailDetailList">
                            {selectedCount <= 1 ? (
                                <DetailEmailComponent
                                    email={selectedEmail}
                                    emailReplies={emailReplies}

                                    onReferenceTagsChange={
                                        handleReferenceTagsChange
                                    }

                                    onReply={handleReplyEmail}
                                    replyingEmail={replyingEmail}

                                    replyDraftId={replyDraftId}
                                    replyDraftMessage={replyDraftMessage}

                                    replyDraftSaveStatus={
                                        replyDraftSaveStatus
                                    }

                                    onReplyDraftMessageChange={
                                        handleReplyDraftMessageChange
                                    }

                                    sendingReply={sendingReply}
                                    loadingReplyDraft={loadingReplyDraft}

                                    onCancelReply={handleCancelReply}
                                    onSendReply={handleSendReply}
                                />
                            ) : (
                                <div className="emailDetail">
                                    <div className="multipleEmailSelection">
                                        <strong>
                                            {selectedCount} correos seleccionados
                                        </strong>

                                        <span>
                                            Utiliza las acciones disponibles
                                            sobre la lista.
                                        </span>
                                    </div>
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
