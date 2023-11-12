import { TypeFieldName } from "./type";
// import { TypeTextQuestion } from "./type";
import { TypeFieldError } from "./type";

export const NAME_FIELD: TypeFieldName = {
  EMAIL: "email",
  NEW_EMAIL: "newEmail",
  USER_ID: "userId",
  PASSWORD: "password",
  NEW_PASSWORD: "newPassword",
  CODE: "code",
  SUM: "sum",
  PAY_SYS: "paySys",
  PAY_TO: "payTo",
};

// export const TEXT_QUESTION: TypeTextQuestion = {
//   SIGNUP_PAGE_QUESTION: "Already have an account?",
//   SIGNUP_PAGE_LINK: "Sign In",
//   SIGNIN_PAGE_QUESTION: "Forgot your password?",
//   SIGNIN_PAGE_LINK: "Restore",
// };

export const ERR_FIELD: TypeFieldError = {
  IS_EMPTY: "Введіть значення в поле",
  IS_BIG: "Дуже довге значення, приберіть зайве",
  EMAIL: "Введіть коректне значення e-mail адреси",

  PASSWORD:
    "Пароль має містити не менше 8 символів, включаючи принаймні одну цифру та велику літеру",
  PASSWORD_AGAIN: "Ваш другий пароль не збігається з першим",
  MONEY: "Введіть правильне значення суми",
};

export const REG_EXP_EMAIL = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

export const REG_EXP_PASSWORD = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

export const REG_EXP_MONEY: RegExp = new RegExp(
  /^(?!0[.,]00$)(\d{1,6}(?:[.]\d{1,2})?)$/
);