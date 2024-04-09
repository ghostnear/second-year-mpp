import { AddModal, AddModalButton } from '../components/games/addModal.js';
import GameItem from '../components/games/item.js';
import { useState, useEffect } from 'react';
import { FunnelIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
import PageSelector from '../components/pageSelector.js';
import PerPageCountSelector from '../components/perPageCountSelector.js';
import GameContext from '../contexts/gameContext.js';
import axios from 'axios';
import { MAXIMUM_GAMES_PER_PAGE, MINIMUM_GAMES_PER_PAGE } from '../constants/gamesPerPage.js';

const GamesPage = (params) => {
    const navigate = useNavigate();
    
    const [gamePage, setGamePage] = useState(0);
    const [gamesPerPage, setGamesPerPage] = useState(MINIMUM_GAMES_PER_PAGE);

    const [ games, setGames ] = useState([]);
    
    const sortElements = () => {
        // TODO: sort in the API instead of here.
        setGames(games.sort((a, b) => a.title.localeCompare(b.title)));
        navigate("/games/");
    }

    const getYearMap = () => {
        // TODO: link to API instead of using current page.
        let yearMap = new Map();
        games.forEach((game) => {
            if (yearMap.has(game.release_year)) {
                yearMap.set(game.release_year, yearMap.get(game.release_year) + 1);
            } else {
                yearMap.set(game.release_year, 1);
            }
        });
        return new Map([...yearMap.entries()].sort());
    }
    
    const yearMap = getYearMap();

    // Use this to load data after creating the page.
    useEffect(() => {
        async function fetchData() {
          await axios.get(`http://localhost:5000/games/?pageOffset=${gamePage * gamesPerPage}&pageSize=${gamesPerPage}`).then((response) => {
            return response.data;
          }).then((data) => {
            setGames(data);
          });
        }
        fetchData();
      }, [gamePage, gamesPerPage] // Things to listen for.
    );

    return (
        <GameContext.Provider value={{games, setGames}}>
            <main className={`min-h-screen bg-main dark:text-main`}>
                <div className={`w-full h-full bg-main p-5 px-20`}>
                    <AddModal games={games} setGames={setGames} />
                    <div className={`flex items-center pb-3 font-mono`}>
                        <h1 className={`text-5xl`}>
                            Games
                        </h1>
                        <PerPageCountSelector className={`ml-4`}
                            multiple={6} setOffset={setGamePage}
                            max={MAXIMUM_GAMES_PER_PAGE} min={MINIMUM_GAMES_PER_PAGE}
                            perPage={gamesPerPage} setPerPage={setGamesPerPage}
                        />
                        
                        <div className={`ml-auto`}></div>
                        <FunnelIcon onClick={sortElements} className={`w-10 h-10 mt-auto hover:fill-blue-400 transition-colors hover:cursor-pointer`}/>
                        <AddModalButton/>
                    </div>
                    <hr className={`border-t-2 border-gray-400 pb-3`}/>
                    <div className={`grid grid-cols-6 gap-4`}>
                        {
                            games.map((game) => <GameItem key={game.id} game={game}/>)
                        }
                    </div>  
                    {MAXIMUM_GAMES_PER_PAGE > gamesPerPage && /* TODO: replace this with actual db size calculated later */
                        <PageSelector offset={gamePage} setOffset={setGamePage} size={3 /* TODO: calculate this from response next time. */}/>
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
        </GameContext.Provider>
    );
}

export default GamesPage;