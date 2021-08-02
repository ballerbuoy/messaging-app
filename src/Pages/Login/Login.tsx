import React, { useState } from "react";
import "./Login.css";
import { useFetch } from "../../Hooks/useFetch";

export interface LoginProps {
  setToken: React.Dispatch<React.SetStateAction<any>>;
}

export function Login(props: LoginProps) {
  const { setToken } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //   const { data, error, loading, executeFetch } = useFetch(
  //     "http://localhost:4000/login",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username,
  //         password,
  //       }),
  //     },
  //     false
  //   );

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setToken(JSON.parse(data));
        } else {
          throw new Error(data.error);
        }
      })
      .catch((err) => setError(err));
    // await executeFetch().then(setToken);
  };

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
