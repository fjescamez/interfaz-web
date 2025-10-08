import React, { useState } from 'react'
import Table from '../Table'
import { tintasTableInfo } from '../../helpers/tablesInfo';
import MetodosImpresion from './MetodosImpresion';

function TintasPopUp({ setTintasModal, fullOrder }) {
    const [tintasIds, setTintasIds] = useState([]);
    const [planchasModal, setPlanchasModal] = useState(false);
    const [tintas, setTintas] = useState([]);

    const tintasActions = async (variables) => {
        const { action, data } = variables;
        if (action === "configPlancha") {
            setTintas(data);
            setPlanchasModal(true);
            return { status: "success" };
        }

        return { status: "success" }
    }

    return (
        <>
            <div className="overlay"></div>
            {!planchasModal ?
                <div className="popUpTable">
                    <Table
                        actions={tintasActions}
                        checkedRows={tintasIds}
                        setCheckedRows={setTintasIds}
                        setPopUpTable={setTintasModal}
                        dinamicTableInfo={tintasTableInfo}
                        orderFilter={fullOrder?.unitario}
                    />
                </div>
                :
                <MetodosImpresion
                    setPlanchasModal={setPlanchasModal}
                    id_pedido={fullOrder.id_pedido}
                    file={fullOrder?.unitario}
                    tintas={tintas}
                />
            }
        </>
    )
}

export default TintasPopUp
