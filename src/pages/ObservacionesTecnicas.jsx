import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { fetchOneItem } from '../helpers/fetchData'
import { notify } from '../helpers/notify'
import DetailsHeader from '../components/DetailsHeader'
import { observacionesTecnicasFormData } from '../helpers/formsData'
import FormSection from '../components/formComponents/FormSection'

function ObservacionesTecnicas() {
    const location = useLocation();
    const { id } = useParams();
    const [orderData, setOrderData] = useState(undefined);
    const [itemsData, setItemsData] = useState({});

    useEffect(() => {
        const loadOrderData = async () => {
            try {
                // Verificar si la información viene del state (desde OrderDetails)
                if (location.state?.fullOrder) {
                    setOrderData(location.state.fullOrder);
                } else {
                    const data = await fetchOneItem("orders/getOrder", id)
                    if (data) {
                        setOrderData(data);
                    } else {
                        notify("error", "Error", "No se pudo cargar la información de las observaciones técnicas");
                    }
                }
            } catch (error) {
                notify("error", "Error", "Ha ocurrido un error al cargar los datos")
            }
        }
        loadOrderData()
    }, [id, location.state])

    useEffect(() => {
        if (orderData !== undefined) {
            const { xml } = orderData;
            const { tecnicos, car_cliche } = xml;

            setItemsData({
                obs_dpto_dibujo: tecnicos?.obs_dpto_dibujo,
                cliche_nuevo: car_cliche?.cliche_nuevo === "X",
                reparacion_cliche: car_cliche?.reparacion_cliche === "X",
                cliche_rotado: car_cliche?.cliche_rotado === "X",
                cliche_caping: car_cliche?.cliche_caping === "X",
                cliche_compensado: car_cliche?.cliche_compensado === "X",
                cliche_mixto: car_cliche?.cliche_mixto === "X",
                cliche_mtjcompen: car_cliche?.cliche_mtjcompen === "X",
                cliche_descompen: car_cliche?.cliche_descompen === "X",
                cliche_mtjdirecto: car_cliche?.cliche_mtjdirecto === "X",
                obs_dpto_cliche: tecnicos?.obs_dpto_cliche,
                tirada_camisas: tecnicos?.tirada_camisas,
                distancia_varilla: tecnicos?.distancia_varilla,
                varilla: tecnicos?.varilla,
                contravarilla: tecnicos?.contravarilla,
                poliester: tecnicos?.poliester,
                formato_montaje: tecnicos?.formato_montaje,
                obs_dpto_montaje: tecnicos?.obs_dpto_montaje
            })
        }
    }, [orderData]);

    return (
        <>
            <div className="detailsContainer">
                <DetailsHeader
                    title={"Observaciones Técnicas"}
                    subtitle={"Pedido " + orderData?.id_pedido}
                    /* toggleKiosk={toggleKiosk}
                    kioskData={client}
                    setEditPopup={setEditPopup}
                    showInfo={showInfo}
                    setShowInfo={setShowInfo} */
                    hideEditIcon={true}
                    hideAvatar={true}
                    hideDeleteIcon={true}
                />
                <div className="detailsScroll">
                    <div className="formSections">
                        {observacionesTecnicasFormData.formSections.map((section) => (
                            <div key={section.title} className="formSection">
                                <FormSection
                                    sectionData={section}
                                    formFields={observacionesTecnicasFormData.formFields}
                                    inputData={itemsData}
                                    disable={true}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ObservacionesTecnicas
