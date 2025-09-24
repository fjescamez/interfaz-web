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

        /* if (updatedInputData.configuracion === "Manual") {
            setGmgData(prev => ({ ...prev, configuracion: "Manual" }));
            setFormData(prev => ({
                ...prev,
                formFields: prev.formFields.map(field => {
                    if (field.htmlFor === "tipo_iso") {
                        return {
                            ...field,
                            hideField: false
                        }
                    }
                    if (field.htmlFor === "curva") {
                        setGmgData(prev => ({ ...prev, curva: "" }));
                        return { ...field, hideField: true };
                    }
                    if (field.htmlFor === "perfilColor") {
                        setGmgData(prev => ({ ...prev, perfilColor: tareaGmg.perfil_iso }));
                    }
                    if (field.htmlFor === "tipo") {
                        return { ...field, hideField: true };
                    }
                    if (field.inputName === "iso") {
                        return { ...field, hideField: false };
                    }
                    return field;
                })
            }))
        } else if (updatedInputData.configuracion === "Automática") {
            // Resetear si vuelve a "Automática"
            setGmgData(prev => ({ ...prev, configuracion: "Automática" }));
            setFormData(prev => ({
                ...prev,
                formFields: prev.formFields.map(field => {
                    if (field.htmlFor === "tipo") {
                        return {
                            ...field,
                            options: tareaGmg.tipo
                        }
                    }
                    if (field.inputName === "tipo_iso") {
                        return { ...field, hideField: true };
                    }
                    if (field.htmlFor === "curva") {
                        setGmgData(prev => ({ ...prev, curva: tareaGmg.curva }));
                        return { ...field, hideField: false };
                    }
                    if (field.htmlFor === "perfilColor") {
                        setGmgData(prev => ({ ...prev, perfilColor: tareaGmg.perfil }));
                    }
                    if (field.inputName === "iso") {
                        setGmgData(prev => ({ ...prev, iso: "" }))
                        return { ...field, hideField: true };
                    }
                    return field;
                })
            }));
        }

        if (updatedInputData.tipo) {
            setGmgData(prev => ({ ...prev, tipo_iso: updatedInputData.tipo_iso }));
        }

        if (updatedInputData.iso) {
            setGmgData(prev => ({ ...prev, iso: updatedInputData.iso }));
        } */
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
                // cliente: tareaGmg.cliente,
                // carpeta: tareaGmg.carpeta,
                // id_pedido: tareaGmg.id_pedido,
                // archivo: tareaGmg.archivo,
                // id_archivo: tareaGmg.id_archivo,
                // material: tareaGmg.material,
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
                />
            }
        </>
    )
}

export default PlotterKiosk