import "./OrderKiosk.css";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import Switch from '@mui/material/Switch';
import { useState } from "react";
import { kioskActions } from "../helpers/orderKioskActions";
import BocetoComponent from "../components/orderKioskComponents/BocetoComponent";

function OrderKiosk() {
  const [isActive, setIsActive] = useState(() => {
    const initial = {};
    kioskActions.forEach(option => {
      initial[option.id] = false;
    });
    return initial;
  });

  const [bocetos, setBocetos] = useState([
    { id: 0, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }
  ]);
  
  const [fichas, setFichas] = useState([
    { id: 0, rasterizado: false, lpi: "300", formato: "Pdf", tipo: "Compuesto" }
  ]);
  
  const components = {
    "trapping": "",
    "boceto": <BocetoComponent opciones={bocetos} setOpciones={setBocetos} />,
    "ficha": <BocetoComponent opciones={fichas} setOpciones={setFichas} />
  }

  return (
    <div className="detailsContainer">
      {kioskActions.map((option) => (
        <div className="kioskAction" key={option.id}>
          <div className={`actionHeader ${isActive[option.id] ? "open" : ""}`}>
            <Switch className="kioskSwitch" onClick={() => setIsActive((prev) => ({
              ...prev,
              [option.id]: !prev[option.id]
            }))} />
            <p>{option.title} <span>(Config. Personalizada) Trap 0.5 mm, Remetido 0 mm</span></p>
            {isActive[option.id] ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>
          {isActive[option.id] && (components[option.id])}
        </div>
      ))}
    </div>
  )
}

export default OrderKiosk