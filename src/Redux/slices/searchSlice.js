import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSongs = createAsyncThunk(
    'search/fetchSongs',
    async (artist, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${encodeURIComponent(artist)}`
            );

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (!data.album) {
                return [];
            }

            return data.album.map(album => ({
                id: album.idAlbum,
                title: album.strAlbum,
                artist: album.strArtist,
                album: album.strAlbum,
                year: album.intYearReleased,
            }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
        results: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetResults: (state) => {
            state.results = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSongs.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.query = action.meta.arg;
            })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ocurrió un error al buscar canciones.';
            });
    },
});

export const { resetResults } = searchSlice.actions;
export default searchSlice.reducer;