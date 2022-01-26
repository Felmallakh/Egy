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
  const comment = Object.values(useSelector((state) => state.commentsReducer));
  // console.log("😣😣",comments)
  const photoId = useParams().photoId

  const userId = session?.id;

  useEffect(() => {
    dispatch(getCommentsThunk(photoId));
  }, [dispatch, photoId]);

  return session ? (
    <div className="comments-container">
      <div className="photo-comments">
        <h1>Comments</h1>
        {/* <h2 className="comments-title"> */}
        {/* { comments ? `${comments.length} Comments` : '0  Comments'}</h2> */}
      </div>
      <ul className="photoGrid" key={comment.id} value={comment.id}>
        {comment
          ? comment.map((comment) => {
              return (
                  <p className="img-grid" key={comment.id}>{comment.content}</p>
              );
            })
          : null}
      </ul>
    </div>
  ) : null;
}
export default Comments;
