import { useParams } from 'react-router-dom';

const GamePage = () => {
    const { id } = useParams();
    return (
        <main className={`min-h-screen bg-main`}>
            <h1>Stuff {id}</h1>
        </main>
    );
}

export default GamePage;