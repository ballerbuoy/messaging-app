import React from "react";

import { useUser } from "../../../../Contexts/user-context";

import "./Avatar.css";

export interface Props {}

export function Avatar(props: Props) {
  const { state } = useUser();
  return <img src={state.avatar} alt="user-avatar" className="avatar" />;
}
