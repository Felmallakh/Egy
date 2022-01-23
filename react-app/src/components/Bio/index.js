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
    <div className="Bio">
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
      
    </div>
  );
};

export default Bio;
