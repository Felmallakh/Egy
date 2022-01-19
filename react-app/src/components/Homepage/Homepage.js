import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";
import './homepage.css'

function Homepage() {
  const dispatch = useDispatch();
  const hist = useNavigate()

  const user_session = useSelector((state) => state.session.user);
  useEffect(() => {
    if (!user_session) return hist("/NotFound");
  }, []);

  let albums = <NavLink className="secondary-button" to={`/users/${user_session?.id}/albums`}>Albums</NavLink>;
  let photos = <NavLink className="secondary-button" to={`/users/${user_session?.id}/photos`}>Photos</NavLink>;
  let profile


  return (
    <div className="homepage">
      <nav className="homepage-hero-div">
        <div className="leftNav">
          <img
            src="https://cdn.discordapp.com/attachments/919391399269515305/932090523496370277/logo-removebg-preview.png"
            alt="logo"
          ></img>
          <h2>Egypt Destinations</h2>
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

      <div className="homepage-howto-div">
        <div className="homepage-mission-box">
          <button className="secondary-button">{albums}</button>
        </div>
        <div className="homepage-share-box">
          <button className="secondary-button">{photos}</button>
        </div>
        <div className="homepage-explore-box">
          <button className="secondary-button">Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
