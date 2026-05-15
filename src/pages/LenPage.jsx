import LenTable from "../modules/orders/components/LenTable";
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