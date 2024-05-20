import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home';
import GamesPage from './pages/games';
import ViewGamePage from './pages/viewgame';
import NotFoundPage from './pages/not-found';
import UsersPage from './pages/users';
import ViewUserPage from './pages/viewuser';
import LoginPage from './pages/login';
import Header from './components/header';
import Footer from './components/footer';

const App = () => {
    return <>
        <Header/>
        
        <Routes>
            <Route path="/" element={ <HomePage/> } />
            <Route path="/user/:id" element={ <ViewUserPage/> } />
            <Route path="/users/" element={ <UsersPage/> } />
            <Route path="/game/:id" element={ <ViewGamePage/> } />
            <Route path="/games/" element={ <GamesPage/> } />
            <Route path="/404/" element={ <NotFoundPage/> } />
            <Route path="/login/" element={ <LoginPage/> } />
            <Route path="*" element={ <Navigate replace to="/404/" /> } />
        </Routes>

        <Footer/>
    </>;
}

export default App;