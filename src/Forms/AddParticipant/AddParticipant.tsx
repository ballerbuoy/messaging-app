import React, { useState } from "react";

import { nanoid } from "nanoid";
import { useMutation } from "../../Hooks/useMutation";
import { ajaxClient } from "../../ajaxClient/ajaxClient";

import { ChatRoomType } from "../../Types/ChatRoom.interface";

import "./AddParticipant.css";

type Props = {
  handleClose: () => void;
  selectedRoomId: string;
};

export function AddParticipant({ handleClose, selectedRoomId }: Props) {
  const [participant, setParticipant] = useState<string>("");
  const { mutate } = useMutation<ChatRoomType>((payload) =>
    ajaxClient.post({
      url: `/chatroom/addParticipant/${selectedRoomId}`,
      payload,
    })
  );

  const handleParticipantNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setParticipant(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomId = nanoid();
    const payload = {
      roomId: roomId,
      participant,
    };
    const addParticipant = async () => {
      await mutate(payload);
      handleClose();
    };
    addParticipant();
  };

  return (
    <form className="add-participant-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="participant-name">Participant name</label>
      <input
        type="text"
        id="participant-name"
        placeholder="Participant name"
        value={participant}
        onChange={handleParticipantNameChange}
      />

      <button type="submit" className="create-button">
        Add Participant
      </button>
    </form>
  );
}
