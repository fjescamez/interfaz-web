import "../components/TableComponent.css";
import ArrowDownSvg from "../assets/svg/ArrowDownSvg";
import EditTable from "./EditTable";
import AllForms from "./formComponents/AllForms";
import DeleteForm from "./formComponents/DeleteForm";
import PdfAsImage from "../components/pedidoComponents/PdfAsImage";
import { useLocation, useNavigate } from "react-router-dom";
import { toggleModal } from "../helpers/toggleModal";
import { HiViewColumns } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useTabs } from "../context/TabsContext";
import { HiOutlineRefresh } from "react-icons/hi";
import { useSession } from "../context/SessionContext";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { getUserPreferences } from "../helpers/userPreferences";
import { useClienteFilter } from "../context/ClientFilterContext";
import { normalizeData } from "../helpers/normalizeData";
import { fetchData } from "../helpers/fetchData";
import { ThreeDot } from "react-loading-indicators";
import { notify } from "../helpers/notify";
import { toast } from "react-toastify";
import { MdLockOpen, MdLockOutline } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import useSocket from "../helpers/useSocket";

function Table({
    normalizedData,
    dinamicTableInfo,
    specificHeaderTitle,
    clientFilter,
    userFilter,
    actions,
    checkedRows,
    setCheckedRows,
    alwaysVisibleActions,
    orderFilter,
    setPopUpTable,
    currentVersion,
    initialData,
    publicForm,
    tdGrandes,
    tabTitleTemplate,
    specificPath,
    openRows,
    noActionRows,
    customTable,
    noRefreshTable,
    extraLogic,
    extraStyles
}) {
    const urlApi = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const socket = useSocket();
    const [checkedIndexes, setCheckedIndexes] = useState([]);
    const [orderBy, setOrderBy] = useState("");
    const [tableData, setTableData] = useState(initialData || []);
    const [modal, setModal] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [actionEnded, setActionEnded] = useState(true);
    const { tabs, setTabs } = useTabs();
    const actualTab = (tabs.find(tab => tab.path === location.pathname));
    const [search, setSearch] = useState(orderFilter ? orderFilter : "");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const navigate = useNavigate();
    const { clienteCodigos, clienteDatos } = useClienteFilter();
    const clienteCodigo = clienteCodigos[location.pathname] || null;
    const clienteDato = clienteDatos[location.pathname] || null;
    const [tableInfo, setTableInfo] = useState(dinamicTableInfo);
    const { headerIcon, headerTitle, tableColumns, tableName, endPoint, tableForm, rolesActions } = tableInfo;
    const tableActions = tableInfo.actions || [];
    const [editTable, setEditTable] = useState(false);
    const [advancedFilters, setAdvancedFilters] = useState(false);
    const [advancedQuery, setAdvancedQuery] = useState({});
    const { session } = useSession();
    const isAdmin = session?.role === "Administrador" || session?.role === "Soporte";
    const [showChecks, setShowChecks] = useState(tableActions.length > 0 && tableActions.some(action => !action.noCheck) && (rolesActions ? rolesActions.includes(session?.role) : true));
    const [tableCharging, setTableCharging] = useState(!initialData ? true : false);
    const [noDataToShow, setNoDataToShow] = useState(false);
    const [copyMenu, setCopyMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        value: ""
    });

    const getData = async (page, searchValue = "", clientFilter = "") => {        
        const result = await fetchData(endPoint, searchValue, page, setTableData, setTotal, clientFilter, userFilter);
        setTableCharging(false);
        if (result && result.length < 1 && (!tableInfo.actions?.some(item => alwaysVisibleActions?.includes(item.action)))) {
            setNoDataToShow(true);
        } else {
            setNoDataToShow(false);
        }
    }

    useEffect(() => {
        if (!session) {
            navigate("/login");
            return;
        }

        if (actualTab && actualTab.advancedQuery) {
            setAdvancedFilters(true);
            setAdvancedQuery(actualTab.advancedQuery);
        } else if (actualTab && actualTab.search) {
            setDebouncedSearch(actualTab.search);
            setSearch(actualTab.search);
        }

        extraLogic && extraLogic();
    }, []);

    useEffect(() => {
        if (advancedQuery && Object.keys(advancedQuery).length > 0) {
            setTabs((prevTabs) =>
                prevTabs.map((tab) => {
                    if (tab.path === location.pathname) {
                        return { ...tab, advancedQuery };
                    }
                    return tab;
                })
            );
        } else {
            // Si advancedQuery está vacío, elimínalo de la pestaña actual
            setTabs((prevTabs) =>
                prevTabs.map((tab) => {
                    if (tab.path === location.pathname) {
                        const { advancedQuery, ...rest } = tab; // Elimina advancedQuery
                        return rest;
                    }
                    return tab;
                })
            );
        }

        if (search.length > 0) {
            setTabs((prevTabs) =>
                prevTabs.map((tab) => {
                    if (tab.path === location.pathname) {
                        return { ...tab, search };
                    }
                    return tab;
                })
            );
        } else {
            setTabs((prevTabs) =>
                prevTabs.map((tab) => {
                    if (tab.path === location.pathname) {
                        const { search, ...rest } = tab; // Elimina search
                        return rest;
                    }
                    return tab;
                })
            );
        }
    }, [advancedQuery, search, setTabs, location.pathname]);

    useEffect(() => {
        if (Object.keys(advancedQuery || {}).length > 0) {
            setTabs((prevTabs) =>
                prevTabs.map((tab) => {
                    if (tab.path === location.pathname) {
                        return { ...tab, advancedQuery };
                    }
                    return tab;
                })
            );
        } else {
            setTabs((prevTabs) =>
                prevTabs.map((tab) => {
                    if (tab.path === location.pathname) {
                        const { advancedQuery, ...rest } = tab; // Elimina advancedQuery
                        return rest;
                    }
                    return tab;
                })
            );

            if (search.length > 0) {
                setTabs((prevTabs) =>
                    prevTabs.map((tab) => {
                        if (tab.path === location.pathname) {
                            return { ...tab, search };
                        }
                        return tab;
                    })
                );
            } else {
                setTabs((prevTabs) =>
                    prevTabs.map((tab) => {
                        if (tab.path === location.pathname) {
                            const { search, ...rest } = tab; // Elimina search
                            return rest;
                        }
                        return tab;
                    })
                );
            }
        }
    }, [search, advancedQuery]);

    useEffect(() => {
        setPage(1);
    }, [location]);

    useEffect(() => {
        if (clientFilter) {
            getData(1, "", clientFilter);
        }
    }, [clientFilter]);

    useEffect(() => {
        if (!socket) return;

        // Escuchar nuevos registros
        socket.on('nuevo_registro', (nuevo_registro) => {
            if (nuevo_registro.tableName.includes(tableName)) {
                setTableData(prev => [nuevo_registro, ...prev]);
            }
        });

        return () => {
            socket.off('nuevo_registro'); // limpiar listener
        };
    }, [socket]);

    useEffect(() => {
        if (
            dinamicTableInfo.endPoint !== endPoint ||
            dinamicTableInfo.headerTitle !== headerTitle ||
            dinamicTableInfo.actions !== tableActions
        ) {
            setTableInfo(dinamicTableInfo);

            // Reaplicar las preferencias de usuario al actualizar tableInfo
            if (session) {
                getUserPreferences(session, dinamicTableInfo, setTableInfo);
            }
        }
    }, [dinamicTableInfo, session]);

    useEffect(() => {
        const tablasPlanchas = ["planchas", "planchasPreproduccion", "planchasProduccion", "planchasFinalizadas", "externosFinalizados", "externosAnulados"];
        if (tableInfo?.endPoint && tablasPlanchas.includes(tableName)) {
            setTableCharging(true);
            getData(1, search);
        }
    }, [tableInfo]);

    useEffect(() => {
        if (!initialData && session) {
            getUserPreferences(session, tableInfo, setTableInfo);
        } else if (initialData) {
            setTableData(initialData);
        }
    }, [initialData]);

    useEffect(() => {        
        if (advancedQuery !== null) {
            const searchParams = new URLSearchParams(advancedQuery).toString();            

            if (searchParams !== "") {
                getData(page, searchParams, clienteCodigo || clientFilter);
            } else {
                if (!initialData) {
                    getData(page, search, clienteCodigo || clientFilter);
                }
            }
        }
    }, [advancedQuery]);

    // Normalizar los datos una vez setteados
    useEffect(() => {
        if (normalizedData && tableData.length > 0) {
            const normalized = normalizeData(tableData, tableColumns);

            // solo actualiza si hay diferencia real
            if (JSON.stringify(normalized) !== JSON.stringify(tableData)) {
                setTableData(normalized);
            }
        }
    }, [tableData, tableColumns]);

    useEffect(() => {
        if (clientFilter && tableName !== "trabajosExternos") {
            getData(page, "", clienteCodigo);
        }
    }, [clienteCodigo]);

    useEffect(() => {
        let searchParams = search;
        const advancedFilters = new URLSearchParams(advancedQuery).toString();

        if (advancedFilters !== "") {
            searchParams = advancedFilters;
        }

        if (page > 1) {
            if (!clientFilter) {
                getData(page, searchParams);
            } else {
                getData(page, searchParams, clienteCodigo || clientFilter);
            }
        }
    }, [page]);

    const handleClick = (data, index) => {
        if (openRows) {
            return actions({ action: "openRow", data, index });
        } else if (noActionRows) {
            return;
        }

        const { _id, id, id_plancha } = data;
        const tabTitle = tabTitleTemplate.replace(/\{(\w+)\}/g, (_, key) => data[key] || "");

        let path = `${specificPath || location.pathname}/${id_plancha || id || _id}`;

        // Solo agrega la pestaña si no existe
        if (!tabs.some(tab => tab.path === path)) { // Redundante
            setTabs(prev => {
                if (prev.some(tab => tab.path === path)) return prev; // Redundante
                return [...prev, { path, title: tabTitle.toUpperCase() }];
            });
        }

        if (setPopUpTable) {
            setPopUpTable(false);
        }
        navigate(path, { state: { data } });
        return;
    }

    const handleFilters = (e) => {
        const { name, value } = e.target;

        setAdvancedQuery(prev => {
            const newState = { ...prev };

            if (value.trim() === "") {
                delete newState[name];
            } else {
                newState[name] = value;
            }

            return newState;
        });
    };

    const showMore = async () => {
        setAdvancedFilters(false);
        setPage(prevPage => prevPage + 1);
    }

    const changeOrderBy = (column) => {
        if (orderBy.column === column) {
            if (orderBy.direction === "desc") {
                setOrderBy({ column: null, direction: null });
            } else {
                setOrderBy({ column, direction: "desc" });
            }
        } else {
            setOrderBy({ column, direction: "asc" });
        }
    };

    const orderByColumn = () => {
        if (orderBy.column && orderBy.direction) {
            const sortedData = tableData.sort((a, b) => {
                let valueA = a[orderBy.column];
                let valueB = b[orderBy.column];

                // Si el nombre de la columna incluye "fecha", convertir a Date
                if (orderBy.column.toLowerCase().includes("fecha")) {
                    const parseDate = (dateStr) => {
                        if (dateStr.includes("-")) {
                            const [day, month, year] = dateStr.split("-").map(Number); // Para formato DD-MM-YYYY
                            return new Date(year, month - 1, day);
                        } else if (dateStr.includes("/")) {
                            const [day, month, year] = dateStr.split("/").map(Number); // Para formato DD/MM/YYYY
                            return new Date(year, month - 1, day);
                        }
                    };

                    valueA = parseDate(valueA);
                    valueB = parseDate(valueB);
                }

                if (valueA < valueB) return orderBy.direction === "asc" ? -1 : 1;
                if (valueA > valueB) return orderBy.direction === "asc" ? 1 : -1;
                return 0;
            });

            setTableData([...sortedData]);
        } else {
            if (!initialData) {
                let searchParams = search;
                const advancedFilters = new URLSearchParams(advancedQuery).toString();

                if (advancedFilters !== "") {
                    searchParams = advancedFilters;
                }

                getData(1, searchParams, clienteCodigo || clientFilter);
            } else {
                setTableData(initialData);
            }
        }
    }

    useEffect(() => {
        if (orderBy !== "") {
            orderByColumn();
        }
    }, [orderBy]);

    useEffect(() => {
        if (orderFilter) {
            setSearch(orderFilter ? orderFilter : "");
        }
    }, [orderFilter])

    // Debounce para la búsqueda
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 150); // Tiempo de espera
        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {
        if ((debouncedSearch.length >= 3 || debouncedSearch.length === 0) && !initialData) {
            setPage(1);
            getData(1, debouncedSearch, clienteCodigo || clientFilter);

            if (debouncedSearch.length === 0) {
                setTabs((prevTabs) =>
                    prevTabs.map((tab) => {
                        if (tab.path === location.pathname) {
                            const { search, ...rest } = tab; // Elimina search
                            return rest;
                        }
                        return tab;
                    })
                );
            }
        }
    }, [debouncedSearch]);

    const searchData = (e) => {
        setSearch(e.target.value);
    }

    const refreshTable = () => {
        setCheckedIndexes([]);
        setPage(1);
        let searchParams = search;
        const advancedFilters = new URLSearchParams(advancedQuery).toString();

        if (advancedFilters !== "") {
            searchParams = advancedFilters;
        }

        if (!clientFilter) {
            getData(1, searchParams);
        } else {
            getData(1, searchParams, clienteCodigo || clientFilter);
        }
    }

    const [checked, setChecked] = useState({});

    useEffect(() => {
        const initialState = tableColumns.reduce((acc, col) => {
            acc[col.key] = col.active;
            return acc;
        }, {});
        setChecked(initialState);
    }, [tableColumns]);

    const checkColumn = (key) => {
        const newChecked = {
            ...checked,
            [key]: !checked[key]
        };

        setChecked(newChecked);
    };

    const handleChecked = (id, index) => {
        setCheckedRows(prev => {
            if (checkedIndexes.includes(index)) {
                return prev.filter(e => e !== id);
            }
            return [...prev, id];
        });

        setCheckedIndexes(prev => {
            return prev.includes(index)
                ? prev.filter(e => e !== index)
                : [...prev, index];
        });
    };

    const checkAll = () => {
        setCheckedRows(prev => {
            const allChecked = tableData.every(row => prev.includes(row._id || row.id));
            if (allChecked) {
                return [];
            } else {
                return tableData.map(row => row._id || row.id);
            }
        });

        setCheckedIndexes(prev => {
            const allChecked = tableData.every((row, index) => prev.includes(index));
            if (allChecked) {
                return [];
            } else {
                return tableData.map((row, index) => index);
            }
        });
    };

    const handleRightClick = (variables) => {
        const { e, value, data } = variables;
        e.preventDefault();

        if (typeof value === "object") return;

        setCopyMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            value,
            data
        });
    };

    const handleOpenInNewTab = (data) => {
        const { _id, id, id_plancha } = data;
        const tabTitle = tabTitleTemplate.replace(/\{(\w+)\}/g, (_, key) => data[key] || "");

        let path = `${specificPath || location.pathname}/${id_plancha || id || _id}`;

        // Solo agrega la pestaña si no existe
        if (!tabs.some(tab => tab.path === path)) { // Redundante
            setTabs(prev => {
                if (prev.some(tab => tab.path === path)) return prev; // Redundante
                return [...prev, { path, title: tabTitle.toUpperCase() }];
            });
        }
    }

    const copyValue = () => {
        const tempInput = document.createElement("input");
        tempInput.value = copyMenu.value.toString();
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        setCopyMenu({ ...copyMenu, visible: false });
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (copyMenu.visible) setCopyMenu({ ...copyMenu, visible: false });
        };

        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, [copyMenu.visible]);

    const searchInputRef = useState(null);

    return (
        <>
            <div className="tableContainer">
                <div className="headerBackground">
                    <div className="tableHeader">
                        <div className="headerTitle">
                            {headerIcon}
                            <h1>{specificHeaderTitle ? specificHeaderTitle : headerTitle}</h1>
                        </div>
                        <div className="headerActions">
                            {/* {(tableInfo.actions && !tableChecks && (!tableInfo?.actions.every(action => action.hasOwnProperty('noCheck'))) && ((!rolesActions?.length || rolesActions?.includes(session?.role) || (!usersActions?.length || usersActions?.includes(session?.username))))) && (
                                showChecks
                                    ?
                                    <MdLockOpen className="tableLock" onClick={() => { setShowChecks(false); setCheckedRows([]); setCheckedIndexes([]) }} />
                                    :
                                    <MdLockOutline className="tableLock" onClick={() => { setShowChecks(true); setCheckedRows([]); setCheckedIndexes([]) }} />
                            )} */}
                            {!noRefreshTable && <HiOutlineRefresh className="tableRefresh" onClick={() => refreshTable()} />}
                            {(tableForm && (isAdmin || publicForm)) && (
                                <button onClick={() => setModal(true)}>
                                    <svg id="Layer_1" data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.5 27.5">
                                        <path className="cls-1"
                                            d="M13.75,0A13.75,13.75,0,1,0,27.5,13.75,13.77,13.77,0,0,0,13.75,0Zm0,24.42A10.68,10.68,0,1,1,24.42,13.75,10.69,10.69,0,0,1,13.75,24.42Z" />
                                        <polygon className="cls-1"
                                            points="20.16 12.21 20.16 15.29 15.29 15.29 15.29 20.15 12.21 20.15 12.21 15.29 7.35 15.29 7.35 12.21 12.21 12.21 12.21 7.35 15.29 7.35 15.29 12.21 20.16 12.21" />
                                    </svg>
                                </button>
                            )}
                            {(tableInfo.actions?.some(a => a.action === "eliminar") && showChecks)
                                &&
                                <BsTrash3Fill
                                    onClick={() => checkedRows.length > 0 && setDeletePopup(true)}
                                />
                            }
                            {(!customTable && !advancedFilters) && (
                                <div className="searchInput">
                                    <input
                                        type="text"
                                        id="search"
                                        placeholder="Buscar"
                                        onChange={searchData}
                                        value={search}
                                        autoFocus
                                        ref={(input) => (searchInputRef.current = input)} // Referencia para el input
                                    />
                                    <IoCloseCircleOutline
                                        className="resetSearch"
                                        onClick={() => {
                                            if (search.length > 0) {
                                                setPage(1);
                                                getData(1, "", clienteCodigo);
                                            }
                                            searchInputRef.current?.focus(); // Hacer focus en el input
                                            setSearch("");
                                        }}
                                    />
                                </div>
                            )}
                            {!customTable && (
                                <>
                                    <button
                                        className={`filtersButton ${advancedFilters ? "active" : ""}`}
                                        onClick={() => {
                                            setAdvancedFilters(prev => !prev);
                                            setAdvancedQuery({});
                                            setPage(1);
                                            setSearch("");
                                        }}
                                    >
                                        Filtros avanzados
                                    </button>
                                    <HiViewColumns className="tableEdit" onClick={() => toggleModal(setEditTable, editTable)} />
                                </>
                            )}
                            {editTable && <EditTable checked={checked} checkColumn={checkColumn} tableInfo={tableInfo} setEditTable={setEditTable} />}
                            {(customTable && setPopUpTable) && (
                                <button onClick={() => setPopUpTable(false)}>
                                    <IoMdCloseCircleOutline className="close" />
                                </button>
                            )}
                        </div>
                    </div>
                    {tableInfo.actions && (
                        (tableData.length > 0 || tableInfo.actions.some(item => alwaysVisibleActions?.includes(item.action))) &&
                        !(tableInfo.actions.length === 1 && tableInfo.actions[0].action === "eliminar") &&
                        !tableCharging &&
                        (!rolesActions?.length || rolesActions?.includes(session?.role)) && (
                            <div className="tableInfoActions">
                                {actionEnded
                                    ?
                                    tableInfo.actions
                                        .filter(action => tableData.length > 0 || alwaysVisibleActions?.includes(action.action))
                                        .map((action) =>
                                            (!action.hidden && action.action !== "eliminar") && (
                                                <p
                                                    key={action.action}
                                                    onClick={async () => {
                                                        if (!action.noCheck && checkedRows < 1) {
                                                            notify(toast.error, 'error', 'Error', 'Esta acción requiere selección')
                                                        } else {
                                                            setActionEnded(false);
                                                            const actionResult = await actions({
                                                                action: action.action,
                                                                title: action.title,
                                                                data: tableData,
                                                                setCheckedIndexes,
                                                                setActionEnded,
                                                                setTableData
                                                            });
                                                            if (actionResult && actionResult.status) {
                                                                if (actionResult.status !== "waiting") {
                                                                    setActionEnded(true);
                                                                    if (setCheckedRows) setCheckedRows([]);
                                                                    setCheckedIndexes([]);
                                                                }
                                                            }
                                                        }
                                                    }}
                                                    className="actionHover"
                                                >
                                                    {action.title}
                                                </p>
                                            ))
                                    :
                                    <p>Procesando acción <ThreeDot color="white" size="small" /></p>
                                }
                            </div>
                        )
                    )}
                    {noDataToShow && <div className="tableInfoActions"><p>No hay datos para mostrar</p></div>}
                    {tableCharging && <div className="tableInfoActions"><p>Cargando tabla <ThreeDot color="white" size="small" speedPlus={2} /></p></div>}
                    {(showChecks && !noDataToShow && !tableCharging) && (
                        <div className="checkedRows">
                            <p>Ítem/s seleccionado/s: {checkedRows.length}</p>
                            <p onClick={() => { setCheckedRows([]); setCheckedIndexes([]); }} className="reset">Resetear selección</p>
                        </div>
                    )}
                </div>
                <div className="tableScroll">
                    <table>
                        <thead>
                            <tr>
                                {showChecks && (
                                    <th className="checkElement"><input type="checkbox" className="check" onChange={checkAll} checked={checkedIndexes.length === tableData.length && checkedIndexes.length > 0} /></th>
                                )}
                                {tableColumns.map((column) => (
                                    checked[column.key] && <th key={column.key} className="thClickable" onClick={() => changeOrderBy(column.key)}>
                                        <div className="thContent">
                                            <p>{column.header != "Avatar" && column.header}</p>
                                            {orderBy.column === column.key ? (
                                                orderBy.direction === "asc" ? <TbTriangleFilled /> : <TbTriangleInvertedFilled />
                                            ) : null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {advancedFilters && (
                                <tr style={{ textAlign: "center" }}>
                                    {showChecks && <td></td>}
                                    {tableColumns.map((column) => (
                                        checked[column.key] && (
                                            <td key={column.key}>
                                                <input
                                                    type="text"
                                                    name={column.key}
                                                    value={advancedQuery[column.key] || ""}
                                                    onChange={handleFilters}
                                                />
                                            </td>
                                        )
                                    ))}
                                </tr>
                            )}
                            {tableData.map((data, index) => (
                                <tr
                                    key={data._id || index}
                                    onClick={() => handleClick(data, index)}
                                    className={data.xml ? (data.xml.numero.version === currentVersion ? "activeRow" : undefined) : undefined}
                                >
                                    {showChecks && (
                                        <td className="checkElement" onClick={(e) => { e.stopPropagation(); handleChecked(data._id || data.id, index); }}>
                                            <input
                                                type="checkbox"
                                                className="check"
                                                checked={checkedIndexes.includes(index)}
                                                readOnly
                                            />
                                        </td>
                                    )}
                                    {tableColumns.map((column) => {
                                        if (!checked[column.key]) return null;
                                        let value = data[column.key];
                                        if (Array.isArray(value)) value = value.join(" - ");
                                        /* Columna avatar en tabla usuarios */
                                        if (column.key === "avatar") {
                                            return (
                                                <td key={column.key} className="imgTd">
                                                    <img src={`${urlApi}/uploads/avatars/${value}`} alt="" />
                                                </td>
                                            );
                                        }
                                        /* Columna con checks */
                                        if (column.check) {
                                            return (
                                                <td key={column.key} className="checkTd">
                                                    <input type="checkbox" className="check" checked={column.checkedConditions?.includes(value)} readOnly />
                                                </td>
                                            );
                                        }
                                        /* Columna para previos */
                                        if (column.key === "archivo" || column.key === "unitario") {
                                            return (
                                                <td key={column.key} className="previo">
                                                    {value.includes(".pdf")
                                                        ?
                                                        <PdfAsImage url={value.replace("cloudflow://", "").replace("PEDIDOS_", "Pedidos ")} />
                                                        :
                                                        <img src="src/assets/img/sinUnitario.png" />}
                                                </td>
                                            );
                                        }
                                        const columnStyle = extraStyles?.find(style => style.key === column.key);
                                        const styleToApply = columnStyle && columnStyle.condition(value) ? columnStyle.styles : {};

                                        return (
                                            <td
                                                key={column.key}
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content={value}
                                                onContextMenu={(e) => handleRightClick({ e, value, data })}
                                                onMouseUp={(e) => {
                                                    if (e.button === 1) {
                                                        e.preventDefault();
                                                        handleOpenInNewTab(data);
                                                    }
                                                }}
                                                className={tdGrandes && tdGrandes.includes(column.key) ? "tdGrande" : ""}
                                                style={styleToApply}
                                            >
                                                {/* Comprobación para que no reviente con objetos vacíos */}
                                                {typeof value === 'object' ? " " : value}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {copyMenu.visible && (
                    <div
                        className="copyMenu"
                        style={{
                            position: "absolute",
                            top: copyMenu.y,
                            left: copyMenu.x,
                            backgroundColor: "white",
                            border: "2px solid var(--pantone431c)",
                            zIndex: 1000,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                        }}
                    >
                        <p
                            className="copyMenuItem"
                            onClick={() => handleOpenInNewTab(copyMenu.data)}
                        >
                            Abrir en nueva pestaña
                        </p>
                        <p
                            className="copyMenuItem"
                            onClick={copyValue}
                        >
                            Copiar: {copyMenu.value}
                        </p>
                    </div>
                )}
                <div className="tableFooter">
                    {tableData.length < total && (
                        <div className="showMore" onClick={showMore}>
                            <p>Mostrar más</p>
                            <ArrowDownSvg></ArrowDownSvg>
                        </div>
                    )}
                    <p className="items">{tableData.length} ítem/s de {total ? total : tableData.length}</p>
                </div>
                {modal && <AllForms
                    setModal={setModal}
                    modal={modal}
                    setTableData={setTableData}
                    setTotal={setTotal}
                    tableForm={tableForm}
                    clienteDato={clienteDato}
                />}
                <ReactTooltip id="my-tooltip" delayShow={300} />
            </div>
            {deletePopup &&
                <DeleteForm
                    setModal={setDeletePopup}
                    tableInfo={tableInfo}
                    id={""}
                    totalFilesToDelete={checkedRows.length}
                    filesToDelete={checkedRows}
                    data={tableData}
                    setData={setTableData}
                    setTotal={setTotal}
                    isActive={checkedRows}
                    setIsActive={setCheckedRows}
                    setActionEnded={setActionEnded}
                />
            }
        </>
    )
}

export default Table