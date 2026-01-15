import GeneralForm from './GeneralForm'
import { descontarProductoFormData } from '../../helpers/formsData'
import { useEffect, useState } from 'react';
import { useSession } from '../../context/SessionContext';

function DescontarProductoForm({ setModal, producto, setTableData }) {
    const { session } = useSession();
    const username = session?.username || '';
    const [formData, setFormData] = useState(descontarProductoFormData);
    const itemsData = {
        id_producto: producto.id,
        id_estado: producto.id_estado,
        producto: producto.nombre,
        estado_nombre: producto.estado_nombre,
        id_departamento: producto.id_departamento,
        departamento_nombre: producto.departamento_nombre,
        stock_min: producto.stock_min,
        cantidad: producto.cantidad,
        username
    }

    useEffect(() => {
        const departamento = producto.departamento_nombre;
        setFormData(prev => ({
            ...prev,
            formFields: prev.formFields.map(field => {
                if (field.inputName === "departamento_nombre") {
                    return {
                        ...field,
                        options: [departamento]
                    }
                }
                return field;
            })
        }));
    }, [producto]);

    return (
        <GeneralForm
            setModal={setModal}
            formData={formData}
            itemsData={itemsData}
            endpoint={"stockProducts/descontar"}
            setTableData={setTableData}
            submitText={"Confirmar"}
        />
    )
}

export default DescontarProductoForm