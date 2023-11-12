import "../style/authpage.scss";
import { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../App";
import React from "react";
import StatusBar from "../component/statusbar";
import Title from "../component/title";
import BackButtonTitle from "../component/back-button-title";
import Page from "../component/page";
import Input from "../component/input";
import Button from "../component/button";
import Grid from "../component/grid";
import Alert from "../component/alert";

import {
  NAME_FIELD,
  ERR_FIELD,
  REG_EXP_EMAIL,
  REG_EXP_MONEY,
} from "../data/const";
import { ACTION_TYPE, initialState, reducer } from "../util/reducer";

const { SUM, PAY_TO, EMAIL } = NAME_FIELD;

export const SendPage: React.FC = () => {
  const auth = useContext(AuthContext);

  const emailUser = auth?.state.user?.email;

  // console.log(auth);
  //====== Достаємо значення і поля вводу=====
  // ===== через useReducer =====
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (name: string, value: string) => {
    // console.log(value);
    dispatch({
      type: ACTION_TYPE.SET_FORM_VAL,
      payload: {
        ...state.formValues,
        [name]: value,
      },
    });
  };

  //=====Перевірки того що вводять в поле====
  const validSendMoney = () => {
    const { [PAY_TO]: emailTo, [SUM]: amount } = state.formValues;
    // console.log(emailTo, amount);

    const err = { [EMAIL]: "" };

    if (emailTo.length < 1) {
      err[EMAIL] = ERR_FIELD.IS_EMPTY;
    } else if (emailTo.length > 40) {
      err[EMAIL] = ERR_FIELD.IS_BIG;
    } else if (!REG_EXP_EMAIL.test(emailTo)) {
      err[EMAIL] = ERR_FIELD.EMAIL;
    }

    if (amount.length < 1) {
      err[SUM] = ERR_FIELD.IS_EMPTY;
    } else if (amount.length > 8) {
      err[SUM] = ERR_FIELD.IS_BIG;
    } else if (!REG_EXP_MONEY.test(amount)) {
      err[SUM] = ERR_FIELD.MONEY;
    }

    dispatch({ type: ACTION_TYPE.SEN_FORM_ERR, payload: err });

    return Object.values(err).every((err) => !err);
  };

  //відправка на сервер
  const handleSubmit = () => {
    const checkValidate = validSendMoney();

    if (checkValidate) sendMoney();
  };

  const sendMoney = async () => {
    try {
      const res = await fetch(`http://localhost:4000/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(),
      });
      //Получаю данные из router '/recovery'
      //email
      const data = await res.json();

      // console.log("data========>>>", data);
      // console.log("res.ok ====>>>>", res.ok);

      if (res.ok) {
        dispatch({
          type: ACTION_TYPE.SUCCESS,
          payload: true,
        });

        return dispatch({
          type: ACTION_TYPE.SET_ALERT,
          payload: data.message,
        });
      }
      dispatch({
        type: ACTION_TYPE.SUCCESS,
        payload: false,
      });

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
      [SUM]: Number(state.formValues[SUM]),
      [EMAIL]: emailUser,
      [PAY_TO]: state.formValues[PAY_TO],
    });
  };
  return (
    <Page className="light-gray">
      <div className="box">
        <StatusBar />
        <BackButtonTitle title="Send" />
      </div>
      <Grid>
        <Input
          placeholder="Введіть email"
          label="Email"
          name={PAY_TO}
          onInputChange={(value) => handleInputChange(PAY_TO, value)}
          error={state.formErrors[PAY_TO]}
        />

        <Input
          placeholder="$"
          label="Sum"
          name={SUM}
          onInputChange={(value) => handleInputChange(SUM, value)}
          error={state.formErrors[SUM]}
        />
        <Button onClick={handleSubmit} className="button button--primary">
          Send
        </Button>
        <Alert success={state.data} text={state.alert} />
      </Grid>
    </Page>
  );
};
