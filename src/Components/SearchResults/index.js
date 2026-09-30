import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Song from '../Song/Song';
import { addSong } from '../../Redux/slices/librarySlice';
import { fetchSongs } from '../../Redux/slices/searchSlice';

import {
    SearchResultsContainer,
    Title,
    Message,
    ResultItem,
    DetailsButton,
    LibraryButton
} from './SearchResults.styles';

const SearchResults = () => {
    const dispatch = useDispatch();
    const { results, loading, error, query } = useSelector(state => state.search);

    if (!query) {
        return (
            <SearchResultsContainer>
                <Title>Resultados de búsqueda</Title>
                <Message>Busca un artista para ver sus álbumes.</Message>
            </SearchResultsContainer>
        );
    }

    if (loading) {
        return (
            <SearchResultsContainer>
                <Title>Resultados de búsqueda</Title>
                <Message>Cargando...</Message>
            </SearchResultsContainer>
        );
    }

    if (error) {
        return (
            <SearchResultsContainer>
                <Title>Resultados de búsqueda</Title>
                <Message>{error}</Message>
                <button onClick={() => dispatch(fetchSongs(query))}>
                    Reintentar
                </button>
            </SearchResultsContainer>
        );
    }

    if (results.length === 0) {
        return (
            <SearchResultsContainer>
                <Title>Resultados de búsqueda</Title>
                <Message>No se encontraron resultados.</Message>
            </SearchResultsContainer>
        );
    }

    return (
        <SearchResultsContainer>
            <Title>Resultados de búsqueda</Title>

            {results.map(song => (
                <ResultItem key={song.id}>
                    <Song
                        title={song.title}
                        artist={song.artist}
                        album={song.album}
                        year={song.year}
                    />

                    <Link to={`/song/${song.id}`}>
                        <DetailsButton>
                            Ver detalles
                        </DetailsButton>
                    </Link>

                    <LibraryButton
                        $added={false}
                        onClick={() => dispatch(addSong(song))}
                    >
                        Agregar a mi biblioteca
                    </LibraryButton>
                </ResultItem>
            ))}
        </SearchResultsContainer>
    );
};

export default SearchResults;