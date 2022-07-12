import { Route, Routes } from 'react-router-dom';
import { Home } from './routes/home';
import { Redirect } from './routes/redirect';
import { Delete } from './routes/delete';
import { Stats } from './routes/stats';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:shortLink" element={<Redirect />} />
                <Route path="/:shortLink/delete/:deleteCode" element={<Delete />} />
                <Route path="/:shortLink/stats" element={<Stats />} />
            </Routes>
        </div>
    );
}

export default App;
