import { useState } from "react";
import Table from "../../../components/Table.jsx";
import { palleteTableInfo, collection } from "../config/pallete.config.js"



function PalletePage({ filter }) {
    const [palleteIds, setPalleteIds] = useState([]);

    return (
        <>
            <Table
                clientFilter={filter}
                fetchCloud={true}
                dinamicTableInfo={palleteTableInfo}
                checkedRows={palleteIds}
                setCheckedRows={setPalleteIds}
                publicForm={true}
                tabTitleTemplate={"Paleta | {description}"}
                specificPath={`/${palleteTableInfo.tableName}`}
                collection={collection}
            />
        </>
    )
}

export default PalletePage