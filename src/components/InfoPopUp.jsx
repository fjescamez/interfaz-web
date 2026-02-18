import { TiInfoLarge } from 'react-icons/ti';
import { useEffect } from "react";
import "./InfoPopUp.css";
import { addKeyListener } from '../helpers/toggleModal';
import GeneralPopUp from './GeneralPopUp';

function InfoPopUp({ setInfoPopUp, infoContent, setInfoContent }) {
    addKeyListener(setInfoPopUp);

    useEffect(() => {
        return () => {
            if (setInfoContent) setInfoContent("");
        }
    }, []);

    return (
        <>
            <GeneralPopUp
                setPopUp={setInfoPopUp}
                headerIcon={<TiInfoLarge />}
                headerTitle="INFO"
            >
                <div className="infoContainer">
                    {Array.isArray(infoContent) ? (
                        <ul>
                            {infoContent.map((info, index) => (
                                <li key={index}>{info}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>{infoContent}</p>
                    )}
                </div>
            </GeneralPopUp>
        </>
    )
}

export default InfoPopUp