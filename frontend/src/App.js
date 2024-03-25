import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/home';
import GamesPage from './pages/games';
import ViewGamePage from './pages/viewgame';
import NotFoundPage from './pages/not-found';
import Header from './components/header';
import Footer from './components/footer';

const App = () => {
    const [games, setGames] = useState([
        { id: 1, title: "FIFA 12", description: "FIFA 12 is a game about football." },
        { id: 2, title: "Virtua Fighter 5", description: "Virtua Fighter 5 is the fifth installment in Sega's Virtua Fighter series of arcade fighting games."},
        { id: 3, title: "Half Life 2", description: "Hal Life 2 is a first-person shooter video game and the sequel to Half-Life."},
        { id: 4, title: "GTA V", description: "GTA V is an action-adventure game played from either a third-person or first-person perspective."},
        { id: 5, title: "Driver San Francisco", description: "Driver San Francisco is an action-adventure racing video game."},
        { id: 6, title: "GTA San Andreas", description: "Sweet was a busta." },
        { id: 7, title: "GTA IV", description: "GTA IV is an action-adventure game played from a third-person perspective." },
        { id: 8, title: "GTA III", description: "GTA III is an action-adventure game played from a third-person perspective." },
        { id: 9, title: "GTA Vice City", description: "GTA Vice City is an action-adventure game played from a third-person perspective." },
        { id: 10, title: "GTA London 1969", description: "GTA London 1969 is an action-adventure game played from a top-down perspective." },
        { id: 11, title: "GTA 2", description: "GTA 2 is an action-adventure game played from a top-down perspective." },
        { id: 12, title: "GTA", description: "GTA is an action-adventure game played from a top-down perspective." },
        { id: 13, title: "GTA Chinatown Wars", description: "GTA Chinatown Wars is an action-adventure game played from a top-down perspective." },
        { id: 14, title: "GTA Advance", description: "GTA Advance is an action-adventure game played from a top-down perspective." },
        { id: 15, title: "GTA Liberty City Stories", description: "GTA Liberty City Stories is an action-adventure game played from a third-person perspective." },
        { id: 16, title: "GTA Vice City Stories", description: "GTA Vice City Stories is an action-adventure game played from a third-person perspective." },
        { id: 17, title: "GTA IV The Lost and Damned", description: "GTA IV The Lost and Damned is an action-adventure game played from a third-person perspective." },
        { id: 18, title: "Unreal Tournament", description: "Unreal Tournament is a first-person shooter video game." }
    ]);

    return <>
        <Header/>
        
        <Routes>
            <Route path="/" element={ <HomePage/> } />
            <Route path="/game/:id" element={ <ViewGamePage
                games={games} setGames={setGames}
            /> } />
            <Route path="/games/" element={ <GamesPage
                games={games} setGames={setGames}
            /> } />
            <Route path="/404/" element={ <NotFoundPage/> } />
            <Route path="*" element={ <Navigate replace to="/404/" /> } />
        </Routes>

        <Footer/>
    </>;
}

export default App;