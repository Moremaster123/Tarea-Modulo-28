import { useEffect, useState } from 'react';

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {

        if (!url) {
            return;
        }

        try {

            setLoading(true);
            setError(null);

            const response = await fetch(url);

            console.log('URL consultada:', url);
            console.log('Respuesta:', response);

            if (!response.ok) {
                throw new Error(
                    `Error HTTP: ${response.status}`
                );
            }

            const result = await response.json();

            console.log('Datos recibidos:', result);

            setData(result);

        } catch (error) {

            console.error('Error en useFetch:', error);

            setError(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        if (url) {
            fetchData();
        }

    // fetchData se ejecuta cada vez que cambia la URL
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    const retryFetch = () => {
        fetchData();
    };

    return {
        data,
        loading,
        error,
        retryFetch
    };
};

export default useFetch;