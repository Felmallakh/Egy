import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/session";
import './profile.css';


function ProfileButton({}) {
  const hist = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  return (
    <>
      <button id="profile-button" onClick={openMenu}>
        {/* #id { cursor: pointer;background: transparent;border: none;font-size: -webkit-xxx-large;} */}
        <i className="fas fa-user-graduate" aria-hidden="true" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div>
            <li>Welcome, {user.username}</li>
            <li>{user.email}</li>
            <li>
              <span id="NavLogout" onClick={async () => {
              await dispatch(logout());
              hist("/");
            }}>
                <i class="fas fa-sign-out-alt"></i> Log Out
              </span>
            </li>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
