import { IoMdCloseCircleOutline } from 'react-icons/io';
import { TiInfoLarge } from 'react-icons/ti';
import { useEffect } from "react";
import "./InfoPopUp.css";

function InfoPopUp({ setInfoPopUp, infoContent }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setInfoPopUp(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [setInfoPopUp]);

    return (
        <>
            <div className="overlay"></div>
            <div className="popUpTable ripPopUp">
                <div className="header">
                    <TiInfoLarge />
                    <p>INFO</p>
                    <IoMdCloseCircleOutline className="close" onClick={() => setInfoPopUp(false)} />
                </div>
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
            </div>
        </>
    )
}

export default InfoPopUp