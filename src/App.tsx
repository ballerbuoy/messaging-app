import React, { useReducer } from "react";
import "./App.css";
import { Login } from "./Pages/Login/Login";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { UserInfo } from "./Types/User.interface";

const initialValue = {
  username: "",
  password: "",
  avatar: "",
  personalChatsSubscribed: [],
  groupChatsSubscribed: [],
};

export type reducerAction = {
  type: string;
  newChat?: { roomId: string; roomName: string; type: "personal" | "group" };
  newUser?: UserInfo;
};

const reducer = (prevState: UserInfo, action: reducerAction) => {
  switch (action.type) {
    case "NEW_CHATROOM":
      if (!action.newChat) {
        return prevState;
      }
      const newState =
        action.newChat.type === "group"
          ? {
              ...prevState,
              groupChatsSubscribed: [
                ...prevState.groupChatsSubscribed,
                {
                  roomId: action.newChat.roomId,
                  roomName: action.newChat.roomName,
                },
              ],
            }
          : {
              ...prevState,
              personalChatsSubscribed: [
                ...prevState.personalChatsSubscribed,
                {
                  roomId: action.newChat.roomId,
                  roomName: action.newChat.roomName,
                },
              ],
            };
      return newState;

    case "NEW_USER":
      if (!action.newUser) {
        return initialValue;
      }
      return action.newUser;

    default:
      return initialValue;
  }
};

export const UserContext = React.createContext<UserInfo>(initialValue);

function App() {
  // const [user, setUser] = useSessionStorage<UserInfo>("username");
  const [user, dispatch] = useReducer(reducer, initialValue);
  if (!user.username) {
    return <Login updateUser={dispatch} />;
  }

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Dashboard updateUser={dispatch} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
