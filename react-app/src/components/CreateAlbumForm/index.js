import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getAlbumsThunk, addAlbumThunk } from "../store/album";

function CreateAlbumForm() {
  const dispatch = useDispatch();
  const hist = useNavigate();

  const session = useSelector((state) => state.session.user);
  const albums = Object.values(useSelector(state => state.albumReducer))

  // const albumArr = () => {
  //   const oneAlbum = albums?.map(album => album?.title)
  //   return oneAlbum
  // }




  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    dispatch(getAlbumsThunk(session?.id));
  }, [session]);

  // Handle submit function
  const addAlbum = async (e) => {
    e.preventDefault();
    const output = [];
    // console.log("😣😣😣", titles)
    const userId = session?.id;
    const oneAlbum = albums?.map((album) => album?.title);

    if(oneAlbum.indexOf(title) > -1){
      output.push(`Album ${title} already exists`)
      return setErrors(output)
    }
    await dispatch(addAlbumThunk({ userId, title, description }));
    hist(`/users/${userId}/albums`);
  };

  return (
    <div className="authwrapper">
      <div className="auth">
        <div className="namelogo">
          <Link to="/">
            <img
              src="https://cdn.discordapp.com/attachments/919391399269515305/932090523496370277/logo-removebg-preview.png"
              alt="logo"
            ></img>
          </Link>
        </div>
        <p>Create New Album</p>
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error, idx) => (
              <li className="error" key={idx}>
                {error}
              </li>
            ))}
          </ul>
        )}
        <div id="createAlbum-form-background">
          <form
            onSubmit={addAlbum}
            className="form-container"
            id="createAlbum-form-container"
          >
            <input
              className="form-field"
              type="text"
              placeholder="Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="form-field"
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Create Album</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAlbumForm;
