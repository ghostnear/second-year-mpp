import { createContext } from 'react';

export default GameContext = createContext({
    games: [],
    setGames: (newList) => { games = newList; }
});