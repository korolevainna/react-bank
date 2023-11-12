import "../../style/indikator.scss";
import "./index.scss";

import React, { useContext } from "react";
import { AuthContext } from "../../App";
import StatusBar from "../../component/statusbar";
import Title from "../../component/title";
import BackButton from "../../component/back-button";
import FormField from "../../component/form-field";
import Indikator from "../wellcomepage/img/indikator.svg";

export const Signup: React.FC = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <div>
        <StatusBar />
        <BackButton />
      </div>
      <Title title="Sign Up" desctiption="Choose a registration method" />
      <FormField
        button="Continue"
        emailField={true}
        passField={true}
        textField={false}
        text="Code"
        question="Already have an account?"
        link={
          <a href="/signin" className="feild__link-signin">
            Sign In
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

export default Signup;