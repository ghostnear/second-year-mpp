import { AddModal, AddModalButton } from '../components/games/addModal.js';
import GameItem from '../components/games/item.js';
import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
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

    const getYearMap = () => {
        let yearMap = new Map();
        params.games.forEach((game) => {
            if (yearMap.has(game.releaseYear)) {
                yearMap.set(game.releaseYear, yearMap.get(game.releaseYear) + 1);
            } else {
                yearMap.set(game.releaseYear, 1);
            }
        });
        return new Map([...yearMap.entries()].sort());
    }

    const yearMap = getYearMap();

    return (
        <main className={`min-h-screen bg-main dark:text-main`}>
            <div className={`w-full h-full bg-main p-5 px-20`}>
                <AddModal games={params.games} setGames={params.setGames} />
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
            <Chart series={[{name: "Games released this year", data: Array.from(yearMap.values()) }]}
                options={{
                    chart: {
                        id: "basic-bar",
                        background: 'transparent'
                    },
                    xaxis: {
                        title: {
                            text: 'Year of release'
                        },
                        categories: Array.from(yearMap.keys())
                    },
                    yaxis: {
                        title: {
                            text: 'Games released'
                        },
                        min: 0
                    },
                    theme: {
                        mode: 'dark'
                    }
                }}
                type="line" className={`w-1/2 mx-auto mb-2 rounded-lg shadow-lg bg-secondary`}
            />
            <div className={`pb-10`}/> {/* Library's bugged idk why. */}
        </main>
    );
}

export default GamesPage;