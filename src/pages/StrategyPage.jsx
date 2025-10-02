import { useEffect, useState } from "react";
import Table from "../components/Table.jsx";
import { strategyTableInfo } from "../helpers/tablesInfo.jsx";
import GeneralForm from "../components/formComponents/GeneralForm.jsx";
import { strategyFormData } from "../helpers/formsData.jsx";
import { fetchData } from "../helpers/fetchData.jsx";

function StrategyPage({ filter }) {
    const [strategyData, setStrategyData] = useState(undefined);
    const [strategyModal, setStrategyModal] = useState(false);
    let [itemsData, setItemsData] = useState({});

    const actions = (variables) => {
        const { action, data } = variables;

        if (action === "openRow") {
            setStrategyData(data);
            setStrategyModal(true);
        }
    }

    useEffect(() => {
        const getItemsData = async () => {
            if (strategyData !== undefined) {
                const {
                    cliente_codigo,
                    material,
                    material_codigo,
                    plancha_fabricante,
                    plancha_espesor,
                    plancha_referencia,
                    perfil_nombre,
                    perfil_carpeta,
                    perfil_tipo,
                    nombrePCW,
                    tipoTramado,
                    curvaP,
                    curvaC
                } = strategyData;

                const cliente = await fetchData("clients", cliente_codigo);
                const cliente_nombre = (cliente && cliente.length > 0) ? cliente[0].name : "";

                const perfil = perfil_nombre.split(".");
                const nombrePerfil = perfil[0] || "";
                const formatoPerfil = perfil[1] || "";

                const curvaPlotter = curvaP.split(".");
                const nombreCurvaPlotter = curvaPlotter[0] || "";
                const formatoCurvaPlotter = curvaPlotter[1] || "";

                const curvaCliche = curvaC.split(".");
                const nombreCurvaCliche = curvaCliche[0] || "";
                const formatoCurvaCliche = curvaCliche[1] || "";

                setItemsData({
                    cliente_nombre,
                    cliente_codigo,
                    material_nombre: material,
                    material_codigo,
                    plancha_fabricante,
                    plancha_espesor,
                    plancha_referencia,
                    perfil_nombre: nombrePerfil,
                    perfil_formato: formatoPerfil,
                    perfil_carpeta,
                    perfil_tipo,
                    curva_plotter_nombre: nombreCurvaPlotter,
                    curva_plotter_formato: formatoCurvaPlotter,
                    estrategia_nombre: nombrePCW,
                    tramado: tipoTramado,
                    curva_cliches_nombre: nombreCurvaCliche,
                    curva_cliches_formato: formatoCurvaCliche
                })
            }
        }
        getItemsData();
    }, [strategyData]);

    return (
        <>
            <Table
                filter={filter}
                dinamicTableInfo={strategyTableInfo}
                actions={actions}
            />
            {(strategyModal && (strategyData !== undefined)) &&
                <GeneralForm
                    setModal={setStrategyModal}
                    formData={strategyFormData}
                    itemsData={itemsData}
                    noSubmit={true}
                />
            }
        </>
    )
}

export default StrategyPage