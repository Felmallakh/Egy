import React from 'react';
import AlbumPreview from './AlbumPreview.js';
import "./albums.css"

function PhotoGrid({album}) {

    return (
        <ul className="photo-grid-list">
            {album && album?.map((album) => {
                return (
                    <AlbumPreview key={album.id} album={album} />
                )
            })}
        </ul>
    );
};

export default PhotoGrid;
