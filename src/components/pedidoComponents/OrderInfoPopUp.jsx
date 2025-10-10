import { useNavigate } from 'react-router-dom';
import Table from '../Table';
import { emailInfoTableInfo } from '../../helpers/tablesInfo';
import { useTabs } from '../../context/TabsContext';
import { normalizeData } from '../../helpers/normalizeData';

function OrderInfoPopUp({ setInfoModal, fullOrder }) {
    const navigate = useNavigate();
    const { setTabs, tabs } = useTabs();
    const normalizedData = normalizeData(fullOrder.registroInfo, emailInfoTableInfo.tableColumns);

    const infoActions = (variables) => {
        const { action, index } = variables;
        if (action === "openRow") {
            const path = `/infoEmail/${fullOrder.id_pedido}/${index + 1}`;
            const tabTitle = `EMAIL ${index + 1} | ${fullOrder.id_pedido}`;

            if (!tabs.some(tab => tab.path === path)) {
                setTabs(prev => {
                    if (prev.some(tab => tab.path === path)) return prev;
                    return [...prev, { path, title: tabTitle }];
                });
            }

            navigate(path);

            return { status: "success" };
        }
    }

    return (
        <>
            <div className="overlay"></div>
            <div className="popUpTable">
                <Table
                    actions={infoActions}
                    setPopUpTable={setInfoModal}
                    dinamicTableInfo={emailInfoTableInfo}
                    orderFilter={fullOrder.id_pedido}
                    initialData={normalizedData}
                />
            </div>
        </>
    )
}

export default OrderInfoPopUp