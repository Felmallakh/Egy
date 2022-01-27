import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";

import { getAlbumsThunk, addAlbumThunk } from "../store/album";
import PhotoGrid from "./PhotoGrid";
import Search from "../Search";

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
    dispatch(getAlbumsThunk(session?.id));
  }, [session]);

  const addAlbum = async (e) => {
    e.preventDefault();
    const userId = session.id;

    await dispatch(addAlbumThunk({ userId, title, description }));
  };

  return session ? (
    <div id="splash-container">
      <nav className="album-nav">
        <div className="album-left-Nav">
          <button id="signout" onClick={() => hist(`/home`)}>
            <i id="nav-size" className="fas fa-arrow-left"></i>
          </button>
          <button className="nav-add" onClick={() => hist(`/albums/new`)}>
            Add Album <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="searchContainer">
          <Search />
        </div>
        <div className="album-right-Nav">
          <button
            className="nav-logout"
            onClick={async () => {
              await dispatch(logout());
              hist("/");
            }}
          >
            <i className="fas fa-sign-out-alt"></i> Log Out
          </button>
        </div>
      </nav>
      <div className="album-section-div">
        <PhotoGrid album={album} />
      </div>
    </div>
  ) : null;
}
export default Albums;
