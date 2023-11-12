import "../style/authpage.scss";
import { useContext, useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../App";
import React from "react";
import PaymentSystemList from "../container/payment-system-list";
import StatusBar from "../component/statusbar";
import Title from "../component/title";
import BackButtonTitle from "../component/back-button-title";
import Page from "../component/page";
import Input from "../component/input";
import Button from "../component/button";
import Alert from "../component/alert";
import Grid from "../component/grid";
import Divider from "../component/divider";

import { NAME_FIELD, ERR_FIELD, REG_EXP_MONEY } from "../data/const";
import { ACTION_TYPE, initialState, reducer } from "../util/reducer";

const { SUM, PAY_SYS, EMAIL } = NAME_FIELD;

export const RecivePage: React.FC = () => {
  const auth = useContext(AuthContext);

  //====== Достаємо значення і поля вводу=====
  // ===== через useReducer =====
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (name: string, value: string) => {
    dispatch({
      type: ACTION_TYPE.SET_FORM_VAL,
      payload: {
        ...state.formValues,
        [name]: value,
      },
    });
  };

  //=====Перевірки того що вводять в поле====
  const validateSum = () => {
    const amount = state.formValues.sum;

    const err = { [SUM]: "" };

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

  const [isDataSent, setIsDataSent] = useState(false);

  const handleSubmit = (name: string, value: string) => {
    const checkValidate = validateSum();

    if (checkValidate) {
      dispatch({
        type: ACTION_TYPE.SET_FORM_VAL,
        payload: {
          ...state.formValues,
          [name]: value,
        },
      });

      setIsDataSent(true);
    }
  };

  useEffect(() => {
    const submitMoney = async () => {
      try {
        const res = await fetch(`http://localhost:4000/recive`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: convertData(),
        });

        const data = await res.json();
        // console.log("data----->", data);
        // console.log(res.ok);

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
      } catch (error: any) {
        dispatch({
          type: ACTION_TYPE.SET_ALERT,
          payload: error.toString(),
        });
      }
    };
    if (isDataSent) submitMoney();
    setIsDataSent(false);
  }, [isDataSent]);

  const convertData = () => {
    return JSON.stringify({
      [SUM]: Number(state.formValues[SUM]),
      [EMAIL]: auth?.state.user?.email,
      [PAY_SYS]: state.formValues[PAY_SYS],
    });
  };

  return (
    <Page className="light-gray">
      <div className="box">
        <StatusBar />
        <BackButtonTitle title="Recive" />
      </div>
      <Grid small>
        <Title title="Recive amount" desctiption="" small />
        <Input
          placeholder="$"
          name={SUM}
          onInputChange={(value) => handleInputChange(SUM, value)}
          error={state.formErrors[SUM]}
        />
        <Divider />
        <Title title="Payment system" desctiption="" small />
        <PaymentSystemList onChange={handleSubmit} />
        <Alert success={state.data} text={state.alert} />
      </Grid>
    </Page>
  );
};
