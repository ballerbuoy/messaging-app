import React, { useState, useContext } from "react";
import { Messages } from "./Messages/Messages";
import "./Main.css";
import { MessageType } from "../../../Types/ChatRoom.interface";
import { UserContext } from "../../../App";
import { useMutation } from "../../../Hooks/useMutation";

type Props = {
  selectedChatRoomId: string;
};

export const Main = ({ selectedChatRoomId }: Props) => {
  const { username } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const { loading, executeFetch } = useMutation<MessageType>({
    url: `/chatroom/${selectedChatRoomId}`,
    method: "POST",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const curTime = new Date();
    const timestamp = `${curTime.getHours()}:${curTime.getMinutes()}`;

    executeFetch({ text: message, timestamp, sentBy: username });
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
          className="newMessage-input"
        />
        <button
          type="submit"
          onClick={handleClick}
          disabled={loading}
          className="newMessage-send"
        >
          {loading ? "Sending Message..." : "Send Message"}
        </button>
      </div>
    </div>
  );
};
