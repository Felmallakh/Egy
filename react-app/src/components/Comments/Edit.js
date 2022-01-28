import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import style from "./EditComment.module.css";
import { editCommentThunk } from "../store/comments";

export default function EditComment({
  projectId,
  setEditComment,
  currentComment,
  currentCommentId,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [editContent, setEditContent] = useState(currentComment);
  const [errors, setErrors] = useState("");

  const validate = () => {
    const validation = [];
    if (!editContent) validation.push("Your comment is empty");
    if (editContent.length > 250) validation.push("Your comment is too long.");

    return validation;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const errors = validate();

    if (errors && errors.length > 0) {
      return setErrors(errors);
    }

    const editedComment = {
      user_id: user.id,
      projectId,
      commentId: currentCommentId,
      content: editContent,
    };

    await dispatch(editCommentThunk(editedComment));
    setEditComment(false);
  };

  return (
    <>
      <div
        className={style.editCommentBackground}
        onClick={() => setEditComment(false)}
      ></div>
      <div className={style.editCommentContainer}>
        <form className={style.editCommentForm} onSubmit={handleSubmit}>
          <p className={style.editCommentPolicy}>
            We have a be nice policy. Please keep your sarcasm civil.
          </p>
          <label className={style.editCommentLabel} htmlFor="editComment">
            <span className={style.editCommentErrors}>
              {errors.length > 0 &&
              errors.map((error) => error.includes("comment"))
                ? errors.map((error) =>
                    error.includes("comment") ? `${error}` : null
                  )
                : null}
            </span>
          </label>
          <textarea
            className={style.editCommentTextArea}
            id="editComment"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className={style.editCommentButtons}>
            <button className={style.editCommentSubmit}>Confirm</button>
            <div
              className={style.editCommentCancel}
              onClick={() => setEditComment(false)}
            >
              Cancel
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
