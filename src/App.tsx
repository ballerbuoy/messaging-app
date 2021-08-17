import React from "react";

import { Login } from "./pages/login/Login";
import { Dashboard } from "./pages/dashboard/Dashboard";

import "./App.css";

import { useUser } from "./contexts/userContext";

function App() {
  const { user } = useUser();
  if (!user.username) {
    return <Login />;
  }

  return <Dashboard />;
}

export default App;
