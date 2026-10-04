import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../Components/Header/Header';
import { renderWithProviders } from './test-utils';

describe('Header', () => {
    it('muestra el título "Biblioteca Musical"', () => {
        renderWithProviders(<Header />);

        expect(screen.getByText('Biblioteca Musical')).toBeInTheDocument();
    });

    it('muestra el enlace "Inicio" hacia la raíz', () => {
        renderWithProviders(<Header />);

        expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    });

    it('no muestra contenido adicional', () => {
        renderWithProviders(<Header />);

        expect(screen.queryByText('Mi biblioteca')).not.toBeInTheDocument();
        expect(screen.queryByText('Resultados de búsqueda')).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
});