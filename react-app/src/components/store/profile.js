const GET_PROFILE = "profile/GET_PROFILE";
const GET_PHOTO = "profile/GET_PHOTO";
const UPDATE_PHOTO = "profile/UPDATE_PHOTO";

const getProfile = (profile) => ({
    type: GET_PROFILE,
    profile,
});

const getPhoto = (photo) => ({
    type: GET_PHOTO,
    photo,
});

const updatePhoto = (photo) => ({
    type: UPDATE_PHOTO,
    photo,
});


