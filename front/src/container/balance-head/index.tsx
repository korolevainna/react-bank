import React from "react";
import "./index.scss";
import "../../style/indikator.scss";
import "../../style/click.scss";

import { useContext } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";

import StatusBarWhite from "../../component/statusbar-white";
import Header from "../../component/header";
import { BalanceHeadProps } from "../../data/type";

//========  BalanceHead  ===============
export const BalanceHead: React.FC<BalanceHeadProps> = ({ balance }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="head-box">
        <StatusBarWhite />
        <Header />
        <h1 className="balance">${balance}</h1>

        <div className="buttons">
          <div
            onClick={() => navigate("/recive")}
            className="buttons__recive"
          ></div>
          <div
            onClick={() => navigate("/send")}
            className="buttons__send"
          ></div>
          <span className="buttons__text">Recive</span>
          <span className="buttons__text">Send</span>
        </div>
      </div>
    </>
  );
};

export default BalanceHead;