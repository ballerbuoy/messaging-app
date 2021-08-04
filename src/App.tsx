import React from "react";
import "./App.css";
import { Login } from "./Pages/Login/Login";
import { useSessionStorage } from "./Hooks/useSessionStorage";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { UserInfo } from "./Types/User.interface";
import { useState } from "react";

const initialValue = {
  username: "",
  password: "",
  avatar: "",
  personalChatsSubscribed: [],
  groupChatsSubscribed: [],
};

export const UserContext = React.createContext<UserInfo>(initialValue);

function App() {
  // const [user, setUser] = useSessionStorage<UserInfo>("username");
  const [user, setUser] = useState<UserInfo>(initialValue);
  if (!user.username) {
    return <Login setToken={setUser} />;
  }

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Dashboard />
      </UserContext.Provider>
    </div>
  );
}

export default App;
