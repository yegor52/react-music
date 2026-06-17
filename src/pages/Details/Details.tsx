import { useNavigate, useParams } from 'react-router-dom';
import trackImageCover from '../../assets/cover.jpg';
import styles from'./Details.module.css'
import { useEffect, useState } from 'react';
import type { Track } from '../../types/Track';
import { getTrackById } from '../../api/useTracks';

const Details = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [track, setTrack] = useState<Track | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                setLoading(true)
                const data = await getTrackById(id)
                setTrack(data)
            } catch {
                setError('Failed to load track.')
            } finally {
                setLoading(false)
            }
        }
 
        fetchTrack()
    }, [id])

    if (loading) return <div className={styles.contentDetailBlock}>Loading...</div>
    if (error || !track) return <div className={styles.contentDetailBlock}>{error ?? 'Track not found.'}</div>
 
    return (
        <div className={styles.contentDetailBlock}>
            <div className={styles.buttonBack}>
                <button className={styles.back} onClick={() => navigate('/')}>Back</button>
            </div>
            <div className={styles.cardTrack}>
                <div className={styles.coverTrack}>
                    <img src={trackImageCover} alt="Cover" className={styles.imgTrack} />
                </div>
                <div className={styles.infoTrack}>
                    <h3 className={styles.nameTrack}>{track.name}</h3>
                    <ul className={styles.info}>
                        <li className={styles.item}>{track.author}</li>
                        <li className={styles.item}>{track.genre}</li>
                        <li className={styles.item}>Album: {track.album}</li>
                        <li className={styles.item}>{track.year}</li>
                        <li className={styles.item}>Auditions: {track.auditions.toLocaleString()}</li>
                        <li className={styles.item}>"{track.description}"</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Details