import "./index.scss";
import "../../style/click.scss";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div
        onClick={() => navigate("/settings")}
        className="header__setting click"
      ></div>
      <p className="header__title">Main wallet</p>
      <div
        onClick={() => navigate("/notifications")}
        className="header__notifications click"
      ></div>
    </div>
  );
}