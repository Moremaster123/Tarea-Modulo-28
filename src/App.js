import React from 'react';
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
    return (
        <BrowserRouter>
            <AppContainer>
                <Header />

                <MainContent>
                    <SearchBar />

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <SearchResults />
                                    <Library />
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