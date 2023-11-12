import "./index.scss";
import Danger from "./svg/danger.svg";
import SuccessIcon from "./svg/success.svg";
import { AlertProps } from "../../data/type";

const Alert: React.FC<AlertProps> = ({ text, success }) => {
  return (
    <>
      {text && (
        <div
          className={`${
            success ? "alert alert--success" : "alert alert--error"
          }`}
        >
          <img src={`${success ? SuccessIcon : Danger}`} alt="alert" />

          <span className={`${success ? "text__success" : "text--error"}`}>
            {text}
          </span>
        </div>
      )}
    </>
  );
};

export default Alert;