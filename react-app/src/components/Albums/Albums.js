import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";
import { getAlbumsThunk, addAlbumThunk } from "../store/album";
import PhotoGrid from "./PhotoGrid";
import NewAlbumForm from "../NewAlbumForm";
import NewAlbum from "../NewAlbum";
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
    <div id="splash-container">
      <NewAlbumForm />
      <nav>
        <div className="leftNav">
          <h3>Albums for {session.username}</h3>
          {/* <h3>
              {album.map((album) => {
                return (
                  <option key={album.id} value={album.id}>
                    Albums Title: {album.title}
                  </option>
                );
              })}
            </h3> */}
        </div>
        <div className="rightNav">
          <button id="signout" onClick={addAlbum}>
            Add Album
          </button>
          <div>
            <NewAlbum />
          </div>

          <i className="far fa-plus-square createAlbum-plus"></i>
          <button id="signout" onClick={() => hist(`/albums/new`)}>
            Create Album
          </button>

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
        <h2 className="album-section-t  itle">Explore Destination's Albums</h2>
        <PhotoGrid album={album} />
      </div>
    </div>
  ) : null;
}
export default Albums;
