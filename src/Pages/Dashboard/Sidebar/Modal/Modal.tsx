import React from "react";
import { reducerAction } from "../../../../App";
import { NewChatroomForm } from "../../../../Utils/NewChatroomForm/NewChatroomForm";
import "./Modal.css";

type Props = {
  handleClose: () => void;
  updateUser: (arg: reducerAction) => void;
};

export function Modal({ handleClose, updateUser }: Props) {
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
          <NewChatroomForm updateUser={updateUser} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
}
