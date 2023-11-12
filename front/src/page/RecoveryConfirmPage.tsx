import "../style/authpage.scss";
import "../style/indikator.scss";

import React from "react";
import { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

import Indikator from "../container/wellcomepage/img/indikator.svg";
import StatusBar from "../component/statusbar";
import Title from "../component/title";
import BackButton from "../component/back-button";
import Page from "../component/page";
import Input from "../component/input";
import Button from "../component/button";
import Alert from "../component/alert";
import Grid from "../component/grid";
import { NAME_FIELD, ERR_FIELD, REG_EXP_PASSWORD } from "../data/const";
import { ACTION_TYPE, initialState, reducer } from "../util/reducer";

const { CODE, PASSWORD } = NAME_FIELD;

export const RecoveryConfirmPage: React.FC = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  //=========

  const handleInputChange = (name: string, value: string) => {
    dispatch({
      type: ACTION_TYPE.SET_FORM_VAL,
      payload: {
        ...state.formValues,
        [name]: value,
      },
    });
  };

  const validate = () => {
    const { code, password } = state.formValues;

    console.log("recoveryConfirm--> code:", code, "pass:", password);

    const err = { [CODE]: "", [PASSWORD]: "" };

    if (code.length < 1) {
      err[CODE] = ERR_FIELD.IS_EMPTY;
    } else if (code.length > 6) {
      err[CODE] = ERR_FIELD.IS_BIG;
    }

    if (password.length < 1) {
      err[PASSWORD] = ERR_FIELD.IS_EMPTY;
    } else if (!REG_EXP_PASSWORD.test(password)) {
      err[PASSWORD] = ERR_FIELD.PASSWORD;
    }

    dispatch({ type: ACTION_TYPE.SEN_FORM_ERR, payload: err });

    return Object.values(err).every((err) => !err);
  };

  const handleSubmit = () => {
    const checkValidate = validate();
    if (checkValidate) sendRecovery();
  };

  const convertData = () => {
    return JSON.stringify({
      [CODE]: state.formValues[CODE],
      [PASSWORD]: state.formValues[PASSWORD],
    });
  };

  const sendRecovery = async () => {
    try {
      const res = await fetch(`http://localhost:4000/recovery-confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(),
      });

      const data = await res.json();

      if (res.ok) {
        if (auth) {
          auth.dispatch({
            type: "LOGIN",
            payload: {
              token: data.session.token,
              user: data.session.user,
            },
          });
        }
        navigate("/balance");
      }

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

  return (
    <Page className="authpage">
      <div className="box">
        <StatusBar />
        <BackButton />
      </div>
      <Grid>
        <Title
          title="Recover password"
          desctiption="Choose a recovery method"
        />
        <Input
          placeholder="Введіть code"
          label="Code"
          name={CODE}
          onInputChange={(value) => handleInputChange(CODE, value)}
          error={state.formErrors[CODE]}
        />

        <Input
          placeholder="Введіть новий пароль"
          label="New Password"
          name={PASSWORD}
          onInputChange={(value) => handleInputChange(PASSWORD, value)}
          password
          error={state.formErrors[PASSWORD]}
        />
        <Button onClick={handleSubmit} className="button button--primary">
          Restore password
        </Button>

        <Alert text={state.alert} />
      </Grid>
      <img src={Indikator} alt="ind" className="indikator" />
    </Page>
  );
};
