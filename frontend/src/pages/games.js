import { useParams } from 'react-router-dom';

const GamesPage = () => {
    const { id } = useParams();
    return (
        <main className={`min-h-screen bg-main`}>
            <h1>Stuff {id}</h1>
        </main>
    );
}

export default GamesPage;