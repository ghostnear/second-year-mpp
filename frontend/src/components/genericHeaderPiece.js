import { Bars3Icon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';

const GenericHeader = (params) => {
    return <nav className={`w-100 bg-secondary m-auto`}>
        <Link to={params.link} className={`flex items-center`}>
            <Bars3Icon className={`dark:text-main w-4 h-4 mr-1`}/>
            <h1 className={`dark:text-main text-s font-mono`}>{params.label}</h1>
        </Link>
    </nav>;
}

export default GenericHeader; 