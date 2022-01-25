import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";
import { useNavigate, useParams } from "react-router-dom";

import {
  getPhotosThunk,
  updatePhotoThunk,
  deletePhotoThunk,
} from "../store/photo";

import "../Profile/profile.css";

function EditPhoto() {
  const hist = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const photos = useSelector((state) => state.photoReducer);
  const { photoId } = useParams();
  const photo = photos?.[photoId];
  const [title, setTitle] = useState(photo?.title);
  const [description, setDescription] = useState(photo?.description);
  const [showMenu, setShowMenu] = useState(false);
  const userId = user?.id;
  const id = photoId;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photo?.user_id !== userId)
      return alert(`User not authorized to perform this action`);
    const confirmed = window.confirm(
      "Are you sure you want to remove this Photo? This action cannot be undone."
    );
    if (confirmed) {
      await dispatch(deletePhotoThunk(photoId));
      hist(`/users/${userId}/photos`);
    }
  };

   const editPhoto = async (e) => {
     e.preventDefault();
     if (photo.user_id !== userId)
       return alert(`User not authorized to perform this action`);
     dispatch(
       updatePhotoThunk({
         id,
         title,
         description,
       })
     );
   };



  return (
    <>
      <button id="profile-button" onClick={openMenu}>
        {/* #id { cursor: pointer;background: transparent;border: none;font-size: -webkit-xxx-large;} */}
        <i className="fas fa-user-graduate" aria-hidden="true" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div>
            <button id="signout" onClick={handleSubmit}>
              Delete Photo
            </button>
            <li>{user.email}</li>
            <li>
              <span
                id="NavLogout"
                onClick={async () => {
                  await dispatch(logout());
                  hist("/");
                }}
              >
                <i class="fas fa-sign-out-alt"></i> Log Out
              </span>
            </li>
          </div>
        </div>
      )}
    </>
  );
}

export default EditPhoto;
