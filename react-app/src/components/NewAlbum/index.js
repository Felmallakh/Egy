import {addAlbumOn} from "../store/AddAlbumForm";
import {useDispatch} from "react-redux";
import "./newchannel.css";
function NewAlbum() {
    const dispatch = useDispatch();
  return (
    <div className="addChannel">
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(addAlbumOn());
        }}
      >
          <div className="is"><i className="fas fa-plus"></i></div>

      </button>
    </div>
  );
}

export default NewAlbum;
