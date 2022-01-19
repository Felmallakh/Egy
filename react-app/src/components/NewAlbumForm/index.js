import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAlbumsThunk, addAlbumThunk } from "../store/album";
import { addAlbumOff } from "../store/AddAlbumForm";
import "./newchannelform.css";

function NewAlbumForm() {
  const dispatch = useDispatch();
  const hist = useNavigate();

  const session = useSelector((state) => state.session.user);
  const showForm = useSelector((state) => state.AddAlbumFormReducer);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  // Handle submit function
  const addAlbum = async (e) => {
    e.preventDefault();
    const userId = session.id;

    await dispatch(addAlbumThunk({ userId, title, description }));
    hist(`/users/${userId}/albums`);
  };

  return (
    <>
      {showForm && (
        <div
          className="blackout"
          onClick={(e) => {
            dispatch(addAlbumOff());
          }}
        ></div>
      )}
      {showForm && (
        <form
          className="channelForm"
          onSubmit={async (e) => {
            e.preventDefault();
            if (title) {
              dispatch(addAlbumOff());
              await addAlbum();
            }
            setTitle("");
          }}
        >
          <div className="form1">
            <h2>Create Album</h2>
            <input
              className="form-field"
              type="text"
              placeholder="Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div id="channelButton">
            <p
              className="cancel"
              onClick={(e) => {
                dispatch(addAlbumOff());
                setTitle("");
              }}
            >
              Cancel
            </p>
            <button className="submit" disabled={!title}>
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default NewAlbumForm;
