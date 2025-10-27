import DetailsHeader from "../components/DetailsHeader";
import { useSession } from "../context/SessionContext";
import GridComponent from "../components/GridComponent";
import { useNavigate } from "react-router-dom";
import { FaGear } from 'react-icons/fa6';
import "./HomePage.css";

import { clientsDetails, stockDetails, produccionPlanchasDetails } from "../helpers/detailsGrid";
import { useTabs } from "../context/TabsContext";

function HomePage({ toggleKiosk }) {
  const generalGrid = [clientsDetails, produccionPlanchasDetails];
  const { session } = useSession();
  const user = session;
  const { tabs, setTabs } = useTabs();
  const navigate = useNavigate();
  const hideKeys = ["configuracion"];

  const homeClick = async (key, title) => {
    const path = `/${key}`;

    const tabTitle = `${user?.name} | ${title.toUpperCase()}`;

    if (!tabs.some(tab => tab.path === path)) {
      setTabs(prev => {
        if (prev.some(tab => tab.path === path)) return prev;
        return [...prev, { path, title: tabTitle }];
      });
    }
    navigate(path);
  };

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
                    gridClick={homeClick}
                    hideKeys={hideKeys}
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