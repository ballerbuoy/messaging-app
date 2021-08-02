import React from "react";
import "./App.css";
import { Login } from "./Pages/Login/Login";
import { useSessionStorage } from "./Hooks/useSessionStorage";
import { Dashboard } from "./Pages/Dashboard/Dashboard";

export const UserContext = React.createContext({
  username: "",
  password: "",
  avatar: "",
  chatRoomsSubscribed: [],
});

function App() {
  const [user, setUser] = useSessionStorage("username");
  console.log(user);
  if (!user) {
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
