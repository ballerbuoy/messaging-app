import React, { useContext } from "react";
import { UserContext } from "../../../../App";
import "./Avatar.css";

export interface Props {}

export function Avatar(props: Props) {
  const { avatar } = useContext(UserContext);
  console.log(avatar);
  return <img src={avatar} alt="user-avatar" className="avatar" />;
}
