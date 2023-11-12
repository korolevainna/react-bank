import "../style/authpage.scss";

import React from "react";
import Signin from "../container/signin";
import Page from "../component/page";

export const SigninPage: React.FC = () => {
  return (
    <Page className="authpage">
      <Signin />
    </Page>
  );
};
