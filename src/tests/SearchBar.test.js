import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../Components/SearchBar';
import { renderWithProviders } from './test-utils';

describe('SearchBar', () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ album: [] }),
        });
    });

    afterEach(() => {
        delete global.fetch;
    });

    it('renderiza el input y el botón Buscar', () => {
        renderWithProviders(<SearchBar />);

        expect(screen.getByPlaceholderText('Buscar artista...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
    });

    it('permite escribir en el input', () => {
        renderWithProviders(<SearchBar />);

        const input = screen.getByPlaceholderText('Buscar artista...');
        fireEvent.change(input, { target: { value: 'Queen' } });

        expect(input).toHaveValue('Queen');
    });

    it('ejecuta la búsqueda al hacer clic en "Buscar"', async () => {
        const { store } = renderWithProviders(<SearchBar />);

        fireEvent.change(screen.getByPlaceholderText('Buscar artista...'), {
            target: { value: 'Queen' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('s=Queen'));

        await waitFor(() => expect(store.getState().search.loading).toBe(false));
    });

    it('ejecuta la búsqueda al presionar Enter (enviar el formulario)', async () => {
        const { store } = renderWithProviders(<SearchBar />);

        const input = screen.getByPlaceholderText('Buscar artista...');
        fireEvent.change(input, { target: { value: 'Beatles' } });
        fireEvent.submit(input.closest('form'));

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('s=Beatles'));

        await waitFor(() => expect(store.getState().search.loading).toBe(false));
    });

    it('quita los espacios al inicio y al final del texto buscado', async () => {
        const { store } = renderWithProviders(<SearchBar />);

        fireEvent.change(screen.getByPlaceholderText('Buscar artista...'), {
            target: { value: '  Queen  ' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

        await waitFor(() => expect(store.getState().search.query).toBe('Queen'));
        await waitFor(() => expect(store.getState().search.loading).toBe(false));
    });

    it('no busca si el input está vacío', () => {
        renderWithProviders(<SearchBar />);

        fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

        expect(global.fetch).not.toHaveBeenCalled();
    });
});