import "../style/authpage.scss";

import React from "react";
import { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../App";
import NotificationsList from "../container/notification-list";
import { Notifications } from "../data/type";

import StatusBar from "../component/statusbar";
import BackButtonTitle from "../component/back-button-title";
import Page from "../component/page";

import { NAME_FIELD } from "../data/const";

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notifications[]>([]);

  const auth = useContext(AuthContext);

  const userAuthId = auth?.state?.user?.id;
  // console.log(userId);

  const getNotifications = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:4000/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(),
      });

      const data = await res.json();

      if (res.ok) {
        // console.log("datanot--->", data.session.notifications);

        if (data.session.notifications !== null)
          setNotifications(data.session.notifications);
      }
    } catch (error: any) {}
  }, [auth] );

  const convertData = () => {
    return JSON.stringify({
      [NAME_FIELD.USER_ID]: userAuthId,
    });
  };

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <Page className="light-gray">
      <div>
        <StatusBar />
        <BackButtonTitle title="Notifications" />
      </div>
      <NotificationsList notifications={notifications} />
    </Page>
  );
};
