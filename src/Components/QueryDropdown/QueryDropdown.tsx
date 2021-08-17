import React, { useState, useEffect } from "react";

import { useQuery } from "../../hooks/useQuery";

import "./QueryDropdown.css";

type ResultType = {
  username: string;
  avatar: string;
};

export const QueryDropdown = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultType[] | undefined>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { data } = useQuery<ResultType[]>({
    url: `/user/query/${query}`,
    skip: !query ? true : false,
  });

  useEffect(() => {
    if (query === "") {
      setResults([]);
    } else {
      setResults(data);
    }
  }, [query, data]);

  const dropdown =
    results && results.length ? (
      <datalist className="dropdown" id="query-input">
        {results.map((result) => {
          return (
            <option
              value={result.username}
              key={result.username}
              className="option"
            />
          );
        })}
      </datalist>
    ) : null;

  return (
    <>
      <input
        type="text"
        placeholder="search the app"
        value={query}
        onChange={handleChange}
        className="query-input"
        list="query-input"
      />
      {dropdown}
    </>
  );
};
