import { useNavigate } from 'react-router-dom';
import trackImage from '../../assets/track.jpg';
import type { Track } from '../../types/Track';
import styles from './Card.module.css';

interface CardProps {
    track: Track
}

const Card = ({track}: CardProps) => {
    const navigate = useNavigate()

    const handleDetailsClick = () => {
        navigate(`/${track.id}`)
    }
    return(
        <>
            <div className={styles.card}>
                <img src={trackImage} alt="Обложка" />
                <div className={styles.song}>
                    <h3 className={styles.songName}>{track.name}</h3>
                    <p className={styles.author}>{track.author}</p>
                </div>
                <p className={styles.genre}>{track.genre}</p>
                <button className={styles.details} onClick={handleDetailsClick}>Details</button>
            </div>
        </>
    )
}

export default Card