import styles from './Music.module.css'
import Banner from '../../components/Banner/Banner';
import CompositionsHeader from '../../components/CompositionsHeader/CompositionsHeader';
import Card from '../../components/Card/Card';
import useMusic from '../../hooks/useMusic'

const Music = () => {
    const {
        filteredTracks,
        availableGenres,
        loading,
        error,
        searchQuery,
        onSearchChange,
        filters,
        onFilterChange,
        onResetFilters,
    } = useMusic()

    return(
        <>
            <Banner/>
            <CompositionsHeader
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                availableGenres={availableGenres}
                filters={filters}
                onFilterChange={onFilterChange}
                onResetFilters={onResetFilters}
            />
            
            {loading && (
                <div className={styles.musicLoading}>
                    <div className={styles.musicSpinner}/>
                    <p className={styles.musicLoadingText}>Loading...</p>
                </div>
            )}

            {error && !loading && (
                <div className={styles.musicError}>{error}</div>
            )}

            {!loading && !error && (
                <div className={styles.musicList}>
                    {filteredTracks.length > 0 ? (
                        filteredTracks.map((track) => (
                            <Card key={track.id} track={track} />
                        ))
                    ) : (
                        <div className={styles.musicEmpty}>
                            <p className={styles.musicEmpty}>Not found</p>
                            <p className={styles.musicEmptySubtitle}>Try changing your query or resetting filters</p>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Music 