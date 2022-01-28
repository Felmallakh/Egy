import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { editCommentThunk, deleteCommentThunk } from "../store/comments";
import { editCommentOff } from "../store/showEditComment";
import "../Photos/editPhotoForm.css";

function EditCommentFrom({ comment }) {
  const dispatch = useDispatch();
  const hist = useNavigate();

  const showForm = useSelector((state) => state.editCommentFormReducer);
  const userId = useSelector((state) => state.session.user.id);
  console.log("😣 comment", comment);
  // const comment = comments.map((comment) => comment.content)

  const [oldcomment, setComment] = useState(comment.content)
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  console.log("😣old comment", comment)

  const editComment = async (e) => {

    e.preventDefault();
    dispatch(editCommentThunk( {content: comment.content, commentId : comment.id, } ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to remove this Photo? This action cannot be undone."
    );
    if (confirmed) {
      await dispatch(deleteCommentThunk(comment.id));
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
              <textarea
                placeholder={"Comment"}
                maxlength="70"
                type="text"
                value={oldcomment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                required
              ></textarea>
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
              <button className="submit">
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
