import React from "react";

import "./Dropdown.css";

type result = {
  username: string;
  avatar: string;
};

export interface Props {
  results: result[];
  changeSelectedChatRoom: (arg: string) => void;
}

export function Dropdown(props: Props) {
  const { results } = props;
  return (
    <div className="dropdown">
      {results.map((result) => {
        return (
          <div className="dropdown-item" key={result.username}>
            {`${result.username[0].toUpperCase()}${result.username.substr(1)}`}
          </div>
        );
      })}
    </div>
  );
}
