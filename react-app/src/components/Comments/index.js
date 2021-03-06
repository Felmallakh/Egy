import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCommentsThunk, addCommentThunk } from "../store/comments";
import EditCommentForm from "../Comments/EditComment";
import "./comments.css";

function Comments() {
  const dispatch = useDispatch();
  const hist = useNavigate();
  const session = useSelector((state) => state.session.user);

  const photoId = useParams().photoId;
  const userId = session?.id;

  const comments = useSelector((state) => Object.values(state?.commentsReducer));
  const photoComments = comments.filter(comment => comment.photo_id === +photoId);

  const [content, setContent] = useState("");
  const [editComment, setEditComment] = useState(false);
  const [currentComment, setCurrentComment] = useState("");
  const [currentCommentId, setCurrentCommentId] = useState("");

  const addComment = async (e) => {
    e.preventDefault();

    await dispatch(addCommentThunk({ userId, photoId, content }));
    setContent("");
  };

  useEffect(() => {
    dispatch(getCommentsThunk(photoId));
  }, [dispatch, photoId]);

  useEffect(() => {
    const select = document.querySelector(".editForm");
    const textArea = document.getElementById("editComment");
    const button = document.getElementById("form-submit");

    if (!editComment) {
      return
    }
    const closeMenu = (e) => {
      if (e.target != select && e.target != textArea && e.target != button) setEditComment(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch, editComment])


  const editButton = (comment) => {
    setEditComment(true);
    setCurrentComment(comment.content);
    setCurrentCommentId(comment.id);
  };

  return session ? (
    <div className="comments-container">
      {editComment && (
        <EditCommentForm
          photoId={photoId}
          setEditComment={setEditComment}
          currentCommentId={currentCommentId}
          currentComment={currentComment}
        />
      )}
      <div className="comments-header">
        <h1 id="comment-title">Comments</h1>
        <div className="comments-count">
          {photoComments ? `${photoComments.length} Comments` : "0  Comments"}
        </div>
      </div>
      <ul className="photo-comments">
        {photoComments
          ? photoComments.map((comment) => (
              <div key={comment.id} className="comments-div">
                {/* <EditCommentForm comment={comment} /> */}
                <div className="author-layout">
                  <h3 id="author">{comment?.author.username}</h3>
                </div>
                <div className="author-comment">
                  <p className="content" id="contentid">
                    {comment.content}
                  </p>
                  {comment.user_id === userId && (
                    <button
                      key={comment.id}
                      // data-commentId = {comment.id}
                      id="signout"
                      onClick={() => editButton(comment)}
                    >
                      <i id="nav-size" className="fas fa-edit"></i>
                    </button>
                    // <button id="edit-button" htmlFor="contentid"> EDIT</button>
                  )}
                </div>
              </div>
            ))
          : null}
      </ul>
      <form className="commentForm" onSubmit={addComment}>
        <div className="album_content">Comment</div>
        <textarea
          className="text-form"
          maxLength="70"
          name="content"
          type="text"
          placeholder="Type your comment"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="submit-button" type="submit">
          Post Comment
        </button>
      </form>
    </div>
  ) : null;
}
export default Comments;
