import React from 'react';
import { NavLink } from 'react-router-dom';
import "./albums.css"

const AlbumDetail = ({ album }) => {

    return (
      <div className="album-container">
        <NavLink className="link" exact to={`/albums/${album.id}`}>
          <img
            className="album-preview-image"
            src="https://cdn.discordapp.com/attachments/919391399269515305/933267234263007262/King-Tut-removebg-preview.png"
            alt="post preview"
            />
            <h2 className="album-title">{album.title}</h2>
        </NavLink>
      </div>
    );
};

export default AlbumDetail;
