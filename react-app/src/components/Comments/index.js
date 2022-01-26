import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCommentsThunk } from "../store/comments";

import "./comments.css";

function Comments() {
  const dispatch = useDispatch();
  const hist = useNavigate();
  const session = useSelector((state) => state.session.user);
  const comments = Object.values(useSelector((state) => state.commentsReducer));
  // console.log("😣😣",comments)
  const photoId = useParams().photoId;

  const userId = session?.id;

  useEffect(() => {
    dispatch(getCommentsThunk(photoId));
  }, [dispatch, photoId]);

  return session ? (
    <div className="comments-container">
      <div className="comments-header">
        <h1>Comments</h1>
        <div className="comments-title">
          {comments ? `${comments.length} Comments` : "0  Comments"}
        </div>
      </div>
      <ul className="photo-comments">
        {comments
          ? comments.map((comment) => (
              <div key={comment.id} className="comments-div">
                <h3 className="author" key={comment.id}>
                  {comment.author.username}
                </h3>
                <p className="content">{comment.content}</p>
              </div>
            ))
          : null}
      </ul>
    </div>
  ) : null;
}
export default Comments;
