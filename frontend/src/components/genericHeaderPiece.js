import { Link } from 'react-router-dom';

const GenericHeader = (params) => {
    return <nav className={`bg-secondary m-auto`}>
        <Link to={params.link} className={`flex items-center`}>
            <h1 className={`dark:text-main text-s`}>{params.label}</h1>
        </Link>
    </nav>;
}

export default GenericHeader; 