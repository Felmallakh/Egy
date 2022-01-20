import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";

import { getAlbumsThunk, addAlbumThunk } from "../store/album";
import PhotoGrid from "./PhotoGrid";
import "./albums.css";

function AlbumPage() {
  const hist = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albumReducer);
  const album = Object.values(albums);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { albumId } = useParams()

  const sds = Array.from(album)

  const lol = sds.map(album => album.title)
  console.log("🔼🔼", lol)

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
    <div id="splash-container">
      <nav className="album-nav">
        <div className="album-left-Nav">
          <button id="signout" onClick={() => hist(`/albums`)}>
            Back
          </button>
          <button id="signout" onClick={() => hist(`/albums/new`)}>
            Delete Album
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
      <div className="album-section-div">
        Album Title:
      </div>
    </div>
  ) : null;
}
export default AlbumPage;
