import { useEffect, useRef, useState } from "react";
import { fetchOneItem, postData } from "../helpers/fetchData";
import { useSession } from "../context/SessionContext";
import { notify } from "../helpers/notify";
import { useTabs } from "../context/TabsContext";
import { useInputPistola } from "../context/InputPistolaContext";

function InputPistola() {
    const { inputRef, triggerKeyPressed, setTriggerKeyPressed, accionPistola, setAccionPistola, usuarioPistola, setUsuarioPistola, handleCodigoLeido } = useInputPistola();
    const { session } = useSession();
    const { createTab } = useTabs();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.code === "ShiftLeft" || event.code === "Tab") && !triggerKeyPressed) {
                setTriggerKeyPressed(true);
            } else if (event.code === "Digit3" && triggerKeyPressed) {
                inputRef.current?.focus();
                setTriggerKeyPressed(false);
            }
        };

        const handleKeyUp = (event) => {
            if (event.code !== "ShiftLeft" && event.code !== "Tab") {
                setTriggerKeyPressed(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [triggerKeyPressed]);

    const handleEnter = async (e) => {
        handleCodigoLeido();

        const path = `/pistola`;

        createTab(path, "PISTOLA");

        let codigo = "";

        if (e.target.value.startsWith("·")) {
            codigo = e.target.value.replace("·", "").trim().toUpperCase();
        } else if (e.target.value.startsWith("3")) {
            codigo = e.target.value.replace("3", "").trim().toUpperCase();
        }

        e.target.value = "";

        console.log("Código leído por pistola:", codigo);

        // Cambiar por que empiece por?
        const regexAccion = /^[A-Za-z][0-9]+[’']?[A-Za-z]{3}\?[A-Za-z][0-9]+[’']?[A-Za-z]{3}/;

        if (regexAccion.test(codigo)) {
            // Asignar acción
            const parts = codigo.split("?");
            const accionPart = parts[0];
            const usuarioPart = parts[1];
            const accionMatch = accionPart.match(/A(\d+)/); // Busca todos los números después de 'A'
            const id_accion = accionMatch ? accionMatch[1] : null; // Extrae los números o null si no coincide
            const usuarioMatch = usuarioPart.match(/U(\d+)/);
            const id_usuario = usuarioMatch ? usuarioMatch[1] : null;

            const accion = await fetchOneItem("pistola/getActionById", id_accion);

            setAccionPistola(accion.nombre_accion);
            setUsuarioPistola(id_usuario);
            notify('info', `Modo de la pistola establecido a: ${accion.nombre_accion}`);
        } else if (codigo.startsWith("EX") && codigo.length === 9) { // Trabajos externos
            const xmlFileName = codigo.replace("EX", "") + ".xml";
            const trabajoExterno = await fetchOneItem("externalJobs/getByFileName", xmlFileName);

            const signData = {
                action: accionPistola || "Firmar",
                idsTrabajos: trabajoExterno._id,
                trabajosCompletos: trabajoExterno,
                usuario: session.username,
                id_usuario: usuarioPistola || null
            };

            const accion = await postData("externalJobs/firmar", signData);

            if (accion.status === "success") {
                notify('success', accion.title);
                const existingRegistros = JSON.parse(localStorage.getItem("registroPistola")) || [];
                const updatedRegistros = [...existingRegistros, accion.nuevoRegistro];

                localStorage.setItem("registroPistola", JSON.stringify(updatedRegistros));
            } else if (accion.status === "warning") {
                notify('warning', accion.title);
            }
        } else if (codigo.startsWith("P") && codigo.length === 5) {

        } else {
            notify('warning', 'Código no reconocido por la pistola');
        }

        codigo = "";
        inputRef.current?.blur();
    }

    return <input ref={inputRef} name="inputPistola" className="input-pistola" type="text" onKeyDown={(e) => e.key === "Enter" && handleEnter(e)} />;
}

export default InputPistola;