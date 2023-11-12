import React from "react";
import "./index.scss";
import "../../style/click.scss";
import stripe from "./img/stripe.svg";
import coinbase from "./img/coinbase.svg";
import iconsStripe from "./img/icon-stripe.svg";
import iconsCoinbse from "./img/icon-coinbase.svg";

import { PaymentSystemListProps } from "../../data/type";
import { NAME_FIELD } from "../../data/const";

//========  PaymentSystemList  ===============
export const PaymentSystemList: React.FC<PaymentSystemListProps> = ({
  onChange,
}) => {
  const handlePaymentSystem = (name: string, value: string) => {
    // console.log(name, value);
    onChange(name, value);
  };
  return (
    <div className="paylist">
      <button
        onClick={() => handlePaymentSystem(NAME_FIELD.PAY_SYS, "Stripe")}
        className="paylist__item click"
      >
        <img src={stripe} alt="stripe" />
        <p className="paylist__text">Stripe</p>
        <img src={iconsStripe} alt="iconsStripe" />
      </button>

      <button
        onClick={() => handlePaymentSystem(NAME_FIELD.PAY_SYS, "Coinbase")}
        className="paylist__item click"
      >
        <img src={coinbase} alt="coinbase" />
        <p className="paylist__text">Coinbase</p>
        <img src={iconsCoinbse} alt="iconsCoinbse" />
      </button>
    </div>
  );
};

export default PaymentSystemList;