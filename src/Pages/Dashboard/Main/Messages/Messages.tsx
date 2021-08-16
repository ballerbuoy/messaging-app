import React, { useRef, useEffect, useCallback } from "react";

import { MessageItem } from "./MessageItem/MessageItem";
import { Modal } from "../../../../Components/Modal/Modal";
import { AddParticipant } from "../../../../Forms/AddParticipant/AddParticipant";
import { Notification } from "../../../../Components/Notification/Notification";
import { MessagesLoader } from "../../../../Components/Loading/Messages/MessagesLoader";

import { useQuery } from "../../../../Hooks/useQuery";
import { useVisibilityToggle } from "../../../../Hooks/useVisibilityToggle";

import { IoMdPersonAdd } from "react-icons/io";

import { ChatRoomType } from "../../../../types/ChatRoom.interface";
import { MessageType } from "../../../../types/ChatRoom.interface";

import "./Messages.css";
import { useState } from "react";

type Props = {
  selectedChatRoomId: string;
};

export const Messages = ({ selectedChatRoomId }: Props) => {
  const bottomDivRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const { data, error, isLoading } = useQuery<ChatRoomType>({
    url: `/chatroom/${selectedChatRoomId}`,
    skip: false,
  });

  const olderMessages = useQuery<MessageType[]>({
    url: `/chatroom/getPrevMessages/${selectedChatRoomId}/${
      messages.length ? messages[0].timestamp : 1
    }`,
    skip: true,
  });

  const newerMessages = useQuery<MessageType[]>({
    url: `/chatroom/getNewMessages/${selectedChatRoomId}/${
      messages.length ? messages[messages.length - 1].timestamp : 1
    }`,
    skip: false,
    interval: 1000,
  });

  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop === 0 && !olderMessages.error) {
      await olderMessages.executeFetch();
    }
  };

  const { isVisible, show, hide } = useVisibilityToggle();
  const [modalRequestState, setModalRequestState] = useState({
    successful: undefined,
    message: "",
  });

  const handleNotificationClose = useCallback(() => {
    setModalRequestState({ successful: undefined, message: "" });
  }, [setModalRequestState]);

  const modal = (
    <Modal title="Add Participant" handleClose={hide}>
      <AddParticipant
        handleClose={hide}
        selectedRoomId={selectedChatRoomId}
        setModalRequestState={setModalRequestState}
      />
    </Modal>
  );

  useEffect(() => {
    const newerMessagesData = newerMessages.data;
    if (newerMessagesData?.length) {
      bottomDivRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [newerMessages.data]);

  useEffect(() => {
    if (data) {
      console.log("SCROLL TO BOTTOM");
      bottomDivRef.current?.scrollIntoView({ behavior: "smooth" });
      setMessages([...data.messageHistory]);
    }
  }, [data]);

  useEffect(() => {
    const olderMessagesData = olderMessages.data;
    if (olderMessagesData) {
      setMessages((prevMessages) => [...olderMessagesData, ...prevMessages]);
    }
  }, [olderMessages.data]);

  useEffect(() => {
    const newerMessagesData = newerMessages.data;
    if (newerMessagesData?.length) {
      setMessages((prevMessages) => [...prevMessages, ...newerMessagesData]);
    }
  }, [newerMessages.data]);

  return (
    <>
      {isLoading ? <MessagesLoader /> : null}
      <div className="messages-wrapper" onScroll={handleScroll}>
        <div className="header-wrapper">
          <div className="messages-header">
            {data ? <h3 className="title">{data.roomName}</h3> : null}
            {data && data.type === "group" ? (
              <button className="add-user" onClick={show}>
                <IoMdPersonAdd />
              </button>
            ) : null}
            {isVisible ? modal : null}
          </div>
          <hr className="separator"></hr>
        </div>
        <div className="messages-body">
          {error ? (
            <h3>The chatroom currently does not exist on the server :( </h3>
          ) : null}
          {olderMessages.error ? (
            <span className="error error-msg">{olderMessages.error}</span>
          ) : null}
          {messages.map((message) => {
            return <MessageItem message={message} key={message.messageId} />;
          })}
          {modalRequestState.successful && data ? (
            <Notification
              onClose={handleNotificationClose}
            >{`${modalRequestState.message}${data.roomName}`}</Notification>
          ) : null}
          <div ref={bottomDivRef}></div>
        </div>
      </div>
    </>
  );
};
