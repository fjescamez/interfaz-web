import { useEffect, useRef } from "react";
import $ from "jquery";

function ChosenSelect({ options, name, onChange, multiple, value, disabled, className }) {
    const selectRef = useRef(null);
    const placeholderMultiple = disabled ? " " : "Elige uno o varios";
    const placeholderSimple = disabled ? " " : "Selecciona una opción";    

    useEffect(() => {
        window.$ = $;
        window.jQuery = $;

        import("chosen-js/chosen.jquery").then(() => {
            if (selectRef.current && typeof $(selectRef.current).chosen === "function") {
                $(selectRef.current).chosen({
                    placeholder_text_multiple: placeholderMultiple,
                    placeholder_text_single: placeholderSimple,
                    inherit_select_classes: true
                });

                $(selectRef.current).on("change", (e) => {
                    let selectedValue;

                    if (multiple) {
                        const ids = Array.from(e.target.selectedOptions).map(opt => opt.value);
                        selectedValue = (typeof options[0] === "object" && name !== "ids")
                            ? options.filter(o => ids.includes(o._id)) // devuelve array de objetos
                            : ids;

                        // selectedValue = ids;
                    } else {
                        const id = e.target.value;
                        selectedValue = (typeof options[0] === "object" && name !== "ids")
                            ? options.find(o => o._id === id)
                            : id;
                    }

                    onChange?.({ target: { name, value: selectedValue } });
                });
            }
        });

        return () => {
            if (selectRef.current && typeof $(selectRef.current).chosen === "function") {
                $(selectRef.current).off("change").chosen("destroy");
            }
        };
    }, [onChange, name, multiple, placeholderMultiple, placeholderSimple]);

    useEffect(() => {
        if (selectRef.current && typeof $(selectRef.current).chosen === "function") {
            $(selectRef.current).trigger("chosen:updated");
        }
    }, [value, options]);

    return (
        <select
            ref={selectRef}
            multiple={multiple}
            id={name}
            name={name}
            value={
                multiple
                    ? (Array.isArray(value)
                        ? value.map(v => (typeof v === "object" ? v._id : v))
                        : [])
                    : (typeof value === "object" ? value._id : value || "")
            }
            onChange={onChange}
            disabled={disabled}
            className={className}
        >
            {options.map(opt => {
                let key = opt;
                let value = opt;
                let text = opt;

                if (typeof opt === 'object') {
                    value = opt._id;
                    key = opt._id;
                    text = opt.textoOpcion;
                }

                return <option key={key} value={value}>{text}</option>
            })}
        </select>
    );
}

export default ChosenSelect;