import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import SearchResults from '../Components/SearchResults';
import { renderWithProviders, songsMock } from './test-utils';

const stateWith = (searchState) => ({
    library: [],
    search: {
        query: 'Queen',
        results: [],
        loading: false,
        error: null,
        ...searchState,
    },
});

describe('SearchResults', () => {
    afterEach(() => {
        delete global.fetch;
    });

    it('muestra el mensaje inicial cuando aún no se busca nada', () => {
        renderWithProviders(<SearchResults />);

        expect(screen.getByText('Busca un artista para ver sus álbumes.')).toBeInTheDocument();
    });

    it('muestra "Cargando..." mientras busca', () => {
        renderWithProviders(<SearchResults />, {
            preloadedState: stateWith({ loading: true }),
        });

        expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });

    it('muestra mensaje cuando no hay resultados', () => {
        renderWithProviders(<SearchResults />, {
            preloadedState: stateWith({ results: [] }),
        });

        expect(screen.getByText('No se encontraron resultados.')).toBeInTheDocument();
    });

    it('muestra el error y reintenta la búsqueda', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ album: [] }),
        });

        const { store } = renderWithProviders(<SearchResults />, {
            preloadedState: stateWith({ error: 'Error HTTP: 500' }),
        });

        expect(screen.getByText('Error HTTP: 500')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }));

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(store.getState().search.loading).toBe(false));
    });

    it('renderiza la lista de canciones con título, artista, álbum y año', () => {
        renderWithProviders(<SearchResults />, {
            preloadedState: stateWith({ results: songsMock }),
        });

        expect(screen.getByText('Resultados de búsqueda')).toBeInTheDocument();

        songsMock.forEach((song) => {
            expect(screen.getByText(song.title)).toBeInTheDocument();
            expect(screen.getByText(`Artista: ${song.artist}`)).toBeInTheDocument();
            expect(screen.getByText(`Álbum: ${song.album}`)).toBeInTheDocument();
            expect(screen.getByText(`Año: ${song.year}`)).toBeInTheDocument();
        });

        expect(screen.getAllByText('Agregar a mi biblioteca')).toHaveLength(songsMock.length);
    });

    it('cada canción tiene un enlace "Ver detalles" a su página', () => {
        renderWithProviders(<SearchResults />, {
            preloadedState: stateWith({ results: songsMock }),
        });

        const links = screen.getAllByRole('link');

        expect(links[0]).toHaveAttribute('href', '/song/1');
        expect(links[1]).toHaveAttribute('href', '/song/2');
    });

    it('"Agregar a mi biblioteca" agrega la canción al store', () => {
        const { store } = renderWithProviders(<SearchResults />, {
            preloadedState: stateWith({ results: songsMock }),
        });

        fireEvent.click(screen.getAllByText('Agregar a mi biblioteca')[0]);

        expect(store.getState().library).toEqual([songsMock[0]]);
    });
});