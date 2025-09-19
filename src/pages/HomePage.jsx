import { useState } from "react";
import DetailsHeader from "../components/DetailsHeader";
import { useSession } from "../context/SessionContext";
import GridComponent from "../components/GridComponent";

import { clientsDetails, stockDetails } from "../helpers/detailsGrid";

function HomePage({ toggleKiosk }) {
  const [showInfo, setShowInfo] = useState(false);
  const { session } = useSession();
  const user = session;

  const clientGrid = clientsDetails.grid
  const stockGrid = stockDetails.grid

  const grid = clientGrid;

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
            <div className="detailsScroll">
              <GridComponent
                title={clientsDetails.title}
                grid={clientsDetails.grid}
                object={user}
              />
              {user.role === "Administrador" &&
                <GridComponent
                  title={stockDetails.title}
                  grid={stockDetails.grid}
                  object={user}
                />}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;