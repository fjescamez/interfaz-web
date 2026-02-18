import DetailsHeader from '../components/DetailsHeader'
import { paginaSoporteDetails } from '../helpers/detailsGrid'
import GridComponent from '../components/GridComponent';
import { fetchDataNoLimits } from '../helpers/fetchData';

function Soporte() {
  const { grid } = paginaSoporteDetails;

  const handleClick = async (key) => {
    if (key === "sincronizarClientes") {
      await fetchDataNoLimits("clients/sync/cloudflow");
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