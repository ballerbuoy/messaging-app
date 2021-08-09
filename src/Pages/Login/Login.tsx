import React, { useState, useEffect } from "react";

import { UserInfo } from "../../Types/User.interface";

import { useMutation } from "../../Hooks/useMutation";
import { useUser } from "../../Contexts/user-context";
import { ajaxClient } from "../../ajaxClient/ajaxClient";

import "./Login.css";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data, status, mutate } = useMutation<UserInfo>((payload) =>
    ajaxClient.post({ url: "/login", payload })
  );

  const { dispatch } = useUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ username, password });
  };

  //TODO: pass options to mutate onSuccess, onError
  useEffect(() => {
    if (data) {
      dispatch({ type: "NEW_USER", newUser: data });
    }
  }, [data, dispatch]);

  const validationError =
    status === "error" ? (
      <div className="error">Invalid username and password combination!</div>
    ) : null;

  return (
    <div className="login-wrapper">
      <h1>Please Log In!</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="field-wrapper">
          <p>Username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </label>
        <label className="field-wrapper">
          <p>Password</p>
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
            disabled={status === "loading"}
            className="login-button"
          >
            {" "}
            {status === "loading" ? "Logging in..." : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
}
