import "./index.scss";
import "../../style/indikator.scss";

import React, { useContext, useReducer } from "react";
import { AuthContext } from "../../App";

import Title from "../../component/title";

import Grid from "../../component/grid";
import Input from "../../component/input";
import Button from "../../component/button";

import {
  NAME_FIELD,
  ERR_FIELD,
  REG_EXP_PASSWORD,
  REG_EXP_EMAIL,
} from "../../data/const";
import { reducer, initialState, ACTION_TYPE } from "../../util/reducer";

//======== const ========

const { NEW_EMAIL, PASSWORD, EMAIL } = NAME_FIELD;

//========  EmailChangeForm  ===============
export const EmailChangeForm: React.FC = () => {
  const auth = useContext(AuthContext);

  const oldEmail = auth?.state?.user?.email;
  // console.log("auth", oldEmail);

  const [state, dispatch] = useReducer(reducer, initialState);

  //===== получаю данные из инпута =====

  const handleInputChange = (name: string, value: string) => {
    // console.log(name, value);
    dispatch({
      type: ACTION_TYPE.SET_FORM_VAL,
      payload: {
        ...state.formValues,
        [name]: value,
      },
    });
  };
  //========== Проверяю данные из инпута =======
  const validate = () => {
    const { newEmail, password } = state.formValues;

    // console.log(newEmail, password);

    const err = { [NEW_EMAIL]: "", [PASSWORD]: "" };

    if (newEmail.length < 1) {
      err[NEW_EMAIL] = ERR_FIELD.IS_EMPTY;
    } else if (newEmail.length > 40) {
      err[NEW_EMAIL] = ERR_FIELD.IS_BIG;
    } else if (!REG_EXP_EMAIL.test(newEmail)) {
      err[NEW_EMAIL] = ERR_FIELD.EMAIL;
    }

    if (password.length < 1) {
      err[PASSWORD] = ERR_FIELD.IS_EMPTY;
    } else if (!REG_EXP_PASSWORD.test(password)) {
      err[PASSWORD] = ERR_FIELD.PASSWORD;
    }

    dispatch({ type: ACTION_TYPE.SEN_FORM_ERR, payload: err });

    return Object.values(err).every((err) => !err);
  };
  //======== кнопкой направляю на функцию отправки данных на сервер ======
  const handleSubmit = () => {
    const checkValidate = validate();
    if (checkValidate) sendChangeEmail();
  };

  // ====== конвертирую данные ========
  const convertChangeEmail = () => {
    return JSON.stringify({
      [NEW_EMAIL]: state.formValues[NEW_EMAIL],
      [PASSWORD]: state.formValues[PASSWORD],
      // [EMAIL]: state.formValues[EMAIL],

      [EMAIL]: oldEmail,
    });
  };

  // ======= отправляю данные на сервер и получаю обратно =======
  const sendChangeEmail = async () => {
    try {
      const res = await fetch(`http://localhost:4000/settings-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertChangeEmail(),
      });

      const data = await res.json();

      if (res.ok) {
        auth?.dispatch({
          type: "LOGIN",
          payload: {
            token: data.session.token,
            user: data.session.user,
          },
        });

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

  return (
    <>
      <Grid small>
        <Title title="Change email:" desctiption="" small />

        <Input
          placeholder="Введіть новий email"
          label="Email"
          name={NEW_EMAIL}
          onInputChange={(value) => handleInputChange(NEW_EMAIL, value)}
          error={state.formErrors[NEW_EMAIL]}
        />

        <Input
          placeholder="Введіть пароль"
          label="Password"
          name={PASSWORD}
          onInputChange={(value) => handleInputChange(PASSWORD, value)}
          password
          error={state.formErrors[PASSWORD]}
        />

        <Button onClick={handleSubmit} className="button button--outline">
          Save Email
        </Button>
      </Grid>
    </>
  );
};

export default EmailChangeForm;