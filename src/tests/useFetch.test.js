import { renderHook, waitFor, act } from '@testing-library/react';
import useFetch from '../hooks/useFetch';

const URL_PRUEBA = 'https://api.ejemplo.com/datos';

describe('useFetch', () => {
    beforeEach(() => {
        // useFetch usa console.log y console.error, los silenciamos para no ensuciar la terminal
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
        delete global.fetch;
    });

    it('no hace la petición si no hay URL', () => {
        global.fetch = jest.fn();

        const { result } = renderHook(() => useFetch(null));

        expect(global.fetch).not.toHaveBeenCalled();
        expect(result.current.data).toBeNull();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('obtiene los datos correctamente', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ nombre: 'Queen' }),
        });

        const { result } = renderHook(() => useFetch(URL_PRUEBA));

        await waitFor(() => expect(result.current.data).toEqual({ nombre: 'Queen' }));

        expect(global.fetch).toHaveBeenCalledWith(URL_PRUEBA);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('guarda el error cuando la respuesta HTTP no es correcta', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 404,
        });

        const { result } = renderHook(() => useFetch(URL_PRUEBA));

        await waitFor(() => expect(result.current.error).not.toBeNull());

        expect(result.current.error.message).toBe('Error HTTP: 404');
        expect(result.current.data).toBeNull();
        expect(result.current.loading).toBe(false);
    });

    it('guarda el error cuando falla la red', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Sin conexión'));

        const { result } = renderHook(() => useFetch(URL_PRUEBA));

        await waitFor(() => expect(result.current.error).not.toBeNull());

        expect(result.current.error.message).toBe('Sin conexión');
        expect(result.current.loading).toBe(false);
    });

    it('retryFetch vuelve a intentar la petición', async () => {
        global.fetch = jest
            .fn()
            .mockResolvedValueOnce({ ok: false, status: 500 })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ ok: true }),
            });

        const { result } = renderHook(() => useFetch(URL_PRUEBA));

        await waitFor(() => expect(result.current.error).not.toBeNull());

        act(() => {
            result.current.retryFetch();
        });

        await waitFor(() => expect(result.current.data).toEqual({ ok: true }));

        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(result.current.error).toBeNull();
    });
});