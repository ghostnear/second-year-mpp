import { AddModal, AddModalButton } from '../components/games/addModal.js';
import GameItem from '../components/games/item.js';
import { FunnelIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

const GamesPage = (params) => {
    const navigate = useNavigate();

    const sortElements = () => {
        params.games[1](params.games[0].sort((a, b) => a.title.localeCompare(b.title)));
        navigate("/games/");
    }

    return (
        <main className={`min-h-screen bg-main dark:text-main p-5 px-20`}>
            <AddModal games={params.games} />
            <div className={`flex items-center pb-3 font-mono`}>
                <h1 className={`text-5xl`}>
                    Games
                </h1>
                <div className={`ml-auto`}></div>
                <FunnelIcon onClick={sortElements} className={`w-10 h-10 mt-auto hover:fill-blue-400 transition-colors hover:cursor-pointer`}/>
                <AddModalButton/>
            </div>
            <hr className={`border-t-2 border-gray-400 pb-3`}/>
            <div className={`grid grid-cols-6 gap-4`}>
                { params.games[0].map((game) => <GameItem key={game.id} game={game}/>) }
            </div>
        </main>
    );
}

export default GamesPage;