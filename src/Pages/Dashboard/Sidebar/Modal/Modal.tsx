import React from "react";

import { NewChatroomForm } from "../../../../Components/NewChatroomForm/NewChatroomForm";

import "./Modal.css";

type Props = {
  handleClose: () => void;
};

export function Modal({ handleClose }: Props) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Create a Chatroom</h3>
          <button className="modal-close" onClick={handleClose}>
            Close
          </button>
        </div>
        <div className="modal-body">
          <NewChatroomForm handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
}
