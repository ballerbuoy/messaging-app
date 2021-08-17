import React from "react";

import { Avatar } from "./avatar/Avatar";
import { QueryDropdown } from "../../../components/queryDropdown/QueryDropdown";

import "./Header.css";

type Props = {
  changeSelectedChatRoom: (arg: string) => void;
};

export function Header({ changeSelectedChatRoom }: Props) {
  return (
    <div className="header">
      <img
        src="https://www.clipartmax.com/png/middle/199-1998476_slack-icon-slack-logo.png"
        alt="slack-logo"
        className="logo"
      />
      <div className="query-wrapper">
        <QueryDropdown />
      </div>
      <Avatar />
    </div>
  );
}
