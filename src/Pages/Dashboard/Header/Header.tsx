import React, { useState } from "react";
import { Avatar } from "./Avatar/Avatar";
import "./Header.css";
import { Dropdown } from "../../../Utils/Dropdown/Dropdown";
import { useEffect } from "react";

type Props = {
  changeSelectedChatRoom: (arg: string) => void;
};

export function Header({ changeSelectedChatRoom }: Props) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query === "") {
      setResult([]);
      return;
    }
    const getQueryResults = async () => {
      await fetch(`http://localhost:4000/user/query/${query}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setResult(JSON.parse(data)));
    };
    getQueryResults();
  }, [query]);

  const dropdown = result.length ? (
    <Dropdown
      results={result.length > 5 ? result.slice(0, 5) : result}
      changeSelectedChatRoom={changeSelectedChatRoom}
    />
  ) : null;

  return (
    <div className="header">
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
