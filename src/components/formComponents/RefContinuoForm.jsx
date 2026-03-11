import { refContinuosFormData } from '../../helpers/formsData';
import GeneralForm from './GeneralForm'

function RefContinuoForm({ setModal, mode, setTableData, setTotal, setData, continuo }) {
  let refContinuoData = {};
  let { propietario, tipo, ancho, desarrollo, nucleo, adaptador, stock, observaciones } = continuo || {};

  if (mode && mode === 'edit') {
    refContinuoData = {
      propietario: propietario || '',
      tipo: tipo || '',
      ancho: ancho || '',
      desarrollo: desarrollo || '',
      nucleo: nucleo || '',
      adaptador: adaptador || false,
      stock: stock || '',
      observaciones: observaciones || ''
    }
  } else {
    refContinuoData = {
      propietario: '',
      tipo: '',
      ancho: '',
      desarrollo: '',
      nucleo: '',
      adaptador: false,
      stock: '',
      observaciones: ''
    }
  }

  return (
    <GeneralForm
      setModal={setModal}
      formData={refContinuosFormData}
      itemsData={refContinuoData}
      endpoint={'refProduccion/refContinuos'}
      setTableData={setTableData}
      setTotal={setTotal}
      setData={setData}
      mode={mode}
      _id={continuo?.id}
    />
  )
}

export default RefContinuoForm