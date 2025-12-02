import Plotter from '../../assets/svg/Plotter'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import GeneralForm from '../formComponents/GeneralForm'
import { gmgFormData } from '../../helpers/formsData'
import { useEffect, useState } from 'react'

function PlotterKiosk({ setPlotterKiosk, tareaGmg, setTareaGmg }) {
    const [formData, setFormData] = useState(gmgFormData);
    const [gmgData, setGmgData] = useState({
        rotacion: "No"
    });

    const handleFormChange = (updatedInputData) => {
        if (updatedInputData.rotacion) {
            setGmgData(prev => ({ ...prev, rotacion: updatedInputData.rotacion }));
        }

        if (updatedInputData.configuracion === "Automática") {
            setGmgData(prev => ({
                ...prev,
                configuracion: "Automática",
                tipo: tareaGmg.tipo,
                curva: tareaGmg.curva,
                perfil: tareaGmg.perfil
            }))
        } else if (updatedInputData.configuracion === "ISO Continuo Certificado") {
            setGmgData(prev => ({
                ...prev,
                configuracion: "ISO Continuo Certificado",
                tipo: "Continuo Certificado",
                curva: "",
                perfil: "ISO Coated V2 (39L)"
            }))
        } else if (updatedInputData.configuracion === "ISO Tramado") {
            setGmgData(prev => ({
                ...prev,
                configuracion: "ISO Tramado",
                tipo: "Tramado",
                curva: "",
                perfil: "ISO Coated V2 (39L)"
            }))
        } else if (updatedInputData.configuracion === "ISO Continuo") {
            setGmgData(prev => ({
                ...prev,
                configuracion: "ISO Continuo",
                tipo: "Continuo",
                curva: "",
                perfil: "ISO Coated V2 (39L)"
            }))
        }
    }

    useEffect(() => {
        if (tareaGmg) {
            setFormData(prev => ({
                ...prev,
                formFields: prev.formFields.map((field) => {
                    if (field.htmlFor === "configuracion") {
                        return {
                            ...field,
                            options: tareaGmg.options || [
                                "Automática",
                                "ISO Continuo Certificado",
                                "ISO Tramado",
                                "ISO Continuo"]
                        }
                    }
                    return field;
                })
            }));

            setGmgData(prev => ({
                ...prev,
                configuracion: tareaGmg.configuracion || "ISO Continuo",
                tipo: tareaGmg.tipo,
                curva: tareaGmg.curva,
                perfil: tareaGmg.perfil,
                estrategia: tareaGmg.estrategia,
                fileItem: tareaGmg.fileItem,
                registroPedido: tareaGmg.registroPedido
            }))
        }
    }, [tareaGmg]);

    return (
        <>
            {(tareaGmg && gmgData.perfil) &&
                <GeneralForm
                    setModal={setPlotterKiosk}
                    formData={formData}
                    itemsData={gmgData}
                    endpoint={"plotter/lanzarGmg"}
                    onInputChange={handleFormChange}
                    submitText={"Imprimir"}
                />
            }
        </>
    )
}

export default PlotterKiosk