import React from 'react'
import GeneralForm from '../../../components/formComponents/GeneralForm';
import { desasignarPedidoFormData } from '../config/order.config';

function SignJobForm({ setSignJobModal, fullOrder }) {
    const signJobData = {
        pedidos: [fullOrder]
    }

    return (
        <GeneralForm
            setModal={setSignJobModal}
            formData={desasignarPedidoFormData}
            itemsData={signJobData}
            endpoint={"orders/desasignarPedido"}
            submitText={"Firmar Pedido"}
        />
    )
}

export default SignJobForm;