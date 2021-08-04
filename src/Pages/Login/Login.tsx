import React, { useState } from "react";
import "./Login.css";
import { useFetch } from "../../Hooks/useFetch";
import { useEffect } from "react";
import { UserInfo } from "../../Types/User.interface";

export interface LoginProps {
  setToken: (arg: UserInfo) => void;
}

export function Login(props: LoginProps) {
  const { setToken } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [queryData, setQueryData] = useState({ skip: true, payload: {} });
  const { data, error, loading } = useFetch<UserInfo>({
    url: "/login",
    method: "POST",
    payload: queryData.payload,
    skip: queryData.skip,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueryData({
      payload: { username, password },
      skip: false,
    });
  };

  useEffect(() => {
    if (data) {
      setToken(data);
    }
  }, [data, setToken]);

  const validationError = error ? (
    <div className="error">Invalid username and password combination!</div>
  ) : null;

  return (
    <div className="login-wrapper">
      <h1>Please Log In!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {validationError}
    </div>
  );
}
