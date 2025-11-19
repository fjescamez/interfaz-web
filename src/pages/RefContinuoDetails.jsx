import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneItem } from '../helpers/fetchData';
import DetailsHeader from '../components/DetailsHeader';
import RefContinuoForm from '../components/formComponents/RefContinuoForm';
import { refContinuosFormData } from '../helpers/formsData';
import FormSection from '../components/formComponents/FormSection';
import DeleteForm from '../components/formComponents/DeleteForm';
import { refContinuosTableInfo } from '../helpers/tablesInfo';

function RefContinuoDetails() {
    const { id } = useParams();
    const [refContinuo, setRefContinuo] = useState({});
    const [editPopup, setEditPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);

    const inputData = {
        propietario: refContinuo.propietario || "",
        tipo: refContinuo.tipo || "",
        ancho: refContinuo.ancho || "",
        desarrollo: refContinuo.desarrollo || "",
        nucleo: refContinuo.nucleo || "",
        adaptador: refContinuo.adaptador || "",
        stock: refContinuo.stock || "",
        observaciones: refContinuo.observaciones || "",
    }

    const getRefContinuo = async () => {
        const response = await fetchOneItem("refProduccion/refContinuos", id);

        setRefContinuo(response);
    }

    useEffect(() => {
        getRefContinuo();
    }, [id]);

    return (
        <div className="detailsContainer">
            <DetailsHeader
                title={`Continuo ${refContinuo?.propietario} - ${refContinuo?.tipo} - ${refContinuo?.desarrollo}`}
                hideAvatar={true}
                setEditPopup={setEditPopup}
                setDeletePopup={setDeletePopup}
            />
            {editPopup && (
                <RefContinuoForm
                    setModal={setEditPopup}
                    mode={'edit'}
                    continuo={refContinuo}
                    setData={setRefContinuo}
                />
            )}
            {deletePopup && (
                <DeleteForm
                    setModal={setDeletePopup}
                    tableInfo={refContinuosTableInfo}
                    id={id}
                />
            )}
            <div className="detailsScroll">
                <div className="formSections">
                    {refContinuosFormData.formSections.map((section) => (
                        <div key={section.title} className="formSection">
                            <FormSection
                                sectionData={section}
                                formFields={refContinuosFormData.formFields}
                                inputData={inputData}
                                disable={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RefContinuoDetails