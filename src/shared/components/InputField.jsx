// src/shared/components/InputField.jsx

import "./InputField.css";

function InputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  disabled = false,
  className = "",
  min,
  max,
  step,
  fullWidth = true,
}) {
  return (
    <div
      className={`inputField ${!fullWidth ? "inputFieldAuto" : ""} ${className}`}
    >
      {label && (
        <label htmlFor={id} className="inputFieldLabel">
          {label}
        </label>
      )}

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className="inputFieldInput"
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}

export default InputField;