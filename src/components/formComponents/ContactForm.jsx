import { useEffect, useState } from "react";
import { contactFormData } from "../../helpers/formsData";
import GeneralForm from "./GeneralForm";
import { fetchData } from "../../helpers/fetchData";

function ContactForm({ setModal, mode, setTableData, setTotal, contact, setContact, clienteDato }) {
    const [formData, setFormData] = useState(contactFormData);
    const [contactData, setContactData] = useState({});

    useEffect(() => {
        // Inicializa contactData según el modo
        if (mode === "edit" && contact) {
            setContactData({
                contacto: contact.contacto,
                cliente_codigo: contact.cliente_codigo,
                cliente_nombre: contact.cliente_nombre,
                departamento: contact.departamento,
                email: contact.email,
                telefono: contact.telefono,
                observaciones: contact.observaciones,
                _id: contact._id
            });
        } else {
            setContactData({
                contacto: "",
                cliente_codigo: clienteDato?.code || "",
                cliente_nombre: clienteDato?.name || "",
                departamento: "",
                email: "",
                telefono: "",
                observaciones: ""
            });
        }
    }, [mode, contact, clienteDato]);

    const setOptions = async () => {
        const clientes = await fetchData("clients/allClients");
        const clientNameOptions = clientes.map(c => c.name);
        const clientCodeOptions = clientes.map(c => c.code);

        const clientsMap = {};
        clientes.forEach(c => {
            clientsMap[c.name] = c.code;
        });

        const codesMap = Object.fromEntries(Object.entries(clientsMap).map(([name, code]) => [code, name]));

        setFormData(prev => ({
            ...prev,
            formFields: prev.formFields.map(field => {
                if (field.htmlFor === "cliente_nombre") {
                    return { ...field, options: clientNameOptions }
                } else if (field.htmlFor === "cliente_codigo") {
                    return { ...field, options: clientCodeOptions }
                }
                return field;
            }),
            clientsMap,
            codesMap
        }));
    };

    useEffect(() => {
        setOptions();
    }, []);

    // Este useEffect ajusta el nombre si el código existe y el nombre no está en las opciones
    useEffect(() => {
        if (
            formData.codesMap &&
            contactData.cliente_codigo &&
            (!formData.formFields?.find(f => f.htmlFor === "cliente_nombre")?.options?.includes(contactData.cliente_nombre))
        ) {
            const nombreCorrecto = formData.codesMap[contactData.cliente_codigo];
            if (nombreCorrecto) {
                setContactData(prev => ({
                    ...prev,
                    cliente_nombre: nombreCorrecto
                }));
            }
        }
    }, [formData.codesMap, contactData.cliente_codigo, formData.formFields, contactData.cliente_nombre]);

    return (
        <GeneralForm
            formData={formData}
            itemsData={contactData}
            setModal={setModal}
            endpoint={"contacts"}
            setTableData={setTableData}
            setTotal={setTotal}
            mode={mode}
            _id={contact?._id}
            setData={setContact}
            clienteDato={clienteDato}
        />
    );
}

export default ContactForm;