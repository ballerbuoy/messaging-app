import React, { useState } from "react";

import { nanoid } from "nanoid";
import { useMutation } from "../../Hooks/useMutation";
import { ajaxClient } from "../../ajaxClient/ajaxClient";
import { useUser } from "../../Contexts/user-context";

import { ChatRoomType } from "../../Types/ChatRoom.interface";

import "./AddTeammate.css";

type Props = {
  handleClose: () => void;
};

export function AddTeammate({ handleClose }: Props) {
  const { state, dispatch } = useUser();
  const [teammate, setTeammate] = useState<string>("");
  const { mutate } = useMutation<ChatRoomType>((payload) =>
    ajaxClient.post({ url: "/chatroom/", payload })
  );

  const handleTeammateNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTeammate(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomId = nanoid();
    dispatch({
      type: "NEW_CHATROOM",
      newChat: { roomId: roomId, roomName: teammate, type: "personal" },
    });
    const payload = {
      roomId: roomId,
      roomName: "",
      type: "personal",
      creator: state.username,
      added: teammate,
      participants: [teammate, state.username],
    };
    const addChatRoom = async () => {
      await mutate(payload);
      handleClose();
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
    </form>
  );
}
