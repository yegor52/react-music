import styles from './Banner.module.css'

const Banner = () => {
    return(
        <>
            <div className={styles.banner}>
                <h1 className={styles.name}>Music Memory</h1>
            </div>

            <div className={styles.transition}>
                {[...Array(5)].map((_, i) => (
                    <p key={i} className={styles.transitionText}>music</p>
                ))}
            </div>
        </>
    )
}

export default Banner