import "./index.scss";
import "../../style/indikator.scss";

import React, { useContext, useReducer } from "react";
import { AuthContext } from "../../App";

import Title from "../../component/title";

import Grid from "../../component/grid";
import Input from "../../component/input";
import Button from "../../component/button";

import { NAME_FIELD, ERR_FIELD, REG_EXP_PASSWORD } from "../../data/const";
import { reducer, initialState, ACTION_TYPE } from "../../util/reducer";

//======== const ========

const { NEW_PASSWORD, PASSWORD, EMAIL } = NAME_FIELD;

//========  PasswordChangeForm  ===============
export const PasswordChangeForm: React.FC = () => {
  const auth = useContext(AuthContext);

  // const oldP = auth?.state?.user?.email;
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
  const validatePass = () => {
    const { newPassword, password } = state.formValues;

    // console.log(password, newPassword);

    const err = { [NEW_PASSWORD]: "", [PASSWORD]: "" };

    if (password.length < 1) {
      err[PASSWORD] = ERR_FIELD.IS_EMPTY;
    } else if (!REG_EXP_PASSWORD.test(password)) {
      err[PASSWORD] = ERR_FIELD.PASSWORD;
    }

    if (newPassword.length < 1) {
      err[NEW_PASSWORD] = ERR_FIELD.IS_EMPTY;
    } else if (!REG_EXP_PASSWORD.test(password)) {
      err[NEW_PASSWORD] = ERR_FIELD.PASSWORD;
    }

    dispatch({ type: ACTION_TYPE.SEN_FORM_ERR, payload: err });

    return Object.values(err).every((err) => !err);
  };
  //======== кнопкой направляю на функцию отправки данных на сервер ======
  const handleSubmitPass = () => {
    const checkValidate = validatePass();
    if (checkValidate) sendChangePass();
  };

  // ====== конвертирую данные ========
  const convertChangePass = () => {
    return JSON.stringify({
      [NEW_PASSWORD]: state.formValues[NEW_PASSWORD],
      [PASSWORD]: state.formValues[PASSWORD],
      [EMAIL]: auth?.state?.user?.email,
    });
  };

  // ======= отправляю данные на сервер и получаю обратно =======
  const sendChangePass = async () => {
    try {
      const res = await fetch(`http://localhost:4000/settings-pass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertChangePass(),
      });

      const data = await res.json();
      // console.log("data===>", data);
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
        <Title title="Change password:" desctiption="" small />

        <Input
          placeholder="Введіть поточний пароль"
          label="Old Password"
          name={PASSWORD}
          onInputChange={(value) => handleInputChange(PASSWORD, value)}
          password
          error={state.formErrors[PASSWORD]}
        />

        <Input
          placeholder="Введіть новий пароль"
          label="New Password"
          name={NEW_PASSWORD}
          onInputChange={(value) => handleInputChange(NEW_PASSWORD, value)}
          password
          error={state.formErrors[NEW_PASSWORD]}
        />

        <Button onClick={handleSubmitPass} className="button button--outline">
          Save Password
        </Button>
      </Grid>
    </>
  );
};

export default PasswordChangeForm;