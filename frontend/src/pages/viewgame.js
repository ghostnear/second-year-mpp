import { useParams, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

const GamePage = (params) => {
    const { id } = useParams();

    console.table(params.games[0]);

    // If there is no game with that ID, go to 404.
    const game = params.games[0].find(game => game.id === parseInt(id));
    if(!game)
        return <Navigate replace to="/404/" />

    return (
        <main className={`min-h-screen bg-main dark:text-main p-5 px-20`}>
            <div className={`flex items-center pb-3 font-mono`}>
                <h1 className={`text-3xl`}>
                    {game.title}
                </h1>
                <Link to="/games/" className={`ml-auto w-7 h-7`}>
                    <ArrowUturnLeftIcon className={`hover:fill-blue-500 transition-colors hover:cursor-pointer`}/>
                </Link>
            </div>
            <hr className={`border-t-2 border-gray-400 pb-3`}/>
            <div className={`bg-secondary p-4 rounded-lg shadow-lg`}>
                <h2 className={`text-2xl mb-2 underline`}> Description: </h2>
                <p>
                    {game.description}
                </p>
            </div>
        </main>
    );
}

export default GamePage;