import React from 'react';
import PostPreview from './PostPreview.js';
import "./albums.css"

function PhotoGrid({album}) {

    return (
        <ul className="photo-grid-list">
            {album && album?.map((album) => {
                return (
                    <PostPreview key={album.id} album={album} />
                )
            })}
        </ul>
    );
};

export default PhotoGrid;
