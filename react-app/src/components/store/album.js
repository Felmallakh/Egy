
const GET_ALBUMS = "albums/GET_ALBUM";
const GET_ONE_ALBUM = "albums/GET_ONE_ALBUM";
const ADD_ALBUM = "album/ADD_ALBUM";
const DELETE_ALBUM = "album/DELETE_ALBUM";
const UPDATE_ALBUM = "album/UPDATE_ALBUM";

const getAlbums = (albums) => ({
  type: GET_ALBUMS,
  albums,
});

const getOne_Album = (album) => ({
  type: GET_ONE_ALBUM,
  album
})

const addAlbum = (album) => ({
  type: ADD_ALBUM,
  album,
});

const deleteAlbum = (album) => ({
  type: DELETE_ALBUM,
  album,
});

const updateAlbum = (album) => ({
  type: UPDATE_ALBUM,
  album,
});

// Get albums
export const getAlbumsThunk= (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/albums`)

    if (res.ok) {
      const albums = await res.json();
      // console.log("😣🍎😣", albums)
      dispatch(getAlbums(albums.albums));
      return albums.albums;
    }
  };

// Get One Album
export const getOneAlbum = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`);

  if (response.ok) {
    const post = await response.json();
    dispatch(getOne_Album(post));
  }
};


// Add album thunk
export const addAlbumThunk =({ userId, title, description }) => async (dispatch) => {
    const res = await fetch(`/api/albums/new`, {
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


  // Update album thunk
export const updateAlbumThunk = ({ id, title, description }) => async (dispatch) => {
    const res = await fetch(`/api/albums/${id}`, {
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
      const updatedAlbum = await res.json();
      dispatch(updateAlbum(updatedAlbum));
      return updatedAlbum;
    }
  };


  // Delete album thunk
export const deleteAlbumThunk =(albumId) =>
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
      const album = await res.json();
      dispatch(deleteAlbum(album));
      return "Deletion successful";
    }
  };



// Album Reducer
const albumReducer = (state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case GET_ALBUMS: {
      action.albums.forEach(album => {
        newState[album.id] = album})
      return newState;
    }
    case ADD_ALBUM: {
      newState[action.album.id] = action.album;
      return newState;
    }
    case UPDATE_ALBUM: {
      newState[action.album.id] = action.album;
      return newState;
    }
    case DELETE_ALBUM: {
      delete newState[action.album.id];
      return newState;
      // const states = Array.from(state)
      // return (states.filter((album) => album.album.id === action.album.id));
    }
    default:
      return state;
  }
};

export default albumReducer;
