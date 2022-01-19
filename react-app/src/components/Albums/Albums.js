import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAlbumsThunk } from "../store/album";

function Albums() {
  const hist = useNavigate();
  const session = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albumReducer);
  const album = Object.values(albums)


  const dispatch = useDispatch();

  // async function loadAlbums(session) {
  //   if (session) {
  //     await dispatch(getAlbumsThunk(session.id));
  //   }
  // }

  useEffect(() => {
    dispatch(getAlbumsThunk(session.id));
  }, [session]);


  return session ? (
    <div className="album-wrap">
      <div className="album-wrap">
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
        <h3>{albums.description}</h3>
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
