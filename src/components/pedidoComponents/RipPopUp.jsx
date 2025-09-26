import { useEffect, useState } from "react"
import { ripTableInfo } from '../../helpers/tablesInfo';
import Table from "../Table"
import { fetchOneItem, postData } from "../../helpers/fetchData";
import ExecutingComponent from "../ExecutingComponent";
import { notify } from "../../helpers/notify";
import { toast } from "../../../node_modules/react-toastify/dist/index";

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

    const ripActions = async (action) => {
        const ripTypes = ["ripAuto", "ripInterior", "ripExterior", "ripPixel"];

        if (ripTypes.includes(action.action)) {
            const ripData = {
                ids: colorIds,
                action: action.title,
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
        } else if (action.action === "arrastradores") {
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
        } else if (action.action === "cortes_desarrollo") {
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
        } else if (action.action === "configPlancha") {
            setPlanchasModal(true);
            return { status: "success" };
        }
    };

    /* Variables para salida_rip
    array de tintas:
    ids[
        "686ccb159c470000f30051db",
        "686ccb159c470000f30051dd"
    ]
    accion (habrá que añadir tipoImpresion, curva y resolucion para más personalización):
    action"Rip Interior"
    extraInputs{
        id_pedido: "100237-2",
        archivo: "cloudflow://PEDIDOS_2025/ETIQUETAS/100237%20ATLANTICA%20ENRAIZA/PREIMPRESION/V2/MONTAJES/100237-2M%20ATLANTICA%20ENRAIZA.pdf",
        id_archivo: "100237-2M ATLANTICA ENRAIZA.pdf"
    }
    */

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
                    <h1>Ey</h1>
                )
                :
                <ExecutingComponent />
            }
        </>
    )
}

export default RipPopUp