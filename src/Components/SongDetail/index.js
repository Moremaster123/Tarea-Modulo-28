
import React from 'react';

import { useParams, Link } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';

const SongDetail = () => {

    const { id } = useParams();

    const url = `https://www.theaudiodb.com/api/v1/json/2/album.php?m=${id}`;

    const { data, loading, error } = useFetch(url);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return (
            <div>
                <p>Error al cargar la información.</p>

                <Link to="/">
                    Volver a la búsqueda
                </Link>
            </div>
        );
    }

    if (!data || !data.album || data.album.length === 0) {
        return (
            <div>
                <p>No se encontró información.</p>

                <Link to="/">
                    Volver a la búsqueda
                </Link>
            </div>
        );
    }

    const album = data.album[0];

    return (
        <section>
            <h2>{album.strAlbum}</h2>

            <p>
                Artista: {album.strArtist}
            </p>

            <p>
                Álbum: {album.strAlbum}
            </p>

            <p>
                Año: {album.intYearReleased}
            </p>

            {album.strAlbumThumb && (
                <img
                    src={album.strAlbumThumb}
                    alt={album.strAlbum}
                    width="250"
                />
            )}

            <br />

            <Link to="/">
                Volver a la búsqueda
            </Link>
        </section>
    );
};

export default SongDetail;

