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
  const photos = useSelector((state) => state.photoReducer);
  const photo = Object.values(photos);
  const albums = useSelector((state) => state.albumReducer);

  const dispatch = useDispatch();
  const userId = session?.id

  useEffect(() => {
    dispatch(getPhotosThunk(userId));
  }, [session]);

  return session ? (
    <div id="photo-page">
      <nav className="photo-nav">
        <div className="album-left-Nav">
          <button id="signout" onClick={() => hist(`/home`)}>
            Back
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
          <ul className="photoGrid" key={photo.id} value={photo.id}>
            {photo ? photo.map((photo) => {
              return <NavLink exact to={`/photos/${photo.id}`}>
                <img className="img-grid" src={photo.photoURL} />
            </NavLink>
            }):null }
          </ul>
      </div>
    </div>
  ) : null;
}
export default Photos;
