import { PlusIcon } from '@heroicons/react/24/solid';
import GameItem from '../components/games/item.js';

const GamesPage = (params) => {
    return (
        <main className={`min-h-screen bg-main dark:text-main p-5 px-20`}>
            <div className={`flex items-center pb-3 font-mono`}>
                <h1 className={`text-5xl`}>
                    Games
                </h1>
                <PlusIcon className={`w-10 h-10 ml-4 my-auto hover:fill-green-500 transition-colors hover:cursor-pointer`}/>
            </div>
            <hr className={`border-t-2 border-gray-400 pb-3`}/>
            <div className={`grid grid-cols-6 gap-4`}>
                { params.games[0].map((game) => <GameItem key={game.id} game={game}/>) }
            </div>
        </main>
    );
}

export default GamesPage;