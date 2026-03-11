import { BlinkBlur } from "react-loading-indicators"

function ExecutingComponent({ message }) {
    return (
        <>
            <div className="executingOverlay">
                <div className="executingOverlayContainer">
                    <BlinkBlur variant="dotted" color="var(--highlight)" size="large" speedPlus="0" />
                    <h1>{message ? message : "Ejecutando..."}</h1>
                </div>
            </div>
        </>
    )
}

export default ExecutingComponent