import { useEffect, useMemo } from 'react';
import FormGroup from '../formComponents/FormGroup';

function LayersComponent({ state, updateState }) {
    const layers = useMemo(() => {
        return Array.isArray(state?.layers) ? state.layers : [];
    }, [state?.layers]);

    const layersActive = useMemo(() => {
        return Array.isArray(state?.layersActive)
            ? state.layersActive
            : [];
    }, [state?.layersActive]);

    const displayLayers = layersActive.length > 0 ? layersActive : layers;

    const reversedDisplayLayers = useMemo(() => {
        return [...displayLayers].reverse();
    }, [displayLayers]);

    const layersSignature = useMemo(() => {
        return JSON.stringify(
            layers.map(layer => ({
                name: layer.name,
                type: layer.type,
                is_visible: layer.is_visible,
                is_printing: layer.is_printing,
            }))
        );
    }, [layers]);

    useEffect(() => {
        if (!layers.length) {
            updateState("layersActive", []);
            return;
        }

        const currentLayersActive = Array.isArray(state?.layersActive)
            ? state.layersActive
            : [];

        const nextLayersActive = layers.map(layer => {
            const existingLayer = currentLayersActive.find(
                item => item.name === layer.name
            );

            return {
                ...layer,
                ...existingLayer,
                name: layer.name,
                type: existingLayer?.type || layer.type || "standard",
                is_visible:
                    typeof existingLayer?.is_visible === "boolean"
                        ? existingLayer.is_visible
                        : Boolean(layer.is_visible),
                is_printing:
                    typeof existingLayer?.is_printing === "boolean"
                        ? existingLayer.is_printing
                        : Boolean(layer.is_printing),
            };
        });

        updateState("layersActive", nextLayersActive);
    }, [layersSignature]);

    const handleForm = (e) => {
        const { name, value, checked } = e.target;

        const nextChecked =
            typeof checked === "boolean"
                ? checked
                : Boolean(value);

        const baseLayers = layersActive.length > 0 ? layersActive : layers;

        const nextLayersActive = baseLayers.map(layer => {
            if (layer.name !== name) return layer;

            return {
                ...layer,
                is_visible: nextChecked,
                is_printing: nextChecked,
            };
        });

        updateState("layersActive", nextLayersActive);
    };

    const selectAll = () => {
        const baseLayers = layersActive.length > 0 ? layersActive : layers;

        const allSelected = baseLayers.every(
            layer => layer.is_visible && layer.is_printing
        );

        const nextValue = !allSelected;

        const nextLayersActive = baseLayers.map(layer => ({
            ...layer,
            is_visible: nextValue,
            is_printing: nextValue,
        }));

        updateState("layersActive", nextLayersActive);
    };

    const formFields = useMemo(() => {
        return reversedDisplayLayers.map((layer, index) => ({
            htmlFor: `layer_${index}`,
            labelId: `layer_${index}_label`,
            labelTitle: layer.name,
            inputType: "checkbox",
            inputId: `layer_${index}`,
            inputName: layer.name,
        }));
    }, [reversedDisplayLayers]);

    const getLayerValue = (layerName) => {
        const layer = displayLayers.find(item => item.name === layerName);
        return Boolean(layer?.is_visible && layer?.is_printing);
    };

    const allSelected = displayLayers.length > 0 &&
        displayLayers.every(layer => layer.is_visible && layer.is_printing);

    return (
        <div className="actionBody">
            {displayLayers.length > 0 ? (
                <div className="kioskColoresForm">
                    <button
                        type="button"
                        className="selectAll"
                        onClick={selectAll}
                    >
                        {allSelected ? "Deseleccionar Todo" : "Seleccionar Todo"}
                    </button>

                    {formFields.map((field) => (
                        <div className="formGroup formGroupRow" key={field.inputId}>
                            <FormGroup
                                value={getLayerValue(field.inputName)}
                                handleForm={handleForm}
                                field={field}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="noColors">Este pedido no tiene capas</p>
            )}
        </div>
    );
}

export default LayersComponent;