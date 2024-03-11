import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import MangaPage from './pages/manga';
import NotFoundPage from './pages/not-found';
import Header from './components/header';
import Footer from './components/footer';

const App = () => {
    return <>
        <Header/>
        
        <Routes>
            <Route path="/" element={ <HomePage/> } />
            <Route path="/manga/:id" element={ <MangaPage/> } />
            <Route path="*" element={ <NotFoundPage/> } />
        </Routes>

        <Footer/>
    </>;
}

export default App;