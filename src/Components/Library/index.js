import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Song from '../Song/Song';
import { removeSong } from '../../Redux/slices/librarySlice';

import {
    LibraryContainer,
    LibraryTitle
} from './Library.styles';

const Library = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.library);

    return (
        <LibraryContainer>
            <LibraryTitle>Mi biblioteca</LibraryTitle>

            {songs.map(song => (
                <div key={song.id}>
                    <Song
                        title={song.title}
                        artist={song.artist}
                        album={song.album}
                        year={song.year}
                    />
                    <button onClick={() => dispatch(removeSong(song.id))}>
                        Eliminar
                    </button>
                </div>
            ))}
        </LibraryContainer>
    );
};

export default Library;