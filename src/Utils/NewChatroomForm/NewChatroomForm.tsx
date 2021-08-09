import React from "react";
import { useState } from "react";
import { reducerAction } from "../../App";
import { nanoid } from "nanoid";
import { useMutation } from "../../Hooks/useMutation";
import { ChatRoomType } from "../../Types/ChatRoom.interface";
import "./NewChatroomForm.css";

type Props = {
  updateUser: (arg: reducerAction) => void;
  handleClose: () => void;
};

export function NewChatroomForm({ updateUser, handleClose }: Props) {
  //pass dispatch from app
  //onsubmit send the data to dispatch
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState<"personal" | "group">(
    "personal"
  );
  const [participants, setParticipants] = useState("");
  const { data, error, loading, executeFetch } = useMutation<ChatRoomType>({
    url: "/chatroom/newChatRoom",
    method: "POST",
  });

  const handleChannelNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChannelName(e.target.value);
  const handleChannelTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "personal" && e.target.value !== "group") {
      return;
    }
    setChannelType(e.target.value);
  };
  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setParticipants(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateUser({
      type: "NEW_CHATROOM",
      newChat: { roomId: nanoid(), roomName: channelName, type: channelType },
    });
    const payload = {
      roomId: nanoid(),
      roomName: channelName,
      type: channelType,
      participants: participants.split(", "),
    };
    executeFetch(payload);
    handleClose();
  };

  return (
    <form className="new-chatroom-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="channel-name">Channel Name</label>
      <input
        type="text"
        id="channel-name"
        placeholder="channel name"
        value={channelName}
        onChange={handleChannelNameChange}
      />
      <label htmlFor="channel-type">Channel Type</label>
      <select
        id="channel-type"
        value={channelType}
        onChange={handleChannelTypeChange}
      >
        <option value="personal">Personal</option>
        <option value="group">Group</option>
      </select>
      <label htmlFor="participants">Participants</label>
      <input
        id="participants"
        type="text"
        placeholder="user1, user2, ..."
        value={participants}
        onChange={handleParticipantsChange}
      />

      <button type="submit" className="create-button">
        Create
      </button>
    </form>
  );
}
