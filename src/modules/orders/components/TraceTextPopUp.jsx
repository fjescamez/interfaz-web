import { useEffect, useState } from "react"
import { postData } from "../../helpers/fetchData";
import { RiText } from "react-icons/ri";
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { ThreeDot } from 'react-loading-indicators';
import { BiFolder } from 'react-icons/bi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { notify } from "../../helpers/notify";
import { addKeyListener } from "../../helpers/toggleModal";

function TraceTextPopUp({ setTraceModal, rutaTrabajo, unitario }) {
    const [navigation, setNavigation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState("");
    addKeyListener(setTraceModal);

    useEffect(() => {
        const getNavigation = async () => {
            const data = {
                extraInputs: {
                    rutaTrabajo,
                    unitario
                }
            }
            const response = await postData("tasks/navegacionTexto", data);

            if (response && response.listFiles) {
                const filteredFiles = response.listFiles.filter(item => (item.type === "file" && (item.name.endsWith(".pdf") || item.name.endsWith(".ai"))) || item.type === "folder");
                setNavigation(filteredFiles);
                setLoading(false);
            }
        }
        getNavigation();
    }, []);

    const handleClick = async (item) => {

        if (item.type === "folder") {
            setLoading(true);
            const data = {
                rowObject: item
            }

            const response = await postData("tasks/navegacionTexto", data);

            if (response && response.listFiles) {
                const filteredFiles = response.listFiles.filter(item => (item.type === "file" && (item.name.endsWith(".pdf") || item.name.endsWith(".ai"))) || item.type === "folder");
                setNavigation(filteredFiles);
                setLoading(false);
            }
        }

        if (item.type === "file") {
            setFile(item);
        }
    }

    const trazarTexto = () => {
        const data = {
            rowObject: {
                url: file.url
            }
        }

        postData("tasks/trazarTexto", data);
        notify("success", "Trazado de texto iniciado", "");
        setTraceModal(false);
    }

    return (
        <>
            <div className="overlay"></div>
            <div className="popUpTable ripPopUp">
                <div className="header">
                    <RiText />
                    <p>TRAZAR TEXTO</p>
                    <IoMdCloseCircleOutline className="close" onClick={() => setTraceModal(false)} />
                </div>
                <div className="ripContainer">
                    <div className="files">
                        <div className="formGroup">
                            <label>Archivo:</label>
                            <input
                                type="text"
                                value={file.name || ""}
                                onDoubleClick={() => {
                                    setFile("");
                                }}
                                readOnly
                            />
                        </div>
                        {file && <button type="button" onClick={trazarTexto}>Iniciar</button>}
                    </div>
                    {loading ? (
                        <p className='loading'>Cargando <ThreeDot color="black" size="small" speedPlus={2} /></p>
                    ) :
                        (
                            <ul className="comparatorList">
                                {navigation?.map((item, index) => (
                                    <li key={index} onDoubleClick={() => handleClick(item)}>
                                        {item.type === "folder" ? <BiFolder /> : <IoDocumentTextOutline />}
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default TraceTextPopUp