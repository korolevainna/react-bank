import React, { useState, useReducer } from "react";

// import "./index.css";
import "./index.scss";
import {
  NAME_FIELD,
  ERR_FIELD,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
} from "../../data/const";
import { ACTION_TYPE, initialState, reducer } from "../../util/reducer";
import { useNavigate, useLocation } from "react-router-dom";

import Button from "../button";
import Alert from "../alert";

// import Danger from "./svg/danger.svg";

export default function FormField({
  button,
  emailField,
  passField,
  text,
  textField,
  question,
  link,
  questionOff,
  alert,
  auth,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  // const [value1, setValue] = useState(""); //відповідає за значення в нашому полі email
  // const [valueP, setValueP] = useState(""); //відповідає за значення в нашому полі password
  // const [valueText, setValueText] = useState(""); //відповідає за значення в нашому полі password

  // const handleChange = (e) => setValue(e.target.value); //для того щоб задавати значення нашого поля (input)
  // const handleChangeP = (e) => setValueP(e.target.value); //для того щоб задавати значення нашого поля (input)
  // const handleChangeText = (e) => setValueText(e.target.value); //для того щоб задавати значення нашого поля (input)

  // console.log(value); // вивід в консоль для перевірки

  // changeIcon функція показує/скриває пароль
  const changeIcon = (obj) => {
    obj.target.toggleAttribute("show");
    // console.log(obj.target.toggleAttribute("show"));

    const input = obj.target.previousElementSibling;

    const type = input.getAttribute("type");

    if (type === "password") {
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
    }
    input.focus();
  };

  // Достану EMAIL, PASSWORD із NAME_FIELD для зручності
  const { EMAIL, PASSWORD } = NAME_FIELD;

  //Достаю state із useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  //===== Достаю данные из поля ввода текста ============

  const handleChange = (name, value) => {
    // console.log(name, value.length);
    dispatch({
      type: ACTION_TYPE.SET_FORM_VAL,
      payload: {
        ...state.formValues,
        [name]: value,
      },
    });
  };

  const error = state.formErrors[EMAIL];
  const errorPass = state.formErrors[PASSWORD];

  //=============================================
  // Функція для перевірка на символи вводу в поле
  // let validation = false;

  const validate = () => {
    const { email, password } = state.formValues;
    // console.log(email, password);

    const err = { [EMAIL]: "", [PASSWORD]: "" };

    // console.log("err-1", err);

    if (email.length < 1) {
      err[EMAIL] = ERR_FIELD.IS_EMPTY;
      // validation = true;
    } else if (email.length > 40) {
      err[EMAIL] = ERR_FIELD.IS_BIG;
    } else if (!REG_EXP_EMAIL.test(email)) {
      err[EMAIL] = ERR_FIELD.EMAIL;
    }

    // console.log("err-2", err);

    if (password.length < 1) {
      err[PASSWORD] = ERR_FIELD.IS_EMPTY;
    } else if (!REG_EXP_PASSWORD.test(password)) {
      err[PASSWORD] = ERR_FIELD.PASSWORD;
    }

    // console.log("err-3", err);

    dispatch({ type: ACTION_TYPE.SEN_FORM_ERR, payload: err });

    // console.log("err-4", err);

    return Object.values(err).every((err) => !err);
  };

  //========================================
  //відправка запиту на сервер з кнопки <Button/>

  const handleSubmit = () => {
    const checkValidate = validate();
    // console.log(checkValidate);

    if (checkValidate) {
      if (location.pathname === "/signup") {
        submit();
      } else if (location.pathname === "/signin") {
        console.log("enter in signin");
        sendIn();
      }
    }
  };

  //= Відправка на сервер на роут signup =========

  const submit = async () => {
    try {
      const res = await fetch(`http://localhost:4000/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(),
      });
      //Получаю данные из router '/signup'
      //message и session
      const data = await res.json();

      // console.log("data========>>>", data);
      // console.log(res.ok);

      if (res.ok) {
        if (auth) {
          auth.dispatch({
            type: "LOGIN",
            payload: {
              token: data.session.token,
              user: data.session.user,
            },
          });
          // console.log("next page====>");
        }

        navigate("/signup-confirm");
        window.scrollTo(0, 0);
      }

      dispatch({
        type: ACTION_TYPE.SET_ALERT,
        payload: data.message,
      });
    } catch (e) {
      dispatch({
        type: ACTION_TYPE.SET_ALERT,
        payload: e.toString(),
      });
    }
  };

  const convertData = () => {
    return JSON.stringify({
      [EMAIL]: state.formValues[EMAIL],
      [PASSWORD]: state.formValues[PASSWORD],
    });
  };

  //= Відправка на сервер на роут signin =========

  const sendIn = async () => {
    try {
      const res = await fetch(`http://localhost:4000/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertDataIn(),
      });
      //Получаю данные из router '/signin'
      //message и session
      const data = await res.json();

      console.log("data========>>>", data);
      console.log(res.ok);

      if (res.ok) {
        if (auth) {
          auth.dispatch({
            type: "LOGIN",
            payload: {
              token: data.session.token,
              user: data.session.user,
            },
          });
          console.log("next BalancePage====>");
        }

        navigate("/balance");
        window.scrollTo(0, 0);
      }

      dispatch({
        type: ACTION_TYPE.SET_ALERT,
        payload: data.message,
      });
    } catch (e) {
      dispatch({
        type: ACTION_TYPE.SET_ALERT,
        payload: e.toString(),
      });
    }
  };

  const convertDataIn = () => {
    return JSON.stringify({
      [EMAIL]: state.formValues[EMAIL],
      [PASSWORD]: state.formValues[PASSWORD],
    });
  };

  return (
    <div className="form">
      {emailField ? (
        <div className="form__item">
          <label
            htmlFor="email"
            className={`${error ? "text__error" : "field__label"}`}
          >
            Email:
          </label>
          <input
            type="email"
            name={EMAIL}
            placeholder="Enter your email"
            className={`field__input ${
              error ? "field__input--validation" : ""
            }`}
            onChange={(e) => handleChange(EMAIL, e.target.value)}
            required
          />
          {error && <span className="text__error">{error}</span>}
        </div>
      ) : null}

      {/* {textField ? (
        <div className="form__item">
          <label htmlFor="text" className="field__label">
            {`${text}:`}
          </label>
          <input
            onChange={handleChangeText}
            type="text"
            name="text"
            value={valueText}
            placeholder={`Enter your ${text}`}
            className="field__input validation"
            required
          />
        </div>
      ) : null} */}

      {passField ? (
        <div className="form__item field">
          <label
            htmlFor="password"
            className={`${errorPass ? "text__error" : "field__label"}`}
          >
            Password:
          </label>
          <div className="field__wrapper">
            <input
              type="password"
              onChange={(e) => handleChange(PASSWORD, e.target.value)}
              // value={valueP}
              name={PASSWORD}
              placeholder="Enter your password"
              className={`field__input field__input--pass ${
                errorPass ? "field__input--validation" : ""
              }`}
            />
            <span
              onClick={changeIcon}
              className={`${
                errorPass ? "field__icon--err" : "field__icon"
              } click`}
            ></span>
            {errorPass && <span className="text__error">{errorPass}</span>}
          </div>
        </div>
      ) : null}

      {questionOff ? (
        <p className="have-acc">
          {`${question} `}
          {link}
        </p>
      ) : null}

      <Button onClick={handleSubmit} className="button button--primary">
        {button}
      </Button>
      {alert ? <Alert text={state.alert} /> : null}
    </div>
  );
}