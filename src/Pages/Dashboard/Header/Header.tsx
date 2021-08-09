import React, { useState, useEffect } from "react";

import { Avatar } from "./Avatar/Avatar";
import { Dropdown } from "../../../Components/Dropdown/Dropdown";

import { useQuery } from "../../../Hooks/useQuery";

import "./Header.css";

type Props = {
  changeSelectedChatRoom: (arg: string) => void;
};

type resultType = {
  username: string;
  avatar: string;
};

export function Header({ changeSelectedChatRoom }: Props) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<resultType[] | undefined>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const { data } = useQuery<resultType[]>({
    url: `/user/query/${query}`,
    skip: !query ? true : false,
  });

  useEffect(() => {
    if (query === "") {
      setResult([]);
    } else {
      setResult(data);
    }
  }, [query, data]);

  const dropdown =
    result && result.length ? (
      <Dropdown
        results={result.length > 5 ? result.slice(0, 5) : result}
        changeSelectedChatRoom={changeSelectedChatRoom}
      />
    ) : null;

  return (
    <div className="header">
      <img
        src="https://www.clipartmax.com/png/middle/199-1998476_slack-icon-slack-logo.png"
        alt="slack-logo"
        className="logo"
      />
      <div className="query-wrapper">
        <input
          type="text"
          placeholder="search the app"
          value={query}
          onChange={handleChange}
          className="query-input"
        />
        {dropdown}
      </div>
      <Avatar />
    </div>
  );
}
