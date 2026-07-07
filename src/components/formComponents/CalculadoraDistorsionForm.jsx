import { useCallback, useEffect, useMemo, useState } from "react";
import GeneralForm from "./GeneralForm";
import { calculadoraDistorsionForm } from "../../helpers/formsData";
import {
    list_with_options,
    create,
    set_keys,
    delete_multiple
} from "../../helpers/cloudflow/custom_objects";

const DISTORSION_ESPECIAL_COLLECTION = "Distorsion_especial";

const parseNumber = (value) => {
    if (value === null || value === undefined || value === "") return "";

    const parsed = Number(
        String(value)
            .replace("%", "")
            .replace(",", ".")
            .trim()
    );

    return Number.isNaN(parsed) ? "" : parsed;
};

function CalculadoraDistorsionForm({ setModal, fullOrder, setFullOrder }) {
    const [formData] = useState(calculadoraDistorsionForm);
    const [registroGuardado, setRegistroGuardado] = useState(null);
    const [formDirty, setFormDirty] = useState(false);

    const id_pedido = fullOrder?.id_pedido;

    const getDesarrollo = parseNumber(
        fullOrder?.xml?.actividad?.flexible?.flexible_desatotal
    );

    const getDistorsion = parseNumber(
        fullOrder?.xml?.tecnicos?.distorsion
    );

    const defaultItemsData = useMemo(() => ({
        desarolloReal: "",
        desarrolloEsperado: getDesarrollo,
        distorsion: getDistorsion,
        resultado: ""
    }), [getDesarrollo, getDistorsion]);

    const [itemsData, setItemsData] = useState(defaultItemsData);

    const buscarPedidoDistorsionEspecial = useCallback(async (pedidoId) => {
        if (!pedidoId) return null;

        const query = ["id_pedido", "equal to", pedidoId];

        const response = await list_with_options(
            DISTORSION_ESPECIAL_COLLECTION,
            query
        );

        const results = response?.results || [];

        return results.length > 0 ? results[0] : null;
    }, []);

    useEffect(() => {
        const cargarDistorsionEspecial = async () => {
            if (!id_pedido) {
                setItemsData(defaultItemsData);
                setRegistroGuardado(null);
                setFormDirty(false);
                return;
            }

            const distorsionGuardada = await buscarPedidoDistorsionEspecial(id_pedido);

            if (distorsionGuardada) {
                const dataCargada = {
                    ...defaultItemsData,
                    ...distorsionGuardada,

                    desarolloReal:
                        distorsionGuardada.desarolloReal ??
                        distorsionGuardada.desarrolloReal ??
                        "",

                    desarrolloEsperado:
                        distorsionGuardada.desarrolloEsperado ??
                        getDesarrollo,

                    distorsion:
                        distorsionGuardada.distorsion ??
                        getDistorsion,

                    resultado:
                        distorsionGuardada.resultado ??
                        ""
                };

                setItemsData(dataCargada);
                setRegistroGuardado(distorsionGuardada);
                setFormDirty(false);

                setFullOrder(prev => ({
                    ...prev,
                    distorsionEspecial: dataCargada.resultado || ""
                }));
            } else {
                setItemsData(defaultItemsData);
                setRegistroGuardado(null);
                setFormDirty(false);

                setFullOrder(prev => ({
                    ...prev,
                    distorsionEspecial: ""
                }));
            }
        };

        cargarDistorsionEspecial();
    }, [
        id_pedido,
        defaultItemsData,
        buscarPedidoDistorsionEspecial,
        getDesarrollo,
        getDistorsion,
        setFullOrder
    ]);

    const handleInputChange = useCallback(() => {
        setFormDirty(true);
    }, []);

    const calcularDesarrollo = (inputData) => {
        const desarrolloReal = Number(inputData.desarolloReal);
        const desarrolloEsperado = Number(inputData.desarrolloEsperado);
        const distorsion = Number(inputData.distorsion);

        if (
            Number.isNaN(desarrolloReal) ||
            Number.isNaN(desarrolloEsperado) ||
            Number.isNaN(distorsion) ||
            desarrolloReal <= 0 ||
            desarrolloEsperado <= 0
        ) {
            setItemsData(prev => ({
                ...prev,
                ...inputData,
                resultado: "Faltan datos"
            }));

            setFormDirty(true);
            return;
        }

        const desarrolloFinalActual =
            desarrolloEsperado * (1 - distorsion / 100);

        const distorsionCalculada =
            ((desarrolloReal - desarrolloFinalActual) / desarrolloReal) * 100;

        setItemsData(prev => ({
            ...prev,
            ...inputData,
            resultado: `${distorsionCalculada.toFixed(4)}%`,
            distorsionCalculada: distorsionCalculada.toFixed(4)
        }));

        setFormDirty(true);
    };

    const handleAplicarDistorsion = async (inputDataActual = itemsData) => {
        if (!id_pedido) return;

        const distorsionEspecialGuardada =
            await buscarPedidoDistorsionEspecial(id_pedido);

        const {
            _id,
            id,
            created_at,
            updated_at,
            ...dataLimpia
        } = inputDataActual;

        const data = {
            ...dataLimpia,
            id_pedido
        };

        let registroActualizado = null;

        if (!distorsionEspecialGuardada) {
            registroActualizado = await create(
                DISTORSION_ESPECIAL_COLLECTION,
                data
            );
        } else {
            registroActualizado = await set_keys(
                DISTORSION_ESPECIAL_COLLECTION,
                distorsionEspecialGuardada._id,
                data
            );
        }

        setItemsData(data);
        setRegistroGuardado({
            ...(distorsionEspecialGuardada || registroActualizado || {}),
            ...data
        });
        setFormDirty(false);

        setFullOrder(prev => ({
            ...prev,
            distorsionEspecial: data.resultado || ""
        }));

        setModal(false);
    };

    const handleEliminarDistorsion = async () => {
        if (!registroGuardado?._id) return;

        await delete_multiple(
            DISTORSION_ESPECIAL_COLLECTION,
            [registroGuardado._id]
        );

        setItemsData(defaultItemsData);
        setRegistroGuardado(null);
        setFormDirty(false);

        setFullOrder(prev => ({
            ...prev,
            distorsionEspecial: null
        }));

        setModal(false);
    };

    const hayDistorsionEspecialGuardada =
        Boolean(registroGuardado?.resultado) && !formDirty;

    return (
        <GeneralForm
            formData={formData}
            setModal={setModal}
            itemsData={itemsData}
            noSubmit={true}
            buttonAction={true}
            functionAction={calcularDesarrollo}
            submitText="Calcular"
            onInputChange={handleInputChange}
            secondaryButtonAction={
                hayDistorsionEspecialGuardada
                    ? "Borrar"
                    : "Aplicar"
            }
            secondaryFunctionAction={
                hayDistorsionEspecialGuardada
                    ? handleEliminarDistorsion
                    : handleAplicarDistorsion
            }
        />
    );
}

export default CalculadoraDistorsionForm;