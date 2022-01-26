import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";
import { useNavigate, useParams } from "react-router-dom";
import { getPhotosThunk, updatePhotoThunk, deletePhotoThunk } from "../store/photo";
import { editPhotoOff } from "../store/showEditPhoto";
import "../Profile/profile.css";

function EditPhoto() {
  const hist = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const photos = useSelector((state) => state.photoReducer);
  const showForm = useSelector((state) => state.editPhotoFormReducer)
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

  const closeMenu = () => {
    setShowMenu(false);
  };

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
      {showMenu && (
        <div
          className="blackout"
          onClick={(e) => {
            dispatch(editOrgOff());
          }}
        ></div>
      )}

      {showMenu && (
        <form className="edit-Form" onSubmit={editPhoto}>
          <div className="form-contents">
            <div className="album_content">Photo Title</div>
            <input
              className="edit-input-form"
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
              className="edit-text-form"
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
                onClick={closeMenu}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default EditPhoto;
