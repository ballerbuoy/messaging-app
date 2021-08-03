import React, { useState } from "react";
import { Avatar } from "./Avatar/Avatar";
import "./Header.css";
import { debounce } from "../../../utils";
import { Dropdown } from "../../../Utils/Dropdown/Dropdown";

export interface Props {}

export function Header(props: Props) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const getQueryResults = async () => {
    await fetch(`http://localhost:4000/user/query/${query}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setResult(JSON.parse(data)));
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    await getQueryResults();
  };

  const dropdown = result.length ? (
    <Dropdown results={result.length > 5 ? result.slice(0, 5) : result} />
  ) : null;

  return (
    <div className="header">
      <div className="query-input">
        <input
          type="text"
          placeholder="search the app"
          value={query}
          onChange={handleChange}
        />
        {dropdown}
      </div>
      <Avatar />
    </div>
  );
}
