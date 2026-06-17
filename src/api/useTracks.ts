import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Track } from '../types/Track';

const API_URL = 'https://8b24415a21ef3bdc.mokky.dev/tracks'

export const useTracks = () => {
    const [tracks, setTracks] = useState<Track[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTracks = async() => {
            try {
                setLoading(true)
                const response = await axios.get<Track[]>(API_URL)
                setTracks(response.data)
            } catch (err) {
                setError('Не удалось загрузить композиции. Попробуйте позже.')
                console.error('Error fething tracks:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchTracks()
    }, [])

    return { tracks, loading, error }
}

export const getTrackById = async (id: string | undefined): Promise<Track> => {
    const response = await axios.get<Track>(`${API_URL}/${id}`);
    return response.data;
};