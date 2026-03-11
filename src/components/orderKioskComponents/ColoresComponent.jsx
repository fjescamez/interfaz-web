import { useEffect } from 'react'
import FormGroup from '../formComponents/FormGroup';

function ColoresComponent({ state, updateState, formData, colores, setColoresList, inputData, setInputData }) {
    const handleForm = (e) => {
        const { name, type, value, checked } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        setInputData(prev => ({
            ...prev,
            [name]: newValue
        }));
    }

    useEffect(() => {
        const generateColoresForm = () => {
            const formSections = [
                {
                    rows: [
                        ...state.orderColors.map((color) => {
                            return {
                                groups: [color]
                            }
                        })
                    ]
                }
            ];

            updateState("coloresForm", {
                formSections,
                formFields: [
                    ...state.orderColors.map((color) => ({
                        htmlFor: `${color}`,
                        labelId: `${color}Label`,
                        labelTitle: `${color}`,
                        inputType: "checkbox",
                        inputId: `${color}`,
                        inputName: `${color}`
                    }))
                ]
            });
        };

        const generateColoresDigimarkForm = () => {
            const formSections = [
                {
                    rows: [
                        ...state.orderColors.map((color) => {
                            return {
                                groups: [`${color}_Digimark`]
                            }
                        })
                    ]
                }
            ];

            updateState("coloresDigimarkForm", {
                formSections,
                formFields: state.orderColors.map((color) => ({
                    htmlFor: `${color}_Digimark`,
                    labelId: `${color}_DigimarkLabel`,
                    labelTitle: `${color}`,
                    inputType: "checkbox",
                    inputId: `${color}_Digimark`,
                    inputName: `${color}_Digimark`
                }))
            });
        };

        if (state.orderColors.length > 0) {
            generateColoresForm();
            generateColoresDigimarkForm();
        }
    }, [state.orderColors]);

    useEffect(() => {
        setColoresList(
            Object.keys(inputData).filter(key => inputData[key])
                .map(key => {
                    const colorName = key.replace("_Digimark", "");
                    return colores.find(color => color === colorName);
                })
        )
    }, [inputData]);

    const selectAll = (e) => {
        const allSelected = formData.formFields.every(field => inputData[field.inputName]);

        const newInputData = {};
        formData.formFields.forEach(field => {
            newInputData[field.inputName] = !allSelected;
        });

        setInputData(prev => ({
            ...prev,
            ...newInputData
        }));
    }

    return (
        <div className="actionBody">
            {formData ? (
                <div className="kioskColoresForm">
                    <button className="selectAll" onClick={selectAll}>
                        {formData.formFields.every(field => inputData[field.inputName]) ? "Deseleccionar Todo" : "Seleccionar Todo"}
                    </button>
                    {formData.formFields.map((field, index) => (
                        <div className="formGroup formGroupRow" key={index}>
                            <FormGroup
                                value={inputData[field.inputName]}
                                handleForm={handleForm}
                                field={field}
                            />
                        </div>
                    ))}
                </div>
            ) : null}
            {colores.length === 0 && (
                <p className="noColors">Este pedido no tiene colores</p>
            )}
        </div>
    )
}

export default ColoresComponent