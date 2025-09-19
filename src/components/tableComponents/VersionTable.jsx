import { versionTableInfo } from '../../helpers/tablesInfo'
import "./PopupTable.css";
import Table from '../Table.jsx';

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
                />
            </div>
        </>
    )
}

export default VersionTable