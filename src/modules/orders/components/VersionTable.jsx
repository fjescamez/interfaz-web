import { versionTableInfo } from '../config/order.config'
import "../../../components/tableComponents/PopupTable.css";
import Table from '../../../components/Table';

function VersionTable({ setVersionsModal, fullOrder }) {

    return (
        <>
            <div className="overlay"></div>
            <div className="popUpTable">
                <Table
                    setPopUpTable={setVersionsModal}
                    dinamicTableInfo={versionTableInfo}
                    normalizedData={true}
                    orderFilter={fullOrder.xml.numero.id}
                    currentVersion={fullOrder.xml.numero.version}
                    tabTitleTemplate={"{id_pedido}"}
                    specificPath={"/pedidos"}
                    customTable={true}
                />
            </div>
        </>
    )
}

export default VersionTable