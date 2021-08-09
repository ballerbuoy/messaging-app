import React from "react";

import { Login } from "./Pages/Login/Login";
import { Dashboard } from "./Pages/Dashboard/Dashboard";

import "./App.css";

import { useUser } from "./Contexts/user-context";

function App() {
  const { state } = useUser();
  if (!state.username) {
    return <Login />;
  }

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
