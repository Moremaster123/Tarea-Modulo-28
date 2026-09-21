import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [artist, setArtist] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (artist.trim() === '') {
            return;
        }

        onSearch(artist.trim());
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Buscar artista..."
                value={artist}
                onChange={(event) => setArtist(event.target.value)}
            />

            <button type="submit">
                Buscar
            </button>
        </form>
    );
};

export default SearchBar;