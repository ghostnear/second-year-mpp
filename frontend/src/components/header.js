import { Cog8ToothIcon  } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';
import GenericHeader from './genericHeaderPiece.js';

const Header = () => {
    return <header className={`w-full bg-secondary sticky top-0 p-4 shadow-lg`}>
        <nav className={`grid grid-flow-col justify-stretch`}>
            {/* Left side of the navbar. */}
            <div className={`flex justify-start`}>
                <Link to="/">
                    <h1 className={`antialiased dark:text-main font-mono text-2xl font-extrabold text-page-header`}>
                        MyList
                    </h1>
                </Link>
            </div>
            {/* Center of the navbar. */}
            <div className={`flex justify-center`}>
                <GenericHeader label="Games" link="/games/"/>
            </div>

            {/* Right side of the navbar. */}
            <div className={`flex justify-end`}>
                <Link to="/settings/">
                    <Cog8ToothIcon className={`w-8 h-8 dark:text-main hover:dark:fill-gray-400 font-mono text-page-header`}/>
                </Link>
            </div>
        </nav>
    </header>;
}

export default Header;