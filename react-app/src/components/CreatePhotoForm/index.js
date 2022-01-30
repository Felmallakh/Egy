import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addPhotoThunk } from "../store/photo";
import './photoform.css';


function CreatePhotoForm() {
  const dispatch = useDispatch();
  const hist = useNavigate();

  const session = useSelector((state) => state.session.user);
  // const albums = useSelector((state) => state.albumReducer);
  const { albumId } = useParams();

  const [title, setTitle] = useState("");
  // const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [savedImageFile, setSavedImageFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [savedImagePreview, setSavedImagePreview] = useState("");
  const [errors, setErrors] = useState("");

  const setImage = (e) => {
    let file = e.target.files[0];

    setImageFile(e.target.files[0]);
    if (file) {
      setSavedImageFile(file);

      file = URL.createObjectURL(file);
      setImagePreview(file);
      setSavedImagePreview(file);
    } else {
      setImageFile(savedImageFile);
      setImagePreview(savedImagePreview);
    }
  };

  const validate = () => {
    const errors = [];

    if (!imageFile) errors.push("photoURL : Please select an image.");
    if (!title) errors.push("title : Please enter title for image.");

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();

    if (errors && errors.length > 0) return setErrors(errors);

    const formData = new FormData();

    formData.append("photoURL", imageFile);
    formData.append("title", title);
    formData.append("album_id", albumId);
    formData.append("userId", session.id);

    await dispatch(addPhotoThunk(formData));
    setErrors([]);

    setTitle("");
    setImageFile("");
    setImagePreview("");
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
        <p>Add New Photo</p>
        {/* <ul>
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>
              {error}
            </li>
          ))}
        </ul> */}
        <div id="createAlbum-form-background">
          <form
            onSubmit={handleSubmit}
            className="form-container"
            id="createAlbum-form-container"
          >
            {/* {errors.length > 0 && (
              <ul className="errors-container">
                {errors.map((error, idx) => (
                  <li className="error" key={idx}>
                    {error}
                  </li>
                ))}
              </ul>
            )} */}
            <div className="img-title-div">
              <label className="image-upload" htmlFor="imageUpload">
                {imagePreview ? (
                  <img className="img-review" src={imagePreview} />
                ) : (
                  <span
                    className="material-icons"
                    htmlFor="imageUpload"
                    style={{ fontSize: "70px" }}
                  >
                    cloud_upload{" "}
                  </span>
                )}
                <div className="addImageError">
                  {errors.length > 0 &&
                  errors.map((error) => error.includes("photoURL"))
                    ? errors.map((error) =>
                        error.includes("photoURL")
                          ? `${error.split(":")[1]}`
                          : null
                      )
                    : null}
                </div>
              </label>
              <input
                className="img-upload"
                id="imageUpload"
                type="file"
                accept=".jpg, .jpeg, .png, .gif"
                // required
                onChange={setImage}
              />
            </div>
            <div className="addImageError">
              {errors.length > 0 &&
              errors.map((error) => error.includes("title"))
                ? errors.map((error) =>
                    error.includes("title") ? `${error.split(":")[1]}` : null
                  )
                : null}
            </div>
            <input
              className="form-field"
              type="text"
              placeholder="Title"
              value={title}
              // required
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Create Photo</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePhotoForm;
