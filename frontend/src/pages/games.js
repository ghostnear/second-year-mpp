import { AddModal, AddModalButton } from '../components/games/addModal.js';
import GameItem from '../components/games/item.js';


const GamesPage = (params) => {
    return (
        <main className={`min-h-screen bg-main dark:text-main p-5 px-20`}>
            <AddModal games={params.games} />
            <div className={`flex items-center pb-3 font-mono`}>
                <h1 className={`text-5xl`}>
                    Games
                </h1>
                <div className={`ml-auto`}></div>
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