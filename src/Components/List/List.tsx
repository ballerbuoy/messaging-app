import React from "react";
import { useState, useCallback } from "react";

import { Modal } from "../Modal/Modal";
import { NewChatroomForm } from "../../Forms/NewChatroomForm/NewChatroomForm";
import { AddTeammate } from "../../Forms/AddTeammate/AddTeammate";

import { useModal } from "../../Hooks/useModal";

import { IconContext } from "react-icons/lib";
import { FiPlusSquare } from "react-icons/fi";

import { ChatInfo } from "../../Types/User.interface";

import "./List.css";

export interface Props {
  list: ChatInfo[];
  title: string;
  changeSelectedChatRoom: React.Dispatch<React.SetStateAction<string>>;
  selectedChatRoom: string | undefined;
}

export function List(props: Props) {
  const { title, list, selectedChatRoom } = props;
  const { modalVisible, showModal, hideModal } = useModal();

  const buttonText = title === "Channels" ? "Create new Group" : "Add Teammate";
  const form =
    title === "Channels" ? (
      <NewChatroomForm handleClose={hideModal} />
    ) : (
      <AddTeammate handleClose={hideModal} />
    );
  const modal = (
    <Modal title={buttonText} handleClose={hideModal}>
      {form}
    </Modal>
  );
  return (
    <div className="list">
      <h4>{title}</h4>
      <hr />
      {list.map((listItem) => {
        const className =
          listItem.roomId === selectedChatRoom
            ? "chatroom selected"
            : "chatroom";
        return (
          <div
            className={className}
            key={listItem.roomId}
            onClick={() => props.changeSelectedChatRoom(listItem.roomId)}
          >
            {listItem.roomName}
          </div>
        );
      })}
      <button className="new-chatroom" onClick={showModal}>
        <div className="button-icon-wrapper">
          <IconContext.Provider value={{ style: { marginRight: "5px" } }}>
            <FiPlusSquare />
          </IconContext.Provider>{" "}
          {buttonText}
        </div>
      </button>
      {modalVisible ? modal : null}
    </div>
  );
}
