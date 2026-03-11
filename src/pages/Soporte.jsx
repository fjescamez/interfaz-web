import DetailsHeader from '../components/DetailsHeader'
import { paginaSoporteDetails } from '../helpers/detailsGrid'
import GridComponent from '../components/GridComponent';
import { fetchDataNoLimits, postData } from '../helpers/fetchData';
import { useSession } from '../context/SessionContext';
import { useTabs } from '../context/TabsContext';

function Soporte() {
  const { grid } = paginaSoporteDetails;
  const { session } = useSession();
  const { createTab } = useTabs();

  const handleClick = async (key) => {
    if (key === "sincronizarClientes") {
      await fetchDataNoLimits("clients/sync/cloudflow");
    } else if (key === "pruebas") {
      createTab("/test", "TEST");
    }
  }

  return (
    <div className="detailsContainer">
      <DetailsHeader
        title="PÁGINA DE SOPORTE"
        hideEditIcon={true}
        hideDeleteIcon={true}
        hideAvatar={true}
      />
      <div className="detailsScroll">
        <GridComponent
          grid={grid}
          gridClick={handleClick}
        />
      </div>
    </div>
  )
}

export default Soporte