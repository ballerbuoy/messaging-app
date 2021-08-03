import React from "react";

type result = {
  username: string;
  avatar: string;
};

export interface Props {
  results: result[];
}

export function Dropdown(props: Props) {
  const { results } = props;
  return (
    <div className="dropdown">
      {results.map((result) => {
        return (
          <div className="dropdown-item" key={result.username}>
            {result.username}
          </div>
        );
      })}
    </div>
  );
}
