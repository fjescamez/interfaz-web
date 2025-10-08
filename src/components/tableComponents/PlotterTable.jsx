import { useState } from 'react';
import { plotterTableInfo } from '../../helpers/tablesInfo';
import Table from '../Table';
import { postData } from '../../helpers/fetchData';
import InfoGmgTable from './InfoGmgTable';
import PlotterKiosk from '../pedidoComponents/PlotterKiosk';
import { notify } from '../../helpers/notify';
import { toast } from 'react-toastify';
import ExecutingComponent from '../ExecutingComponent';

function PlotterTable({ setPlotterModal, orderId, fullOrder, filePath }) {
    const [plotterIds, setPlotterIds] = useState([]);
    const [gmgPopup, setGmgPopup] = useState(false);
    const [tareaGmg, setTareaGmg] = useState(undefined);
    const [plotterKiosk, setPlotterKiosk] = useState(false);
    const [loading, setLoading] = useState(false);

    const plotterActions = async (variables) => {
        const { action, data } = variables;
        if (action === "infoGmg") {
            setGmgPopup(true);
            setPlotterIds([]);
            return { status: "success" }
        } else if (action === "imprimirFerro") {
            const body = {
                ids: plotterIds,
                action
            };

            setPlotterIds([]);
            const imprimir = await postData("plotter/imprimirFerro", body);

            if (imprimir.status === "success") {
                notify(toast.success, imprimir.status, imprimir.title, imprimir.message);
                return { status: "success" }
            } else if (imprimir.status === "error") {                
                notify(toast.error, imprimir.status, imprimir.title, imprimir.message);
                return { status: "error" };
            }
        } else if (action === "openRow") {
            setPlotterKiosk(true);
            setLoading(true);
            const getTareaGmg = async () => {
                const body = {
                    id: data._id,
                    rowObject: data,
                    extraInputs: {
                        accion: "info_gmg",
                        pedido_id: fullOrder._id,
                        archivo_id: data
                    }
                }

                const tareaGmg = await postData("plotter/tareaGmg", body);

                if (tareaGmg.status === "success") {
                    setTareaGmg(tareaGmg.tarea);
                    setLoading(false);
                } else {
                    setPlotterKiosk(false);
                    setLoading(false);
                    notify(toast.error, tareaGmg.status, tareaGmg.title, tareaGmg.message);
                }
            }
            getTareaGmg();
        }
    }

    return (
        <>
            <div className="overlay"></div>
            {!plotterKiosk ?
                (!gmgPopup ?
                    <div className="popUpTable">
                        <Table
                            actions={plotterActions}
                            checkedRows={plotterIds}
                            setCheckedRows={setPlotterIds}
                            setPopUpTable={setPlotterModal}
                            dinamicTableInfo={plotterTableInfo}
                            orderFilter={orderId}
                            filePath={filePath}
                        />
                    </div>
                    :
                    <InfoGmgTable
                        setGmgPopup={setGmgPopup}
                        setPlotterModal={setPlotterModal}
                        orderId={orderId}
                    />)
                :
                (loading ?
                    <ExecutingComponent message={"Cargando"} />
                    :
                    <PlotterKiosk setPlotterKiosk={setPlotterKiosk} tareaGmg={tareaGmg} setTareaGmg={setTareaGmg} />
                )
            }

        </>
    )
}

export default PlotterTable