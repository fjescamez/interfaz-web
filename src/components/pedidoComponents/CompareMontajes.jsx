import MontajeSvg from '../../assets/svg/MontajeSvg';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useState } from 'react';
import Table from '../Table';
import { montajeTableInfo } from '../../helpers/tablesInfo';

function CompareMontajes({ setModal, montajeIds }) {
    const [file2, setFile2] = useState("");
    const [compareLink, setCompareLink] = useState("");

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
                                value={montajeIds[0] || ""}
                                readOnly
                            />
                        </div>
                        <div className="formGroup">
                            <label>Archivo B:</label>
                            <input
                                type="text"
                                value={file2.name || ""}
                                onDoubleClick={() => {
                                    setFile2("");
                                    setCompareLink("");
                                }}
                                readOnly
                            />
                        </div>
                        {compareLink && <button type="button" onClick={() => window.open(compareLink, "_blank")}>Abrir Comparador</button>}
                    </div>
                    <Table
                        dinamicTableInfo={montajeTableInfo}
                    />
                </div>
            </div>
        </>
    )
}

export default CompareMontajes