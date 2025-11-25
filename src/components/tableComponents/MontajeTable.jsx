import { useState } from 'react';
import { montajeTableInfo } from '../../helpers/tablesInfo';
import Table from '../Table';
import { postData } from '../../helpers/fetchData';
import RipPopUp from '../pedidoComponents/RipPopUp';
import { notify } from '../../helpers/notify';
import { toast } from 'react-toastify';
import CompareMontajes from '../pedidoComponents/CompareMontajes';

function MontajeTable({ setMontajeModal, fullOrder }) {
    const urlApi = import.meta.env.VITE_API_URL;
    const [montajeIds, setMontajeIds] = useState([]);
    const [ripId, setRipId] = useState("");
    const [ripPopup, setRipPopup] = useState(false);
    const [comparePopup, setComparePopup] = useState(false);
    const [montajeToCompare, setMontajeToCompare] = useState(undefined);
    const [tableInfo, setTableInfo] = useState(montajeTableInfo);
    const [montajeView, setMontajeView] = useState("");

    const solicitarVista = async () => {
        const url = `${urlApi}/montajes/solicitarVista`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "solicitarVista",
                    ids: montajeIds
                })
            })
            const data = await response.json();
            if (data.status === "success") {
                notify(toast.success, data.status, data.title, data.message);
                setMontajeIds([]);
                const updatedActions = tableInfo.actions.map(action => {
                    if (action.action === "solicitarVista" || action.action === "visualizarMontaje") {
                        return { ...action, hidden: !action.hidden };
                    }
                    return action;
                });
                setTableInfo({ ...tableInfo, actions: updatedActions });
                setMontajeView(data.vista.contents?.viewLink);

                return data;
            } else {
                notify(toast.error, data.status, data.title, data.message);
                return data;
            }
        } catch (error) {
            notify(toast.error, 'error', 'Error', error);
        }
    }

    const montajeActions = (variables) => {
        const { action, data } = variables;
        if (action === "openRow") {
            setRipId(data._id);
            setRipPopup(true);

            return { status: "success" };
        } else if (action === "comparar") {
            if (montajeIds.length > 1) {
                notify(toast.error, "error", "Demasiadas selecciones", "Por favor, seleccione un solo elemento para poder realizar esta acción.");
                return { status: "success" };
            }

            setMontajeToCompare(data[0]);
            setComparePopup(true);
            return { status: "success" };
        } else if (action === "solicitarVista") {
            if (montajeIds.length > 1) {
                notify(toast.error, "error", "Demasiadas selecciones", "Por favor, seleccione un solo elemento para poder realizar esta acción.");
                return { status: "success" };
            }

            return solicitarVista();
        } else if (action === "visualizarMontaje") {
            window.open(montajeView, "_blank");
            return { status: "success" };
        } else {
            const data = {
                ids: montajeIds,
                action
            };

            setMontajeIds([]);
            return postData(`montajes/${action}`, data);
        }
    };

    return (
        <>
            <div className="overlay"></div>
            {(!ripPopup && !comparePopup) &&
                <div className="popUpTable">
                    <Table
                        actions={montajeActions}
                        checkedRows={montajeIds}
                        setCheckedRows={setMontajeIds}
                        setPopUpTable={setMontajeModal}
                        dinamicTableInfo={tableInfo}
                        orderFilter={fullOrder.id_pedido}
                        openRows={true}
                        customTable={true}
                    />
                </div>
            }
            {ripPopup &&
                <RipPopUp
                    setRipModal={setRipPopup}
                    idMontaje={ripId}
                    fullOrder={fullOrder}
                />
            }
            {comparePopup &&
                <CompareMontajes
                    setModal={setComparePopup}
                    montaje={montajeToCompare}
                />
            }
        </>
    )
}

export default MontajeTable