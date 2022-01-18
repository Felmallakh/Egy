import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAlbumsThunk } from "../store/album";

function Albums() {
  const hist = useNavigate();
  // get orgs from database and use map
  const session = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albumReducer);

  const dispatch = useDispatch();

  async function loadAlbums(session) {
    if (session) {
      await dispatch(getAlbumsThunk(session.id));
    }
  }
  useEffect(() => {
    loadAlbums(session);
  }, [session]);


  return session ? (
    <div className="workSpace-wrap">
      <div className="workSpace-wrap">
        <h3>Albums for {session.username}</h3>
        <h3>{albums.title}</h3>
        <h3>{albums.description}</h3>
      </div>
    </div>
  ) : null;
}
export default Albums;
