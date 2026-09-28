import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import Song from '../Song/Song';

import useFetch from '../../hooks/useFetch';
import { addSong } from '../../Redux/libraryActions';

import {
    SearchResultsContainer,
    Title,
    Message,
    ResultItem,
    DetailsButton,
    LibraryButton
} from './SearchResults.styles';

const SearchResults = ({ artist }) => {
    const dispatch = useDispatch();

    const url = artist
        ? `https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${encodeURIComponent(artist)}`
        : '';

    const { data, loading, error, retryFetch } = useFetch(url);

    if (!artist) {
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
                <Message>
                    Ocurrió un error al cargar los resultados.
                </Message>
                <button onClick={retryFetch}>
                    Reintentar
                </button>
            </SearchResultsContainer>
        );
    }

    if (!data || !data.album || data.album.length === 0) {
        return (
            <SearchResultsContainer>
                <Title>Resultados de búsqueda</Title>
                <Message>No se encontraron resultados.</Message>
            </SearchResultsContainer>
        );
    }

    const songs = data.album.map(album => ({
        id: album.idAlbum,
        title: album.strAlbum,
        artist: album.strArtist,
        album: album.strAlbum,
        year: album.intYearReleased
    }));

    return (
        <SearchResultsContainer>
            <Title>Resultados de búsqueda</Title>

            {songs.map(song => (
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