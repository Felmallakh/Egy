import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import {
  getPhotosThunk,
  updatePhotoThunk,
  deletePhotoThunk,
} from "../store/photo";
import { editPhotoOff } from "../store/showEditPhoto";
import "./editPhotoForm.css";

function EditPhotoFrom() {
  const dispatch = useDispatch();
  const hist = useNavigate();

  const showForm = useSelector((state) => state.editPhotoFormReducer);
  const user = useSelector((state) => state.session.user);
  const photos = useSelector((state) => state.photoReducer);
  const { photoId } = useParams();
  const photo = photos?.[photoId];
  const [title, setTitle] = useState(photo?.title);
  const [description, setDescription] = useState(photo?.description);
   const userId = user?.id;
   const id = photoId;
  const [errors, setErrors] = useState([]);

  const editPhoto = async (e) => {
    e.preventDefault();
    if (photo.user_id !== userId)
      return alert(`User not authorized to perform this action`);
    dispatch(
      updatePhotoThunk({
        id,
        title,
        description,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photo?.user_id !== userId)
      return alert(`User not authorized to perform this action`);
    const confirmed = window.confirm(
      "Are you sure you want to remove this Photo? This action cannot be undone."
    );
    if (confirmed) {
      await dispatch(deletePhotoThunk(photoId));
      hist(`/users/${userId}/photos`);
    }
  };

  return (
    <>
      {showForm && (
        <div
          className="blackout"
          onClick={(e) => {
            dispatch(editPhotoOff());
          }}
        ></div>
      )}
      {showForm && (
        <form
          className="edit-Form"
          onSubmit={async (e) => {
            e.preventDefault();
            if (title) {
              dispatch(editPhotoOff());
              await editOrg();
            }
            setTitle("");
          }}
        >
          <div className="form1">
            <h2>Edit Photo Title</h2>
            <label>Photo title</label>
            <input
              placeholder={"Photo Title"}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            ></input>
          </div>
          <div id="channelButton">
            <div className="delete" id={id} onClick={handleSubmit}>
              Delete <i className="fas fa-trash-alt"></i>
            </div>
            <p
              className="cancel"
              onClick={(e) => {
                dispatch(editPhotoOff());
                setTitle("");
              }}
            >
              Cancel
            </p>
            <button className="submit" disabled={!title}>
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default EditPhotoFrom;
