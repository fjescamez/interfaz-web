import Switch from "@mui/material/Switch";
import "./SwitchFieldPro.css";

function SwitchFieldPro({
  label,
  checked = false,
  onChange,
  marginLeft,
}) {
  return (
    <div
      className="switches switchesPro"
      style={{ marginLeft }}
    >
      <div className="switchGroup switchGroupPro">
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

export default SwitchFieldPro;