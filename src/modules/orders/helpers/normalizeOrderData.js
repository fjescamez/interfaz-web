import {
    normalizeArray,
    safeValue,
    yesNo
} from "./orderFormatters";

export const normalizeOrderData = (
    xml
) => {

    const revisions = normalizeArray(
        xml.actividad?.revisiones?.revision
    );

    const latestRevision =
        revisions[0] || {};

    const fechaHora =
        safeValue(
            latestRevision.revision_fechahora
        );

    const [
        revisionDate,
        revisionHour
    ] = fechaHora.split(" ");

    return {

        client: {
            code: safeValue(
                xml.numero?.cliente_codigo
            ),

            name: safeValue(
                xml.numero?.cliente_nombre
            ),

            contact: safeValue(
                xml.numero?.contacto
            ),

            email: safeValue(
                xml.numero?.email
            ),

            marca: safeValue(
                xml.numero?.marca
            ),

            customerRef: safeValue(
                xml.numero?.ref_cliente
            )
        },

        version: {
            revision: safeValue(
                latestRevision.revision_id
            ),

            revisionDate,

            revisionHour,

            requestDate: safeValue(
                xml.numero?.fecha_solicitud
            ),

            deliveryDate: safeValue(
                xml.numero?.fecha_entrega
            ),

            reason: safeValue(
                xml.numero?.motivo_version
            )
        },

        technical: {
            plateType: safeValue(
                xml.tecnicos?.tipo_cliche
            ),

            thickness: safeValue(
                xml.tecnicos?.espesor
            ),

            printType: safeValue(
                xml.tecnicos?.tipo_impresion
            ),

            distortion: safeValue(
                xml.tecnicos?.distorsion
            ),

            trapping: safeValue(
                xml.tecnicos?.trapping
            )
        },

        documentation: {
            printedSheet: yesNo(
                xml.tecnicos?.ficha_impresa,
                "-1"
            ),

            emailSheet: yesNo(
                xml.tecnicos?.ficha_por_email
            ),

            pdf: yesNo(
                xml.tecnicos?.pdf
            ),

            jpg: yesNo(
                xml.tecnicos?.jpg
            ),

            plotter: yesNo(
                xml.tecnicos?.plotter
            )
        },

        activity: {
            type: safeValue(
                xml.actividad?.id
            ),

            material: safeValue(
                xml.actividad?.material
            ),

            observations: safeValue(
                xml.actividad?.obs_actividad
            )
        },

        revisions: revisions.map(
            revision => ({
                id: safeValue(
                    revision.revision_id
                ),

                date: safeValue(
                    revision.revision_fechahora
                ),

                reason: safeValue(
                    revision.revision_mot
                ),

                observations: safeValue(
                    revision.revision_obs
                )
            })
        )
    };
};