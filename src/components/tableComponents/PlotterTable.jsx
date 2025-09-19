import { useState } from 'react';
import { plotterTableInfo } from '../../helpers/tablesInfo';
import Table from '../Table';
import { postData } from '../../helpers/fetchData';
import InfoGmgTable from './InfoGmgTable';
import PlotterKiosk from '../pedidoComponents/PlotterKiosk';

function PlotterTable({ setPlotterModal, orderId, fullOrder, filePath }) {
    const [plotterIds, setPlotterIds] = useState([]);
    const [gmgPopup, setGmgPopup] = useState(false);
    const [tareaGmg, setTareaGmg] = useState(undefined);
    const [plotterKiosk, setPlotterKiosk] = useState(false);

    const plotterActions = (variables) => {
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
            return postData("plotter/imprimirFerro", body);
        } else if (action === "openRow") {
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
                setTareaGmg(tareaGmg.tarea);
            }
            getTareaGmg();
            setPlotterKiosk(true);
        }
    }

    return (
        <>
            <div className="overlay"></div>
            {!plotterKiosk ?
                !gmgPopup ?
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
                    />
                :
                <PlotterKiosk setPlotterKiosk={setPlotterKiosk} tareaGmg={tareaGmg} setTareaGmg={setTareaGmg} />}
        </>
    )
}

export default PlotterTable