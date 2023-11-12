import "./index.scss";
import React from "react";
import { getTime } from "../../util/getTime";

import cellular from "./svg/cellular.svg";
import battery from "./svg/battery.svg";
import wifi from "./svg/wifi.svg";

export default function StatusBar() {
  return (
    <div className="statusbar">
      <div className="statusbar__time">{getTime(new Date())}</div>
      <div className="statusbar__info">
        <img src={cellular} alt="cellular" height="" width="" />
        <img src={wifi} alt="wifi" height="" width="" />
        <img src={battery} alt="battery" height="" width="" />
      </div>
    </div>
  );
}