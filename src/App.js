import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Components/Header/Header';
import SearchBar from './Components/SearchBar';
import SearchResults from './Components/SearchResults';
import Library from './Components/Library';
import SongDetail from './Components/SongDetail';

const AppContainer = styled.div`
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px 20px;
    color: ${({ theme }) => theme.colors.text};
`;

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
            <AppContainer>
                <Header />

                <MainContent>
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
                </MainContent>
            </AppContainer>
        </BrowserRouter>
    );
}

export default App;
