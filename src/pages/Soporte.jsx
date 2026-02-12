import DetailsHeader from '../components/DetailsHeader'
import { paginaSoporteDetails } from '../helpers/detailsGrid'
import GridComponent from '../components/GridComponent';
import { fetchDataNoLimits, postData } from '../helpers/fetchData';
import useSocket from '../helpers/useSocket';
import { useEffect } from 'react';
import { notify } from '../helpers/notify';
import { useSession } from '../context/SessionContext';

function Soporte() {
  const { grid } = paginaSoporteDetails;
  const socket = useSocket();
  const { session } = useSession();

  useEffect(() => {
    if (!socket) return;

    // Escuchar nuevos registros
    socket.on('kioskTest', (kioskTest) => {
      notify(kioskTest.status, "Mensaje desde el servidor", `${kioskTest.message}`);
    });

    return () => {
      socket.off('kioskTest'); // limpiar listener
    };
  }, [socket]);


  const handleClick = async (key) => {
    if (key === "sincronizarClientes") {
      await fetchDataNoLimits("clients/sync/cloudflow");
    } else if (key === "testSocket") {
      await postData("orderKiosks/kioscoPedidoAuto", {});
    } else if (key === "testJackets") {
      await postData("orderKiosks/testJackets", { username: session.username });
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