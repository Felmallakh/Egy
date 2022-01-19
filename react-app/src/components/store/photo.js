const GET_PHOTOS = "photo/GET_PHOTOS";
const ADD_PHOTO = "photo/ADD_PHOTO";
const UPDATE_PHOTO = "photo/UPDATE_PHOTO";
const DELETE_PHOTO = "photo/DELETE_PHOTO";

const getPhotos = (photos) => ({
  type: GET_PHOTOS,
  photos,
});

const addPhoto = (photo) => ({
  type: ADD_PHOTO,
  photo,
});

const updatePhoto = (photo) => ({
  type: UPDATE_PHOTO,
  photo,
});

const deletePhoto = (photoId) => ({
  type: DELETE_PHOTO,
  photoId,
});

// Get photo
export const getPhotosThunk =(userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/photos`);

    if (res.ok) {
      const photos = await res.json();
      dispatch(getPhotos(photos));
      return photos;
    }
  };

const photoReducer = (state = {}, action) => {
  // console.log("😣😣", action.photos)
  switch (action.type) {
    case GET_PHOTOS: {
      const newState = { ...state };
      action.photos.photos.forEach((photo) => (newState[photo.id] = photo));
      return newState;
    }
    default:
      return state;
  }
};

export default photoReducer;
