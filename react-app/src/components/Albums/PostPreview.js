import React from 'react';
import { NavLink } from 'react-router-dom';
import "./albums.css"

const PostDetail = ({ album }) => {

    return (
      <div className="posts-container">
        {/* <li className="posts-preview-item-div"> */}
        <NavLink className="link" exact to={`/albums/${album.id}`}>
          <img
            className="posts-preview-image"
            src="https://cdn.discordapp.com/attachments/919391399269515305/933267234263007262/King-Tut-removebg-preview.png"
            alt="post preview"
            />
            <h2 className="album-title">{album.title}</h2>
        </NavLink>
        {/* </li> */}
      </div>
    );
};

export default PostDetail;
