import Table from '../Table'
import { useEffect, useRef, useState } from 'react';
import { infoGmgTableInfo } from '../../helpers/tablesInfo'
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { postData } from '../../helpers/fetchData';
import { notify } from '../../helpers/notify';
import { toast } from 'react-toastify';
import InfoTintasTramas from '../pedidoComponents/InfoTintasTramas';

function InfoGmgTable({ setGmgPopup, setPlotterModal, orderId }) {
    const [showInfo, setShowInfo] = useState(false);
    const [infoGmg, setInfoGmg] = useState(null);
    const timer = useRef(null);

    useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

    const handleClick = () => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
            setGmgPopup(false);
            setPlotterModal(false);
            return;
        }
        timer.current = window.setTimeout(() => {
            setShowInfo(false);
            timer.current = null;
        }, 185);
    };

    const gmgActions = async (variables) => {
        const { action, data } = variables;
        if (action === "infoGmg") {
            if (!data.xmp) {
                notify(toast.error, 'error', 'Error', 'No hay info para mostrar');
                return { status: "error" };
            }

            setShowInfo(true);
            const response = await postData("plotter/infoGmg", { rowObject: data });

            if (response.status === "error") {
                notify(toast.error, 'error', response.title, response.message);
            } else {
                setInfoGmg(response.info.listRegistroColor);
                return { status: "success" };
            }
        }
    };

    return (
        <>
            {!showInfo ? (
                <div className="popUpTable">
                    <Table
                        actions={gmgActions}
                        setPopUpTable={setGmgPopup}
                        dinamicTableInfo={infoGmgTableInfo}
                        orderFilter={orderId}
                    />
                </div>)
                :
                <>
                    <div className="formContainer">
                        <div className="formHeaderBackground">
                            <div className="formHeader">
                                {infoGmgTableInfo.headerIcon}
                                <h1>INFO GMG</h1>
                                <button onClick={handleClick}>
                                    <IoMdCloseCircleOutline className="close" />
                                </button>
                            </div>
                        </div>
                        <div className="formBody">
                            <form>
                                <div className="formSections">
                                    <InfoTintasTramas info={infoGmg} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="filler"></div>
                </>
            }
        </>
    )
}

export default InfoGmgTable