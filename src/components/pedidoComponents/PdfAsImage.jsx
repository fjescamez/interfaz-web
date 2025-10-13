import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { OrbitProgress } from "react-loading-indicators";
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

function PdfAsImage({ url, className }) {
    console.log("URL:", url);
    
    /* PDF a imagen */
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        if (!url) return;

        setImgSrc(null);

        const renderPdf = async () => {
            try {
                const pdf = await pdfjsLib.getDocument(`http://192.4.26.112:3000/pdf/${url}`).promise;
                const page = await pdf.getPage(1); // primera página

                const scale = 0.5; // resolución
                const viewport = page.getViewport({ scale });

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({ canvasContext: context, viewport }).promise;

                // Guardamos el PNG como dataURL
                setImgSrc(canvas.toDataURL("image/png"));
            } catch (err) {
                console.error("Error al renderizar PDF:", err);
            }
        };

        if (url.includes("sinUnitario")) {
            console.log("url sin unitario");
            setImgSrc("../../assets/img/sinUnitario.png");
        } else {
            renderPdf();
        }
    }, [url]);

    return (
        <>
            {(url === "" || url === "no asignado") ? (
                <h1>No hay previo</h1>
            ) : (
                imgSrc ? <img src={imgSrc} className={className} onClick={() => window.open(`http://192.4.26.112:3000/pdf/${url}`, "_blank")}></img> : <OrbitProgress variant="dotted" color="var(--highlight)" size="large" />
            )
            }
        </>
    )
}

export default PdfAsImage