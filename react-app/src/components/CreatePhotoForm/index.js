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
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photoURL", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("album_id", albumId);
    formData.append("userId", session.id);
    await dispatch(addPhotoThunk(formData));
    hist(`/albums/${albumId}`);
  };
  // // Handle submit function
  // const addPhoto = async (e) => {
  //   e.preventDefault();
  //   const userId = session.id;

  //   // hist(`/albums/${albumId}`);
  // };

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
            onSubmit={handleSubmit}
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
            <label
              className="material-icons"
              htmlFor="imageUpload"
              style={{ fontSize: "70px" }}
            >
              cloud_upload
            </label>

            <input
              className="img-upload"
              id="imageUpload"
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
              required
              onChange={(e) => setImage(e.target.files[0])}
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
            <button type="submit">Create Photo</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePhotoForm;
