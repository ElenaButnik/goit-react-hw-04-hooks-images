import { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");
export default function Modal({ toggleModal, largeImg }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      toggleModal();
    }
  };

  const handleOverlayClick = (event) => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleOverlayClick}>
      <div className={s.Modal}>
        <img src={largeImg.largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
  largeImg: PropTypes.object,
};
