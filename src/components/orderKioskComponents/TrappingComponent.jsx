import Switch from '@mui/material/Switch';
import { trappingFormData } from '../../helpers/orderKioskActions'
import FormSection from '../formComponents/FormSection'

function TrappingComponent({ trappingData, setTrappingData }) {
    const handleForm = (e) => {
        const { name, type, value, checked } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        setTrappingData(prev => ({
            ...prev,
            [name]: newValue
        }));
    }

    return (
        <div className="actionBody">
            <div className="trappingKiosk">
                <div className="switches">
                    <div className="switchGroup">
                        <Switch
                            className="kioskSwitch"
                            checked={trappingData.manual || false}
                            onChange={e => {
                                setTrappingData(prev => ({
                                    ...prev,
                                    manual: e.target.checked
                                }));
                            }}
                        />
                        <p>Manual</p>
                    </div>
                </div>
                {!trappingData.manual && (
                    <div className="formSections">
                        {trappingFormData.formSections.map((section, index) => (
                            <div className="formSection" key={index}>
                                <FormSection
                                    sectionData={section}
                                    formFields={trappingFormData.formFields}
                                    inputData={trappingData}
                                    handleForm={handleForm}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TrappingComponent