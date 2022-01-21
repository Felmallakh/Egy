import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";
import { getPhotosThunk, updatePhotoThunk, deletePhotoThunk } from "../store/photo";

import "./photos.css";

function PhotoPage() {
  const hist = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);
  const photos = useSelector((state) => state.photoReducer);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { photoId } = useParams();
  const photo = photos?.[photoId];
  const userId = session.id;
  const id = photoId;

  useEffect(() => {
    dispatch(getPhotosThunk(userId));
  }, [session]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (photo.user_id !== userId)
  //   return alert(`User not authorized to perform this action`);
  //   await dispatch(deletePhotoThunk(photoId));
  //   // hist(`/users/${userId}/photos`);
  // };

  const editPhoto = (e) => {
    e.preventDefault();
    dispatch(
      updatePhotoThunk({
        id,
        title,
        description,
      })
    );
  };

  const back = e => {
    e.preventDefault();
    hist(`/users/${userId}/photos`);
  }

  return session ? (
    <div id="photo-page">
      <nav className="album-nav">
        <div className="album-left-Nav">
          <button id="signout" onClick={back}>
            Back
          </button>
          <button id="signout" >
          {/* <button id="signout" onClick={handleSubmit}> */}
            Delete Photo
          </button>
        </div>
        <div className="album-right-Nav">
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
      <div className="photo-container">
        <img className="single-image" src={photo?.photoURL} />
        <h2 className="image-content">Title</h2>
        <h3>{photo?.title}</h3>
        <h2 className="image-content">Description</h2>
        <h3>{photo?.description}</h3>
      </div>
      <div className="album-section-div">
        Album Title: {photo?.title}
        <div>Album description: {photo?.description}</div>
        <div className="album_container">
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
                  hist(`/photos/${photoId}`);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
export default PhotoPage;
