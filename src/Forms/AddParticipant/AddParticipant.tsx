import React, { useState } from "react";

import { useMutation } from "../../hooks/useMutation";
import { ajaxClient } from "../../ajaxClient/ajaxClient";

import { STATUS } from "../../constants";

import { ChatRoomType } from "../../types/ChatRoom.interface";

import "./AddParticipant.css";

type Props = {
  handleClose: () => void;
  selectedRoomId: string;
  setModalRequestState: (arg: any) => void;
};

export function AddParticipant({
  handleClose,
  selectedRoomId,
  setModalRequestState,
}: Props) {
  const [participant, setParticipant] = useState<string>("");
  const { status, error, mutate } = useMutation<ChatRoomType>((payload) =>
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

    const payload = {
      roomId: selectedRoomId,
      participant,
    };
    const addParticipant = async () => {
      const mutationOptions = {
        onSuccess: () => {
          setModalRequestState({
            successful: true,
            message: `${participant} was successfully added to `,
          });
          handleClose();
        },
        onError: () =>
          setModalRequestState({
            successful: false,
            message: `Unable to add ${participant} to `,
          }),
      };
      await mutate(payload, mutationOptions);
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
      {status === STATUS.ERROR ? <div className="error">{error}</div> : null}
    </form>
  );
}
