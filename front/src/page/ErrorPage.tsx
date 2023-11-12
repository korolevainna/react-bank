import React from "react";
import Page from "../component/page";
import Grid from "../component/grid";
import Title from "../component/title";
import BackButton from "../component/back-button";

const ErrorPage: React.FC = () => {
  return (
    <Page className="">
      <Grid>
        <BackButton />
        <Title title="Page not found" desctiption=""></Title>
      </Grid>
    </Page>
  );
};

export default ErrorPage;
