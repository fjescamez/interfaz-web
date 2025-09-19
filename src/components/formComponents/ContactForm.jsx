import { useEffect, useState } from "react";
import { contactFormData } from "../../helpers/formsData";
import GeneralForm from "./GeneralForm";
import { fetchData } from "../../helpers/fetchData";

function ContactForm({ setModal, mode, setTableData, setTotal, contact, setContact, clienteDato }) {
    const [formData, setFormData] = useState(contactFormData);
    let contactData = {};
    let { contacto, cliente_codigo, departamento, email, telefono, cliente_nombre, observaciones, _id } = contact || {};

    if (mode && mode === "edit") {
        contactData = {
            contacto,
            cliente_codigo,
            cliente_nombre,
            departamento,
            email,
            telefono,
            observaciones
        }
    } else {
        contactData = {
            contacto: "",
            cliente_codigo: clienteDato?.code ? clienteDato.code : "",
            cliente_nombre: clienteDato?.name ? clienteDato.name : "",
            departamento: "",
            email: "",
            telefono: "",
            observaciones: ""
        }
    }

    const setOptions = async () => {
        const clientes = await fetchData("clients/allClients");

        const clientNameOptions = clientes.map(c => c.name);
        const clientCodeOptions = clientes.map(c => c.code);

        const clientsMap = {};
        clientes.forEach(c => {
            clientsMap[c.name] = c.code;
        });

        const codesMap = clientsMap
            ? Object.fromEntries(Object.entries(clientsMap).map(([name, code]) => [code, name]))
            : {};

        setFormData(prev => ({
            ...prev,
            formFields: prev.formFields.map(field => {
                if (field.htmlFor === "cliente_nombre") {
                    return {
                        ...field,
                        options: clientNameOptions
                    }
                } else if (field.htmlFor === "cliente_codigo") {
                    return {
                        ...field,
                        options: clientCodeOptions
                    }
                }
                return field;
            }),
            clientsMap,
            codesMap
        }));
    }

    useEffect(() => {
        setOptions();
    }, []);

    return (
        <GeneralForm
            formData={formData}
            itemsData={contactData}
            setModal={setModal}
            endpoint={"contacts"}
            setTableData={setTableData}
            setTotal={setTotal}
            mode={mode}
            _id={_id}
            setData={setContact}
            clienteDato={clienteDato}
        />
    )
}

export default ContactForm