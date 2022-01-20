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
  // const album = Object.values(albums);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const userId = session.id;


  useEffect(() => {
    dispatch(getAlbumsThunk(session.id));
  }, [session]);

  const { albumId } = useParams()

  const album = albums?.[albumId]

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (deleteMember === ownerId)
  //     return alert(`You cannot remove the owner of the Organization`);
  //   await dispatch(removeMember(deleteMember, org.id));
  // };

  return session ? (
    <div id="splash-container">
      <nav className="album-nav">
        <div className="album-left-Nav">
          <button id="signout" onClick={() => hist(`/users/${userId}/albums`)}>
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
        Album Title: {album.title}
      </div>
    </div>
  ) : null;
}
export default AlbumPage;
