import React from "react";

import "./Dropdown.css";

type result = {
  username: string;
  avatar: string;
};

export interface Props {
  results: result[];
  changeSelectedChatRoom: (arg: string) => void;
  id: string;
}

export function Dropdown(props: Props) {
  const { results, id } = props;
  return (
    <datalist className="dropdown" id={id}>
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
  );
}
