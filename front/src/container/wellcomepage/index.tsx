import "../../style/indikator.scss";

import React from "react";
import { useNavigate } from "react-router-dom";

import Heading from "../../component/heading";
import StatusBarWhite from "../../component/statusbar-white";
import Button from "../../component/button";
import Page from "../../component/page";

import Kerfin from "./img/kerfin.png";
import Indikator from "./img/indikator.svg";

import "./index.scss";

const Wellcome: React.FC = () => {
  const nav = useNavigate();

  const handleSignup = () => {
    nav("/signup");
    window.scrollTo(0, 0);
  };

  const handleSignin = () => {
    nav("/signin");
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="pagebackground">
        <StatusBarWhite />
        <Heading title="Hello!">Welcome to bank app!</Heading>
        <img src={Kerfin} alt="kerfin" className="kerfin" />
      </div>
      <div className="wellcome-buttons">
        <Button onClick={handleSignup} className="button button--primary">
          Sign Up
        </Button>
        <Button onClick={handleSignin} className="button button--outline">
          Sign In
        </Button>
      </div>
      <img src={Indikator} alt="ind" className="indikator" />
    </>
  );
};

export default Wellcome;