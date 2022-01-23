import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";
import './homepage.css'
import ProfileButton from "../Profile/ProfileButton"

function Homepage() {
  const dispatch = useDispatch();
  const hist = useNavigate()

  const user_session = useSelector((state) => state.session.user);
  useEffect(() => {
    if (!user_session) return hist("/NotFound");
  }, []);

  let albums = <NavLink className="secondary-button" to={`/users/${user_session?.id}/albums`}>Albums</NavLink>;
  let photos = <NavLink className="secondary-button" to={`/users/${user_session?.id}/photos`}>Photos</NavLink>;
  let Pharaohs = (<NavLink className="secondary-button" to={`/users/${user_session?.id}/bio`}>Pharaohs</NavLink>);



  return (
    <div className="homepage">
      <nav className="homepage-main-div">
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

      <div className="homepage-div">
        <div className="homepage-album-box">
          <button className="secondary-button">{albums}</button>
        </div>
        <div className="homepage-profile-box">
          <button className="secondary-button">{Pharaohs}</button>
        </div>
        <div className="homepage-photo-box">
          <button className="secondary-button">{photos}</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
