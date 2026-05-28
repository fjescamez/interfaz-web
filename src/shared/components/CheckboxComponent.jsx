import Switch from "@mui/material/Switch";

function CheckboxComponent({
  label,
  checked = false,
  onChange,

}) {
  return (
      <div className="switches">
        <div className="switchGroup">

          <Switch
            className="kioskSwitch"
            checked={!!checked}
            onChange={(e) => onChange?.(e.target.checked)}
          />

          <p>{label}</p>

        </div>
      </div>

  );
}

export default CheckboxComponent;