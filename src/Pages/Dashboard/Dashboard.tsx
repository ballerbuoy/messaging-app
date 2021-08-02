import React from "react";
import Header from "./Header/Header";
import { UserContext } from "../../App";
import { useContext } from "react";

export interface Props {}

export function Dashboard(props: Props) {
  const { username } = useContext(UserContext);
  return (
    <div>
      <Header />
      <div>
        <h3>{username}, welcome to your dashboard!</h3>
      </div>
    </div>
  );
}
