import React from "react";
import "./index.scss";
import "../../style/indikator.scss";
import { useContext } from "react";
import { AuthContext } from "../../App";
import StatusBar from "../../component/statusbar";
import Title from "../../component/title";
import BackButton from "../../component/back-button";
import FormField from "../../component/form-field";
import Indikator from "../wellcomepage/img/indikator.svg";

export const Signin: React.FC = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <div className="box">
        <StatusBar />
        <BackButton />
      </div>
      <Title title="Sign In" desctiption="Select login method" />
      <FormField
        button="Continue"
        emailField={true}
        passField={true}
        textField={false}
        text="Code"
        question="Forgot your password?"
        link={
          <a href="/recovery" className="feild__link-signin">
            Restore
          </a>
        }
        questionOff={true}
        alert={true}
        auth={auth}
      />
      <img src={Indikator} alt="ind" className="indikator" />
    </>
  );
};

export default Signin;
