
import React from 'react';

import Song from '../Song/Song';

import {
    LibraryContainer,
    LibraryTitle
} from './Library.styles';

const Library = ({ songs }) => {

    return (
        <LibraryContainer>
            <LibraryTitle>Mi biblioteca</LibraryTitle>

            {songs.map(song => (
                <Song
                    key={song.id}
                    title={song.title}
                    artist={song.artist}
                    album={song.album}
                    year={song.year}
                />
            ))}
        </LibraryContainer>
    );
};

export default Library;