import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

import Page from "../component/page";
import Grid from "../component/grid";
import Indikator from "../container/wellcomepage/img/indikator.svg";
import BalanceHead from "../container/balance-head";
import BalanceList from "../container/balance-list";
import { NAME_FIELD } from "../data/const";
import { Transaction } from "../data/type";

//========= BalancePage =========
export const BalancePage: React.FC = () => {
  //достаю необходимые константы

  const [balance, setBalance] = useState<number>(0);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const BalanceSubmit = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/balance`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: convertData(),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setBalance(data.session.balance);

        if (data.session.transactions !== null) {
          setTransactions(data.session.transactions);
        }
      }
    } catch (error: any) {
      console.error("Помилка отримання даних:", error);
    }
  };

  const convertData = () => {
    return JSON.stringify({
      [NAME_FIELD.USER_ID]: auth?.state.user?.id,
    });
  };

  useEffect(() => {
    BalanceSubmit();
  }, []);

  return (
    <Page className="">
      <BalanceHead balance={balance} />

      <Grid>
        <BalanceList
          onTransactionClick={(id) => navigate(`/transaction/${id}`)}
          transactions={transactions}
        />
      </Grid>
      <img src={Indikator} alt="ind" className="indikator" />
    </Page>
  );
};
