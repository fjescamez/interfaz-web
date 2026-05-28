// src/components/SelectField.jsx
import "./SelectField.css";

export default function SelectField({
  id,
  label,
  value,
  onChange,
  options = [],
  className = "",
  disabled = false,
}) {
  return (
    <div className={`selectField ${className}`}>
      {label && (
        <label htmlFor={id} className="selectFieldLabel">
          {label}
        </label>
      )}

      <div className="selectFieldWrapper">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="selectFieldInput"
          disabled={disabled}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}