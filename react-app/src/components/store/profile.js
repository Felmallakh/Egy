const GET_PROFILE = "profile/GET_PROFILE";
const GET_PHOTO = "profile/GET_PHOTO";
const ADD_PHOTO = "profile/ADD_PHOTO";
const UPDATE_PHOTO = "profile/UPDATE_PHOTO";

const getProfile = (profile) => ({
    type: GET_PROFILE,
    profile,
});

const updatePhoto = (photo) => ({
    type: UPDATE_PHOTO,
    photo,
});

// Get Profile
export const getProfileThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/profile`);

    if (res.ok) {
        const profile = await res.json();
        dispatch(getProfile(profile));
        return profile;
    }
};

// Update Profile Photo
export const updateProfilePhotoThunk = ({ userId, username, profile_picture }) => async (dispatch) => {
    const res = await fetch(`api/users/${userId}/profile`, {
      method: "PUT",
      headers: { content: "application/json" },
      body: JSON.stringify({ userId, username, profile_picture }),
    });

    if (res.ok) {
        const updatedPhoto = await res.json();
        dispatch(updatePhoto(updatedPhoto));
        return updatedPhoto;
    }
}

const profile = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type){
        case GET_PROFILE: {
            action.profile.forEach(profile => {
                newState[profile.id] = profile})
            return newState;
        }
        case UPDATE_PHOTO: {
            newState[action.photo.id] = action.photo;
            return newState;
        }
        default:
            return state;
    }
};

export default profile;
