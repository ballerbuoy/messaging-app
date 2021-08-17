import React from "react";

import { MessageItemLoader } from "../messageItem/MessageItemLoader";

import "./MessagesLoader.css";

export const MessagesLoader = () => {
  return (
    <div className="loading-messages-wrapper">
      <div className="loading-header-wrapper">
        <div className="loading-messages-header">
          <div className="loading-title"></div>
        </div>
        <hr className="loading-separator"></hr>
      </div>
      <div className="loading-messages-body">
        <MessageItemLoader />
        <MessageItemLoader />
        <MessageItemLoader />
        <MessageItemLoader />
      </div>
    </div>
  );
};
