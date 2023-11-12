import "../style/authpage.scss";
import "../style/indikator.scss";
import Indikator from "../container/wellcomepage/img/indikator.svg";
import { useContext, useReducer, useState } from "react";
import { AuthContext, initialAuthState } from "../App";
import React from "react";
import {
  NAME_FIELD,
  ERR_FIELD,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
} from "../data/const";
import { useNavigate } from "react-router-dom";
import { ACTION_TYPE, initialState, reducer } from "../util/reducer";

import StatusBar from "../component/statusbar";
import Title from "../component/title";
import BackButton from "../component/back-button";
import Page from "../component/page";
import Input from "../component/input";
import Button from "../component/button";
import Alert from "../component/alert";
import Danger from "../component/form-field/svg/danger.svg";
import Grid from "../component/grid";

const { CODE } = NAME_FIELD;

export const SignupConfirmPage: React.FC = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  //====== Достаємо значення і поля вводу=====
  // ===== через useState =====
  // const [inputValue, setInputValue] = useState("");
  // const handleInputChange = (value: string) => {
  //   setInputValue(value);
  // };
  // const code = inputValue;

  // ===== через useReducer =====
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleInputChange = (name: string, value: string) => {
    // console.log(name, value.length);
    dispatch({
      type: ACTION_TYPE.SET_FORM_VAL,
      payload: {
        ...state.formValues,
        [name]: value,
      },
    });
  };

  //=====Перевірки того зщо вводять в поле====
  const validate = () => {
    const { code } = state.formValues;
    const err = { [CODE]: "" };

    if (code.length < 1) {
      err[CODE] = ERR_FIELD.IS_EMPTY;
    } else if (code.length > 6) {
      err[CODE] = ERR_FIELD.IS_BIG;
    }

    dispatch({ type: ACTION_TYPE.SEN_FORM_ERR, payload: err });

    return Object.values(err).every((err) => !err);
  };

  //відправка на сервер
  const handleSubmit = () => {
    const checkValidate = validate();

    if (checkValidate) sendCode();
  };

  const sendCode = async () => {
    try {
      const res = await fetch(`http://localhost:4000/signup-confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(),
      });
      //Получаю данные из router '/signup-confirm'
      //code i token
      const data = await res.json();

      // console.log("data========>>>", data);
      //Делаю серверную часть и потом возвращаюсь сюда
      // console.log("res.ok ====>>>>", res.ok);

      if (res.ok) {
        if (auth) {
          auth.dispatch({
            type: "LOGIN",
            payload: {
              token: data.session.token,
              user: data.session.user,
            },
          });
          // console.log("next BalancePage -->");
        }

        navigate("/balance");
      }

      dispatch({
        type: ACTION_TYPE.SET_ALERT,
        payload: data.message,
      });
    } catch (e: any) {
      dispatch({
        type: ACTION_TYPE.SET_ALERT,
        payload: e.toString(),
      });
    }
  };

  const convertData = () => {
    return JSON.stringify({
      [CODE]: state.formValues[CODE],
      token: auth?.state.token,
    });
  };

  return (
    <Page className="authpage">
      <div className="box">
        <StatusBar />
        <BackButton />
      </div>
      <Grid>
        <Title
          title="Confirm account"
          desctiption="Write the code you received"
        />
        <Input
          placeholder="Enter your code"
          label="Code"
          name={CODE}
          onInputChange={(value) => handleInputChange(CODE, value)}
          error={state.formErrors[CODE]}
        />
        <Button onClick={handleSubmit} className="button button--primary">
          Confirm
        </Button>

        <Alert text={state.alert} />
      </Grid>
      <img src={Indikator} alt="ind" className="indikator" />
    </Page>
  );
};

////=====
{
  /* <Alert className="alert alert--error">
          <span>
            <img src={Danger} alt="error" />
          </span>
          A user with the same name is already exist
        </Alert> */
}
