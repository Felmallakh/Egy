import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./search.css";

function Search() {
    const hist = useNavigate()
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
                className="searchbar"
                type="text"
                id="header-search"
                placeholder="Search Albums"
                name="s"
                autoComplete="off"
            />
            {searchQuery.length > 0 && <ul id="search-ul">
                {searchQuery.length > 0 && (filteredAlbums.map(album => {
                    return (
                        < li key={album.id} onClick={e => {
                            e.preventDefault();
                            hist(`/albums/${album.id}`)
                        }} >
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
