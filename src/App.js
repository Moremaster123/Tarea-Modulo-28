
import React, { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Components/Header/Header';

import SearchBar from './Components/SearchBar';

import SearchResults from './Components/SearchResults';

import Library from './Components/Library';

import SongDetail from './Components/SongDetail';

import './App.css';

function App() {

    const [artist, setArtist] = useState('');

    const [librarySongs, setLibrarySongs] = useState([]);

    const handleSearch = (searchArtist) => {
        setArtist(searchArtist);
    };

    const handleAddToLibrary = (song) => {
        setLibrarySongs((currentSongs) => {

            const alreadyExists = currentSongs.some(
                currentSong => currentSong.id === song.id
            );

            if (alreadyExists) {
                return currentSongs;
            }

            return [...currentSongs, song];
        });
    };

    return (
        <BrowserRouter>

            <Header />

            <SearchBar onSearch={handleSearch} />

            <Routes>

                <Route
                    path="/"
                    element={
                        <>
                            <SearchResults
                                artist={artist}
                                onAddToLibrary={handleAddToLibrary}
                            />

                            <Library songs={librarySongs} />
                        </>
                    }
                />

                <Route
                    path="/song/:id"
                    element={<SongDetail />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
