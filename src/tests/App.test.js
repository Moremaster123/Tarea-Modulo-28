import React from 'react';
import { screen, fireEvent, within } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test-utils';

const albumsResponse = {
    album: [
        {
            idAlbum: '1',
            strAlbum: 'A Night at the Opera',
            strArtist: 'Queen',
            intYearReleased: '1975',
        },
        {
            idAlbum: '2',
            strAlbum: 'Jazz',
            strArtist: 'Queen',
            intYearReleased: '1978',
        },
    ],
};

const mockFetch = (body, ok = true, status = 200) => {
    global.fetch = jest.fn().mockResolvedValue({
        ok,
        status,
        json: async () => body,
    });
};

const buscar = (texto) => {
    fireEvent.change(screen.getByPlaceholderText('Buscar artista...'), {
        target: { value: texto },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));
};

// App ya incluye su propio BrowserRouter, por eso withRouter: false
const renderApp = () => renderWithProviders(<App />, { withRouter: false });

describe('App', () => {
    afterEach(() => {
        delete global.fetch;
    });

    it('renderiza Header, SearchBar, SearchResults y Library', () => {
        renderApp();

        expect(screen.getByText('Biblioteca Musical')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Buscar artista...')).toBeInTheDocument();
        expect(screen.getByText('Resultados de búsqueda')).toBeInTheDocument();
        expect(screen.getByText('Mi biblioteca')).toBeInTheDocument();
        expect(screen.getByText('No hay canciones en tu biblioteca')).toBeInTheDocument();
    });

    it('busca canciones y muestra los resultados', async () => {
        mockFetch(albumsResponse);
        renderApp();

        buscar('Queen');

        expect(await screen.findByText('A Night at the Opera')).toBeInTheDocument();
        expect(screen.getByText('Jazz')).toBeInTheDocument();
        expect(screen.getAllByText('Artista: Queen')).toHaveLength(2);
    });

    it('muestra mensaje si la búsqueda no devuelve resultados', async () => {
        mockFetch({ album: null });
        renderApp();

        buscar('xyz');

        expect(await screen.findByText('No se encontraron resultados.')).toBeInTheDocument();
    });

    it('muestra el error si la petición falla', async () => {
        mockFetch({}, false, 500);
        renderApp();

        buscar('Queen');

        expect(await screen.findByText('Error HTTP: 500')).toBeInTheDocument();
    });

    it('agrega una canción a la biblioteca y aparece en Library', async () => {
        mockFetch(albumsResponse);
        renderApp();

        buscar('Queen');
        await screen.findByText('A Night at the Opera');

        fireEvent.click(screen.getAllByText('Agregar a mi biblioteca')[0]);

        const library = screen.getByText('Mi biblioteca').parentElement;

        expect(within(library).getByText('A Night at the Opera')).toBeInTheDocument();
        expect(screen.queryByText('No hay canciones en tu biblioteca')).not.toBeInTheDocument();
    });

    it('elimina una canción de la biblioteca', async () => {
        mockFetch(albumsResponse);
        renderApp();

        buscar('Queen');
        await screen.findByText('A Night at the Opera');

        fireEvent.click(screen.getAllByText('Agregar a mi biblioteca')[0]);
        fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));

        expect(screen.getByText('No hay canciones en tu biblioteca')).toBeInTheDocument();
    });
});