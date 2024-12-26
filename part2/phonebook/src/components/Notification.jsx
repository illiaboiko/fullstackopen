import React from "react";

export default function Notification({ notification }) {
  if (!notification.message) return null;
const getNotificationStyle = () => {
    switch (notification.type) {
        case 'success':
            return 'notification success'
        case 'error':
            return 'notification error'
        default:
            return 'notification'
    }
}
  return (
    <div className={getNotificationStyle()}>
      <p>{notification.message}</p>
    </div>
  );
}
