import React, { useState } from 'react'
import Table from '../Table'
import { tintasTableInfo } from '../../helpers/tablesInfo';
import MetodosImpresion from './MetodosImpresion';
import { postData } from '../../helpers/fetchData';
import { addKeyListener } from '../../helpers/toggleModal';

function TintasPopUp({ setTintasModal, fullOrder }) {
    const [tintasIds, setTintasIds] = useState([]);
    const [planchasModal, setPlanchasModal] = useState(false);
    const [tintas, setTintas] = useState([]);
    addKeyListener(setTintasModal);

    const tintasActions = async (variables) => {
        const { action, data } = variables;

        if (action === "imprimirA3") {
            const data = {
                ids: tintasIds,
                action: "separacionA3",
                extraInputs: {
                    unitario: fullOrder?.unitario
                }
            };

            await postData('colors/imprimirA3', data);
            return { status: "success" };

        } else if (action === "configPlancha") {
            setTintas(data);
            setPlanchasModal(true);
            return { status: "success" };
        }

        return { status: "success" };
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
                        customTable={true}
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
