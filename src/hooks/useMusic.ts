import { useMemo, useState } from "react"
import { useTracks } from "../api/useTracks"
import type { Track } from "../types/Track"

interface Filters {
    genre: string
    decade: string
}

const getDecadeFromYear = (year: number): string => {
    if (year >= 1960 && year < 1970) return '60s'
    if (year >= 1970 && year < 1980) return '70s'
    if (year >= 1980 && year < 1990) return '80s'
    if (year >= 1990 && year < 2000) return '90s'
    if (year >= 2000 && year < 2010) return '2000s'
    if (year >= 2010 && year < 2020) return '2010s'
    if (year >= 2020) return '2020s'
    return ''
}

const useMusic = () => {
    const { tracks, loading, error } = useTracks()

    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState<Filters>({genre: '', decade: ''})

    const availableGenres = useMemo(() => {
        const genres = new Set(tracks.map((t) => t.genre))
        return Array.from(genres).sort()
    }, [tracks])

    const filteredTracks = useMemo(() => {
        return tracks.filter((track: Track) => {
            const q = searchQuery.toLowerCase()
            const matchesSearch = !q ||
                track.name.toLowerCase().includes(q) ||
                track.author.toLowerCase().includes(q)
            const matchesGenre = !filters.genre || track.genre === filters.genre
            const matchesDecade = 
                !filters.decade || getDecadeFromYear(track.year) === filters.decade
            return matchesSearch && matchesGenre && matchesDecade
        })
    }, [tracks, searchQuery, filters])

    const handleFilterChange = (key: keyof Filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const handleResetFilters = () => {
        setFilters({ genre: '', decade: '' })
    }

    return {
        filteredTracks,
        availableGenres,
        loading,
        error,
        searchQuery,
        onSearchChange: setSearchQuery,
        filters,
        onFilterChange: handleFilterChange,
        onResetFilters: handleResetFilters,
    }
}

export default useMusic