import React from "react";

export interface Props {
  results: string[];
}

export function Dropdown(props: Props) {
  let { results } = props;
  if (results.length > 5) {
    results = results.slice(0, 5);
  }
  return (
    <div className="dropdown">
      {results.map((result) => {
        return <div className="dropdown-item">{result}</div>;
      })}
    </div>
  );
}
