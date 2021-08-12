import React from "react";
import "./Notification.css";

type NotificationProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export const Notification = ({ children, onClose }: NotificationProps) => {
  return (
    <div className="notification">
      {children}{" "}
      <span className="notification-close" onClick={onClose}>
        X
      </span>
    </div>
  );
};
