import GeneralForm from "./GeneralForm"
import { strategyFormData } from "../../helpers/formsData";
import { useEffect, useState } from "react";
import GeneralPopUp from "../GeneralPopUp";
import ListWithSearch from "../ListWithSearch";
import ExecutingComponent from "../ExecutingComponent";
import { fetchDataNoLimits } from "../../helpers/fetchData";

function StrategyForm({ setModal, mode, itemsData, clienteDato }) {
    const clickableSections = strategyFormData.formSections.filter(section => section.key !== "cliente");
    const [strategyData, setStrategyData] = useState({});
    const [strategyPopUp, setStrategyPopUp] = useState(false);
    const [popUpList, setPopUpList] = useState([]);
    const [popUpTitle, setPopUpTitle] = useState("");
    const [clickedSection, setClickedSection] = useState(null);

    const handleSectionClick = async (section) => {
        setStrategyPopUp(true);
        setPopUpTitle(section.title);
        if (section.key !== clickedSection) {
            const result = await fetchDataNoLimits(`strategies/${section.key}`);
            setPopUpList(result);
        }
        setClickedSection(section.key);
    };

    const handleListClick = (item) => {
        console.log(item);
        console.log(clickedSection);
    };

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
            />
        ) : (
            popUpList.length > 0 ? (
                <GeneralPopUp
                    setPopUp={setStrategyPopUp}
                    popUp={strategyPopUp}
                    headerTitle={popUpTitle}
                    headerIcon={strategyFormData.headerIcon}
                >
                    <ListWithSearch list={popUpList} onClickItem={handleListClick} />
                </GeneralPopUp>
            ) : (
                <ExecutingComponent message="Cargando..." />
            )
        )
    )
}

export default StrategyForm;