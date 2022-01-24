import { useState } from "react";
import { useSelector } from "react-redux";
import "./search.css";

function Search() {
    const { search } = window.location
    const query = new URLSearchParams(search).get('')
    const albums = Object.values(useSelector((state) => state.albumReducer));

    const [searchQuery, setSearchQuery] = useState(query || '');

    const filterAlbums = (albums, query) => {
        if (!query) {
            return albums;
        }

        return albums.filter((album) => {
            const albumName = album.title.toLowerCase();
            console.log("😣😣😣", albumName)
            return albumName.includes(query.toLowerCase());
        });
    };


    const filteredAlbums = filterAlbums(albums, searchQuery)
    return (
        <>
            <input
                value={searchQuery}
                onInput={e => setSearchQuery(e.target.value)}
                // className="searchbar unselect"
                type="text"
                id="header-search"
                placeholder="Search Albums"
                name="s"
                autoComplete="off"
            />
            {searchQuery.length > 0 && <ul >
                {searchQuery.length > 0 && (filteredAlbums.map(album => {
                    return (
                        < li key={album.id} >
                            {album.title}
                        </li>
                    )
                })
                )}
            </ul>
            }
        </>
    );
}

export default Search;
