import React from 'react';
import './styles.css';

const Song = ({ title, artist, album, duration }) => {
    return (
        <article className="song">
            <h3>{title}</h3>
            <p>Artista: {artist}</p>
            <p>Álbum: {album}</p>
            <p>Duración: {duration}</p>
        </article>
    );
};

export default Song;