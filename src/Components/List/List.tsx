import React, { useState, useCallback } from "react";

import { Modal } from "../Modal/Modal";
import { Notification } from "../Notification/Notification";
import { NewChatroomForm } from "../../Forms/NewChatroomForm/NewChatroomForm";
import { AddTeammate } from "../../Forms/AddTeammate/AddTeammate";

import { useVisibilityToggle } from "../../Hooks/useVisibilityToggle";

import { IconContext } from "react-icons/lib";
import { FiPlusSquare } from "react-icons/fi";

import { ChatInfo } from "../../types/User.interface";

import "./List.css";

export interface Props {
  list: ChatInfo[];
  title: string;
  changeSelectedChatRoom: React.Dispatch<React.SetStateAction<string>>;
  selectedChatRoom: string | undefined;
}

export function List(props: Props) {
  const { title, list, selectedChatRoom } = props;
  const { isVisible, show, hide } = useVisibilityToggle();

  const [modalRequestState, setModalRequestState] = useState({
    successful: undefined,
    message: "",
  });

  const handleNotificationClose = useCallback(() => {
    setModalRequestState({ successful: undefined, message: "" });
  }, [setModalRequestState]);

  const buttonText = title === "Channels" ? "Create new Group" : "Add Teammate";
  const form =
    title === "Channels" ? (
      <NewChatroomForm
        handleClose={hide}
        setModalRequestState={setModalRequestState}
      />
    ) : (
      <AddTeammate
        handleClose={hide}
        setModalRequestState={setModalRequestState}
      />
    );
  const modal = (
    <Modal title={buttonText} handleClose={hide}>
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
      <button className="new-chatroom" onClick={show}>
        <div className="button-icon-wrapper">
          <IconContext.Provider value={{ style: { marginRight: "5px" } }}>
            <FiPlusSquare />
          </IconContext.Provider>{" "}
          {buttonText}
        </div>
      </button>
      {isVisible ? modal : null}
      {modalRequestState.successful ? (
        <Notification
          onClose={handleNotificationClose}
        >{`${modalRequestState.message}`}</Notification>
      ) : null}
    </div>
  );
}
