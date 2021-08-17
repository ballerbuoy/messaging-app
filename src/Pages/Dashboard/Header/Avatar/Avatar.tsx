import React from "react";

import { useUser } from "../../../../contexts/userContext";

import "./Avatar.css";

export interface Props {}

export function Avatar(props: Props) {
  const { user } = useUser();
  return <img src={user.avatar} alt="user-avatar" className="avatar" />;
}
