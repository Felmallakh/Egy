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
        <form onSubmit={editAlbum} className="albumForm">
          <input
            placeholder={album?.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></input>
        </form>
      </div>
    </div>
  ) : null;
}
export default AlbumPage;
