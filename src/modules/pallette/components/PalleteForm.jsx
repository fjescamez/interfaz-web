import { useEffect, useState } from "react";
import { palleteFormData, collection } from "../config/pallete.config";
import GeneralForm from "../../../components/formComponents/GeneralForm";
import { fetchData } from "../../../helpers/fetchData";
import { useSession } from "../../../context/SessionContext";

function PalleteForm({ setModal, mode, setTableData, setTotal, pallete, setPallete }) {
    const { session } = useSession();
    const [formData, setFormData] = useState(palleteFormData);
    const [palleteData, setPalleteData] = useState({});
    const f = new Date();

    const dia = String(f.getDate()).padStart(2, '0');
    const mes = String(f.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const anio = f.getFullYear();

    const hora = String(f.getHours()).padStart(2, '0');
    const min = String(f.getMinutes()).padStart(2, '0');
    const seg = String(f.getSeconds()).padStart(2, '0');

    const formato = `${dia}/${mes}/${anio} ${hora}:${min}`;
    const hideFields = ["modifiedBy", "modifiedIn"];

    useEffect(() => {
        if (mode === "edit" && pallete) {
            setPalleteData({
                description: pallete.description,
                type: pallete.type,
                l_value: pallete.l_value,
                a_value: pallete.a_value,
                b_value: pallete.b_value,
                modifiedBy: session.username,
                modifiedIn: formato,
                observations: pallete.observations,
            });
        } else {
            setPalleteData({
                description: "",
                type: "",
                l_value: "",
                a_value: "",
                b_value: "",
                modifiedBy: session.username,
                modifiedIn: formato,
                observations: "",
            });
        }
    }, [mode, pallete]);


    return (
        <GeneralForm
            collection={collection}
            formData={formData}
            itemsData={palleteData}
            setModal={setModal}
            endpoint={"contacts"}
            setTableData={setTableData}
            setTotal={setTotal}
            mode={mode}
            _id={pallete?._id}
            setData={setPallete}
            hideFields={hideFields}
        />
    );
}

export default PalleteForm;