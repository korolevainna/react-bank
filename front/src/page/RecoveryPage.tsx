import "../style/authpage.scss";
import "../style/indikator.scss";
import Indikator from "../container/wellcomepage/img/indikator.svg";
import { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../App";
import React from "react";
import StatusBar from "../component/statusbar";
import Title from "../component/title";
import BackButton from "../component/back-button";
import Page from "../component/page";
import Input from "../component/input";
import Button from "../component/button";
import Alert from "../component/alert";
import Danger from "../component/form-field/svg/danger.svg";
import Grid from "../component/grid";
import { NAME_FIELD, ERR_FIELD, REG_EXP_EMAIL } from "../data/const";
import { ACTION_TYPE, initialState, reducer } from "../util/reducer";

const { EMAIL } = NAME_FIELD;

export const RecoveryPage: React.FC = () => {
  const navigate = useNavigate();

  //====== Достаємо значення і поля вводу=====
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

  //=====Перевірки того що вводять в поле====
  const validate = () => {
    const { email } = state.formValues;
    const err = { [EMAIL]: "" };

    if (email.length < 1) {
      err[EMAIL] = ERR_FIELD.IS_EMPTY;
    } else if (email.length > 40) {
      err[EMAIL] = ERR_FIELD.IS_BIG;
    } else if (!REG_EXP_EMAIL.test(email)) {
      err[EMAIL] = ERR_FIELD.EMAIL;
    }

    dispatch({ type: ACTION_TYPE.SEN_FORM_ERR, payload: err });

    return Object.values(err).every((err) => !err);
  };

  //відправка на сервер
  const handleSubmit = () => {
    const checkValidate = validate();

    if (checkValidate) submit();
  };

  const submit = async () => {
    try {
      const res = await fetch(`http://localhost:4000/recovery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(),
      });
      //Получаю данные из router '/recovery'
      //email
      const data = await res.json();

      console.log("data========>>>", data);
      //Делаю серверную часть и потом возвращаюсь сюда
      // console.log("res.ok ====>>>>", res.ok);

      if (res.ok) {
        console.log("next recovery-confirm");
        navigate("/recovery-confirm");
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
      [EMAIL]: state.formValues[EMAIL],
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
          title="Recover password"
          desctiption="Choose a recovery method"
        />
        <Input
          placeholder="Введіть email"
          label="Email"
          name={EMAIL}
          onInputChange={(value) => handleInputChange(EMAIL, value)}
          error={state.formErrors[EMAIL]}
        />
        <Button onClick={handleSubmit} className="button button--primary">
          Send code
        </Button>

        <Alert text={state.alert} />
      </Grid>
      <img src={Indikator} alt="ind" className="indikator" />
    </Page>
  );
};
