import { useState } from "react";
import "/src/style/App.css";

const Modal = ({ open, modal, setModal, isOver, p1Points, p2Points }) => {
  let message = "";
  const handleModal = () => {
    open(handleModal);
  };
  const closeModal = () => {
    setModal(false);
  };
  const restartGame = () => {
    window.location.reload();
  };
  const modalMessage = () => {
    isOver(modalMessage);
    if (p1Points > p2Points) {
      return (
        <p>
          {message`Kazandın : ${p1Points} puanın var ! Rakibin : ${p2Points} puanı var `}
        </p>
      );
    } else {
      return (
        <p>
          {message`Kaybettin : ${p1Points} puanın Rakibin : ${p2Points} puanı var`}
        </p>
      );
    }
  };
  console.log(message);
  return (
    <>
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div>{message}</div>
            <button onClick={restartGame}>Baştan başla</button>
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
