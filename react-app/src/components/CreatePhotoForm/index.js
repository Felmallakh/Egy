import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { addPhotoThunk } from "../store/photo";

function CreatePhotoForm() {
  const dispatch = useDispatch();
  const hist = useNavigate();

  const session = useSelector((state) => state.session.user);
  // const albums = useSelector((state) => state.albumReducer);
  const { albumId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image , setImage] = useState("");
  const [errors, setErrors] = useState([]);



  // Handle submit function
  const addPhoto = async (e) => {
    e.preventDefault();
    const userId = session.id;

    await dispatch(addPhotoThunk({ userId, title, description }));
    // hist(`/albums/${albumId}`);
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
        <p>Create New Photo</p>
        <ul>
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <div id="createAlbum-form-background">
          <form
            onSubmit={addPhoto}
            className="form-container"
            id="createAlbum-form-container"
          >
            {errors.length > 0 && (
              <ul className="errors-container">
                {errors.map((error, idx) => (
                  <li className="error" key={idx}>
                    {error}
                  </li>
                ))}
              </ul>
            )}
            <input
              className="img"
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={setImage}
            />
            <input
              className="form-field"
              type="text"
              placeholder="Title"
              value={title}
              // required
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

export default CreatePhotoForm;
