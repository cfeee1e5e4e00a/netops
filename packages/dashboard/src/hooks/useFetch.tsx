import { useEffect, useState } from 'preact/hooks';
import ky from 'ky';

export const useFetch = <T,>(path: string) => {
    const [data, setData] = useState<T>();

    useEffect(() => {
        const fetch = async () => {
            const { hostname } = new URL(document.URL);
            const url = `http://${hostname}:3001${path}`;
            setData(await ky.get(url).json());
        };

        fetch();
    }, []);

    return data;
};
