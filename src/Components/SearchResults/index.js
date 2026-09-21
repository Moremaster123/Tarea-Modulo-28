import React from 'react';

import { Link } from 'react-router-dom';

import Song from '../Song/Song';

import useFetch from '../../hooks/useFetch';

import './styles.css';

const SearchResults = ({ artist, onAddToLibrary }) => {

    const url = artist
    ? `https://www.theaudiodb.com/api/v1/json/2/searchalbum.php?s=${encodeURIComponent(artist)}`
    : '';

    const { data, loading, error, retryFetch } = useFetch(url);

    if (!artist) {
        return (
            <section className="search-results">
                <h2>Resultados de búsqueda</h2>
                <p>Busca un artista para ver sus álbumes.</p>
            </section>
        );
    }

    if (loading) {
        return (
            <section className="search-results">
                <h2>Resultados de búsqueda</h2>
                <p>Cargando...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="search-results">
                <h2>Resultados de búsqueda</h2>
                <p>
                    Ocurrió un error al cargar los resultados.
                </p>
                <button onClick={retryFetch}>
                    Reintentar
                </button>
            </section>
        );
    }

    if (!data || !data.album || data.album.length === 0) {
        return (
            <section className="search-results">
                <h2>Resultados de búsqueda</h2>
                <p>No se encontraron resultados.</p>
            </section>
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
        <section className="search-results">
            <h2>Resultados de búsqueda</h2>

            {songs.map(song => (
                <div key={song.id}>
                    <Song
                        title={song.title}
                        artist={song.artist}
                        album={song.album}
                        year={song.year}
                    />

                    <Link to={`/song/${song.id}`}>
                        <button>
                            Ver detalles
                        </button>
                    </Link>

                    {onAddToLibrary && (
                        <button onClick={() => onAddToLibrary(song)}>
                            Agregar a mi biblioteca
                        </button>
                    )}
                </div>
            ))}
        </section>
    );
};

export default SearchResults;

