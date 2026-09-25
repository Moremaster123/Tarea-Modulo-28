import React, { useState } from 'react';
import {
    SearchContainer,
    SearchForm,
    SearchInput,
    SearchButton
} from './SearchBar.styles';

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
        <SearchContainer>
            <SearchForm onSubmit={handleSubmit}>
                <SearchInput
                    type="text"
                    placeholder="Buscar artista..."
                    value={artist}
                    onChange={(event) => setArtist(event.target.value)}
                />

                <SearchButton type="submit">
                    Buscar
                </SearchButton>
            </SearchForm>
        </SearchContainer>
    );
};

export default SearchBar;