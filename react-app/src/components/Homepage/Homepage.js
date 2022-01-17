import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";




import './homepage.css'

function Homepage() {
  const dispatch = useDispatch();
  const hist = useNavigate()

  const session = useSelector((state) => state.session.user);
  useEffect(() => {
    if (!session) return hist("/NotFound");
  }, []);

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
          <NavLink to={`/users/${session?.id}/organizations`}>
            <button id="signout"
              onClick={async () => {
                await dispatch(logout());
                hist("/");
              }}
            >
              Log Out
            </button>
          </NavLink>
        </div>
      </nav>

      <div className="homepage-howto-div">
        <div className="homepage-mission-box">
          <button className="secondary-button">Albums</button>
        </div>
        <div className="homepage-share-box">
          <button className="secondary-button">Photos</button>
        </div>
        <div className="homepage-explore-box">
          <button className="secondary-button">Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
