import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { editCommentThunk, deleteCommentThunk } from "../store/comments";
import "../Photos/editPhotoForm.css";

function EditCommentFrom({ photoId, setEditComment, currentComment, currentCommentId }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(currentComment);
  const [errors, setErrors] = useState("");

  const validate = () => {
    const validation = [];
    if (!content) validation.push("Your comment is empty");
    if (content.length > 70) validation.push("Your comment must not be more than 70 characters long");

    return validation;
  };

  const editComment = async (e) => {
    e.preventDefault();
    setErrors([]);

    const errors = validate();

    if (errors && errors.length > 0) {
      return setErrors(errors);
    }
    await dispatch(
      editCommentThunk({
        photoId,
        content: content,
        commentId: currentCommentId,
      })
    );
    setEditComment(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to remove this Photo? This action cannot be undone."
    );
    if (confirmed) {
      await dispatch(deleteCommentThunk(currentCommentId));
      setEditComment(false);
    }
  };

  return (
    <>
        <form className="editForm" onSubmit={editComment}>
          <div className="form1">
            <h2>Edit Comment</h2>
            <label>Comment content</label>
            {/* <label className="errors" htmlFor="editComment">
              <span className="">
                {errors.length > 0 &&
                errors.map((error) => error.includes("comment"))
                  ? errors.map((error) =>
                      error.includes("comment") ? `${error}` : null
                    )
                  : null}
              </span>
            </label> */}
            <textarea
              placeholder={"Comment"}
              id="editComment"
              maxlength="70"
              type="text"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
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
                setEditComment(false);
                setContent("");
              }}
            >
              Cancel
            </p>
            <button id="form-submit" className="submit">Submit</button>
          </div>
        </form>

    </>
  );
}

export default EditCommentFrom;
