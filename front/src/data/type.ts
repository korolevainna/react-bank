export type TypeFieldName = {
    EMAIL: string;
    NEW_EMAIL: string;
    USER_ID: string;
    PASSWORD: string;
    NEW_PASSWORD: string;
    CODE: string;
    SUM: string;
    PAY_SYS: string;
    PAY_TO: string;
  };
  
  export type TypeTextQuestion = {
    SIGNUP_PAGE_QUESTION: string;
    SIGNUP_PAGE_LINK: string;
    SIGNIN_PAGE_QUESTION: string;
    SIGNIN_PAGE_LINK: string;
  };
  
  export type TypeFieldError = {
    IS_EMPTY: string;
    IS_BIG: string;
    EMAIL: string;
    PASSWORD: string;
    PASSWORD_AGAIN: string;
    MONEY: string;
  };
  
  export type TypeFormCreate = {
    button: string;
    emailField: boolean;
    passField: boolean;
    textField: boolean;
    text: string;
    question: string;
    link: string;
  };
  
  export type AlertProps = {
    text?: string;
    success?: boolean;
  };
  
  export type Notifications = {
    id: number;
    userId: number;
    type: string;
    message: string;
    date: string;
    iconNotif: string;
  };
  export type NotificationsProps = {
    notifications: Notifications[];
  };
  
  export type PaymentSystemListProps = {
    onChange: (name: string, value: string) => void;
  };
  
  export type BalanceHeadProps = {
    balance: number;
  };
  
  export type Transaction = {
    amount: number;
    date: string;
    type: string;
    sender: string;
    id: number;
  };