import DetailsHeader from "../components/DetailsHeader";
import { useSession } from "../context/SessionContext";
import GridComponent from "../components/GridComponent";
import { FaGear } from 'react-icons/fa6';
import "./HomePage.css";

import { clientsDetails, stockDetails, produccionPlanchasDetails } from "../helpers/detailsGrid";

function HomePage({ toggleKiosk }) {
  const generalGrid = [clientsDetails, stockDetails, produccionPlanchasDetails];
  const { session } = useSession();
  const user = session;

  return (
    <>
      <div className="detailsContainer">
        {user && (
          <>
            <DetailsHeader
              title={[user.name, " ", user.lastname]}
              avatar={user.avatar}
              endPoint={"users"}
              id={user._id}
              toggleKiosk={toggleKiosk}
              kioskData={user}
              departments={user.departments}
              hideDeleteIcon={true}
              hideEditIcon={true}
            />
            <div className="configButton"><FaGear /></div>
            <div className="detailsScroll homeGrid">
              {generalGrid.map((grid, index) => (
                <div key={index}>
                  <GridComponent
                    title={grid.title}
                    grid={grid.grid}
                    click={grid.click}
                    object={user}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;