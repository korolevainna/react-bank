import React from "react";
import "./index.scss";
import { extractCents, extractDollars } from "../../util/money";
import { formatDate } from "../../util/getTime";
import { Transaction } from "../../data/type";

interface TransactionContentProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionContentProps> = ({
  transaction,
}) => {
  // console.log(transaction);
  return (
    <>
      {" "}
      <h1
        className={
          transaction.amount <= 0
            ? `amount amount__minus`
            : `amount amount__plus`
        }
      >
        {extractDollars(transaction.amount)}
        {extractCents(transaction.amount)}
      </h1>
      <div className="t-list">
        <div className="t-list__item">
          <div>Date</div>
          <div>{formatDate(transaction.date)}</div>
        </div>

        <div className="t-list__divider"></div>

        <div>
          <div className="t-list__item">
            <div>Address</div>
            <div>{transaction.sender} </div>
          </div>
        </div>

        <div className="t-list__divider"></div>

        <div>
          <div className="t-list__item">
            <div>Type</div>
            <div>{transaction.type} </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionCard;