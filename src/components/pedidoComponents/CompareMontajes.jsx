import MontajeSvg from '../../assets/svg/MontajeSvg';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useEffect, useState } from 'react';
import Table from '../Table';
import { allMontajesTableInfo } from '../../helpers/tablesInfo';
import { postData } from '../../helpers/fetchData';
import { ThreeDot } from 'react-loading-indicators';

function CompareMontajes({ setModal, montaje }) {
    const [file1, setFile1] = useState(montaje || undefined);
    const [file2, setFile2] = useState(undefined);
    const [compareLink, setCompareLink] = useState("");
    const [loadingLink, setLoadingLink] = useState(false);

    const actions = (variables) => {
        const { action, data } = variables;

        if (action === "openRow") {
            setFile2(data);
        }
    };

    useEffect(() => {
        const getLink = async () => {
            setLoadingLink(true);
            if (file1 && file2) {
                const variables = {
                    action: "compararMontajes",
                    urls: [file1.archivo, file2.archivo]
                };

                const response = await postData("compare/simpleCompare", variables);
                
                setCompareLink(response.url);
            } else {
                setCompareLink("");
            }
            setLoadingLink(false);
        };
        getLink();
    }, [file1, file2]);

    return (
        <>
            <div className="popUpTable ripPopUp">
                <div className="header">
                    <MontajeSvg />
                    <p>COMPARADOR</p>
                    <IoMdCloseCircleOutline className="close" onClick={() => setModal(false)} />
                </div>
                <div className="ripContainer">
                    <div className="files">
                        <div className="formGroup">
                            <label>Archivo A:</label>
                            <input
                                type="text"
                                value={file1.id_archivo || ""}
                                readOnly
                            />
                        </div>
                        <div className="formGroup">
                            <label>Archivo B:</label>
                            <input
                                type="text"
                                value={file2?.id_archivo || ""}
                                onDoubleClick={() => {
                                    setFile2("");
                                    setCompareLink("");
                                }}
                                readOnly
                            />
                        </div>
                        {compareLink && <button type="button" onClick={() => window.open(compareLink, "_blank")}>Abrir Comparador</button>}
                        {loadingLink && <p className="loading">Cargando <ThreeDot color="black" size="small" speedPlus={2} /></p>}
                    </div>
                    <Table
                        dinamicTableInfo={allMontajesTableInfo}
                        actions={actions}
                        openRows={true}
                    />
                </div>
            </div>
        </>
    )
}

export default CompareMontajes