import React from "react";
import "./index.scss";
import { getTimeAgo } from "../../util/getTime";
import { Notifications, NotificationsProps } from "../../data/type";
import bellIco from "./svg/bell.svg";
import warningIco from "./svg/danger.svg";
import send from "./svg/send.svg";
import recive from "./svg/recive.svg";

const getNotificationImage = (type: string) => {
  switch (type) {
    case "Warning":
      return warningIco;
    case "Reciving":
      return recive;
    case "Sending":
      return send;
    default:
      return bellIco;
  }
};

const NotificationsList: React.FC<NotificationsProps> = ({ notifications }) => {
  return (
    <ul className="list">
      {notifications?.map((notification: Notifications) => (
        <li className="list__item" key={notification.id}>
          <img
            src={getNotificationImage(notification.type)}
            // src={notification.type === "Warning" ? warningIco : bellIco}
            alt="Ico"
          />
          <div className="list__item__info">
            <h2 className="list__item__message">{notification.message}</h2>
            <p className="list__item__text">
              {getTimeAgo(notification.date)}{" "}
              <span className="list__item__dote"></span>
              {notification.type}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NotificationsList;