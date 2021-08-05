import React, { useState } from "react";
import { List } from "../../../Utils/List/List";
import { reducerAction, UserContext } from "../../../App";
import { useContext } from "react";
import "./Sidebar.css";
import { Modal } from "./Modal/Modal";
import { useCallback } from "react";

type Props = {
  selectedChatRoom: string;
  changeSelectedChatRoom: React.Dispatch<React.SetStateAction<string>>;
  updateUser: (arg: reducerAction) => void;
};

export function Sidebar({
  selectedChatRoom,
  changeSelectedChatRoom,
  updateUser,
}: Props) {
  const { personalChatsSubscribed, groupChatsSubscribed } =
    useContext(UserContext);

  const [modalShow, setModalShow] = useState<boolean>(false);
  const showModal = () => setModalShow(true);
  const hideModal = useCallback(() => setModalShow(false), [setModalShow]);

  return (
    <div className="sidebar">
      <List
        title="Direct Messages"
        selectedChatRoom={selectedChatRoom}
        changeSelectedChatRoom={changeSelectedChatRoom}
        list={personalChatsSubscribed}
      />
      <hr />
      <List
        title="Channels"
        selectedChatRoom={selectedChatRoom}
        changeSelectedChatRoom={changeSelectedChatRoom}
        list={groupChatsSubscribed}
      />
      <hr />
      <button className="new-chatroom" onClick={showModal}>
        Create New Chat Room
      </button>
      {modalShow ? (
        <Modal handleClose={hideModal} updateUser={updateUser} />
      ) : null}
    </div>
  );
}
