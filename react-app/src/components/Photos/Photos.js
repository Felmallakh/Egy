import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPhotosThunk } from "../store/photo"
import './photos.css'

function Photos() {
  const hist = useNavigate();
  const session = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albumReducer);
  const photos = useSelector((state) => state.photoReducer);
  const photo = Object.values(photos)

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPhotosThunk(session.id));
  }, [session]);


  return session ? (
    <div className="album-wrap">
        <h3>Photos for {session.username}</h3>
        <ul className="photoGrid" key={photo.id} value={photo.id}>
            {photo.map((photo) => {
              return <img className="img-grid" src={photo.photoURL}/>;

            })}
        </ul>
        
      {/* <ul className="home-photos-feed">
        {userPhotosArr.map((photo) => (
          <li
            onClick={() => {
              setFullScreen(true);
              setFullScreenPhoto(photo);
              document.body.classList.add("stop-scrolling");
            }}
            className="home-photoLi"
            key={photo.id}
          >
            <img className="home-img" src={photo.photoURL}></img>
            <div id="home-photoMask">
              <div className="mask-item">
                <div>{photo.title}</div>
              </div>
              <div className="mask-item">
                <button
                  id="albumRemove-button"
                  onClick={removeAlbum}
                  value={photo.id}
                  className="photo-albumSelect far fa-minus-square"
                ></button>
                <button
                  className="mask-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/photos/${photo.id}/edit`);
                  }}
                >
                  Edit
                </button>
                <button
                  className="mask-button"
                  value={photo.id}
                  onClick={deletePhoto}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  ) : null;
}
export default Photos;
