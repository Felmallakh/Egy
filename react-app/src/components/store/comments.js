const GET_COMMENTS = "comments/GET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

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
  comment
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
    console.log("😣get comments thunk", comments);
    dispatch(getComments(comments.comments));
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
export const editCommentThunk = ({commentId, content}) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}/edit`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (res.ok) {
    const comments = await res.json();
    // console.log("😣🎄🍎", comments)

    dispatch(updateComment(comments));
    return comments;
  }
};

// Delete comment
export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  const comment = await res.json();
  console.log("😣😣😣😣😣😣😣", comment);
  dispatch(deleteComment(comment));
  return comment;
};

export default function commentsReducer(state = {}, action) {
  const newState = { ...state };
  console.log("😣😣action.comments", action.comments);
  switch (action.type) {
    case GET_COMMENTS: {
      action.comments.forEach((comment) => {
        console.log("🍎😒🍎🍎", comment)
        newState[comment.id] = comment})
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
    default:
      return state;
  }
}
