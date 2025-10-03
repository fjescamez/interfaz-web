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
import { getUserPreferences } from "../helpers/userPreferences";
import { useClienteFilter } from "../context/ClientFilterContext";
import { normalizeData } from "../helpers/normalizeData";
import { fetchData } from "../helpers/fetchData";
import { ThreeDot } from "react-loading-indicators";
import { notify } from "../helpers/notify";
import { toast } from "react-toastify";
import { MdLockOpen, MdLockOutline } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";

function Table({
    normalizedData,
    dinamicTableInfo,
    clientFilter,
    actions,
    checkedRows,
    setCheckedRows,
    orderFilter,
    setPopUpTable,
    currentVersion
}) {
    const [tableData, setTableData] = useState([]);
    const [modal, setModal] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [actionEnded, setActionEnded] = useState(true);
    const [search, setSearch] = useState(orderFilter ? orderFilter : "");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const navigate = useNavigate();
    const location = useLocation();
    const { clienteCodigos, clienteDatos } = useClienteFilter();
    const clienteCodigo = clienteCodigos[location.pathname] || null;
    const clienteDato = clienteDatos[location.pathname] || null;
    const [tableInfo, setTableInfo] = useState(dinamicTableInfo);
    const { headerIcon, headerTitle, tableColumns, tableName, endPoint, tableForm, tableChecks } = tableInfo;
    const { tabs, setTabs } = useTabs();
    const [editTable, setEditTable] = useState(false);
    const [advancedFilters, setAdvancedFilters] = useState(false);
    const [advancedQuery, setAdvancedQuery] = useState({});
    const { session } = useSession();
    const isAdmin = session?.role === "Administrador";
    const customTables = ["versiones", "archivosLen", "fichas", "montaje", "plotter", "montajes", "rip", "infoGmg"];
    const [showChecks, setShowChecks] = useState(tableChecks ? tableChecks : false);
    const [tableCharging, setTableCharging] = useState(true);
    const [noDataToShow, setNodataToShow] = useState(false);
    const [copyMenu, setCopyMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        value: ""
    });

    const getData = async (page, searchValue = "", clientFilter = "") => {
        const result = await fetchData(endPoint, searchValue, page, setTableData, setTotal, clientFilter);
        setTableCharging(false);
        if (result.length < 1) {
            setNodataToShow(true);
        } else {
            setNodataToShow(false);
        }
    }

    useEffect(() => {
        setTableInfo(dinamicTableInfo);
    }, [dinamicTableInfo]);

    useEffect(() => {
        getUserPreferences(session, tableInfo, setTableInfo);
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(advancedQuery).toString();

        if (searchParams !== "") {
            getData(1, searchParams, clienteCodigo);
        } else {
            getData(1, search, clienteCodigo);
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
        if (clientFilter) {
            getData(page, "", clienteCodigo);
        }
    }, [clienteCodigo]);

    useEffect(() => {
        if (page > 1) {
            if (!clientFilter) {
                getData(page, search);
            } else {
                getData(page, search, clienteCodigo);
            }
        }
    }, [page]);

    const handleClick = (data) => {
        const openRowTables = ["montajes", "plotter"];

        if (showChecks) {
            handleChecked(data._id);
            return;
        }

        if (openRowTables.includes(tableName)) {
            return actions({ action: "openRow", data });
        }

        if (tableName === "infoGmg") {
            return actions({ action: "infoGmg", data });
        }

        const { _id, name, username, id_pedido, contacto, grupo, codigo_estrategia } = data;
        const tabTitle = username || name || id_pedido || contacto || grupo || codigo_estrategia;

        let path = `${location.pathname}/${_id}`;

        if (clientFilter) {
            path = `/${tableName}/${_id}`;
        }

        if (tableName === "versiones") path = `/pedidos/${_id}`;

        // Solo agrega la pestaña si no existe
        if (!tabs.some(tab => tab.path === path)) { // Redundante
            setTabs(prev => {
                if (prev.some(tab => tab.path === path)) return prev; // Redundante
                return [...prev, { path, title: tabTitle.toUpperCase() }];
            });
        }

        //setModal(false);
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

    const showMore = () => {
        setPage(prevPage => prevPage + 1);
    }

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
        if (debouncedSearch.length >= 3 || debouncedSearch.length === 0) {
            setPage(1);
            getData(1, debouncedSearch, clienteCodigo);
        }
    }, [debouncedSearch]);

    const searchData = (e) => {
        setSearch(e.target.value);
    }

    const refreshTable = () => {
        setAdvancedQuery({});
        setPage(1);
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

    const handleChecked = (id) => {
        setCheckedRows(prev =>
            prev.includes(id)
                ? prev.filter(e => e !== id)
                : [...prev, id]
        );
    };

    const checkAll = () => {
        setCheckedRows(prev => {
            const allChecked = tableData.every(row => prev.includes(row._id));
            if (allChecked) {
                return [];
            } else {
                return tableData.map(row => row._id);
            }
        });
    };

    const handleRightClick = (e, value) => {
        e.preventDefault();
        if (typeof value === "object") return;
        setCopyMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            value
        });
    };

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

    return (
        <>
            <div className="tableContainer">
                <div className="headerBackground">
                    <div className="tableHeader">
                        <div className="headerTitle">
                            {headerIcon}
                            <h1>{headerTitle}</h1>
                        </div>
                        <div className="headerActions">
                            {(tableInfo.actions && !tableChecks) && (
                                showChecks
                                    ?
                                    <MdLockOpen className="tableLock" onClick={() => { setShowChecks(false); setCheckedRows([]) }} />
                                    :
                                    <MdLockOutline className="tableLock" onClick={() => { setShowChecks(true); setCheckedRows([]) }} />
                            )}
                            <HiOutlineRefresh className="tableRefresh" onClick={() => refreshTable()} />
                            {(isAdmin && tableForm) && (
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
                            {(!customTables.includes(tableName) && !advancedFilters) && (
                                <div className="searchInput">
                                    <input type="text" id="search" placeholder="Buscar" onChange={searchData} value={search} autoFocus />
                                    <IoCloseCircleOutline
                                        className="resetSearch"
                                        onClick={() => {
                                            setSearch("");
                                            setPage(1);
                                            getData(1, "", clienteCodigo);
                                        }}
                                    />
                                </div>
                            )}
                            {!customTables.includes(tableName) && (
                                <>
                                    <button
                                        className={`filtersButton ${advancedFilters ? "active" : ""}`}
                                        onClick={() => {
                                            setAdvancedFilters(prev => !prev);
                                            setAdvancedQuery({});
                                            setSearch("");
                                        }}
                                    >
                                        Filtros avanzados
                                    </button>
                                    <HiViewColumns className="tableEdit" onClick={() => toggleModal(setEditTable, editTable)} />
                                </>
                            )}
                            {editTable && <EditTable checked={checked} checkColumn={checkColumn} tableInfo={tableInfo} setEditTable={setEditTable} />}
                            {(customTables.includes(tableName) && setPopUpTable) && (
                                <button onClick={() => setPopUpTable(false)}>
                                    <IoMdCloseCircleOutline className="close" />
                                </button>
                            )}
                        </div>
                    </div>
                    {(tableInfo.actions && tableData.length > 0 && !(tableInfo.actions.length === 1 && tableInfo.actions[0].action === "eliminar")) && (
                        <div className="tableInfoActions">
                            {actionEnded
                                ?
                                tableInfo.actions.map((action) =>
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
                                                        setTableData
                                                    });
                                                    if (actionResult && actionResult.status) setActionEnded(true);
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
                    )}
                    {tableCharging && <div className="tableInfoActions"><p>Cargando tabla <ThreeDot color="white" size="small" speedPlus={2} /></p></div>}
                    {noDataToShow && <div className="tableInfoActions"><p>No hay datos para mostrar</p></div>}
                </div>
                <div className="tableScroll">
                    <table>
                        <thead>
                            <tr>
                                {showChecks && (
                                    <th className="checkElement"><input type="checkbox" className="check" onChange={checkAll} checked={checkedRows.length === tableData.length && checkedRows.length > 0} /></th>
                                )}
                                {tableColumns.map((column) => (
                                    checked[column.key] && <th key={column.key}>{column.header != "Avatar" && column.header}</th>
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
                            {tableData.map((data) => (
                                <tr key={data._id} onClick={() => handleClick(data)} className={data.xml ? (data.xml.numero.version === currentVersion ? "activeRow" : undefined) : undefined} >
                                    {showChecks && (
                                        <td className="checkElement">
                                            <input
                                                type="checkbox"
                                                className="check"
                                                checked={checkedRows.includes(data._id)}
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
                                                    <img src={`http://192.4.26.112:3000/uploads/avatars/${value}`} alt="" />
                                                </td>
                                            );
                                        }
                                        /* Columna con checks para boceto y cliché en tabla pedidos */
                                        if (column.check) {
                                            return (
                                                <td key={column.key} className="checkTd">
                                                    <input type="checkbox" className="check" checked={value === "-1" || value === "X"} readOnly />
                                                </td>
                                            );
                                        }
                                        /* Columna para previos */
                                        if (column.key === "archivo") {
                                            return (
                                                <td key={column.key} className="previo">
                                                    {value.includes(".pdf")
                                                        ?
                                                        <PdfAsImage url={value.replace("cloudflow://", "").replace("PEDIDOS_", "Pedidos ")} />
                                                        :
                                                        <img src="null" />}
                                                </td>
                                            );
                                        }
                                        return (
                                            <td key={column.key} data-tooltip-id="my-tooltip" data-tooltip-content={value} onContextMenu={(e) => handleRightClick(e, value)} >
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
                //filesUrls={filesUrls}
                />
            }
        </>
    )
}

export default Table