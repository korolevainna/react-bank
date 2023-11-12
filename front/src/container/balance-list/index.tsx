import React from "react";
import "./index.scss";
import "../../style/click.scss";
import "../../style/indikator.scss";

import { extractDollars, extractCents } from "../../util/money";
import { getTime } from "../../util/getTime";
import user from "./img/user.svg";
import coinbase from "./img/coinbase.svg";
import stripe from "./img/stripe.svg";

import { Transaction } from "../../data/type";

export type BalanceListProps = {
  transactions: Transaction[];
  onTransactionClick: (id: number) => void;
};

const getTransactionImage = (sender: string) => {
  switch (sender) {
    case "Coinbase":
      return coinbase;
    case "Stripe":
      return stripe;
    default:
      return user;
  }
};

//========  BalanceList  ===============
export const BalanceList: React.FC<BalanceListProps> = ({
  transactions,
  onTransactionClick,
}) => {
  return (
    <ul className="trans-list">
      {transactions.map(({ id, sender, type, amount, date }) => (
        <li
          className="trans-list__item click"
          onClick={() => onTransactionClick(id)}
          key={id}
        >
          <img
            className="trans-list__item__img"
            src={getTransactionImage(sender)}
            alt="img"
            width="50px"
            height="50px"
          />

          <div className="trans-list__item__info">
            <p className="trans-list__item__info_sender">{sender}</p>
            <p className="trans-list__item__info_type">
              {type} <span className="trans-list__item__info_point"></span>{" "}
              {getTime(date)}
            </p>
          </div>
          <span
            className={`trans-list__item__amount ${
              amount <= 0
                ? "trans-list__item__amount--minus"
                : "trans-list__item__amount--plus"
            }`}
          >
            {extractDollars(amount)}
            <span className="trans-list__item__amount_cent">
              {extractCents(amount)}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default BalanceList;