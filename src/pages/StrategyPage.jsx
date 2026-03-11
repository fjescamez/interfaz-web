import { useState } from "react";
import Table from "../components/Table.jsx";
import { strategyTableInfo } from "../helpers/tablesInfo.jsx";
import StrategyForm from "../components/formComponents/StrategyForm.jsx";
import { useClienteFilter } from "../context/ClientFilterContext.jsx";
import { useLocation } from "react-router-dom";
import { notify } from "../helpers/notify.jsx";
import { checkRole } from "../helpers/roleChecker.js";

function StrategyPage({ filter }) {
    const location = useLocation();
    const [checkedRows, setCheckedRows] = useState([]);
    const [duplicatePopUp, setDuplicatePopUp] = useState(false);
    const [checkedStrategy, setCheckedStrategy] = useState(null);
    const [dataSetter, setDataSetter] = useState(null);
    const [totalSetter, setTotalSetter] = useState(null);
    const { clienteDatos } = useClienteFilter();
    const clienteDato = clienteDatos[location.pathname] || null;
    const { isTecnico } = checkRole();

    const strategyActions = async (variables) => {
        const { action, data, setTableData, setTotal } = variables;
        const estrategia = data.find(item => item._id === checkedRows[0]);
        if (checkedRows.length > 1) {
            notify('warning', 'Selecciona solo una estrategia para duplicar');
            return { status: 'error' };
        }

        switch (action) {
            case "duplicar":
                setDuplicatePopUp(true);
                setCheckedStrategy(estrategia);
                setDataSetter(() => setTableData);
                setTotalSetter(() => setTotal);
                return { status: 'success' };
        }
    };

    return (
        <>
            <Table
                clientFilter={filter}
                dinamicTableInfo={strategyTableInfo}
                tabTitleTemplate={"ESTRATEGIA {codigo_estrategia}"}
                specificPath={`/${strategyTableInfo.tableName}`}
                checkedRows={checkedRows}
                setCheckedRows={setCheckedRows}
                actions={strategyActions}
                publicForm={isTecnico}
            />
            {duplicatePopUp && (
                <StrategyForm
                    setModal={setDuplicatePopUp}
                    itemsData={checkedStrategy}
                    clienteDato={clienteDato}
                    setTableData={dataSetter}
                    setTotal={totalSetter}
                />
            )}
        </>
    )
}

export default StrategyPage