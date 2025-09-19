import { useEffect, useState } from 'react';
import { groupFormData } from '../../helpers/formsData';
import GeneralForm from './GeneralForm';
import { fetchData } from '../../helpers/fetchData';
import ExecutingComponent from '../ExecutingComponent';

function GroupForm({ setModal, mode, setTableData, setTotal, group, clienteDato, contacts }) {
    const [formData, setFormData] = useState(groupFormData);
    let groupData = {};
    let { grupo, cliente_nombre, cliente_codigo, ids, _id } = group || {};

    if (mode && mode === "edit") {
        groupData = {
            cliente_nombre,
            cliente_codigo,
            grupo,
            ids
        }
    } else {
        groupData = {
            cliente_nombre: clienteDato?.name ? clienteDato.name : "",
            cliente_codigo: clienteDato?.code ? clienteDato.code : "",
            grupo: "",
            ids: contacts || []
        }
    }

    const setOptions = async () => {
        const clientes = await fetchData("clients/allClients");
        const contactos = await fetchData("contacts/allContacts");

        const clientNameOptions = clientes.map(c => c.name);
        const clientCodeOptions = clientes.map(c => c.code);
        const contactOptions = contactos.map(contacto => ({
            ...contacto,
            textoOpcion: contacto.contacto
        }));

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
                if (field.htmlFor === "ids") {
                    return {
                        ...field,
                        options: contactOptions
                    }
                } else if (field.htmlFor === "cliente_nombre") {
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

    if (JSON.stringify(formData) === JSON.stringify(groupFormData))
        return (
            <ExecutingComponent message={"Cargando..."} />
        );

    return (
        <GeneralForm
            formData={formData}
            itemsData={groupData}
            setModal={setModal}
            endpoint={"groups"}
            setTableData={setTableData}
            mode={mode}
            id={_id}
            setTotal={setTotal}
            clienteDato={clienteDato}
        />
    );
}

export default GroupForm