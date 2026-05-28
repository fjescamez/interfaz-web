// src/shared/components/CheckListField.jsx

import "./CheckListField.css";

function CheckListField({
  label,
  items = [],
  selected = [],
  onChange,
  disabled = false,
}) {

  const toggleItem = (value) => {
    if (!onChange) return;

    const exists = selected.includes(value);

    const next = exists
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    onChange(next);
  };

  return (
    <div className="checkListField">

      {label && (
        <div className="checkListLabel">
          {label}
        </div>
      )}

      <div className="checkListContainer">

        {items.map((item) => (
          <label key={item.name} className="checkListItem">

            <input
              type="checkbox"
              checked={selected.includes(item.name)}
              onChange={() => toggleItem(item.name)}
              disabled={disabled}
            />

            <span>{item.name}</span>

          </label>
        ))}

      </div>
    </div>
  );
}

export default CheckListField;