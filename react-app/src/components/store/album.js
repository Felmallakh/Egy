
const GET_ALBUMS = "albums/GET_ALBUM";
const ADD_ALBUM = "album/ADD_ALBUM";
const DELETE_ALBUM = "album/DELETE_ALBUM";
const UPDATE_ALBUM = "album/UPDATE_ALBUM";

const getAlbums = (albums) => ({
  type: GET_ALBUMS,
  albums,
});

const addAlbum = (album) => ({
  type: ADD_ALBUM,
  album,
});

const deleteAlbum = (deletedAlbumId) => ({
  type: DELETE_ALBUM,
  deletedAlbumId,
});

const updateAlbum = (album) => ({
  type: UPDATE_ALBUM,
  album,
});

// // Get album by id thunk
// export const getAlbumById = ({ albumId }) => async (dispatch) => {
//     const res = await fetch(`/api/albums/${albumId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (res.ok) {
//       const album = await res.json();
//       // dispatch(getPhotoById(photo));
//       console.log(album);
//       return album;
//     }
//   };

// Get albums
export const getAlbumsThunk= (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/albums`)

    if (res.ok) {
      const albums = await res.json();
      dispatch(getAlbums(albums));
      return albums;
    }
  };

// Add album thunk
export const thunk_addalbum =
  ({ userId, title, description }) =>
  async (dispatch) => {
    const res = await fetch("/api/albums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        title,
        description,
      }),
    });

    if (res.ok) {
      const album = await res.json();
      dispatch(addAlbum(album));
      return album;
    }
  };

// Delete album thunk
export const thunk_deletealbum =
  ({ albumId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        albumId,
      }),
    });

    if (res.ok) {
      const deletedAlbum = await res.json();
      dispatch(deleteAlbum(deletedAlbum.albumToDelete.id));
      return "Deletion successful";
    }
  };

// Update album thunk
export const thunk_updatealbum =
  ({ albumId, title, description }) =>
  async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        albumId,
        title,
        description,
      }),
    });

    if (res.ok) {
      const updatedAlbum = await res.json();
      dispatch(updateAlbum(updatedAlbum));
      return updatedAlbum;
    }
  };

// Album Reducer
const albumReducer = (state = {}, action) => {
  console.log("🍎😣", action.albums)
  switch (action.type) {
    case GET_ALBUMS: {
      return action.albums
      // const newState = { ...state };
      // action.albums.albums.forEach((album) => (newState[album.id] = album));
      // return newState;
    }
    case ADD_ALBUM: {
      const newState = { ...state };
      newState[action.album.album.id] = action.album.album;
      return newState;
    }
    case DELETE_ALBUM: {
      const newState = { ...state };
      delete newState[action.deletedAlbumId];
      return newState;
    }
    case UPDATE_ALBUM: {
      const newState = { ...state };
      newState[action.album.updatedAlbum.id] = action.album.updatedAlbum;
      return newState;
    }
    default:
      return state;
  }
};

export default albumReducer;
