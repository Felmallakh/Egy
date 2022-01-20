import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPhotosThunk } from "../store/photo";
import { logout } from "../store/session";

import "./photos.css";

function Photos() {
  const hist = useNavigate();
  const session = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albumReducer);
  const photos = useSelector((state) => state.photoReducer);
  const photo = Object.values(photos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhotosThunk(session.id));
  }, [session]);

  return session ? (
    <div id="splash-container">
      <nav className="album-nav">
        <div className="album-left-Nav">
          <button id="signout" onClick={() => hist(`/home`)}>
            Back
          </button>
          <button id="signout" onClick={() => hist(`/albums/new`)}>
            Add Photo
          </button>
        </div>
        <div className="album-right-Nav">
          {/* <button id="signout" onClick={addAlbum}>
            Add Album
          </button> */}
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
      <div className="album-wrap">
        <NavLink exact to={`/photos/${photo.id}`}>
          <ul className="photoGrid" key={photo.id} value={photo.id}>
            {photo.map((photo) => {
              return <img className="img-grid" src={photo.photoURL} />;
            })}
          </ul>
        </NavLink>
      </div>
    </div>
  ) : null;
}
export default Photos;
