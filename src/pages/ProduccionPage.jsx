import { useNavigate } from "react-router-dom";
import DetailsHeader from '../components/DetailsHeader'
import GridComponent from '../components/GridComponent'
import { produccionPlanchasDetails, produccionTrabajosDetails } from '../helpers/detailsGrid';
import { useTabs } from "../context/TabsContext";

function ProduccionPage() {
    const navigate = useNavigate();
    const { tabs, setTabs } = useTabs();

    const planchasClick = async (key, title) => {
        const path = `/${key}`;

        const tabTitle = key !== "planchas" ? `PLANCHAS ${title.toUpperCase()}` : title.toUpperCase();

        if (!tabs.some(tab => tab.path === path)) {
            setTabs(prev => {
                if (prev.some(tab => tab.path === path)) return prev;
                return [...prev, { path, title: tabTitle }];
            });
        }
        navigate(path);
    };

    const getPlanchas = async () => {
        
    };

    return (
        <div className="detailsContainer">
            <DetailsHeader
                title={"PRODUCCIÓN"}
                hideAvatar={true}
                hideEditIcon={true}
                hideDeleteIcon={true}
            />
            <div className="detailsScroll">
                <GridComponent
                    title={produccionPlanchasDetails.title}
                    grid={produccionPlanchasDetails.grid}
                    gridClick={planchasClick}
                />
                <GridComponent
                    title={produccionTrabajosDetails.title}
                    grid={produccionTrabajosDetails.grid}
                />
            </div>
        </div>
    )
}

export default ProduccionPage