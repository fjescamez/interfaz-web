import LenTable from "../components/LenTable";
import { lenTableInfo } from "../config/len.config";

function LenPage() {
    return (
        <LenTable
            lenTableInfo={lenTableInfo}
            popup={false}
        />
    )
}

export default LenPage