import "../../../pages/KioscoPage.css";
import { listActions, kioskActions, defaultConfigExportPdf } from "../config/paction.config";
import { useEffect, useEffectEvent, useMemo, useState } from "react";

import UnitarioComponent from "../../../components/orderKioskComponents/UnitarioComponent";
import CabeceraModulos from "../../../components/orderKioskComponents/CabeceraModulos";
import SubmitButton from "../../../components/buttons/SubmitButton";

import { fetchOneItem, postData } from "../../../helpers/fetchData";
import { notify } from "../../../helpers/notify";

import DetailsHeader from "../../../components/DetailsHeader";
import ChosenSelect from "../../../components/formComponents/ChosenSelect";

import { useTabState } from "../../../context/TabStateContext";
import { useLocation, useParams } from "react-router-dom";

import { Tooltip as ReactTooltip } from "react-tooltip";
import ExportPdfForm from "../components/ExportPdfForm";
import PactionsSubmitButton from "../components/PactionsSubmitButton";
import ReporteComponent from "../../../components/orderKioskComponents/ReporteComponent";

function PactionsPage({ configMode }) {
  const { id } = useParams();
  const location = useLocation();
  const tabKey = location.pathname;
  const { getTabState, postDataContext } = useTabState();
  const [configExportPdf, setConfigExportPdf] = useState(defaultConfigExportPdf);
  const [actionsAdded, setActionsAdded] = useState([]);

  const [state, setState] = useState(() =>
    getTabState(tabKey) || {
      listActions: listActions,
      chosenKiosk: "",
      step: 1,
      order: null,
      orderXml: null,
      unitarios: [],
      unitarioData: { archivo: null },
      loadingFileReport: false,
      runningExport: false,
      isActive: { unitario: true, reportePrevio: false, exportPdf: false, analyze: false },
      isOpen: { unitario: true, reportePrevio: false, exportPdf: false, analyze: false },
      orderReport: [],
      fileReport: [],
      meta_data: {},
    }
  );

  const addActions = () => {
    const { chosenKiosk = "Exportar PDF" } = state;

    if (chosenKiosk === "Exportar PDF") {
      updateState(prev => ({
        ...prev,
        isOpen: {
          ...prev.isOpen,
          exportPdf: true
        },
        isActive: {
          ...prev.isActive,
          exportPdf: true
        }
      }));

    } else if (chosenKiosk === "Analizar y Corregir") {
      updateState(prev => ({
        ...prev,
        isOpen: {
          ...prev.isOpen,
          analyze: true
        },
        isActive: {
          ...prev.isActive,
          analyze: true
        }
      }));
    }
  }

const updateState = (keyOrUpdater, value) => {
  if (typeof keyOrUpdater === "function") {
    setState(prev => {
      const next = keyOrUpdater(prev);
      return next ? { ...prev, ...next } : prev;
    });
    return;
  }

  if (typeof keyOrUpdater === "object") {
    setState(prev => ({ ...prev, ...keyOrUpdater }));
    return;
  }

  setState(prev => ({
    ...prev,
    [keyOrUpdater]: typeof value === "function"
      ? value(prev[keyOrUpdater], prev)
      : value
  }));
};

  // ---------------------------
  // LOAD ORDER
  // ---------------------------
  useEffect(() => {
    const loadOrder = async () => {
      const result = await fetchOneItem("orders/getOrder", id);

      updateState({
        order: result,
        orderXml: result?.xml || null
      });
    };

    if (!configMode) loadOrder();
  }, [id]);

  // ---------------------------
  // UNITARIOS
  // ---------------------------
  const getUnitarios = async (order) => {
    if (!order) return;

    const result = await postData("orderKiosks/getOrderFiles", order);
    const options = result?.options || [];

    updateState({ unitarios: options });

    const packz = options.filter(o => o.type === "Packz");
    const illustrator = options.filter(o => o.type === "Illustrator");

    let unitarioDefault = "";

    if (packz.length === 1) unitarioDefault = packz[0];
    else if (illustrator.length === 1 && packz.length === 0) {
      unitarioDefault = illustrator[0];
    }

    updateState({
      unitarioData: { archivo: unitarioDefault }
    });
  };

  useEffect(() => {
    if (state.order) getUnitarios(state.order);
  }, [state.order]);

  useEffect(() => {
    console.log("chosenKiosk", state.chosenKiosk)
  }, [state.chosenKiosk])

  // ---------------------------
  // COMPONENTS MAP (SIN JSX)
  // ---------------------------
  const components = useMemo(() => ({
    unitario: UnitarioComponent,
    reportePrevio: ReporteComponent,
    exportPdf: ExportPdfForm,
    analyze: ExportPdfForm
  }), []);

  const activeActions = useMemo(() => {
    return kioskActions.filter(option =>
      state.isActive?.[option.id] && components?.[option.id]
    );
  }, [state.isActive]);

  // ---------------------------
  // HANDLE REPORT
  // ---------------------------
  const handleReport = async (action) => {
    if (!state.unitarioData?.archivo) {
      notify("error", "Falta archivo", "Selecciona un unitario");
      return;
    }

    updateState({
      loadingFileReport: true,
      isOpen: {
        ...state.isOpen,
        unitario: false,
      },
      isActive: {
        ...state.isActive,
        reportePrevio: true
      }
    });

    const dataToReport = {
      order: state.order,
      id_pedido: state.order.id_pedido,
      unitario: state.unitarioData.archivo,
      onlyMetadata: true,
      forceReport: action === "forceReport"
    };

    await postDataContext(
      "orderKiosks/fileReportPaction",
      dataToReport,
      (res) => {
        updateState(prev => ({
          ...prev,
          meta_data: {
            ...prev.meta_data,
            ...(res.meta_data || {})
          },
          loadingFileReport: false,
          step: 2,

          isOpen: {
            ...prev.isOpen,
            exportPdf: true
          },
          isActive: {
            ...prev.isActive,
            exportPdf: true
          }

        }));
      },
      (err) => {
        updateState(prev => ({
          ...prev,
          loadingFileReport: false,
          fileReport: [
            {
              status: "error",
              message: "No se ha podido generar el reporte del archivo."
            }
          ]
        }));

        notify(
          "error",
          err?.title || "Error",
          "Ha ocurrido un error inesperado al generar el reporte."
        );
      }
    );
  };

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <div className="detailsContainer">
      <ReactTooltip id="my-tooltip" />

      <DetailsHeader
        title="Pactions"
        subtitle="Acciones Programadas de Packz"
        insteadOfActions={
          <div className="formGroup">
            {state.step !== 1 && (
              <>

                <label>Listado de Acciones:</label>

                <ChosenSelect
                  options={state.listActions || []}
                  name="kioskSelect"
                  value={state.chosenKiosk || ""}
                  onChange={(e) =>
                    updateState({ chosenKiosk: e.target.value })
                  }
                />
                {/*
                <SubmitButton onClick={addActions} text="+" />
                */}

              </>
            )}
          </div>
        }
      />

      <div className="detailsKiosk">
        {activeActions.map(option => {
          const Comp = components?.[option.id];

          return (
            <div className="kioskAction" key={option.id}>
              <CabeceraModulos
                state={state}
                updateState={updateState}
                option={option}
                components={components}
                configMode={configMode}
              />

              {state.isOpen?.[option.id] && Comp && (
                option.id === "unitario" ? (
                  <Comp
                    unitarios={state.unitarios}
                    unitarioData={state.unitarioData}
                    setUnitarioData={(value) =>
                      updateState({ unitarioData: value })
                    }
                    order={state.order}
                  />
                ) : option.id === "exportPdf" ? (
                  <Comp
                    state={state}
                    updateState={updateState}
                    config={configExportPdf}
                    setConfig={setConfigExportPdf}
                  />
                ) : option.id === "reportePrevio" ? (
                  <Comp
                    loadingOrderReport={false}
                    loadingFileReport={state.loadingFileReport}
                    orderReport={state.orderReport}
                    fileReport={state.fileReport}
                  />
                ) : null
              )}
            </div>
          );
        })}

        <div className="buttons">
          {!state.loadingFileReport && (
            state.step === 1 ? (
              <SubmitButton onClick={handleReport} text="Siguiente ▶" />
            ) : state.step === 2 || !state.runningExport ? (
              <PactionsSubmitButton
                state={state}
                configExportPdf={configExportPdf}
                updateState={updateState}
                components={components}
                buttonAction="submit"
                buttonText="Ejecutar ▶"
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default PactionsPage;