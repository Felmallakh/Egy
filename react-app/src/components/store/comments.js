const GET_COMMENTS = "comment/GET_COMMENTS";
const ADD_COMMENT = "comment/ADD_COMMENT";
const UPDATE_COMMENT = "comment/UPDATE_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";

const getComments = (comments) => ({
  type: GET_COMMENTS,
  comments,
});
const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});
const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});
const deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  comment,
});

// Get comments
export const getCommentsThunk = (photoId) => async (dispatch) => {
  const res = await fetch(`/api/photos/${photoId}/comments`);
  if (res.ok) {
    const comments = await res.json();
    dispatch(getComments(comments));
    return comments;
  }
};

// Add comment
export const addCommentThunk = (comment) => async (dispatch) => {
  const { photoId, content } = comment;
  const res = await fetch(`/api/photos/${photoId}/comments`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ content }),
  });
  const comments = await res.json();
  dispatch(addComment(comments));
  return comments;
};

// Edit comment
export const editCommentThunk = (comment) => async (dispatch) => {
  const { commentId, photoId, content } = comment;
  const res = await fetch(`/api/photos/${photoId}/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ content }),
  });
  const comments = await res.json();
  dispatch(updateComment(comments));
  return comments;
};

// Delete comment
export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  const comment = await res.json();
  dispatch(deleteComment(comment));
  return comment;
};

export default function commentsReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_COMMENTS: {
      action.comments.forEach((comment) => (newState[comment.id] = comment));
      return newState;
    }
    case ADD_COMMENT: {
        newState[action.comment.id] = action.comment;
        return newState;
    }
    case UPDATE_COMMENT: {
        newState[action.comment.id] = action.comment;
        return newState;
    }
    case DELETE_COMMENT: {
        delete newState[action.comment.id];
        return newState;
    }
    default: { return state }
  }
}
