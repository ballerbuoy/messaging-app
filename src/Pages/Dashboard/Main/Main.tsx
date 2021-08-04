import React, { useState, useContext } from "react";
import { Messages } from "./Messages/Messages";
import "./Main.css";
import { useFetch } from "../../../Hooks/useFetch";
import { MessageType } from "../../../Types/ChatRoom.interface";
import { UserContext } from "../../../App";

interface myProps {
  selectedChatRoomId: string;
}

export const Main = ({ selectedChatRoomId }: myProps) => {
  const [postQueryOptions, setPostQueryOptions] = useState({
    skip: true,
    payload: {},
  });
  const { username } = useContext(UserContext);
  const typedMessage = useFetch<MessageType>({
    url: `/chatroom/${selectedChatRoomId}`,
    method: "POST",
    payload: postQueryOptions.payload,
    skip: postQueryOptions.skip,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    const curTime = new Date();
    const timestamp = `${curTime.getHours()}:${curTime.getMinutes()}`;

    setPostQueryOptions({
      skip: false,
      payload: { text: message, timestamp, sentBy: username },
    });
    setMessage("");
  };

  return (
    <div className="main">
      <Messages selectedChatRoomId={selectedChatRoomId} />
      <div className="newMessage">
        <textarea
          value={message}
          onChange={handleChange}
          placeholder="Type a message"
        />
        <button type="submit" onClick={handleClick}>
          {" "}
          Send Message!{" "}
        </button>
      </div>
    </div>
  );
};
