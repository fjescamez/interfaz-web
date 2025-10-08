import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import ErrorPage from "./pages/ErrorPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import HeaderComponent from "./components/HeaderComponent"
import ClientsPage from "./pages/ClientsPage"
import ContactsPage from "./pages/ContactsPage"
import UserDropdownComponent from "./components/UserDropdownComponent";
import { useSession } from "./context/SessionContext";
import { isValidRoute } from "./routes";
import ImageKioskComponent from "./components/ImageKioskComponent";
import { ToastContainer } from "react-toastify";
import UsersPage from "./pages/UsersPage";
import SideBarComponent from "./components/SideBarComponent";
import UserDetails from "./pages/UserDetails";
import ClientDetails from "./pages/ClientDetails";
import OrderDetails from "./pages/OrderDetails";
import { FaArrowCircleUp } from "react-icons/fa";
import OrdersPage from "./pages/OrdersPage";
import OrderKiosk from "./pages/OrderKiosk";
import StockPage from "./pages/StockPage";
import LenPage from "./pages/LenPage";
import StrategyPage from "./pages/StrategyPage";
import ContactDetails from "./pages/ContactDetails";
import GroupsPage from './pages/GroupsPage'
import GroupDetails from "./pages/GroupDetails";
import StrategyDetails from "./pages/StrategyDetails";
import ObservacionesTecnicas from "./pages/ObservacionesTecnicas";

function App() {
  const icons = ["home", "pedidos", "len", "clientes", "stock", "usuarios"];
  const location = useLocation();
  const { session } = useSession();
  const navigate = useNavigate();
  const mainRef = useRef();
  const [kioskData, setKioskData] = useState({ endpoint: "", id: "" });

  useEffect(() => {    
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  const getActiveFromPath = (pathname) => {
    if (pathname.startsWith("/home")) return "home";
    if (pathname.startsWith("/pedidos")) return "pedidos";
    if (pathname.startsWith("/len")) return "len";
    if (pathname.startsWith("/clientes")) return "clientes";
    if (pathname.startsWith("/stock")) return "stock";
    if (pathname.startsWith("/usuarios")) return "usuarios";
    return "home";
  };

  const initialState = icons.reduce((acc, key) => {
    acc[key] = key === getActiveFromPath(location.pathname);
    return acc;
  }, {});

  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    setIsActive(
      icons.reduce((acc, key) => {
        acc[key] = key === getActiveFromPath(location.pathname);
        return acc;
      }, {})
    );

  }, [location.pathname]);

  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isKioskActive, setIsKioskActive] = useState(false);

  const toggleUserDropdown = () => {
    setIsDropdownActive(prev => !prev);
  };

  const toggleKiosk = (endpoint, id, client) => {
    if (client) {
      setKioskData({ endpoint, id, client });
    } else {
      setKioskData({ endpoint, id });
    }
    setIsKioskActive(prev => !prev);
  };  

  const [isArrowActive, setIsArrowActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const scrollTop = mainRef.current.scrollTop;
        setIsArrowActive(scrollTop > 200);
      }
    };

    if (mainRef.current) {
      mainRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainRef.current) {
        mainRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [])

  const scrollTop = () => {
    if (mainRef.current && isArrowActive) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  // Manejo de inactividad para pasar a modo ausente

  const inactivityTimeout = 3 * 60 * 1000;
  const timerRef = useRef();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleActivity = () => {
      clearTimeout(timerRef.current);
      setIsOnline(true);
      timerRef.current = setTimeout(() => {
        setIsOnline(false);
      }, inactivityTimeout);
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    handleActivity();

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      {isValidRoute(location.pathname) && (
        <HeaderComponent
          toggleUserDropdown={toggleUserDropdown}
          isOnline={isOnline}
          setIsOnline={setIsOnline}
        />
      )}
      <div className="main" ref={mainRef}>
        <ToastContainer
          newestOnTop
          autoClose={3000}
        />
        {(isDropdownActive && isValidRoute(location.pathname)) && <UserDropdownComponent toggleUserDropdown={toggleUserDropdown} toggleKiosk={toggleKiosk} />}
        {isKioskActive && <ImageKioskComponent toggleKiosk={toggleKiosk} endpoint={kioskData.endpoint} id={kioskData.id} client={kioskData.client} />}
        {isValidRoute(location.pathname) && <SideBarComponent isActive={isActive} setIsActive={setIsActive} />}
        <div className={`scrollTopArrow ${isArrowActive ? "arrowVisible" : ""}`} onClick={scrollTop}><FaArrowCircleUp /></div>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Parche mientras home esté en desarrollo */}
          {/*<Route path="/home" element={<HomePage toggleKiosk={toggleKiosk}/>} />*/}
          (<Route path="/home" element={<OrdersPage />} />
          <Route path="/home/:id" element={<OrderDetails />} />)
          <Route path="/pedidos" element={<OrdersPage />} />
          <Route path="/pedidos/:id" element={<OrderDetails />} />
          <Route path="/pedidos/:id/kiosk" element={<OrderKiosk />} />
          <Route path="/fichaTecnica/:id" element={<ObservacionesTecnicas />} />
          <Route path="/len" element={<LenPage />} />
          <Route path="/clientes" element={<ClientsPage />} />
          <Route path="/clientes/:id" element={<ClientDetails toggleKiosk={toggleKiosk} />} />
          <Route path="/clientes/:id/pedidos" element={<OrdersPage filter={true} />} />
          <Route path="/clientes/:id/contactos" element={<ContactsPage filter={true} />} />
          <Route path="/clientes/:id/contactos/:id" element={<ContactDetails toggleKiosk={toggleKiosk} />} />
          <Route path="/clientes/:id/estrategias" element={<StrategyPage filter={true} />} />
          <Route path="/clientes/:id/estrategias/:id" element={<StrategyDetails toggleKiosk={toggleKiosk} />} />
          <Route path="/estrategias/:id" element={<StrategyDetails />} />
          <Route path="/contactos" element={<ContactsPage />} />
          <Route path="/contactos/:id" element={<ContactDetails toggleKiosk={toggleKiosk} />} />
          <Route path="/grupos" element={<GroupsPage />} />
          <Route path="/grupos/:id" element={<GroupDetails />} />
          <Route path="/clientes/:id/grupos" element={<GroupsPage filter={true} />} />
          <Route path="/clientes/:id/grupos/:id" element={<GroupDetails />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/usuarios" element={<UsersPage />} />
          <Route path="/usuarios/:id" element={<UserDetails toggleKiosk={toggleKiosk} />} />
        </Routes>
      </div>
    </>
  )
}

export default App