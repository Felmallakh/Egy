import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";

import { getAlbumsThunk, updateAlbumThunk, deleteAlbumThunk } from "../store/album";
import "./albums.css";

function AlbumPage() {
  const hist = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albumReducer);
  // const album = Object.values(albums);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { albumId } = useParams();
  const album = albums?.[albumId];
  const userId = session.id;
  const id = albumId

  useEffect(() => {
    dispatch(getAlbumsThunk(userId));
  }, [session]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (album.user_id !== userId)
    return alert(`User not authorized to perform this action`);
    await dispatch(deleteAlbumThunk(albumId));
    hist(`/users/${userId}/albums`)
  };

  const editAlbum = e => {
    e.preventDefault();
    dispatch(updateAlbumThunk({
      id,title,description
    }));
  }

  return session ? (
    <div id="splash-container">
      <nav className="album-nav">
        <div className="album-left-Nav">
          <button id="signout" onClick={() => hist(`/users/${userId}/albums`)}>
            Back
          </button>
          <button id="signout" onClick={handleSubmit}>
            Delete Album
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
      <div className="album-section-div">
        Album Title: {album?.title}
        <div>Album description: {album?.description}</div>
        <div className="album_container">
          <form className="albumForm" onSubmit={editAlbum}>
            <div className="album_content">Album Title</div>
            <input
              className="input-form"
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              type="text"
              placeholder={album?.title}
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
              placeholder={album?.description}
              value={description}
            />
            <br />
            <div className="album-buttons">
              <button className="submit-button" type="submit">
                Save Album <i className="far fa-save" />
              </button>
              <button
                className="submit-button"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  hist(`/albums/${albumId}`);
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
export default AlbumPage;
