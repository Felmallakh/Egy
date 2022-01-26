import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCommentsThunk, addCommentThunk } from "../store/comments";

import "./comments.css";

function Comments() {
  const dispatch = useDispatch();
  const hist = useNavigate();
  const session = useSelector((state) => state.session.user);
  const comments = Object.values(useSelector((state) => state.commentsReducer));
  // console.log("😣😣",comments)
  const photoId = useParams().photoId;

  const userId = session?.id;

  const [content, setContent] = useState("");

  const addComment = async (e) => {
    e.preventDefault();

    await dispatch(addCommentThunk({ userId, photoId, content }));
    // hist(`/users/${userId}/albums`);
  };

  useEffect(() => {
    dispatch(getCommentsThunk(photoId));
  }, [dispatch, photoId]);

  return session ? (
    <div className="comments-container">
      <div className="comments-header">
        <h1 id="comment-title">Comments</h1>
        <div className="comments-count">
          {comments ? `${comments.length} Comments` : "0  Comments"}
        </div>
      </div>
      <ul className="photo-comments">
        {comments
          ? comments.map((comment) => (
              <div key={comment.id} className="comments-div">
                <div className="author-layout">
                  <h3 id="author" key={comment.id}>
                    {comment.author.username}
                  </h3>
                </div>
                <p className="content">{comment.content}</p>
                <div className="comments-buttons">
                  {comment.user_id === userId && (
                    <button id="edit-button"> EDIT</button>
                  )}
                </div>
              </div>
            ))
          : null}
      </ul>
      <form className="albumForm" onSubmit={addComment}>
        <div className="album_content">Album Title</div>
        <textarea
          className="text-form"
          onChange={(e) => setContent(e.target.value)}
          name="content"
          type="text"
          placeholder="Type your comment"
          value={content}
        />
        <button className="submit-button" type="submit">
          Add Comment
        </button>
      </form>
    </div>
  ) : null;
}
export default Comments;
