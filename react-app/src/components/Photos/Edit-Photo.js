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
        {" "}
        Edit
      </button>

      {showMenu && (
        <form className="albumForm" onSubmit={editPhoto}>
          <div className="album_content">Photo Title</div>
          <input
            className="input-form"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
            placeholder={photo?.title}
            value={title}
            required
          />
          <br />
          <br />
          <div className="album_content">Description</div>
          <textarea
            className="text-form"
            onChange={(e) => setDescription(e.target.value)}
            name="content"
            type="text"
            placeholder={photo?.description}
            value={description}
          />
          <br />
          <div className="album-buttons">
            <button className="submit-button" type="submit">
              Save
              <i className="far fa-save" />
            </button>
            <button
              className="submit-button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                hist(`/users/${userId}/photos`);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default EditPhoto;
