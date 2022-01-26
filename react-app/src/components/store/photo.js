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

const deletePhoto = (photo) => ({
  type: DELETE_PHOTO,
  photo,
});

// Get photo
export const getPhotosThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/photos`);

  if (res.ok) {
    const photos = await res.json();
    dispatch(getPhotos(photos));
    return photos;
  }
};

// Add photo
export const addPhotoThunk = (image) => async (dispatch) => {
  const albumId = image.get('album_id');
  const res = await fetch(`/api/albums/${albumId}/photos/new`, {
    method: "POST",
    body: image
  });

  if (res.ok) {
    const photo = await res.json();
    console.log("😣😣😣 photo", photo)
      dispatch(addPhoto(photo));
      return photo;
    }
  };

// Update photo thunk
export const updatePhotoThunk = ({ id, title, description }) => async (dispatch) => {
    const res = await fetch(`/api/photos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        description,
      }),
    });

    if (res.ok) {
      const updatedPoto = await res.json();
      dispatch(updatePhoto(updatedPoto));
      return updatedPoto;
    }
  };

// Delete photo thunk
export const deletePhotoThunk = (photoId) => async (dispatch) => {
  const res = await fetch(`/api/photos/${photoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      photoId,
    }),
  });

  if (res.ok) {
    const photo = await res.json();
    dispatch(deletePhoto(photo));
    return "Deletion successful";
  }
};

const photoReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_PHOTOS: {
      action.photos.photos.forEach((photo) => (newState[photo.id] = photo));
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
    case DELETE_PHOTO: {
      delete newState[action.photo.id];
      return newState;
    }
    default:
      return state;
  }
};

export default photoReducer;
