import { createContext } from 'react';

export default UserContext = createContext({
    users: [],
    setGames: (newList) => { users = newList; }
});