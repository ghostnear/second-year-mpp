import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { DeleteModal, DeleteModalButton } from '../components/game/deleteModal';
import { EditModal, EditModalButton } from '../components/game/editModal';

const GamePage = (params) => {
    const { id } = useParams();

    // If there is no game with that ID, go to 404.
    const game = params.games.find(game => game.id === parseInt(id));
    if(!game)
        return <Navigate replace to="/404/" />

    // Page events are defined here.
    const navigate = useNavigate();
    const onDelete = () => {
        params.setGames(params.games.filter(g => g.id !== game.id));
        navigate("/games/");
    }

    return (
        <main className={`min-h-screen bg-main dark:text-main p-5 px-20`}>
            <DeleteModal onConfirm={onDelete}/>
            <EditModal games={params.games} id={id}/>
            <div className={`flex items-center pb-3 font-mono`}>
                <h1 className={`text-3xl`}>
                    {game.title}
                </h1>
                <div className={`ml-auto`}></div>
                <DeleteModalButton/>
                <EditModalButton/>
                <Link to="/games/" className={`w-7 h-7`}>
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
            <div className={`bg-secondary p-4 rounded-lg shadow-lg mt-4`}>
                <h2 className={`text-2xl mb-2`}> Release Year: {game.releaseYear} </h2>
            </div>
        </main>
    );
}

export default GamePage;