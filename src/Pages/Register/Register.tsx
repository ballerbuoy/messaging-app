import React from "react";
import { useState } from "react";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="register-wrapper">
      {/* <h1>Please Log In!</h1>
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
  </form> */}
    </div>
  );
};
