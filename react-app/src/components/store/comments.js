const GET_COMMENTS = "comment/GET_COMMENTS";
const ADD_COMMENT = "comment/ADD_COMMENT";
const UPDATE_COMMENT = "comment/UPDATE_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";

const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
})
const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})
const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})
const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment
})

// Get comments
export const getCommentsThunk = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/photos/${photoId}/comments`);
    if (res.ok){
        const comments = await res.json();
        dispatch(getComments(comments));
        return comments;
    }
}

