import React, { useRef, useEffect, useCallback } from "react";

import { MessageItem } from "./MessageItem/MessageItem";
import { Modal } from "../../../../Components/Modal/Modal";
import { AddParticipant } from "../../../../Forms/AddParticipant/AddParticipant";
import { VariableSizeList } from "react-window";

import { useQuery } from "../../../../Hooks/useQuery";
import { useModal } from "../../../../Hooks/useModal";

import { IoMdPersonAdd } from "react-icons/io";

import { ChatRoomType } from "../../../../Types/ChatRoom.interface";
import { MessageType } from "../../../../Types/ChatRoom.interface";

import "./Messages.css";
import { useState } from "react";

type Props = {
  selectedChatRoomId: string;
};

export const Messages = ({ selectedChatRoomId }: Props) => {
  const bottomDivRef = useRef<HTMLDivElement>(null);
  const messagesBodyRef = useRef<HTMLDivElement>(null);
  const messagesBodyWidth = useRef(0);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const getItemSize = (index: number) => {
    const charWidth = 7,
      lineHeight = 18.5;

    const width = document.body.getBoundingClientRect().width * 0.8 - 47;
    const charsInLine = width / charWidth;
    const noOfLines = messages[index].text.length / charsInLine + 1;
    return Math.max(noOfLines * lineHeight + 23, 48);
  };

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => (
      <div style={style}>
        <MessageItem
          message={messages[index]}
          key={messages[index].messageId}
        />
      </div>
    ),
    [messages]
  );

  const { data, error } = useQuery<ChatRoomType>({
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

  const fetchOlderMessages = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await olderMessages.executeFetch();
    console.log(olderMessages.data);
  };

  const { modalVisible, showModal, hideModal } = useModal();

  const modal = (
    <Modal title="Add Participant" handleClose={hideModal}>
      <AddParticipant
        handleClose={hideModal}
        selectedRoomId={selectedChatRoomId}
      />
    </Modal>
  );

  useEffect(() => {
    bottomDivRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [newerMessages.data]);

  useEffect(() => {
    if (data) {
      console.log("messages updated");
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

  useEffect(() => {
    messagesBodyWidth.current = messagesBodyRef.current
      ? messagesBodyRef.current.clientWidth
      : messagesBodyWidth.current;
  }, [messagesBodyRef]);

  return (
    <div className="messages-wrapper" ref={messagesBodyRef}>
      <div className="header-wrapper">
        <div className="messages-header">
          {data ? <h3 className="title">{data.roomName}</h3> : null}
          {data && data.type === "group" ? (
            <button className="add-user" onClick={showModal}>
              <IoMdPersonAdd />
            </button>
          ) : null}
          {modalVisible ? modal : null}
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
        {!error ? (
          <button
            className="fetch-prev-btn"
            onClick={fetchOlderMessages}
            disabled={olderMessages.error ? true : false}
          >
            Fetch older messages
          </button>
        ) : null}
        {/* {messages.map((message) => {
          return <MessageItem message={message} key={message.messageId} />;
        })} */}
        <VariableSizeList
          height={500}
          width={"100%"}
          itemCount={messages.length}
          itemSize={getItemSize}
        >
          {Row}
        </VariableSizeList>
        <div ref={bottomDivRef}></div>
      </div>
    </div>
  );
};
