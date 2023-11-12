import React, { useState, useRef } from "react";
import "./index.scss";

import passShow from "./svg/password-show.svg";
import passHide from "./svg/password-hide.svg";
import passShowErr from "./svg/password-show-error.svg";
import passHideErr from "./svg/password-hide-error.svg";

//Задаємо типи пропсів для компонента Input
interface InputProps {
  placeholder: string;
  label?: string;
  name?: string;
  onInputChange: (value: string) => void;
  password?: boolean;
  error?: string;
}

//Створюємо компонент Input
const Input: React.FC<InputProps> = ({
  placeholder,
  label,
  name,
  onInputChange,
  password = false,
  error,
}) => {
  //Хук для перемикання іконки пароля
  const [isHide, setHide] = useState(password);

  //Посилання на input для залишення фокусу при натискані на іконку
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const inputRef = useRef(null);

  //зміна стану "пароль видно"
  const handleShow = () => {
    setHide(!isHide);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  //   const handleChange = useCallback(
  //     (e: React.ChangeEvent<HTMLInputElement>) => {
  //       const newValue = e.target.value;
  //       if (onChange) onChange(newValue);
  //     },
  //     [onChange]
  //   );

  const icon = () => {
    if (isHide) {
      if (error) {
        return passHideErr;
      } else {
        return passHide;
      }
    } else {
      if (error) {
        return passShowErr;
      } else {
        return passShow;
      }
    }
  };

  //=========================================

  const handleInputChange = (e: any) => {
    const newValue = e.target.value;
    onInputChange(newValue);

    //==================================

    // const handleInputChange = (e:any)=>{
    //   const newValue = e.target.value
    //   if (onInputChange) onInputChange(newValue)
    // }
  };

  return (
    <div className="form__item">
      {label ? (
        <label
          htmlFor={name}
          className={`label ${error ? "label--error" : ""}`}
        >
          {label}:
        </label>
      ) : null}
      <input
        name={name}
        ref={inputRef}
        placeholder={placeholder}
        className={`input ${error ? "input--error" : ""}`}
        onChange={handleInputChange}
        type={isHide ? "password" : "text"}
      />
      {error && <span className="text__error">{error}</span>}
      {password && (
        <img
          onClick={handleShow}
          src={icon()}
          alt="icon_eye"
          className="icon"
        />
      )}
    </div>
  );
};

export default Input;