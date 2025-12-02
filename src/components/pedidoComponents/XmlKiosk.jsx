import { useState } from 'react';
import { xmlFormData } from '../../helpers/formsData'
import GeneralForm from '../formComponents/GeneralForm'

function XmlKiosk({ setXmlModal, fullOrder }) {
    const [formData, setFormData] = useState(xmlFormData);
    const trapping = fullOrder.xml.tecnicos.trapping;
    const distancia_trapping = (trapping === "" || typeof trapping === "object") ? 0 : trapping.replace(" mm", "").replace(",", ".");

    const [xmlData, setXmlData] = useState({
        entradaUnitario: "Illustrator",
        hacerTrapping: "noTrapping",
        hacerSeparaciones: "noSeparaciones",
        hacerMontaje: "noMontaje",
        compararVersion: "noComparar",
        canalDel: "noEliminar",
        rasterizar: "siBoceto",
        paradaFreecut: false,
        archivoXml: fullOrder.archivoXml,
        id_pedido: fullOrder.id_pedido,
        _id: fullOrder._id,
        distancia_trapping,
        intensidad: "100",
        remetido: "No",
        distancia_remetido: "0"
    });

    const afterSubmit = () => {
        setXmlModal(false);
        window.open("http://192.4.26.120:9090/portal.cgi?hub&topbar=true", "_blank");
    }

    const handleFormChange = (updatedInputData) => {
        if (updatedInputData.hacerTrapping === "siAuto") {
            if (!formData.formFields.some(field => field.htmlFor === "distancia_trapping")) {
                setFormData(prev => ({
                    ...prev,
                    formFields: [
                        ...prev.formFields,
                        {
                            htmlFor: "distancia_trapping",
                            labelId: "distancia_trappingLabel",
                            labelTitle: "Distancia Trapping",
                            inputType: "number",
                            minNumber: 0,
                            inputId: "distancia_trapping",
                            inputName: "distancia_trapping"
                        },
                        {
                            htmlFor: "intensidad",
                            labelId: "intensidadLabel",
                            labelTitle: "Intensidad",
                            inputType: "number",
                            minNumber: 0,
                            maxNumber: 100,
                            inputId: "intensidad",
                            inputName: "intensidad"
                        },
                        {
                            htmlFor: "remetido",
                            labelId: "remetidoLabel",
                            labelTitle: "Remetido",
                            select: "simple",
                            options: [
                                "No",
                                "Planas",
                                "Negro",
                                "Todos"
                            ],
                            inputId: "remetido",
                            inputName: "remetido"
                        },
                        {
                            htmlFor: "distancia_remetido",
                            labelId: "distancia_remetidoLabel",
                            labelTitle: "Distancia Remetido",
                            inputType: "number",
                            minNumber: 0,
                            inputId: "distancia_remetido",
                            inputName: "distancia_remetido"
                        },
                    ]
                }));
            }
        } else if (updatedInputData.hacerTrapping !== "siAuto") {
            if (formData.formFields.some(field => field.htmlFor === "distancia_trapping")) {
                setFormData(prev => ({
                    ...prev,
                    formFields: prev.formFields.filter(field => !["distancia_trapping", "intensidad", "remetido", "distancia_remetido"].includes(field.htmlFor))
                }));
            }
        }

        setXmlData(prev => ({
            ...prev,
            ...updatedInputData,
            // Reestablece los valores de los 4 campos cuando se ocultan al seleccionar otra opcion que no sea Automático
            ...(updatedInputData.hacerTrapping !== "siAuto" && {
                distancia_trapping,
                intensidad: "100",
                remetido: "No",
                distancia_remetido: "0"
            })
        }));
    }

    return (
        <GeneralForm
            setModal={setXmlModal}
            formData={formData}
            itemsData={xmlData}
            endpoint={"orderKiosks/lanzarXml"}
            submitText={"Iniciar Tarea"}
            afterSubmit={afterSubmit}
            onInputChange={handleFormChange}
        />
    )
}

export default XmlKiosk