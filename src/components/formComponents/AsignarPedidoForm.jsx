import GeneralForm from './GeneralForm'
import { asignarPedidoFormData } from '../../helpers/formsData'
import { useEffect, useState } from 'react';
import { fetchData } from '../../helpers/fetchData';

function AsignarPedidoForm({ setModal, pedidos, setTableData }) {
    const [formData, setFormData] = useState(asignarPedidoFormData);

    const itemsData = {
        pedidos,
        dibujante: ""
    }

    const getDibujantes = async () => {
        const dibujantes = await fetchData("users", "dibujo");
        let options = [""];

        dibujantes.map(dibujante => {
            const nuevoDibujante = { ...dibujante, textoOpcion: `${dibujante.name} ${dibujante.lastname}` };
            options.push(nuevoDibujante);
        });

        setFormData(prev => ({
            ...prev,
            formFields: prev.formFields.map(field => {
                if (field.htmlFor === "dibujante") {
                    return {
                        ...field,
                        options
                    }
                }
                return field;
            })
        }));
    }

    useEffect(() => {
        getDibujantes();
    }, []);

    return (
        <GeneralForm
            setModal={setModal}
            formData={formData}
            itemsData={itemsData}
            endpoint={"orders/asignarPedido"}
            setTableData={setTableData}
        />
    )
}

export default AsignarPedidoForm;