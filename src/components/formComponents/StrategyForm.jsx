import GeneralForm from "./GeneralForm"
import { strategyFormData } from "../../helpers/formsData";
import { useEffect, useState } from "react";
import GeneralPopUp from "../GeneralPopUp";
import ListWithSearch from "../ListWithSearch";
import ExecutingComponent from "../ExecutingComponent";
import { fetchDataNoLimits, postData } from "../../helpers/fetchData";
import FormGroup from "./FormGroup";
import SubmitButton from "../buttons/SubmitButton";
import { notify } from "../../helpers/notify";

function StrategyForm({ setModal, mode, itemsData, clienteDato, setTableData, setTotal }) {
    const clickableSections = strategyFormData.formSections.filter(section => section.key !== "cliente");
    const [strategyData, setStrategyData] = useState({});
    const [strategyPopUp, setStrategyPopUp] = useState(false);
    const [popUpList, setPopUpList] = useState([]);
    const [popUpTitle, setPopUpTitle] = useState("");
    const [clickedSection, setClickedSection] = useState(null);

    const handleSectionClick = async (section) => {
        setStrategyPopUp(true);
        setPopUpTitle(section.title.toUpperCase());
        if (section.title.toUpperCase() !== popUpTitle) {
            setPopUpList([]);
            const result = await fetchDataNoLimits(`strategies/${section.key}`);
            setPopUpList(result);
        }
        if (section.key !== "estrategiasPCW") {
            setClickedSection(section.key);
        }
    };

    const handleListClick = async (item) => {
        if (popUpTitle === "ESTRATEGIAS PCW") {
            const formFields = strategyFormData.formSections.find(section => section.key === clickedSection).rows.flatMap(row => row.groups);
            const estrategia = await postData("strategies/readJson", { filePath: item.filePath, fileName: item.textoListado });

            formFields.forEach(field => {
                if (field !== "perfil_tipo") {
                    setStrategyData(prevData => ({
                        ...prevData,
                        [field]: estrategia[field]
                    }));
                }
            });
            setStrategyPopUp(false);
        } else {
            const formFields = strategyFormData.formSections.find(section => section.key === clickedSection).rows.flatMap(row => row.groups);
            if (clickedSection === "perfilColor" && !strategyData.perfil_tipo) {
                return notify('warning', 'Selecciona primero un tipo de perfil');
            }

            formFields.forEach(field => {
                if (field !== "perfil_tipo") {
                    setStrategyData(prevData => ({
                        ...prevData,
                        [field]: item[field]
                    }));
                }
            });
            setStrategyPopUp(false);
        }
    };

    useEffect(() => {
        console.log(strategyData);
    }, [strategyData]);

    useEffect(() => {
        if (itemsData) {
            setStrategyData(itemsData);
        } else {
            setStrategyData({
                cliente_nombre: clienteDato ? clienteDato.name : "",
                cliente_codigo: clienteDato ? clienteDato.code : ""
            });
        }
    }, []);

    return (
        !strategyPopUp ? (
            <GeneralForm
                setModal={setModal}
                formData={strategyFormData}
                itemsData={strategyData}
                endpoint={"strategies"}
                clienteDato={clienteDato}
                mode={mode}
                clickableSections={clickableSections}
                onClickSection={handleSectionClick}
                setTableData={setTableData}
                setTotal={setTotal}
            />
        ) : (
            popUpList.length > 0 ? (
                <GeneralPopUp
                    setPopUp={setStrategyPopUp}
                    popUp={strategyPopUp}
                    headerTitle={popUpTitle}
                    headerIcon={strategyFormData.headerIcon}
                >
                    {clickedSection === "perfilColor" && (
                        <div className="formGroup">
                            <FormGroup
                                handleForm={(e) => setStrategyData(prevData => ({
                                    ...prevData,
                                    perfil_tipo: e.target.value
                                }))}
                                value={strategyData.perfil_tipo || ""}
                                field={{
                                    htmlFor: "perfil_tipo",
                                    labelId: "perfil_tipoLabel",
                                    labelTitle: "Tipo Perfil",
                                    select: "simple",
                                    options: [
                                        "",
                                        "Tramado - Papel Semi mate",
                                        "Tramado - Papel Premium",
                                        "Continuo - Papel Semi mate",
                                        "Continuo Certificado - Papel Semi mate",
                                        "Continuo - Papel Premium",
                                        "Continuo Certificado - Papel Premium",
                                    ],
                                    inputId: "perfil_tipo",
                                    inputName: "perfil_tipo"
                                }}
                            />
                        </div>
                    )}
                    {clickedSection === "curvaCliches" && (
                        <SubmitButton
                            onClick={() => {
                                handleSectionClick({
                                    key: popUpTitle === "CURVA DE CLICHÉS" ? "estrategiasPCW" : "curvaCliches",
                                    title: popUpTitle === "CURVA DE CLICHÉS" ? "Estrategias PCW" : "Curva de Clichés"
                                })
                            }}
                            text={popUpTitle === "CURVA DE CLICHÉS" ? "Estrategias PCW" : "Curva de Clichés"}
                        />
                    )}
                    <ListWithSearch list={popUpList} onClickItem={handleListClick} />
                </GeneralPopUp>
            ) : (
                <ExecutingComponent message="Cargando..." />
            )
        )
    )
}

export default StrategyForm;