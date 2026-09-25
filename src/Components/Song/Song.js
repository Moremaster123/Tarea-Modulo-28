import React from 'react';

import {
    SongContainer,
    SongTitle,
    SongInfo
} from './Song.styles';

const Song = ({ title, artist, album, year }) => {

    return (
        <SongContainer>
            <SongTitle>{title}</SongTitle>
            <SongInfo>Artista: {artist}</SongInfo>
            <SongInfo>Álbum: {album}</SongInfo>
            <SongInfo>Año: {year}</SongInfo>
        </SongContainer>
    );
};

export default Song;