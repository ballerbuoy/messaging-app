import React, { useState, useCallback } from "react";

import { List } from "../../../Components/List/List";
import { Modal } from "./Modal/Modal";
import { useUser } from "../../../Contexts/user-context";

import { FiPlusSquare } from "react-icons/fi";

import "./Sidebar.css";

type Props = {
  selectedChatRoom: string;
  changeSelectedChatRoom: React.Dispatch<React.SetStateAction<string>>;
};

export function Sidebar({ selectedChatRoom, changeSelectedChatRoom }: Props) {
  const { state } = useUser();
  const { personalChatsSubscribed, groupChatsSubscribed } = state;
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
        <div className="button-icon-wrapper">
          <FiPlusSquare /> Add New Group
        </div>
      </button>
      {modalShow ? <Modal handleClose={hideModal} /> : null}
    </div>
  );
}
