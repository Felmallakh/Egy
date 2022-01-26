import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";
import {
  getPhotosThunk,
  updatePhotoThunk,
  deletePhotoThunk,
} from "../store/photo";
import EditPhoto from "./Edit-Photo";

import "./photos.css";

function PhotoPage() {
  const hist = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);
  const photos = useSelector((state) => state.photoReducer);

  const { photoId } = useParams();
  const photo = photos?.[photoId];
  const [title, setTitle] = useState(photo?.title);
  const [description, setDescription] = useState(photo?.description);
  const userId = session?.id;
  const id = photoId;

  useEffect(() => {
    dispatch(getPhotosThunk(userId));
  }, [session]);

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

  const back = (e) => {
    e.preventDefault();
    hist(`/users/${userId}/photos`);
  };

  return session ? (
    <div id="photo-page">
      <nav className="albumPage-nav">
        <div className="album-left-Nav">
          <button id="signout" onClick={back}>
            Back
          </button>
          {photo ? photo.user_id === userId && <EditPhoto /> : null}
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
      <br />
      <br />
      <div className="photo-container">
        <div className="album-info">{photo?.title}</div>
        <div id="album-desc">{photo?.description}</div>
        <br />
        <br />
        <img className="single-image" src={photo?.photoURL} />
      </div>
      <div className="album-section-div">
        {/* <div className="album_container">
          {photo
            ? photo.user_id === userId && (
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
              )
            : null}
        </div> */}
      </div>
    </div>
  ) : null;
}
export default PhotoPage;
