import { AddModal, AddModalButton } from '../components/games/addModal.js';
import GameItem from '../components/games/item.js';
import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import PageSelector from '../components/pageSelector.js';
import PerPageCountSelector from '../components/perPageCountSelector.js';

const GamesPage = (params) => {
    const navigate = useNavigate();
    
    const [gamePage, setGamePage] = useState(0);
    const [gamesPerPage, setGamesPerPage] = useState(6);
    

    const sortElements = () => {
        params.setGames(params.games.sort((a, b) => a.title.localeCompare(b.title)));
        navigate("/games/");
    }

    return (
        <main className={`min-h-screen bg-main dark:text-main`}>
            <div className={`w-full h-full bg-main p-5 px-20`}>
                <AddModal games={params.games} />
                <div className={`flex items-center pb-3 font-mono`}>
                    <h1 className={`text-5xl`}>
                        Games
                    </h1>
                    <PerPageCountSelector className={`ml-4`}
                        multiple={6} size={params.games.length}
                        offet={gamePage} setOffset={setGamePage}
                        perPage={gamesPerPage} setPerPage={setGamesPerPage}
                    />
                    
                    <div className={`ml-auto`}></div>
                    <FunnelIcon onClick={sortElements} className={`w-10 h-10 mt-auto hover:fill-blue-400 transition-colors hover:cursor-pointer`}/>
                    <AddModalButton/>
                </div>
                <hr className={`border-t-2 border-gray-400 pb-3`}/>
                <div className={`grid grid-cols-6 gap-4`}>
                    {
                        params.games.slice(
                            gamePage * gamesPerPage,
                            gamePage * gamesPerPage + gamesPerPage
                        ).map((game) => <GameItem key={game.id} game={game}/>)
                    }
                </div>  
                {params.games.length > gamesPerPage &&
                    <PageSelector offset={gamePage} setOffset={setGamePage} size={
                        Math.floor(params.games.length / gamesPerPage) + (params.games.length % gamesPerPage != 0)
                    }/>
                }
            </div>
        </main>
    );
}

export default GamesPage;