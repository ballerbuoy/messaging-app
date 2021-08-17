import React, { useState, useEffect } from "react";

import { UserInfo } from "../../types/User.interface";

import { useMutation } from "../../hooks/useMutation";
import { useUser } from "../../contexts/userContext";
import { ajaxClient } from "../../ajaxClient/ajaxClient";

import { STATUS } from "../../constants";

import "./Login.css";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data, status, mutate } = useMutation<UserInfo>((payload) =>
    ajaxClient.post({ url: "/login", payload })
  );

  const { createNewUser } = useUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ username, password });
  };

  useEffect(() => {
    if (data) {
      createNewUser(data);
    }
  }, [data, createNewUser]);

  const validationError =
    status === STATUS.ERROR ? (
      <div className="error">Invalid username and password combination!</div>
    ) : null;

  return (
    <div className="login-wrapper">
      <h1>Please Log In!</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="field-wrapper">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </label>
        <label className="field-wrapper">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </label>
        {validationError}
        <div>
          <button
            type="submit"
            disabled={status === STATUS.LOADING}
            className="login-button"
          >
            {" "}
            {status === STATUS.LOADING ? "Logging in..." : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
}
