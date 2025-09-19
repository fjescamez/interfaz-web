import LenTable from "../components/tableComponents/LenTable";
import { lenTableInfo } from "../helpers/tablesInfo";

function LenPage() {
    return (
        <LenTable
            lenTableInfo={lenTableInfo}
            popup={false}
        />
    )
}

export default LenPage