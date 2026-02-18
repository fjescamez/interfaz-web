import { useEffect, useState } from "react"
import { ripTableInfo } from '../../helpers/tablesInfo';
import Table from "../Table"
import { fetchOneItem, postData } from "../../helpers/fetchData";
import ExecutingComponent from "../ExecutingComponent";
import { notify } from "../../helpers/notify";
import MetodosImpresion from "./MetodosImpresion";
import FreecutPopUp from "../tableComponents/FreecutPopUp";
import { addKeyListener } from "../../helpers/toggleModal";

function RipPopUp({ setRipModal, idMontaje, fullOrder, multiRip }) {
    const [colorIds, setColorIds] = useState([]);
    const [montaje, setMontaje] = useState(undefined);
    const [id_archivo, setId_archivo] = useState("");
    const [tableInfo, setTableInfo] = useState(ripTableInfo);
    const [planchasModal, setPlanchasModal] = useState(false);
    const [freecutPopup, setFreecutPopup] = useState(false);

    useEffect(() => {
        if (setRipModal) {
            addKeyListener(setRipModal);
        }
    }, []);

    const [tintas, setTintas] = useState([]);

    const getMontaje = async () => {
        const response = await fetchOneItem("montajes", idMontaje);
        if (!response) {
            setRipModal(false);
        }
        setMontaje(response.results.archivo);
        setId_archivo(response.results.id_archivo);
    }

    useEffect(() => {
        getMontaje();
        setColorIds([]);
    }, [idMontaje]);

    useEffect(() => {
        if (montaje !== undefined) {
            if (fullOrder.xml.actividad.id === "MADERA" && !multiRip) {
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

            if (multiRip) {
                setTableInfo(prev => ({
                    ...prev,
                    actions: prev.actions.map((action) => {
                        if (action.action === "configPlancha" || action.action === "freecutManual") {
                            return {
                                ...action,
                                hidden: true
                            };
                        }
                        return action;
                    })
                }));
            }
        }
    }, [montaje]);

    const ripActions = async (variables) => {
        const { action, title, data, setCheckedIndexes } = variables;
        const ripTypes = ["ripAuto", "ripInterior", "ripExterior", "ripPixel"];

        if (ripTypes.includes(action)) {
            if (action === "ripAuto" && fullOrder?.xml?.tecnicos?.tipo_impresion !== "INTERIOR" && fullOrder?.xml?.tecnicos?.tipo_impresion !== "EXTERIOR") {
                return notify('error', 'Error', 'El tipo de impresión no está definido en el pedido');
            }

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
                notify(response.status, response.title, response.message);
            } else {
                notify(response.status, response.title, response.message);
            }

            if (!multiRip) {
                setRipModal(false);
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
                notify(response.status, response.title, response.message);
            } else {
                notify(response.status, response.title, response.message);
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
                notify(response.status, response.title, response.message);
            } else {
                notify(response.status, response.title, response.message);
            }

            return { status: response.status };
        } else if (action === "freecutManual") {
            setTintas(data);
            setFreecutPopup(true);

            return { status: "success" };
        } else if (action === "configPlancha") {
            setTintas(data);
            setPlanchasModal(true);
            return { status: "success" };
        }
    };

    return (
        <>
            {!freecutPopup ? (
                montaje ?
                    (!planchasModal ?
                        <div className={!multiRip ? "popUpTable" : ""}>
                            <Table
                                actions={ripActions}
                                checkedRows={colorIds}
                                setCheckedRows={setColorIds}
                                dinamicTableInfo={tableInfo}
                                specificHeaderTitle={`RIP MONTAJE | ${id_archivo}`}
                                orderFilter={montaje}
                                setPopUpTable={setRipModal}
                                customTable={true}
                            />
                        </div>
                        :
                        <MetodosImpresion
                            setPlanchasModal={setPlanchasModal}
                            id_pedido={fullOrder.id_pedido}
                            file={montaje}
                            tintas={tintas}
                        />
                    )
                    :
                    !multiRip && <ExecutingComponent />
            ) : (
                <FreecutPopUp setFreecutModal={setFreecutPopup} colores={tintas} id_pedido={fullOrder.id_pedido} montaje={montaje} />
            )}
        </>
    )
}

export default RipPopUp