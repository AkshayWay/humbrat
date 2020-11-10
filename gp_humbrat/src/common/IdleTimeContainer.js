import React, { useState, useRef } from "react";
import IdleTimer from "react-idle-timer";
import Modal from "react-modal";
//import HomePage from "../component/HomePage";
import { Redirect, useHistory } from "react-router-dom";

Modal.setAppElement("#root");

function IdleTimeContainer() {
  const idleTimeRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const idleTimerRef = useRef(null);
  const sessionTimeoutRef = useRef(null);

  const history = useHistory();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "2px solid red",
    },
  };

  const onIdle = () => {
    if (localStorage.getItem("isLoggedIn") > 0) {
      setModalIsOpen(true);
      sessionTimeoutRef.current = setTimeout(logOut, 120000);
    }
  };
  const stayAlive = () => {
    setModalIsOpen(false);
    clearTimeout(sessionTimeoutRef.current);
  };

  const logOut = () => {
    setModalIsOpen(false);
    localStorage.clear();
    setIsLoggedIn(false);
    if (
      localStorage.getItem("userEmail") == null ||
      localStorage.getItem("userEmail") == ""
    ) {
      clearTimeout(sessionTimeoutRef.current);
      history.push("/sign_in");
    }
  };
  return (
    <div>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <h2>संकेस्थळावर कोणतीही हालचाल नाही</h2>
        <p>तुम्ही लवकरच संकेतस्थळावरून बाहेर पडणार आहेत</p>
        <button
          className="btn btn-btn btn-btn btn-outline-info"
          style={{ marginRight: "4px" }}
          onClick={stayAlive}
        >
          संकेस्थळावर जा
        </button>
        <button
          className="btn btn-btn btn-outline-danger"
          style={{ marginRight: "4px" }}
          onClick={logOut}
        >
          बाहेर पडा
        </button>
      </Modal>
      <IdleTimer
        ref={idleTimeRef}
        timeout={5 * 24000}
        //timeout={5 * 100}
        onIdle={onIdle}
      ></IdleTimer>
    </div>
  );
}
export default IdleTimeContainer;
