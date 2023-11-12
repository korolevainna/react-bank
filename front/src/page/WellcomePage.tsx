import React from "react";
import Wellcome from "../container/wellcomepage";
import Page from "../component/page";

export const WellcomePage: React.FC = () => {
  return (
    <Page className="welcomepage">
      <Wellcome />
    </Page>
  );
};
