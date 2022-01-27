import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { updateCommentThunk, deleteCommentThunk } from "../store/photo";
import { editPhotoOff } from "../store/showEditPhoto";
import "./editPhotoForm.css";

function EditPhotoFrom() {
  const dispatch = useDispatch();
  const hist = useNavigate();

  const showForm = useSelector((state) => state.editPhotoFormReducer);
  const user = useSelector((state) => state.session.user);
  const comment = useSelector((state) => state.commentsReducer);
  const { commentId } = useParams();
  const photo = comment?.[commentId];
  const [content, setTitle] = useState(comment?.content);
  const userId = user?.id;
  const id = commentId;
  const [errors, setErrors] = useState([]);

  const editPhoto = async (e) => {
    e.preventDefault();
    if (photo.user_id !== userId)
      return alert(`User not authorized to perform this action`);
    dispatch(updateCommentThunk({ id, content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photo?.user_id !== userId)
      return alert(`User not authorized to perform this action`);
    const confirmed = window.confirm(
      "Are you sure you want to remove this Photo? This action cannot be undone."
    );
    if (confirmed) {
      await dispatch(deleteCommentThunk(commentId));
      hist(`/users/${userId}/comments`);
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
        <div id="edit-container">
          <form className="editForm" onSubmit={editPhoto}>
            <div className="form1">
              <h2>Edit Photo</h2>
              <label>Photo content</label>
              <input
                placeholder={"Photo Title"}
                type="text"
                value={content}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              ></input>
            </div>
            <div id="editPhotoButton">
              <div className="delete" onClick={handleSubmit}>
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
              <button className="submit" disabled={!content}>
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditPhotoFrom;
