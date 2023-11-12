import "../style/authpage.scss";

import React from "react";
import Signup from "../container/signup";
import Page from "../component/page";

export const SignupPage: React.FC = () => {
  return (
    <Page className="authpage">
      <Signup />
    </Page>
  );
};
