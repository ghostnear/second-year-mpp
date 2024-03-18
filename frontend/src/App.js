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
        { id: 6, title: "GTA San Andreas", description: "Sweet was a busta." }
    ]);

    return <>
        <Header/>
        
        <Routes>
            <Route path="/" element={ <HomePage/> } />
            <Route path="/game/:id" element={ <ViewGamePage games={[games, setGames]}/> } />
            <Route path="/games/" element={ <GamesPage games={[games, setGames]}/> } />
            <Route path="/404/" element={ <NotFoundPage/> } />
            <Route path="*" element={ <Navigate replace to="/404/" /> } />
        </Routes>

        <Footer/>
    </>;
}

export default App;