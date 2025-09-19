import Plotter from '../../assets/svg/Plotter'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import ExecutingComponent from '../ExecutingComponent'
import GeneralForm from '../formComponents/GeneralForm'
import { gmgFormData } from '../../helpers/formsData'
import { useEffect, useState } from 'react'

function PlotterKiosk({ setPlotterKiosk, tareaGmg, setTareaGmg }) {
    const [formData, setFormData] = useState(gmgFormData);
    const [gmgData, setGmgData] = useState({
        configuracion: "Automática",
        rotacion: "No"
    });

    const handleFormChange = (updatedInputData) => {
        if (updatedInputData.configuracion === "Manual") {
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
                            hideField: false
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

        if (updatedInputData.rotacion) {
            setGmgData(prev => ({ ...prev, rotacion: updatedInputData.rotacion }));
        }

        if (updatedInputData.tipo) {
            setGmgData(prev => ({ ...prev, tipo_iso: updatedInputData.tipo }));
        }

        if (updatedInputData.iso) {
            setGmgData(prev => ({ ...prev, iso: updatedInputData.iso }));
        }
    }

    useEffect(() => {
        if (tareaGmg) {
            setGmgData(prev => ({
                ...prev,
                curva: tareaGmg.curva,
                perfilColor: tareaGmg.perfil,
                cliente: tareaGmg.cliente,
                carpeta: tareaGmg.carpeta,
                id_pedido: tareaGmg.id_pedido,
                archivo: tareaGmg.archivo,
                id_archivo: tareaGmg.id_archivo,
                material: tareaGmg.material,
                estrategia: tareaGmg.estrategia,
                perfil_iso: tareaGmg.perfil_iso
            }))
        }
    }, [tareaGmg]);

    useEffect(() => {
        if (tareaGmg) {
            /* setFormData(prev => ({
                ...prev,
                formFields: prev.formFields.map(field => {
                    if (field.htmlFor === "tipo") {
                        return {
                            ...field,
                            options: [tareaGmg.tipo]
                        }
                    }
                    return field
                })
            })); */
            setGmgData(prev => ({ ...prev, tipo: tareaGmg.tipo }))
        }
    }, []);

    return (
        <>
            {(tareaGmg && formData && gmgData.perfilColor) ?
                <div className="popUpTable ripPopUp">
                    <div className="header">
                        <Plotter />
                        <p>TAREA GMG</p>
                        <IoMdCloseCircleOutline className="close"
                            onClick={() => {
                                setPlotterKiosk(false);
                                setTareaGmg(undefined);
                            }}
                        />
                    </div>
                    <div className="ripContainer">
                        <GeneralForm
                            formData={formData}
                            itemsData={gmgData}
                            endpoint={"plotter/lanzarGmg"}
                            onInputChange={handleFormChange}
                        />
                    </div>
                </div>
                :
                <ExecutingComponent />
            }
        </>
    )
}

export default PlotterKiosk