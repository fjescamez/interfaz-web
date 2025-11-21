import { useEffect, useState } from 'react';
import Table from './Table';
import { trabajosPlanchaTableInfo } from '../helpers/tablesInfo';
import { fetchOneItem, postData } from '../helpers/fetchData';
import { notify } from '../helpers/notify';
import { toast } from "react-toastify";

function AlbaranParcialComponent({ setTrabajosPopUp, planchaId, plancha }) {
    const [tableInfo, setTableInfo] = useState(trabajosPlanchaTableInfo);
    const [trabajos, setTrabajos] = useState([]);
    const [trabajosChecked, setTrabajosChecked] = useState([]);

    const getTrabajos = async () => {
        const result = await fetchOneItem("planchas/trabajos", planchaId);
        setTrabajos(result);
        setTableInfo(prev => ({
            ...prev,
            headerTitle: `TRABAJOS PLANCHA ${result[0]?.nombre_plancha || ''}`,
            tableChecks: true,
            actions: [
                {
                    title: "Solicitar",
                    action: "solicitarParcial"
                }
            ]
        }));
    }

    const actions = async (variables) => {
        const { action, data } = variables;
        const trabajosCompletos = data.filter(item => trabajosChecked.includes(item.id));

        if (action === "solicitarParcial") {
            const response = await postData('planchas/solicitarAlbaran', { plancha, accion: 'albaranParcial', trabajos: trabajosCompletos });

            if (response.status === 'success') {
                notify(toast.success, 'success', response.title, response.message);
            } else {
                notify(toast.error, 'error', response.title, response.message);
            }
        }

        return { status: "success" };
    }

    useEffect(() => {
        getTrabajos();
    }, []);

    return (
        trabajos.length > 0 && (
            <>
                <div className="overlay"></div>
                <div className="popUpTable">
                    <Table
                        actions={actions}
                        checkedRows={trabajosChecked}
                        setCheckedRows={setTrabajosChecked}
                        setPopUpTable={setTrabajosPopUp}
                        dinamicTableInfo={tableInfo}
                        initialData={trabajos}
                        customTable={true}
                    />
                </div>
            </>
        )
    );
}

export default AlbaranParcialComponent;