import { useState, useRef, useEffect } from 'react';
import searchIcon from '../../assets/Search.svg';
import styles from './CompositionsHeader.module.css';

interface Filters {
    genre: string;
    decade: string;
}

interface CompositionsHeaderProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    filters: Filters;
    onFilterChange: (key: keyof Filters, value: string) => void;
    onResetFilters: () => void;
    availableGenres: string[];
}

const DECADES = ['60s', '70s', '80s', '90s', '2000s', '2010s', '2020s'];

const CompositionsHeader = ({
    searchQuery,
    onSearchChange,
    filters,
    onFilterChange,
    onResetFilters,
    availableGenres,
}: CompositionsHeaderProps) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [searchOpen]);

    const handleSearchToggle = () => {
        setSearchOpen((prev) => !prev);
        if (filterOpen) setFilterOpen(false);
    };

    const handleFilterToggle = () => {
        setFilterOpen((prev) => !prev);
        if (searchOpen) setSearchOpen(false);
    };

    const hasActiveFilters = filters.genre !== '' || filters.decade !== '';

    return (
        <>
            <div className={styles.header}>
                <h2 className={styles.compositionsName}>Compositions</h2>
                <div className={styles.compositionButtons}>
                    <button className={styles.filter} onClick={handleFilterToggle}>
                        filter
                    </button>
                    <button className={styles.search} onClick={handleSearchToggle}>
                        <img src={searchIcon} alt="search" />
                    </button>
                </div>
            </div>

            <div className={`${styles.searchBar} ${searchOpen ? styles.visible : ''}`}>
                <input
                    ref={inputRef}
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search by title or artist..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchQuery && (
                    <button className={styles.clearBtn} onClick={() => onSearchChange('')}>
                        ×
                    </button>
                )}
            </div>

            <div className={`${styles.filterPanel} ${filterOpen ? styles.visible : ''}`}>
                <div className={styles.filterGroups}>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterGroupLabel}>Genre</span>
                        <div className={styles.filterChips}>
                            {availableGenres.map((genre) => (
                                <button
                                    key={genre}
                                    className={`${styles.chip} ${filters.genre === genre ? styles.chipActive : ''}`}
                                    onClick={() => onFilterChange('genre', filters.genre === genre ? '' : genre)}
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <span className={styles.filterGroupLabel}>Decade</span>
                        <div className={styles.filterChips}>
                            {DECADES.map((decade) => (
                                <button
                                    key={decade}
                                    className={`${styles.chip} ${filters.decade === decade ? styles.chipActive : ''}`}
                                    onClick={() => onFilterChange('decade', filters.decade === decade ? '' : decade)}
                                >
                                    {decade}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {hasActiveFilters && (
                    <div className={styles.filterActions}>
                        <button className={styles.resetBtn} onClick={onResetFilters}>
                            Reset filters
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CompositionsHeader;