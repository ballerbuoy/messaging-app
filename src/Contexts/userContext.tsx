import React, {
  useReducer,
  createContext,
  useContext,
  useCallback,
} from "react";
import { Dispatch } from "react";

import { UserInfo } from "../types/User.interface";

type reducerAction = {
  type: string;
  newChat?: { roomId: string; roomName: string; type: "personal" | "group" };
  newUser?: UserInfo;
};

type UserProviderProps = {
  children: React.ReactNode;
};

const initialValue = {
  username: "",
  password: "",
  avatar: "",
  personalChatsSubscribed: [],
  groupChatsSubscribed: [],
};

const UserContext = createContext<
  { state: UserInfo; dispatch: Dispatch<reducerAction> } | undefined
>(undefined);

const userReducer = (prevState: UserInfo, action: reducerAction) => {
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

    case "RESET":
      return initialValue;
    default:
      return initialValue;
  }
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialValue);

  const value = {
    state,
    dispatch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  const { state, dispatch } = context;

  const createNewUser = useCallback(
    (newUser: UserInfo) => {
      dispatch({ type: "NEW_USER", newUser });
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  return { user: state, createNewUser, reset };
};

export { UserProvider, useUser };
