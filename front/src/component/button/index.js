import "./index.scss";
import "../../style/click.scss";

export default function Button({
  children,
  style = {},
  className = "",
  onClick = {},
}) {
  return (
    <button onClick={onClick} className={`${className} click`} style={style}>
      {children}
    </button>
  );
}