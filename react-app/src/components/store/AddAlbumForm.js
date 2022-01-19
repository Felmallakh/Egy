const OFF = "addAlbum/OFF";
const ON = "addAlbum/ON";

export const addAlbumOff = () => {
  return {
    type: OFF,
  };
};

export const addAlbumOn = () => {
  return {
    type: ON,
  };
};

const AddAlbumFormReducer = (state = false, action) => {
  switch (action.type) {
    case OFF:
      return false;
    case ON:
      return true;
    default:
      return false;
  }
};

export default AddAlbumFormReducer;
