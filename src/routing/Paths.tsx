import { Routes, Route } from 'react-router-dom'
import Music from '../pages/Music/Music'
import Details from '../pages/Details/Details'

const Paths = () => {
    return (
        <Routes>
            <Route path='/' element={<Music/>} />
            <Route path='/:id' element={<Details/>} />
        </Routes>
    )
}

export default Paths