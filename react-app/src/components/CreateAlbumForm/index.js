import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { getAlbumsThunk, addAlbumThunk } from "../store/album";


function CreateAlbumForm() {
  const dispatch = useDispatch();
  const history = useNavigate();

  const session = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);



  // Handle submit function
  const addAlbum = async (e) => {
    e.preventDefault();
    const userId = session.id;

    await dispatch(addAlbumThunk({ userId, title, description }));
  };


  return (
    <>
      <nav className="form-nav">
        <div  id="logo-container">
          <span className="form-logoText" id="home-logoText">

          </span>
        </div>
      </nav>
      <div id="createAlbum-form-background">
        <form
          onSubmit={addAlbum}
          className="form-container"
          id="createAlbum-form-container"
        >
          <div className="form-header">
            <div className="form-headerText">Create Album</div>
          </div>
          {errors.length > 0 && (
            <ul className="errors-container">
              {errors.map((error, idx) => (
                <li className="error" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
          )}
          <div className="field-container">
            <input
              className="form-field"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="form-field"
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              id="createAlbum-form-button"
              className="form-button"
              type="submit"
            >
              Create Album
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateAlbumForm;
