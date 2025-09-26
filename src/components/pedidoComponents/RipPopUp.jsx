import { useEffect, useState } from "react"
import { ripTableInfo } from '../../helpers/tablesInfo';
import Table from "../Table"
import { fetchOneItem, postData } from "../../helpers/fetchData";
import ExecutingComponent from "../ExecutingComponent";
import { notify } from "../../helpers/notify";
import { toast } from "../../../node_modules/react-toastify/dist/index";
import MetodosImpresion from "./MetodosImpresion";

function RipPopUp({ setRipModal, idMontaje, fullOrder }) {
    const [colorIds, setColorIds] = useState([]);
    const [montaje, setMontaje] = useState(undefined);
    const [tableInfo, setTableInfo] = useState(ripTableInfo);
    const [planchasModal, setPlanchasModal] = useState(false);

    const getMontaje = async () => {
        const response = await fetchOneItem("montajes", idMontaje);
        if (!response) {
            setRipModal(false);
        }
        setMontaje(response.results.archivo);
    }

    useEffect(() => {
        getMontaje();
    }, []);

    useEffect(() => {
        if (montaje !== undefined) {
            // Poner la actividad que tiene arrastradores y cortes_desarrollo
            if (fullOrder.xml.actividad.id === "MADERA") {
                setTableInfo(prev => ({
                    ...prev,
                    actions: prev.actions.map((action) => {
                        if (action.action === "arrastradores" || action.action === "cortes_desarrollo") {
                            return {
                                ...action,
                                hidden: false
                            };
                        }
                        return action;
                    })
                }));
            }
        }
    }, [montaje]);

    const ripActions = async (variables) => {
        const { action, title } = variables;
        const ripTypes = ["ripAuto", "ripInterior", "ripExterior", "ripPixel"];

        if (ripTypes.includes(action)) {
            const ripData = {
                ids: colorIds,
                action: title,
                extraInputs: {
                    id_pedido: fullOrder.id_pedido,
                    archivo: montaje,
                    id_archivo: montaje ? decodeURIComponent(montaje.replace("cloudflow://PEDIDOS_", "").split("/").pop()) : ""
                }
            };

            const response = await postData("montajes/rip", ripData);

            if (response.status === "success") {
                notify(toast.success, response.status, response.title, response.message);
            } else {
                notify(toast.error, response.status, response.title, response.message);
            }

            return { status: response.status };
        } else if (action === "arrastradores") {
            const data = {
                ids: colorIds,
                action: "arrastrador",
                extraInputs: {
                    archivo: montaje
                }
            }

            const response = await postData("montajes/rip/arrastradores", data);

            if (response.status === "success") {
                notify(toast.success, response.status, response.title, response.message);
            } else {
                notify(toast.error, response.status, response.title, response.message);
            }

            return { status: response.status };
        } else if (action === "cortes_desarrollo") {
            const data = {
                ids: colorIds,
                action: "cortes desarrollo",
                extraInputs: {
                    id_pedido: fullOrder.id_pedido
                }
            }

            const response = await postData("montajes/rip/cortes_desarrollo", data);

            if (response.status === "success") {
                notify(toast.success, response.status, response.title, response.message);
            } else {
                notify(toast.error, response.status, response.title, response.message);
            }

            return { status: response.status };
        } else if (action === "configPlancha") {
            setPlanchasModal(true);
            return { status: "success" };
        }
    };

    return (
        <>
            {montaje ?
                (!planchasModal ?
                    <div className="popUpTable">
                        <Table
                            actions={ripActions}
                            checkedRows={colorIds}
                            setCheckedRows={setColorIds}
                            dinamicTableInfo={tableInfo}
                            orderFilter={montaje}
                            setPopUpTable={setRipModal}
                        />
                    </div>
                    :
                    <MetodosImpresion
                        setPlanchasModal={setPlanchasModal}
                        id_pedido={fullOrder.id_pedido}
                        file={montaje}
                    />

                )
                :
                <ExecutingComponent />
            }
        </>
    )
}

export default RipPopUp