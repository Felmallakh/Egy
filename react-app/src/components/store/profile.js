const GET_PROFILE = "profile/GET_PROFILE";
const GET_PHOTO = "profile/GET_PHOTO";
const ADD_PHOTO = "profile/ADD_PHOTO";
const UPDATE_PHOTO = "profile/UPDATE_PHOTO";

const getProfile = (profile) => ({
    type: GET_PROFILE,
    profile,
});

const getPhoto = (photo) => ({
    type: GET_PHOTO,
    photo,
});

const addPhoto = (photo) => ({
  type: ADD_PHOTO,
  photo,
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

// Get Profile Photo
export const getProfilePhotoThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/profile`);

    if (res.ok) {
        const photo = await res.json();
        dispatch(getPhoto(photo));
        return photo;
    }
};

// Add Profile Photo
export const addProfilePhotoThunk = (image) => async (dispatch) => {
    const userId = image.get("id");
    const res = await fetch(`/api/users/${userId}/profile`, {
        method: "POST",
        body: image
    });

    if (res.ok) {
        const photo = await res.json();
        dispatch(addPhoto(photo));
        return photo;
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
        case GET_PHOTO: {
            action.photo.photo.forEach(photo => (newState[photo.id == photo]));
            return newState;
        }
        case ADD_PHOTO: {
            newState[action.photo.id] = action.photo;
            return newState;
        }
        case UPDATE_PHOTO: {
            newState[action.photo.id] = action.photo;
            return newState;
        }
        default:
            return state;
    }
}
