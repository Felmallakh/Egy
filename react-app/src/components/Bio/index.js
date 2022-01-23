import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/session";
import "./bio.css";

const Bio = () => {
  const dispatch = useDispatch();
  const hist = useNavigate();

  const back = (e) => {
    e.preventDefault();
    hist(`/home`);
  };

  return (
    <div className="bio">
      <nav className="bio-main-div">
        <div className="leftNav">
          <img
            id="home-button"
            onClick={back}
            src="https://cdn.discordapp.com/attachments/919391399269515305/932090523496370277/logo-removebg-preview.png"
            alt="logo"
          ></img>
          <h2>Pharaohs</h2>
        </div>
        <div className="rightNav">
          <button
            id="signout"
            onClick={async () => {
              await dispatch(logout());
              hist("/");
            }}
          >
            Log Out
          </button>
        </div>
      </nav>
      <br />
      <br />
      <div className="bio-content">
        <h3 id="bio-text">
          As ancient Egyptian rulers, pharaohs were both the heads of state and
          the religious leaders of their people. The word “pharaoh” means “Great
          House,” a reference to the palace where the pharaoh resides. While
          early Egyptian rulers were called “kings,” over time, the name
          “pharaoh” stuck, Who are pharaohs and why are they important? The
          ruler of ancient Egypt was called pharaoh . Pharaohs were looked upon
          as more than rulers. They were Gods chosen to lead the people and
          maintain order, and provided an important link between the Egyptian
          people and their gods. Where did pharaohs come from? Pharaoh, (“great
          house”), originally, the royal palace in ancient Egypt. The word came
          to be used metonymically for the Egyptian king under the New Kingdom
          (starting in the 18th dynasty, 1539–1292 bce), and by the 22nd dynasty
          (c. 945–c. 730 bce) it had been adopted as an epithet of respect.
        </h3>
      </div>
    </div>
  );
};

export default Bio;
