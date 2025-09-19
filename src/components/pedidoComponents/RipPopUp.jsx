import { useEffect, useState } from "react"
import { ripTableInfo } from '../../helpers/tablesInfo';
import Table from "../Table"
import { fetchOneItem } from "../../helpers/fetchData";
// import PdfAsImage from "../pedidoComponents/PdfAsImage";
import { IoMdCloseCircleOutline } from "react-icons/io";
import MontajeSvg from "../../assets/svg/MontajeSvg";
import ExecutingComponent from "../ExecutingComponent";
import { ripFormData } from "../../helpers/formsData";
import GeneralForm from "../formComponents/GeneralForm";

function RipPopUp({ setRipModal, idMontaje, orderId }) {
    const [colorIds, setColorIds] = useState([]);
    const [montaje, setMontaje] = useState();

    const getMontaje = async () => {
        const response = await fetchOneItem("montajes", idMontaje);
        if (!response) {
            setRipModal(false);
        }
        setMontaje(response.results.archivo);
    }

    useEffect(() => {
        getMontaje();
    }, [])

    const ripActions = (action) => {
        console.log(action);
    };

    /* Variables para salida_rip
    array de tintas:
    ids[
        "686ccb159c470000f30051db",
        "686ccb159c470000f30051dd"
    ]
    accion (habrá que añadir tipoImpresion, curva y resolucion para más personalización):
    action"Rip Interior"
    extraInputs{
        id_pedido: "100237-2",
        archivo: "cloudflow://PEDIDOS_2025/ETIQUETAS/100237%20ATLANTICA%20ENRAIZA/PREIMPRESION/V2/MONTAJES/100237-2M%20ATLANTICA%20ENRAIZA.pdf",
        id_archivo: "100237-2M ATLANTICA ENRAIZA.pdf"
    }
    */

    const ripData = {
        ids: colorIds,
        action: "Rip Auto",
        extraInputs: {
            id_pedido: orderId,
            archivo: montaje,
            id_archivo: montaje ? montaje.replace("cloudflow://PEDIDOS_", "").split("/").pop() : ""
        }
    };

    return (
        <>
            <div className="overlay deleteForm"></div>
            {montaje ?
                <div className="popUpTable ripPopUp">
                    <div className="header">
                        <MontajeSvg />
                        <p>RIP MONTAJE</p>
                        <IoMdCloseCircleOutline className="close" onClick={() => setRipModal(false)} />
                    </div>
                    <div className="ripContainer">
                        {/* <div className="ripImage">
                            <PdfAsImage url={montaje.replace("cloudflow://", "").replace("PEDIDOS_", "Pedidos ")} />
                        </div> */}
                        <GeneralForm
                            formData={ripFormData}
                            itemsData={ripData}
                            endpoint={""}
                            tableSelection={colorIds}
                        />
                        <Table
                            actions={ripActions}
                            checkedRows={colorIds}
                            setCheckedRows={setColorIds}
                            dinamicTableInfo={ripTableInfo}
                            orderFilter={montaje}
                        />
                    </div>
                </div>
                :
                <ExecutingComponent />
            }
        </>
    )
}

export default RipPopUp