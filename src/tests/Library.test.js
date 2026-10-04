import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Library from '../Components/Library';
import { renderWithProviders, songsMock } from './test-utils';

describe('Library', () => {
    it('muestra el título de la biblioteca', () => {
        renderWithProviders(<Library />);

        expect(screen.getByText('Mi biblioteca')).toBeInTheDocument();
    });

    it('muestra las canciones agregadas', () => {
        renderWithProviders(<Library />, {
            preloadedState: { library: songsMock },
        });

        songsMock.forEach((song) => {
            expect(screen.getByText(song.title)).toBeInTheDocument();
            expect(screen.getByText(`Artista: ${song.artist}`)).toBeInTheDocument();
        });

        expect(screen.queryByText('No hay canciones en tu biblioteca')).not.toBeInTheDocument();
    });

    it('cada canción tiene un botón "Eliminar"', () => {
        renderWithProviders(<Library />, {
            preloadedState: { library: songsMock },
        });

        expect(screen.getAllByRole('button', { name: 'Eliminar' })).toHaveLength(songsMock.length);
    });

    it('"Eliminar" quita la canción de la biblioteca', () => {
        const { store } = renderWithProviders(<Library />, {
            preloadedState: { library: songsMock },
        });

        fireEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);

        expect(store.getState().library).toEqual([songsMock[1]]);
        expect(screen.queryByText('A Night at the Opera')).not.toBeInTheDocument();
        expect(screen.getByText('Help!')).toBeInTheDocument();
    });

    it('muestra un mensaje cuando la biblioteca está vacía', () => {
        renderWithProviders(<Library />, {
            preloadedState: { library: [] },
        });

        expect(screen.getByText('No hay canciones en tu biblioteca')).toBeInTheDocument();
    });
});