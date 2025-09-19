import DetailsHeader from '../components/DetailsHeader';
import { stockDetails } from "../helpers/detailsGrid";
import GridComponent from "../components/GridComponent";

function StockPage() {
    const { grid } = stockDetails;

    return (
        <div className="detailsContainer">
            <DetailsHeader
                title={"CONTROL DE STOCK"}
            />
            <div className="detailsScroll">
                <GridComponent
                    grid={grid}
                />
            </div>
        </div>
    )
}

export default StockPage