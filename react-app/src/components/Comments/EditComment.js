import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { editCommentThunk, deleteCommentThunk } from "../store/comments";
import { editCommentOff } from "../store/showEditComment";
import "../Photos/editPhotoForm.css";

function EditCommentFrom() {
  const dispatch = useDispatch();
  const hist = useNavigate();

  const showForm = useSelector((state) => state.editCommentFormReducer);
  const userId = useSelector((state) => state.session.user.id);
  const comments = Object.values(useSelector((state) => state.commentsReducer));

  const comment = comments.map((comment) => comment.content)
  console.log("😣", comment)

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const editComment = async (e) => {
    e.preventDefault();
    dispatch(editCommentThunk( comment ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to remove this Photo? This action cannot be undone."
    );
    if (confirmed) {
      // await dispatch(deleteCommentThunk(commentId));
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
                value={comment.content}
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
