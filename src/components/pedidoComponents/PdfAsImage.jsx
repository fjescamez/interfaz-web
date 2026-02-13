import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { OrbitProgress } from "react-loading-indicators";
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

function PdfAsImage({ url, className, noOpen }) {
    const urlApi = import.meta.env.VITE_API_URL;
    /* PDF a imagen */
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        if (!url) return;

        setImgSrc(null);
        let pdfDoc = null;
        let cancelled = false;

        const renderPdf = async () => {
            try {
                pdfDoc = await pdfjsLib.getDocument(`${urlApi}/pdf/${url}`).promise;
                if (cancelled) {
                    await pdfDoc.destroy();
                    return;
                }
                const page = await pdfDoc.getPage(1); // primera página

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
                if (!cancelled) console.error("Error al renderizar PDF:", err);
            }
        };

        if (url.includes("sinUnitario")) {
            setImgSrc("/assets/img/sinUnitario.png");
        } else {
            renderPdf();
        }

        return () => {
            cancelled = true;
            if (pdfDoc) pdfDoc.destroy();
        };
    }, [url]);

    return (
        <>
            {(url === "" || url === "no asignado") ? (
                <h1>No hay previo</h1>
            ) : (
                imgSrc ? <img src={imgSrc} className={className} onClick={!noOpen ? () => window.open(`${urlApi}/pdf/${url}`, "_blank") : undefined}></img> : <OrbitProgress variant="dotted" color="var(--highlight)" size="large" />
            )
            }
        </>
    )
}

export default PdfAsImage