import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { editCommentThunk, deleteCommentThunk } from "../store/comments";
import { editCommentOff } from "../store/showEditComment";
import "../Photos/editPhotoForm.css";

function EditCommentFrom({ setEditComment, currentComment, currentCommentId }) {
  const dispatch = useDispatch();
  const hist = useNavigate();

  const showForm = useSelector((state) => state.editCommentFormReducer);
  const userId = useSelector((state) => state.session.user.id);
  // console.log("😣 comment", comment);
  // const comment = comments.map((comment) => comment.content)

  // const [oldcomment, setComment] = useState(comment.content)
  const [content, setContent] = useState(currentComment);
  const [errors, setErrors] = useState("");

  const validate = () => {
    const validation = [];
    if (!content) validation.push("Your comment is empty");
    if (content.length > 70) validation.push("Your comment is too long.");

    return validation;
  };

  const editComment = async (e) => {
    e.preventDefault();
    setErrors([]);

    const errors = validate();

    if (errors && errors.length > 0) {
      return setErrors(errors);
    }

  await dispatch(editCommentThunk({ content: content, commentId: currentCommentId }));
  setEditComment(false)
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
      <div className="comments-container" onClick={() => setEditComment(false)}>
        </div>
      <div id="edit-container">
        <form className="editForm" onSubmit={editComment}>
          <div className="form1">
            <h2>Edit Comment</h2>
            <label>Comment content</label>
            <label className="errors" htmlFor="editComment">
              <span className="">
                {errors.length > 0 &&
                errors.map((error) => error.includes("comment"))
                  ? errors.map((error) =>
                      error.includes("comment") ? `${error}` : null
                    )
                  : null}
              </span>
            </label>
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
            <button className="submit">Submit</button>
          </div>
        </form>
      </div>
      )}
    </>
  );
}

export default EditCommentFrom;
