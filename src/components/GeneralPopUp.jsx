import { useEffect } from "react";
import { addKeyListener } from "../helpers/toggleModal"
import { IoMdCloseCircleOutline } from 'react-icons/io';

function GeneralPopUp({ setPopUp, headerIcon, headerTitle, children, onClose }) {
    useEffect(() => {
        const cleanup = () => {
            addKeyListener(setPopUp);
            if (onClose) {
                onClose();
            }
        };

        return cleanup;
    }, []);

    return (
        <>
            <div className="overlay"></div>
            <div className="ripPopUp popUpTable">
                <div className="header">
                    {headerIcon}
                    <p>{headerTitle}</p>
                    <IoMdCloseCircleOutline className="close" onClick={() => setPopUp(false)} />
                </div>
                <div className="generalPopUpBody">{children}</div>
            </div>
        </>
    )
}

export default GeneralPopUp