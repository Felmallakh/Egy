import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { editCommentThunk, deleteCommentThunk } from "../store/comments";
import { editCommentOff } from "../store/showEditComment";
import "../Photos/editPhotoForm.css";

function EditCommentFrom() {
  const dispatch = useDispatch();
  const hist = useNavigate();
  const { id, commentId } = useParams();
  console.log("🤷‍♀️🤷‍♀️❤🤷‍♀️", useParams())
  const showForm = useSelector((state) => state.editCommentFormReducer);
  const user = useSelector((state) => state.session.user);
  const comments = useSelector((state) => state.commentsReducer);
  console.log("😣", comments)
  // const comment = comments?.[commentId];
  const [content, setContent] = useState("");
  const userId = user?.id;
  const [errors, setErrors] = useState([]);

  const editComment = async (e) => {
    e.preventDefault();
    dispatch(editCommentThunk( commentId ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to remove this Photo? This action cannot be undone."
    );
    if (confirmed) {
      await dispatch(deleteCommentThunk(commentId));
      // hist(`/photos/${photo.id}`);
    }
  };

  return (
    <>
      {showForm && (
        <div
          className="blackout"
          onClick={(e) => {
            dispatch(editCommentOff());
          }}
        ></div>
      )}
      {showForm && (
        <div id="edit-container">
          <form className="editForm" onSubmit={editComment}>
            <div className="form1">
              <h2>Edit Comment</h2>
              <label>Comment content</label>
              <input
                placeholder={"Comment"}
                type="text"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
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
                  dispatch(editCommentOff());
                  setContent("");
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

export default EditCommentFrom;
