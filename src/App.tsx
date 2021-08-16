import React from "react";

import { Login } from "./Pages/Login/Login";
import { Dashboard } from "./Pages/Dashboard/Dashboard";

import "./App.css";

import { useUser } from "./Contexts/userContext";

function App() {
  const { user } = useUser();
  if (!user.username) {
    return <Login />;
  }

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
