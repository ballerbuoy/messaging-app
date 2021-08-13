import React, { useState } from "react";

import { nanoid } from "nanoid";
import { useMutation } from "../../Hooks/useMutation";
import { ajaxClient } from "../../ajaxClient/ajaxClient";
import { useUser } from "../../Contexts/userContext";

import { ChatRoomType } from "../../Types/ChatRoom.interface";

import "./AddTeammate.css";

type Props = {
  handleClose: () => void;
};

export function AddTeammate({ handleClose }: Props) {
  const { state } = useUser();
  const [teammate, setTeammate] = useState<string>("");
  const { status, error, mutate } = useMutation<ChatRoomType>((payload) =>
    ajaxClient.post({ url: "/chatroom/", payload })
  );

  const handleTeammateNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTeammate(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomId = nanoid();
    const payload = {
      roomId: roomId,
      roomName: "",
      type: "personal",
      creator: state.username,
      added: teammate,
      participants: [teammate, state.username],
    };
    const addChatRoom = async () => {
      const mutationOptions = {
        onSuccess: () => {
          handleClose();
        },
      };
      await mutate(payload, mutationOptions);
    };
    addChatRoom();
  };

  return (
    <form className="add-teammate-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="teammate-name">Teammate username</label>
      <input
        type="text"
        id="teammate-name"
        placeholder="Teammate username"
        value={teammate}
        onChange={handleTeammateNameChange}
      />

      <button type="submit" className="create-button">
        Add Teammate
      </button>
      {status === "error" ? <div className="error">{error}</div> : null}
    </form>
  );
}
