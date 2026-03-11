import { createContext, useContext, useState, useRef, useEffect } from "react";
import { notify } from "../helpers/notify";

const InputPistolaContext = createContext();

export function InputPistolaProvider(props) {
    const inputRef = useRef(null);
    const [triggerKeyPressed, setTriggerKeyPressed] = useState(false);
    const [accionPistola, setAccionPistola] = useState(null);
    const [usuarioPistola, setUsuarioPistola] = useState(null);
    const timeoutRef = useRef(null);

    const resetAccionPistola = () => {
        setAccionPistola(null);
        notify("warning", "Aviso", "La acción de pistola ha sido reiniciada por inactividad");
    };

    const handleCodigoLeido = () => {
        // Reiniciar el temporizador cada vez que se lea un código
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            resetAccionPistola();
        }, 300000); // Tiempo de inactividad para resetear la acción
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <InputPistolaContext.Provider
            value={{ inputRef, triggerKeyPressed, setTriggerKeyPressed, accionPistola, setAccionPistola, usuarioPistola, setUsuarioPistola, handleCodigoLeido }}
        >
            {props.children}
        </InputPistolaContext.Provider>
    );
}

export function useInputPistola() {
    return useContext(InputPistolaContext);
}