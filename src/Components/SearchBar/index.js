import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSongs } from '../../Redux/slices/searchSlice';
import {
    SearchContainer,
    SearchForm,
    SearchInput,
    SearchButton
} from './SearchBar.styles';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [artist, setArtist] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (artist.trim() === '') {
            return;
        }

        dispatch(fetchSongs(artist.trim()));
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