import React from "react";

import "./MessageItemLoader.css";

export const MessageItemLoader = () => {
  return (
    <div className="loading-messageItem">
      <div className="loading-avatar-message-item"> </div>

      <div className="loading-message">
        <div className="loading-messageMeta">
          <span className="loading-username"></span>
          <span className="loading-timestamp"></span>
        </div>
        <div className="loading-messageBody"></div>
      </div>
    </div>
  );
};
