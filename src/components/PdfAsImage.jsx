import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { OrbitProgress } from "react-loading-indicators";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function PdfAsImage({ url, className, noOpen }) {
    const urlApi = import.meta.env.VITE_API_URL;

    const [imgSrc, setImgSrc] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!url) return;

        setImgSrc(null);
        setError(false);

        let pdfDoc = null;
        let cancelled = false;

        const renderPdf = async () => {
            try {
                const pdfUrl = `${urlApi}/pdf/${url}`;

                const loadingTask = pdfjsLib.getDocument({
                    url: pdfUrl
                });

                pdfDoc = await loadingTask.promise;

                if (cancelled) {
                    await pdfDoc.destroy();
                    return;
                }

                const page = await pdfDoc.getPage(1);

                const scale = 0.5;
                const viewport = page.getViewport({ scale });

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({
                    canvasContext: context,
                    viewport,
                }).promise;

                if (cancelled) return;

                setImgSrc(canvas.toDataURL("image/png"));
            } catch (err) {
                if (!cancelled) {
                    console.error("Error al renderizar PDF:", err);
                    setError(true);
                }
            }
        };

        if (url.includes("sinUnitario")) {
            setImgSrc("/assets/img/sinUnitario.png");
            return;
        }

        renderPdf();

        return () => {
            cancelled = true;
            if (pdfDoc) {
                try {
                    pdfDoc.destroy();
                } catch {}
            }
        };
    }, [url, urlApi]);

    if (url === "" || url === "no asignado") {
        return <h1>No hay previo</h1>;
    }

    if (error) {
        return <h1>Error cargando PDF</h1>;
    }

    return (
        <>
            {imgSrc ? (
                <img
                    src={imgSrc}
                    className={className}
                    onClick={
                        !noOpen
                            ? () => window.open(`${urlApi}/pdf/${url}`, "_blank")
                            : undefined
                    }
                    alt="PDF preview"
                />
            ) : (
                <OrbitProgress
                    variant="dotted"
                    color="var(--highlight)"
                    size="large"
                />
            )}
        </>
    );
}

export default PdfAsImage;