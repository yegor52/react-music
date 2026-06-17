import { Routes, Route } from 'react-router-dom'
import Music from '../pages/Music/Music'
import Details from '../pages/Details/Details'

const Paths = () => {
    return (
        <Routes>
            <Route path='/react-music' element={<Music/>} />
            <Route path='/react-music/:id' element={<Details/>} />
        </Routes>
    )
}

export default Paths