import "../style/authpage.scss";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Page from "../component/page";
import Grid from "../component/grid";
import StatusBar from "../component/statusbar";
import BackButtonTitle from "../component/back-button-title";

import { Transaction } from "../data/type";
import TransactionCard from "../container/transaction-card";

// ==========================================================

const TransactionPage: React.FC = () => {
  const { transactionId } = useParams<{
    transactionId: string;
  }>();

  // console.log(transactionId); //OK

  const [transaction, setTransaction] = useState<Transaction | null>(null);

  // Send Data=============================================

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/transaction/${transactionId}`
        );

        const data = await res.json();

        // console.log(data);

        if (res.ok) {
          setTransaction(data.session.transaction);
        }
      } catch (error: any) {}
    };
    fetchTransaction();
  }, [transactionId]);

  if (transaction === null) {
    return <div>Loading...</div>;
  }

  // ====================================================

  return (
    <Page className="light-gray">
      <Grid>
        <StatusBar />
        <BackButtonTitle title="Transaction" />
        <TransactionCard transaction={transaction} />
      </Grid>
    </Page>
  );
};

export default TransactionPage;
