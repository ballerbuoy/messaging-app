import React, { useState, useEffect } from "react";
import { useMutation } from "../../Hooks/useMutation";
import { UserInfo } from "../../Types/User.interface";
import "./Login.css";

type LoginProps = {
  setToken: (arg: UserInfo) => void;
};

export function Login({ setToken }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data, error, loading, executeFetch } = useMutation<UserInfo>({
    url: "/login",
    method: "POST",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeFetch({ username, password });
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
          <button type="submit" disabled={loading} className="login-button">
            {" "}
            {loading ? "Logging in..." : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
}
