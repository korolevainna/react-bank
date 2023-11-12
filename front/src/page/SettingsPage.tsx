import "../style/authpage.scss";
import "../style/indikator.scss";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../App";
import React from "react";
import EmailChangeForm from "../container/email-change-form";
import PasswordChangeForm from "../container/pass-change-form";

import StatusBar from "../component/statusbar";
import BackButtonTitle from "../component/back-button-title";
import Page from "../component/page";
import Button from "../component/button";
import Divider from "../component/divider";

import Grid from "../component/grid";

export const SettingsPage: React.FC = () => {
  const auth = React.useContext(AuthContext);

  const navigate = useNavigate();

  const hundleLogout = () => {
    if (auth) {
      auth.dispatch({ type: "LOGOUT" });
    }

    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <Page className="setting">
      <div>
        <StatusBar />
        <BackButtonTitle title="Settings" />
      </div>
      <Grid small>
        <EmailChangeForm />
        <Divider />
        <PasswordChangeForm />
        <Divider />
        <Button
          onClick={hundleLogout}
          className="button button--outline--danger"
        >
          Log out
        </Button>
      </Grid>
    </Page>
  );
};
