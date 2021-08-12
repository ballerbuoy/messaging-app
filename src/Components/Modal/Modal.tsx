import React from "react";

import "./Modal.css";

type ModalProps = {
  title: string;
  handleClose: () => void;
  children: React.ReactNode;
};

export function Modal({ handleClose, children, title }: ModalProps) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={handleClose}>
            Close
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
