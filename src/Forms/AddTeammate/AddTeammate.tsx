import React, { useState } from "react";

import { nanoid } from "nanoid";
import { useMutation } from "../../hooks/useMutation";
import { ajaxClient } from "../../ajaxClient/ajaxClient";
import { useUser } from "../../contexts/userContext";

import { STATUS } from "../../constants";

import { ChatRoomType } from "../../types/ChatRoom.interface";

import "./AddTeammate.css";

type Props = {
  handleClose: () => void;
  setModalRequestState: (arg: any) => void;
};

export function AddTeammate({ handleClose, setModalRequestState }: Props) {
  const { user } = useUser();
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
      creator: user.username,
      added: teammate,
      participants: [teammate, user.username],
    };
    const addChatRoom = async () => {
      const mutationOptions = {
        onSuccess: () => {
          setModalRequestState({
            successful: true,
            message: `${teammate} was successfully added to your chats `,
          });
          handleClose();
        },
        onError: () =>
          setModalRequestState({
            successful: false,
            message: `User with username: '${teammate}' does not exist`,
          }),
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
      {status === STATUS.ERROR ? <div className="error">{error}</div> : null}
    </form>
  );
}
