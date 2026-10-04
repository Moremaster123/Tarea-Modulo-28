import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';

import * as ThemeModule from '../styles/Theme';
import libraryReducer from '../Redux/slices/librarySlice';
import searchReducer from '../Redux/slices/searchSlice';

const theme = ThemeModule.default || ThemeModule.theme || ThemeModule.Theme;

export const songsMock = [
    {
        id: '1',
        title: 'A Night at the Opera',
        artist: 'Queen',
        album: 'A Night at the Opera',
        year: '1975',
    },
    {
        id: '2',
        title: 'Help!',
        artist: 'The Beatles',
        album: 'Help!',
        year: '1965',
    },
];

export function renderWithProviders(
    ui,
    { preloadedState, withRouter = true } = {}
) {
    const store = configureStore({
        reducer: { library: libraryReducer, search: searchReducer },
        preloadedState,
    });

    const content = withRouter ? <MemoryRouter>{ui}</MemoryRouter> : ui;

    const utils = render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>{content}</ThemeProvider>
        </Provider>
    );

    return { store, ...utils };
}