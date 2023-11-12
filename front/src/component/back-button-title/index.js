import "../../style/click.scss";
import "./index.scss";

import BackArrow from "./back-arrow.svg";

export default function BackButtonTitle({ title }) {
  const handleClick = () => {
    return window.history.back();
  };
  return (
    <div className="back-header">
      <img
        src={BackArrow}
        alt="backarrow"
        onClick={handleClick}
        width="20px"
        height="20px"
        className="click"
      />
      <h1 className="back-header__title">{title}</h1>
    </div>
  );
}