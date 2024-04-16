import { useContext } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import GameContext from '../contexts/gameContext.js';
import { MAXIMUM_GAMES_PER_PAGE } from '../constants/gamesPerPage.js';

const PageSelector = (params) => {
    const {games, setGames} = useContext(GameContext);

    return <div className={`w-full bg-secondary my-4 flex`}>
        <div className={`mx-auto flex p-1 shadow-md`}>
            {params.offset > 0 && 
                <ChevronLeftIcon className={`w-5 h-5 my-auto dark:hover:fill-blue-400 cursor-pointer`} onClick={() => params.setOffset(params.offset - 1)}/>
            }
            {
                Array.from(Array(params.size).keys()).map((i) => {
                    return <div key={i} onClick={() => params.setOffset(i)}
                        className={`mx-1 text-lg p-1 rounded-sm ${i == params.offset ? 'dark:bg-third' : ''} dark:hover:bg-gray-700 cursor-pointer`}>
                        {i + 1}
                    </div>
                })
            }
            {params.offset < params.size - 1 &&
                <ChevronRightIcon className={`w-5 h-5 my-auto dark:hover:fill-blue-400 cursor-pointer`} onClick={() => params.setOffset(params.offset + 1)}/>
            }
        </div>
    </div>;
}

export default PageSelector;