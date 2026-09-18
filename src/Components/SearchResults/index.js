import React from 'react';
import Song from '../Song/Song';
import './styles.css';

const SearchResults = ({ songs, onAddToLibrary }) => {
    return (
        <section className="search-results">
            <h2>Resultados de búsqueda</h2>

            {songs.map(song => (
                <div key={song.id}>
                    <Song
                        title={song.title}
                        artist={song.artist}
                        album={song.album}
                        duration={song.duration}
                    />

                    <button onClick={() => onAddToLibrary(song)}>
                        Agregar a mi biblioteca
                    </button>
                </div>
            ))}
        </section>
    );
};

export default SearchResults;