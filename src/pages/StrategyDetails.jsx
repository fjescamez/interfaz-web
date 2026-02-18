import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import DetailsHeader from '../components/DetailsHeader'
import { fetchData, fetchOneItem } from '../helpers/fetchData';
import { useTabs } from '../context/TabsContext';
import FormSection from '../components/formComponents/FormSection';
import { strategyFormData } from '../helpers/formsData';
import { useSession } from '../context/SessionContext';
import StrategyForm from '../components/formComponents/StrategyForm';
import DeleteForm from '../components/formComponents/DeleteForm';
import { strategyTableInfo } from '../helpers/tablesInfo';
import { useLocation } from "react-router-dom";
import { BlinkBlur } from "react-loading-indicators";

function StrategyDetails() {
  const [strategy, setStrategy] = useState(undefined);
  const { id } = useParams();
  const { closeTab } = useTabs();
  const navigate = useNavigate();
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [itemsData, setItemsData] = useState({});
  const { session } = useSession();
  const isAdmin = session?.role === "Administrador" || session?.role === "Soporte";
  const location = useLocation();

  useEffect(() => {
    const getStrategyDetails = async () => {
      const strategyData = await fetchOneItem("strategies", id);

      if (!strategyData) {
        closeTab(location.pathname);
        navigate("/clientes");
        return;
      };
      setStrategy(strategyData.results);
    }
    getStrategyDetails();
  }, [id]);

  useEffect(() => {
    const getItemsData = async () => {
      if (strategy !== undefined) {
        const {
          cliente_codigo,
          material,
          material_codigo,
          plancha_fabricante,
          plancha_espesor,
          plancha_referencia,
          perfil_nombre,
          perfil_carpeta,
          perfil_tipo,
          nombrePCW,
          tipoTramado,
          curvaP,
          curvaC,
          codigo_estrategia
        } = strategy;

        const cliente = await fetchData("clients", cliente_codigo);
        const cliente_nombre = (cliente && cliente.length > 0) ? cliente[0].name : "";

        const perfil = perfil_nombre.split(".");
        const nombrePerfil = perfil[0] || "";
        const formatoPerfil = perfil[1] || "";

        const curvaPlotter = curvaP.split(".");
        const nombreCurvaPlotter = curvaPlotter[0] || "";
        const formatoCurvaPlotter = curvaPlotter[1] || "";

        const curvaCliche = curvaC.split(".");
        const nombreCurvaCliche = curvaCliche[0] || "";
        const formatoCurvaCliche = curvaCliche[1] || "";

        setItemsData({
          cliente_nombre,
          cliente_codigo,
          material: material,
          material_codigo,
          plancha_fabricante,
          plancha_espesor,
          plancha_referencia,
          perfil_nombre: nombrePerfil,
          perfil_formato: formatoPerfil,
          perfil_carpeta,
          perfil_tipo,
          curva_plotter_nombre: nombreCurvaPlotter,
          curva_plotter_formato: formatoCurvaPlotter,
          estrategia_nombre: nombrePCW,
          tramado: tipoTramado,
          curva_cliches_nombre: nombreCurvaCliche,
          curva_cliches_formato: formatoCurvaCliche,
          codigo_estrategia,
          _id: id
        })
      }
    }
    getItemsData();
  }, [strategy]);

  return (
    <>
      <div className="detailsContainer">
        <DetailsHeader
          title={`Estrategia ${strategy?.codigo_estrategia || ""}`}
          subtitle={`(${strategy?.cliente_codigo})`}
          endPoint={"strategies"}
          setEditPopup={setEditPopup}
          setDeletePopup={setDeletePopup}
          hideInfoIcon={true}
          hideAvatar={true}
          grid={true}
        />
        {editPopup && (
          <StrategyForm
            setModal={setEditPopup}
            mode={"edit"}
            itemsData={itemsData}
            clienteDato={{ name: itemsData.cliente_nombre, code: itemsData.cliente_codigo }}
            setStrategy={setStrategy}
          />
        )}
        {(deletePopup && isAdmin) && (
          <DeleteForm
            setModal={setDeletePopup}
            tableInfo={strategyTableInfo}
            id={id}
          />
        )}
        <div className="detailsScroll">
          {strategy ? (
            <div className="formSections">
              {strategyFormData.formSections.map((section) => (
                <div key={section.title} className="formSection">
                  <FormSection
                    sectionData={section}
                    formFields={strategyFormData.formFields}
                    inputData={itemsData}
                    disable={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="executingContainer">
              <BlinkBlur variant="dotted" color="var(--highlight)" size="large" speedPlus="0" />
              <h1>Cargando</h1>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default StrategyDetails
