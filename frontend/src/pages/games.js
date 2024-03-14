import { PlusIcon } from '@heroicons/react/24/solid';
import GameItem from '../components/games/item.js';

const GamesPage = () => {
    return (
        <main className={`min-h-screen bg-main dark:text-main p-5 px-20`}>
            <div className={`flex items-center pb-3 font-mono`}>
                <h1 className={`text-5xl`}>
                    Games
                </h1>
                <PlusIcon className={`w-10 h-10 ml-4 my-auto hover:fill-green-500 transition-colors hover:cursor-pointer`}/>
            </div>
            <hr className={`border-t-2 border-gray-400 pb-3`}/>
            <table className={`grid grid-cols-6 gap-4`}>
                <GameItem title="FIFA 12"/>
                <GameItem title="Virtua Fighter 5"/>
                <GameItem title="Half Life 2"/>
                <GameItem title="GTA V"/>
                <GameItem title="Driver: San Francisco"/>
                <GameItem title="GTA San Andreas"/>
                <GameItem title="Unreal Tournament"/>
                <GameItem title="Triviador"/>
                <GameItem title="GTA: Romania"/>
                <GameItem title="Hearts of Iron 4"/>
                <GameItem title="Victoria 3"/>
                <GameItem title="Crusader Kings 3"/>
            </table>
        </main>
    );
}

export default GamesPage;