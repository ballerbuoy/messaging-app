import React, { useState } from "react";

import { nanoid } from "nanoid";
import { useMutation } from "../../Hooks/useMutation";
import { ajaxClient } from "../../ajaxClient/ajaxClient";
import { useUser } from "../../Contexts/userContext";

import { ChatRoomType } from "../../Types/ChatRoom.interface";

import "./NewChatroomForm.css";

type Props = {
  handleClose: () => void;
  setModalRequestState: (arg: any) => void;
};

export function NewChatroomForm({ handleClose, setModalRequestState }: Props) {
  const { state } = useUser();
  const [channelName, setChannelName] = useState("");

  const [participants, setParticipants] = useState("");
  const { mutate } = useMutation<ChatRoomType>((payload) =>
    ajaxClient.post({ url: "/chatroom/", payload })
  );

  const handleChannelNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChannelName(e.target.value);

  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setParticipants(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomId = nanoid();
    const payload = {
      roomId: roomId,
      roomName: channelName,
      type: "group",
      participants: [...participants.split(", "), state.username],
    };
    const addChatRoom = async () => {
      const mutationOptions = {
        onSuccess: () => {
          setModalRequestState({
            successful: true,
            message: `${channelName} group was successfully created`,
          });
          handleClose();
        },
        onError: () =>
          setModalRequestState({
            successful: false,
            message: `Unable to create ${channelName} group`,
          }),
      };
      await mutate(payload, mutationOptions);
    };
    addChatRoom();
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

      <label htmlFor="participants">Participants</label>
      <input
        id="participants"
        type="text"
        placeholder="user1, user2, ..."
        value={participants}
        onChange={handleParticipantsChange}
      />

      <button type="submit" className="create-button">
        Create Channel
      </button>
    </form>
  );
}
