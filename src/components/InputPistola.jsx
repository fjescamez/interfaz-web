import { useEffect, useRef, useState } from "react";
import { fetchOneItem, postData } from "../helpers/fetchData";
import { useSession } from "../context/SessionContext";
import { notify } from "../helpers/notify";
import { toast } from 'react-toastify';
import { useTabs } from "../context/TabsContext";
import { useNavigate } from 'react-router-dom';

function InputPistola() {
    const inputRef = useRef(null);
    const [shiftLeftPressed, setShiftLeftPressed] = useState(false);
    const { session } = useSession();
    const { setTabs, tabs } = useTabs();
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === "ShiftLeft" && !shiftLeftPressed) {
                setShiftLeftPressed(true);
            } else if (event.code === "Digit3" && shiftLeftPressed) {
                inputRef.current?.focus();
                setShiftLeftPressed(false);
            }
        };

        const handleKeyUp = (event) => {
            if (event.code !== "ShiftLeft") {
                setShiftLeftPressed(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [shiftLeftPressed]);

    const handleEnter = async (e) => {
        const path = `/pistola`;

        if (!tabs.some(tab => tab.path === path)) {
            setTabs(prev => {
                if (prev.some(tab => tab.path === path)) return prev;
                return [...prev, { path, title: 'PISTOLA' }];
            });
        }

        navigate(path);

        let codigo = "";
        
        if (e.target.value.startsWith("·")) {
            codigo = e.target.value.replace("·", "").trim();
        } else if (e.target.value.startsWith("#")) {
            codigo = e.target.value.replace("#", "").trim();
        }

        e.target.value = "";
        
        if (codigo.startsWith("EX")) {
            const xmlFileName = codigo.replace("EX", "") + ".xml";
            const trabajoExterno = await fetchOneItem("externalJobs/getByFileName", xmlFileName);
            
            const signData = {
                action: "firmar",
                idsTrabajos: trabajoExterno._id,
                trabajosCompletos: trabajoExterno,
                usuario: session.username
            };
            
            const firma = await postData("externalJobs/firmar", signData);            
            
            const existingFirmas = JSON.parse(localStorage.getItem("firmasPistola")) || [];
            const updatedFirmas = [...existingFirmas, firma.nuevoRegistro];
            
            localStorage.setItem("firmasPistola", JSON.stringify(updatedFirmas));
            
            if (firma.status === "success") {
                notify(toast.success, 'success', firma.title);
            }
        }

        codigo = "";
        inputRef.current?.blur();
    }

    return <input ref={inputRef} className="input-pistola" type="text" onKeyDown={(e) => e.key === "Enter" && handleEnter(e)} />;
}

export default InputPistola;