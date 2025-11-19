import { useState } from "react";
import Table from "../components/Table.jsx";
import { contactTableInfo } from "../helpers/tablesInfo.jsx";
import { postData } from "../helpers/fetchData.jsx";
import { notify } from "../helpers/notify.jsx";
import { toast } from "react-toastify";
import GroupForm from "../components/formComponents/GroupForm.jsx";
import { useClienteFilter } from "../context/ClientFilterContext.jsx";
import { useLocation } from "react-router-dom";

function ContactsPage({ filter }) {
    const [contactIds, setContactIds] = useState([]);
    const [groupPopUp, setGroupPopUp] = useState(false);
    const location = useLocation();
    const { clienteDatos } = useClienteFilter();
    const clienteDato = clienteDatos[location.pathname] || null;

    const contactsActions = async (variables) => {
        const { action } = variables;
        if (action === "crearGrupo") {
            setGroupPopUp(true);
            /* const response = await postData("groups", contactIds);

            if (response.status === "success") {
                notify(toast.success, 'success', 'Operación exitosa', 'El grupo se ha creado correctamente');
                setContactIds([]);
            } else {
                notify(toast.error, 'error', 'Error', 'Ha ocurrido un error al crear el grupo');
            } */
        }
        return { status: "success" };
    }

    return (
        <>
            <Table
                actions={contactsActions}
                clientFilter={filter}
                dinamicTableInfo={contactTableInfo}
                checkedRows={contactIds}
                setCheckedRows={setContactIds}
                publicForm={true}
                tabTitleTemplate={"{contacto}"}
                specificPath={`/${contactTableInfo.tableName}`}
            />
            {groupPopUp &&
                <GroupForm
                    setModal={setGroupPopUp}
                    clienteDato={clienteDato}
                    contacts={contactIds}
                />
            }
        </>
    )
}

export default ContactsPage