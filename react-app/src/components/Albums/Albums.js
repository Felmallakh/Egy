import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";

import { getAlbumsThunk, addAlbumThunk } from "../store/album";
import PhotoGrid from "./PhotoGrid";
import "./albums.css";

function Albums() {
  const hist = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albumReducer);
  const album = Object.values(albums);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // async function loadAlbums(session) {
  //   if (session) {
  //     await dispatch(getAlbumsThunk(session.id));
  //   }
  // }

  useEffect(() => {
    dispatch(getAlbumsThunk(session.id));
  }, [session]);

  const addAlbum = async (e) => {
    e.preventDefault();
    const userId = session.id;

    await dispatch(addAlbumThunk({ userId, title, description }));
  };

  return session ? (
    <div className="album-wrap">
      <div className="album-wrap">
        <nav>
          <div className="leftNav">
            <h3>Albums for {session.username}</h3>
            <h3>
              {album.map((album) => {
                return (
                  <option key={album.id} value={album.id}>
                    Albums Title: {album.title}
                  </option>
                );
              })}
            </h3>
          </div>
          <div className="rightNav">
            <button id="signout" onClick={addAlbum}>
              Add Album
            </button>
            <div
              id="createAlbum-button"
              onClick={() => hist(`/albums/new`)}
            >
              <i className="far fa-plus-square createAlbum-plus"></i>
              <span className="createAlbum-text">Create album</span>
            </div>

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
        <div className="post-section-div">
          <h2 className="post-section-title">Explore Destination's Albums</h2>
          <PhotoGrid album={album} />
        </div>
      </div>
      {/* <ul className="home-photos-feed">
        {userPhotosArr.map((photo) => (
          <li
            onClick={() => {
              setFullScreen(true);
              setFullScreenPhoto(photo);
              document.body.classList.add("stop-scrolling");
            }}
            className="home-photoLi"
            key={photo.id}
          >
            <img className="home-img" src={photo.photoURL}></img>
            <div id="home-photoMask">
              <div className="mask-item">
                <div>{photo.title}</div>
              </div>
              <div className="mask-item">
                <button
                  id="albumRemove-button"
                  onClick={removeAlbum}
                  value={photo.id}
                  className="photo-albumSelect far fa-minus-square"
                ></button>
                <button
                  className="mask-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/photos/${photo.id}/edit`);
                  }}
                >
                  Edit
                </button>
                <button
                  className="mask-button"
                  value={photo.id}
                  onClick={deletePhoto}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  ) : null;
}
export default Albums;
