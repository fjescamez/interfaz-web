import { useEffect, useState } from 'react';
import {
  salidaOptions,
  separarOptions,
  transformarOptions,
  compresionOptions,
  distorsinoOptions,
  aplicarCurvaOptions,
} from "../config/paction.config";

import SelectField from '../../../shared/components/SelectField';
import InputField from '../../../shared/components/InputField';
import CheckListField from "../../../shared/components/CheckListField";
import SwitchFieldPro from "../../../shared/components/SwitchFieldPro";

function ExportPdfForm({ state, config, setConfig }) {

  const [itemsColor, setItemsColor] = useState(
    state.meta_data?.output_color_space?.colorants || []
  )

  useEffect(() => {
    const colors =
      state.meta_data?.output_color_space?.colorants || [];
    setItemsColor(colors);
  }, [state.meta_data]);

  const handleLocalChange = (key, value) => {
    const next = {
      ...config,
      [key]: value
    };

    setConfig(next);
  };

  return (
    <div className="actionBody">

      {/* COLOR */}

      <SelectField
        id="colorOutput"
        label="Salida"
        value={config.colorOutput}
        onChange={(value) =>
          handleLocalChange("colorOutput", value)
        }
        options={salidaOptions}
      />

      <SelectField
        id="separated"
        label="Separar"
        value={config.separated}
        onChange={(value) =>
          handleLocalChange("separated", value)
        }
        options={separarOptions}
      />

      {config.separated !== "not" && (
        <SwitchFieldPro
          label="Blanco y Negro"
          marginLeft="10rem"
          checked={config.separatedBlackWhite}
          onChange={(value) =>
            handleLocalChange("separatedBlackWhite", value)
          }
        />
      )}

      {/* TRANSFORMACIONES */}

      <SelectField
        id="rotated"
        label="Transformar"
        value={config.rotated}
        onChange={(value) =>
          handleLocalChange("rotated", value)
        }
        options={transformarOptions}
      />

      <SelectField
        id="applyCurves"
        label="Aplicar Curva"
        value={config.applyCurves}
        onChange={(value) =>
          handleLocalChange("applyCurves", value)
        }
        options={aplicarCurvaOptions}
      />

      <SelectField
        id="horizontalDistortion"
        label="Distorsión Horizontal"
        value={config.horizontalDistortion}
        onChange={(value) =>
          handleLocalChange("horizontalDistortion", value)
        }
        options={distorsinoOptions}
      />

      <SelectField
        id="verticalDistortion"
        label="Distorsión Vertical"
        value={config.verticalDistortion}
        onChange={(value) =>
          handleLocalChange("verticalDistortion", value)
        }
        options={distorsinoOptions}
      />

      {/* IMAGEN */}

      <SelectField
        id="imageCompression"
        label="Compresión"
        value={config.imageCompression}
        onChange={(value) =>
          handleLocalChange("imageCompression", value)
        }
        options={compresionOptions}
      />

      <div className="displayFlexGroupForm">
        <SwitchFieldPro
          label="Rasterizar"
          checked={config.rasterizeOn}
          onChange={(value) =>
            handleLocalChange("rasterizeOn", value)
          }
        />

        {config.rasterizeOn && (
          <InputField
            id="rasterize"
            type="number"
            fullWidth={false}
            value={config.rasterize}
            onChange={(value) =>
              handleLocalChange("rasterize", Number(value))
            }
          />
        )}
      </div>

      <div className="displayFlexGroupForm">
        <SwitchFieldPro
          label="Redimensionar Imágenes"
          checked={config.downsampleImageOn}
          onChange={(value) =>
            handleLocalChange("downsampleImageOn", value)
          }
        />

        {config.downsampleImageOn && (
          <InputField
            id="downsampleImage"
            fullWidth={false}
            type="number"
            value={config.downsampleImage}
            onChange={(value) =>
              handleLocalChange("downsampleImage", Number(value))
            }
          />
        )}
      </div>

      {/* OPTIMIZACIÓN */}
      <SwitchFieldPro
        label="Acoplar (PDF 1.3)"
        checked={config.flatten}
        onChange={(value) =>
          handleLocalChange("flatten", value)
        }
      />

      <SwitchFieldPro
        label="Recortar Imágenes"
        checked={config.clipImages}
        onChange={(value) =>
          handleLocalChange("clipImages", value)
        }
      />

      <SwitchFieldPro
        label="Simplificar Archivo"
        checked={config.simplifyFile}
        onChange={(value) =>
          handleLocalChange("simplifyFile", value)
        }
      />

      <SwitchFieldPro
        label="Vectorizar Texto"
        checked={config.vectorizeText}
        onChange={(value) =>
          handleLocalChange("vectorizeText", value)
        }
      />

      <SwitchFieldPro
        label="Vectorizar Patrones"
        checked={config.vectorizePatterns}
        onChange={(value) =>
          handleLocalChange("vectorizePatterns", value)
        }
      />

      <SwitchFieldPro
        label="Vectorizar Trazos"
        checked={config.vectorizeStrokes}
        onChange={(value) =>
          handleLocalChange("vectorizeStrokes", value)
        }
      />

      <SwitchFieldPro
        label="Remover Objetos Invisibles"
        checked={config.removeEmptyObjects}
        onChange={(value) =>
          handleLocalChange("removeEmptyObjects", value)
        }
      />

      {/* CAPAS */}

      <SwitchFieldPro
        label="Remover Capas Aninadas"
        checked={config.acrobatLayersOfTopLevelLayersOnly}
        onChange={(value) =>
          handleLocalChange("acrobatLayersOfTopLevelLayersOnly", value)
        }
      />

      <SwitchFieldPro
        label="Escribir Metadatos"
        checked={config.preserveMetadata}
        onChange={(value) =>
          handleLocalChange("preserveMetadata", value)
        }
      />

      <SwitchFieldPro
        label="Incluir Capas No Imprimibles"
        checked={config.includeNonPrinintgLayers}
        onChange={(value) =>
          handleLocalChange("includeNonPrinintgLayers", value)
        }
      />

      {/* TINTAS */}

      <SwitchFieldPro
        label="Forzar tintas opacas a Knockout"
        checked={config.forceOpaqueInkstoKnockout}
        onChange={(value) =>
          handleLocalChange("forceOpaqueInkstoKnockout", value)
        }
      />

      <SwitchFieldPro
        label="Utilizar valores LAB para colores directos"
        checked={config.useLabForSpotColors}
        onChange={(value) =>
          handleLocalChange("useLabForSpotColors", value)
        }
      />

      {/* SEPARACIONES */}

      <SwitchFieldPro
        label="Todas las Separaciones"
        checked={config.allSeparations}
        onChange={(value) =>
          handleLocalChange("allSeparations", value)
        }
      />


      {!config.allSeparations && (
        <CheckListField
          label="Incluir separaciones"
          items={itemsColor}
          selected={config.includeSeparationNames}
          onChange={(value) =>
            handleLocalChange("includeSeparationNames", value)
          }
        />
      )}

    </div>

  );
}

export default ExportPdfForm;