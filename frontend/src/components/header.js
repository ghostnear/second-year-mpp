import { Cog8ToothIcon } from '@heroicons/react/24/solid'
import GamesHeader from './header/gamesheader';
import MusicHeader from './header/musicheader';

const Header = () => {
    return <header className={`w-100 bg-secondary sticky p-4`}>
        <nav className={`grid grid-flow-col justify-stretch`}>
            {/* Left side of the navbar. */}
            <div className={`flex justify-start`}>
                <a href="/" target="_blank">
                    <h1 className={`antialiased dark:text-main font-mono text-2xl font-extrabold text-page-header`}>
                        MyList
                    </h1>
                </a>
            </div>
            {/* Center of the navbar. */}
            <div className={`flex justify-center`}>
                <GamesHeader/>
                <MusicHeader/>
            </div>

            {/* Right side of the navbar. */}
            <div className={`flex justify-end`}>
                <a href="/settings/" target="_self">
                    <Cog8ToothIcon className={`w-8 h-8 dark:text-main font-mono text-page-header`}/>
                </a>
            </div>
        </nav>
    </header>;
}

export default Header;