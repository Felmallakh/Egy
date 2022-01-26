import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";
import {
  getAlbumsThunk,
  updateAlbumThunk,
  deleteAlbumThunk,
} from "../store/album";
import { getPhotosThunk } from "../store/photo";

import "./albums.css";

function AlbumPage() {
  const hist = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albumReducer);
  const photos = useSelector((state) => state.photoReducer);
  const { albumId } = useParams();
  const album = albums?.[albumId];
  const userId = session?.id;
  const id = albumId;
  const [title, setTitle] = useState(album?.title);
  const [description, setDescription] = useState(album?.description);

  const photoArr = Object.values(photos).filter(
    (photo) => photo.album_id === +id
  );

  useEffect(() => {
    dispatch(getAlbumsThunk(userId));
  }, [session]);

  useEffect(() => {
    dispatch(getPhotosThunk(userId));
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (album.user_id !== userId)
      return alert(`User not authorized to perform this action`);
    const confirmed = window.confirm(
      "Are you sure you want to remove this Album? This action cannot be undone."
    );
    if (confirmed) {
      await dispatch(deleteAlbumThunk(albumId));
      hist(`/users/${userId}/albums`);
    }
  };

  const editAlbum = async (e) => {
    e.preventDefault();
    if (album.user_id !== userId)
      return alert(`User not authorized to perform this action`);
    await dispatch(
      updateAlbumThunk({
        id,
        title,
        description,
      })
    );
    // hist(`/users/${userId}/albums`);
  };

  return session ? (
    <div id="album-splash-container">
      <nav className="albumPage-nav">
        <div className="album-left-Nav">
          <button id="signout" onClick={() => hist(`/users/${userId}/albums`)}>
            <i id="nav-size" className="fas fa-arrow-left"></i>
          </button>
          <button
            class="nav-add"
            onClick={() => hist(`/albums/${albumId}/photos/new`)}
          >
            Add Photo <i className="fas fa-plus"></i>
          </button>
        </div>

        <div className="album-right-Nav">
          <button
            class="nav-logout"
            onClick={async (e) => {
              e.preventDefault();
              await dispatch(logout());
              hist("/");
            }}
          >
            <i className="fas fa-sign-out-alt"></i> Log Out
          </button>
        </div>
      </nav>
      <div className="nav-delete">
        {album
          ? album.user_id === userId && (
              <button id="signout" onClick={handleSubmit}>
                Delete Album
              </button>
            )
          : null}
      </div>
      <br />
      <br />
      <div className="album-info">
        <div className="album-info">{album?.title}</div>
        <div id="album-desc">{album?.description}</div>
      </div>
      <br />
      <br />
      <ul className="album-photo-grid-list">
        {photoArr.map((photo) => (
          <li className="photoLi" key={photo.id}>
            <img className="img" src={photo.photoURL}></img>
            <div id="photo-mask">
              <div className="img-title">
                <div>{photo.title}</div>
              </div>
              {photo.user_id === userId && (
                <div
                  className="mask-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    hist(`/photos/${photo.id}`);
                  }}
                >
                  Edit
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      {/* <ul className="photo-grid-list">
        {photo &&
          photo?.map((photo) => {
            return <img src={photo.album_id == albumId} />
          })}
      </ul> */}
      <div className="album-section-div">
        <div className="album_container">
          {album
            ? album.user_id === userId && (
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
                        hist(`/users/${userId}/albums`);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )
            : null}
        </div>
      </div>
    </div>
  ) : null;
}
export default AlbumPage;
